import React, { useState, useRef, useEffect, useImperativeHandle, useMemo, useCallback } from "react";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import Pagination from "./Pagination";

import { useLocation } from "react-router-dom";
import { getFromToPaging } from "../../../utils/commonFunction";
import { DownloadFile } from "../../../utils/fileHelper";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataTable = React.forwardRef(
  (
    {
      onEvent,
      config,
      headerConfig,
      searchCode,
      columns = [],
      haveExport = true,
      headersExport = [],
      fileName = "export",
    },
    ref
  ) => {
    const gridRef = useRef();

    const location = useLocation();
    const today = new Date();

    fileName = fileName + `${today.getMonth() + 1}${today.getDate()}${today.getFullYear()}`;

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%", position: "relative" }), []);
    const gridStyle = useMemo(() => ({ height: "calc(100vh - 380px)", width: "100%" }), []);

    // Set row data
    const columnDefs = useMemo(() => columns, [columns]);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [recordOnPage, setRecordOnPage] = useState(10);
    const [orderBy, setOrderBy] = useState("");
    var keySearch = "";
    const [dataExport, setDataExport] = useState([]);

    const defaultColDef = useMemo(() => ({
      editable: false,
      sortable: true,
      filter: false,
      resizable: true,
      // animateRows: false,
    }));

    useImperativeHandle(ref, () => ({
      onEvent: (data) => {
        if (data.type === "REFRESH_FORM") {
          searchData(1);
        } else if (data.type === "HANDLE_SEARCH") {
          keySearch = data.data;
          searchData(1);
          return;
        }
      },
    }));

    // get data
    const searchData = (curentPage) => {
      // Hiển thị overlay loading
      gridRef.current.api?.showLoadingOverlay();

      // refresh table
      gridRef.current.api?.setRowData([]);

      // gọi api
      const calcPage = getFromToPaging(curentPage, recordOnPage);
      let to = calcPage.to;
      let from = calcPage.from;
      setCurrentPage(curentPage);

      headerConfig.bussinessAction
        ?.SearchData(keySearch, from, to, orderBy)
        .then((data) => {
          if (data && data.jsondata) {
            const _lst = JSON.parse(data.jsondata);

            setDataExport(_lst);

            setTotalRecord(data.totalrows);
            setTotalPages(Math.ceil(data.totalrows / recordOnPage));
            // set row data
            gridRef.current.api.setRowData(_lst);

            gridRef.current.api.sizeColumnsToFit({
              defaultMinWidth: 100,
              columnLimits: [],
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        })
        .finally(() => {
          // Ẩn overlay loading
          gridRef?.current?.api?.hideOverlay();
        });
    };

    // get data
    const exportExcel = () => {
      headerConfig.bussinessAction
        ?.GetDataExportExcel(keySearch, "0", "0", orderBy)
        .then((data) => {
          if (data) {
            DownloadFile(data.fileContent, data.fileName);
          }
        })
        .catch(function (err) {
          console.log(err);
        })
        .finally(() => {});
    };

    useEffect(() => {
      searchData(1);
    }, [searchCode, orderBy, location.pathname]);

    //
    const onSelectionChanged = async (event) => {
      const rowSelected = event.api.getSelectedRows();
      if (rowSelected && rowSelected.length > 0 && rowSelected[0][config.primaryKey] != undefined) {
        headerConfig.bussinessAction
          ?.GetById(rowSelected[0][config.primaryKey])
          .then((data) => {
            if (data != undefined && data.jsondata != undefined) {
              const obj = JSON.parse(data.jsondata);
              onEvent({
                type: "SELECTION_ROW_CHANGE",
                data: obj,
              });
            } else {
              return;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        onEvent({
          type: "SELECTION_ROW_CHANGE",
          data: null,
        });
      }
    };

    // const onSortChanged = (e) => {
    //   let lstColumnSorted = [];
    //   const lstColumn = e.columnApi.getColumnState();
    //   lstColumn?.map((e) => {
    //     if (e.sort) {
    //       const orderBy = ` UPPER(${e.colId}) ${e.sort} `;
    //       lstColumnSorted.push(orderBy);
    //     }
    //   });
    //   if(lstColumnSorted.length > 0){
    //     setOrderBy(lstColumnSorted.join(', '));
    //   }else{
    //     setOrderBy("");
    //   }
    // };

    return (
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            paginationPageSize={10}
            rowSelection={"single"}
            multiSortKey={"ctrl"}
            onSelectionChanged={onSelectionChanged}
            // onSortChanged={onSortChanged}
            pagination={true}
            overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Đang tải...</span>"
            overlayNoRowsTemplate="<span class='ag-overlay-loading-center'>Không có dữ liệu</span>"
            className="ag-grid-fullwidth"
          />
        </div>
        {/* Custom pagination */}
        <div className="ag-footer">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            totalRecord={totalRecord}
            recordOnPage={recordOnPage}
            setRecordOnPage={setRecordOnPage}
            searchData={searchData}
            dataExport={dataExport}
            headers={headersExport}
            filename={fileName}
            haveExport={haveExport}
            exportExcel={exportExcel}
          />
        </div>
      </div>
    );
  }
);

export default DataTable;
