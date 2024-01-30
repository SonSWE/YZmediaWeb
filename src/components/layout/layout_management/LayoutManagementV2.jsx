import React, { useState, useRef, useImperativeHandle } from "react";
import DataTable from "./DataTable";
import FormSearch from "./FormSearch";
import Form from "./Form";

import Header from "./Header";

export const LayoutManagementV2 = React.forwardRef((pageContent, ref) => {
  const refs = useRef({
    refHeader: useRef(null),
    refSearch: useRef(null),
    refForm: useRef(null),
    refDataGrid: useRef(null),
  });

  const onEvent = (data) => {
    return {
      Header: refs.current.refHeader?.current?.onEvent(data),
      Form: refs.current.refForm?.current?.onEvent(data),
      DataGrid: refs.current.refDataGrid?.current?.onEvent(data),
    };
  };

  useImperativeHandle(ref, () => ({
    onEvent,
  }));

  return (
    <>
      <div className="group">
        {/* Header */}
        {pageContent.header.component != undefined && pageContent.header.component != null ? (
          <pageContent.header.component
            ref={refs.current.refHeader}
            onEvent={onEvent}
            config={pageContent.config}
            headerConfig={pageContent.header}
          />
        ) : (
          <Header
            ref={refs.current.refHeader}
            onEvent={onEvent}
            config={pageContent.config}
            headerConfig={pageContent.header}
          />
        )}

        {/* content */}
        <div className="group__table">
          {pageContent.search.component != undefined && pageContent.search.component != null ? (
            <pageContent.search.component
              ref={refs.current.refSearch}
              onEvent={onEvent}
              config={pageContent.config}
              headerConfig={pageContent.header}
            />
          ) : (
            <FormSearch
              ref={refs.current.refSearch}
              onEvent={onEvent}
              config={pageContent.config}
              headerConfig={pageContent.header}
            />
          )}

          <div className="group__table-container">
            {pageContent.dataGrid.component != undefined && pageContent.dataGrid.component != null ? (
              <pageContent.dataGrid.component
                ref={refs.current.refDataGrid}
                onEvent={onEvent}
                config={pageContent.config}
                headerConfig={pageContent.header}
                columns={pageContent.dataGrid.columns}
                headersExport={pageContent.dataGrid.headersExport}
                searchCode={pageContent.dataGrid.searchCode}
                haveExport={pageContent.dataGrid.haveExport}
                fileName={pageContent.dataGrid.fileName}
              />
            ) : (
              <DataTable
                ref={refs.current.refDataGrid}
                onEvent={onEvent}
                config={pageContent.config}
                headerConfig={pageContent.header}
                columns={pageContent.dataGrid.columns}
                headersExport={pageContent.dataGrid.headersExport}
                searchCode={pageContent.dataGrid.searchCode}
                haveExport={pageContent.dataGrid.haveExport}
                fileName={pageContent.dataGrid.fileName}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal form */}
      <Form ref={refs.current.refForm} config={pageContent.formItems} onEvent={onEvent} />
    </>
  );
});
