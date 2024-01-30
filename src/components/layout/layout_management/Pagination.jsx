import React from "react";
import { CSVLink } from "react-csv";
import {
  faDownload,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({
  totalPages,
  currentPage,
  recordOnPage,
  setRecordOnPage,
  dataExport,
  headers,
  filename,
  haveExport,
  totalRecord,
  searchData,
  exportExcel,
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
          // <CSVLink
          //   data={dataExport}
          //   headers={headers}
          //   filename={filename}
          //   className="ant-btn ant-btn-text ant-btn-export"
          // >
          //   <FontAwesomeIcon icon={faDownload} />
          // </CSVLink>
          <div className="ant-btn-export">
            <FontAwesomeIcon icon={faDownload} onClick={exportExcel}></FontAwesomeIcon>
          </div>
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

export default Pagination;
