import React from "react";

import {
  faDownload,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

const PaginationV2 = ({
  totalPages,
  currentPage,
  recordOnPage,
  setRecordOnPage,
  haveExport,
  totalRecord,
  searchData,
  downloadFileExport,
}) => {
  const paginationButtons = [];

  // Tạo danh sách các nút trang dựa trên số trang và trang hiện tại
  for (let page = 1; page <= totalPages; page++) {
    if (totalPages > 2 && currentPage > 1) {
      paginationButtons.push(
        <button
          onClick={() => {
            searchData(page - 1);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      );
    }
    paginationButtons.push(
      <button
        key={page}
        onClick={() => {
          searchData(page);
        }}
        className={currentPage === page ? "active" : ""}
      >
        {page}
      </button>
    );

    if (totalPages > 2 && currentPage < totalPages) {
      paginationButtons.push(
        <button
          onClick={() => {
            searchData(page + 1);
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      );
    }
  }

  const onPageSizeChanged = (value) => {
    setRecordOnPage(value);
    searchData(1);
  };

  return (
    <div className="pagination">
      <div className="pagination__left">
        <div className="form-select">
          <span>Hiển thị &nbsp;</span>
          <select
            onChange={(e) => {
              onPageSizeChanged(e.target.value);
            }}
            id="page-size"
            className="form-control"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>&nbsp;{`/${totalRecord} bản ghi`}</span>
        </div>
        {haveExport && (
          <Button
          className="ant-btn ant-btn-text ant-btn-export"
          onClick={()=>{
            if(downloadFileExport != undefined){
              downloadFileExport()
            }
          }}
          >
            <FontAwesomeIcon icon={faDownload} color="#71e763"/>
          </Button>
        )}
      </div>
      <div className="pagination__right">
        <button
          onClick={() => {
            searchData(1);
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>

        {paginationButtons}
        <button
          onClick={() => {
            searchData(totalPages);
          }}
          id="btLast"
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    </div>
  );
};

export default PaginationV2;
