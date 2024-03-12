import React, { useRef } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faEye,
  faListCheck,
  faPencil,
  faPlus,
  faSearch,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/layout/layout_management/DataTableV2";

import { equalDateNow } from "../../utils/commonFunction";
import { formatDate, formatNumber } from "../../utils/convertData";
import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { Content } from "antd/lib/layout/layout";

const Index = () => {
  const navigate = useNavigate();
  const apiClient = usePostsApi();
  const [formSearch] = Form.useForm();

  const columns = [
    {
      field: "Status_Text",
      headerName: "Trạng thái",
      cellRenderer: (e) => {
        if (e.data.Status == 0) {
          return (
            <span className="rounded-pill text-light-yellow">
              {e.data.Status_Text}
            </span>
          );
        } else if (e.data.Status == 1) {
          return (
            <span className="rounded-pill text-light-green">
              {e.data.Status_Text}
            </span>
          );
        } else if (e.data.Status == 2) {
          return (
            <span className="rounded-pill text-light-blue">
              {e.data.Status_Text}
            </span>
          );
        } else if (e.data.Status == 3) {
          return (
            <span className="rounded-pill text-light-red">
              {e.data.Status_Text}
            </span>
          );
        } else if (e.data.Status == 4) {
          return (
            <span className="rounded-pill text-light-red">
              {e.data.Status_Text}
            </span>
          );
        } else {
          return e.value;
        }
      },
    },
    {
      field: "Post_Name",
      headerName: "Tên bài viết",
    },
    {
      field: "Total_Listing_Qtty",
      headerName: "Tổng KL trả cổ tức",
      cellClass: "right",
      cellRenderer: (data) => {
        return formatNumber(data.value);
      },
    },

    {
      field: "Last_Date",
      headerName: "Ngày ĐKCC",
      cellClass: "center",
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "Action_Date",
      headerName: "Ngày thực hiện",
      cellClass: "center",
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "Created_Date",
      headerName: "Ngày tạo",
      cellClass: "center",
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "Modified_Date",
      headerName: "Ngày cập nhật cuối cùng",
      cellClass: "center",
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      headerName: "Chức năng",
      pinned: "right",
      width: 250,
      suppressSizeToFit: true,
      // // width: 130,
      resizable: false,
      cellRenderer: (e) => {
        return (
          <>
            <div className="ag-cell-actions">
              <Tooltip placement="top" title="Duyệt">
                <Button
                  type="actions"
                  onClick={() => {
                    // ShowModal(e.data, "approve");
                  }}
                  disabled={e.data.Status >= 1}
                >
                  <FontAwesomeIcon icon={faClipboardCheck} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Chốt danh sách">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(
                      "/chi-tiet-quyen-co-tuc?id=" + e.data.Corp_Action_Id
                    );
                  }}
                  disabled={!equalDateNow(e.data.Last_Date)}
                >
                  <FontAwesomeIcon icon={faListCheck} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Phân bổ quyền">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(
                      "/chi-tiet-quyen-co-tuc?id=" + e.data.Corp_Action_Id
                    );
                  }}
                  disabled={!equalDateNow(e.data.Action_Date)}
                >
                  <FontAwesomeIcon icon={faShareNodes} color="#999" />
                </Button>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const refs = useRef({
    refDataGrid: useRef(null),
  });

  const onEvent = (data) => {
    return {
      DataGrid: refs.current.refDataGrid?.current?.onEvent(data),
    };
  };

  const Search = () => {
    formSearch.submit();
    formSearch
      .validateFields()
      .then((values) => {
        onEvent({
          type: "HANDLE_SEARCH",
          data: values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb className="main-layout-breadcrumb">
            <Breadcrumb.Item>Danh sách bài viết</Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex-content">
            <div className="card-content">
              <Form
                className="form-search"
                form={formSearch}
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    Search();
                  }
                }}
              >
                <ItemSearch />
              </Form>
            </div>

            <div className="card-content">
              <DataTableV2
                ref={refs.current.refDataGrid}
                columns={columns}
                SearchData={apiClient?.SearchData}
              />
            </div>
          </div>
        </Content>
      </div>
    </>
  );
};

export default Index;
