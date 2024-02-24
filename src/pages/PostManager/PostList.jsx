import React, { useRef } from "react";
import { toast } from "react-toastify";
import { Button, Form, Modal, Tooltip } from "antd";
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

import { useCorporateActionApi } from "../../apiHelper/api/CorporateAction";
import { equalDateNow } from "../../utils/commonFunction";
import { formatDate, formatNumber } from "../../utils/convertData";


const PostList = () => {
  const navigate = useNavigate();
  const apiClient = useCorporateActionApi();
  const [formSearch] = Form.useForm();

  const columns = [
    {
      field: "Discription",
      headerName: "Mô tả",
      suppressSizeToFit: true,
      pinned: "left",
      width: 300,
      cellRenderer: (data) => {
        return (
          <Link
            to={`/chi-tiet-quyen-co-tuc?id=${data.data.Corp_Action_Id}`}
            style={{ fontWeight: "600" }}
          >
            {data.value}
          </Link>
        );
      },
    },
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
      field: "Stock_Rate",
      headerName: "Tỷ lệ trả cổ tức",
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
                    ShowModal(e.data, "approve");
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
              <Tooltip placement="top" title="Xóa">
                <Button
                  type="actions"
                  onClick={() => {
                    ShowModal(e.data, "delete");
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </Button>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  //hàm sub của form
  const OnSubmit = async (values, action) => {
    var result;
    switch (action) {
      case "create":
        values.Corp_Action_Type = 2;
        // 0 Trạng thái bình thường
        values.Status = 0;

        await apiClient
          .insert(values)
          .then((data) => {
            if (data && data.code && data.code > 0) {
              toast.success("Đăng ký đợt thực hiện quyền thành công");
              Search();
              result = data;
            } else {
              toast.error("Đăng ký đợt thực hiện quyền thất bại");
              return null;
            }
          })
          .catch((e) => {
            console.log(e);
          });

        break;
      case "update":
        await apiClient
          .update(values)
          .then((data) => {
            if (data && data.code && data.code > 0) {
              toast.success("Cập nhật đợt thực hiện quyền thành công");
              Search();
              result = data;
            } else {
              toast.error("Cập nhật đợt thực hiện quyền thất bại");
              return null;
            }
          })
          .catch((e) => {
            console.log(e);
          });

        break;
      case "approve":
        await apiClient
          .approve(values)
          .then((data) => {
            if (data && data.code && data.code > 0) {
              toast.success("Duyệt thông tin đợt thực hiện quyền thành công");
              Search();
              result = data;
            } else {
              toast.error("Duyệt thông tin đợt thực hiện quyền thất bại");
              return null;
            }
          })
          .catch((e) => {
            console.log(e);
          });

        break;
      case "delete":
        await apiClient
          .delete(values)
          .then((data) => {
            if (data && data.code && data.code > 0) {
              toast.success("Xóa thông tin đợt thực hiện quyền thành công");
              Search();
              result = data;
            } else {
              toast.error("Xóa thông tin đợt thực hiện quyền thất bại");
              return null;
            }
          })
          .catch((e) => {
            console.log(e);
          });
        break;
    }
    return result;
  };

  const refs = useRef({
    refDataGrid: useRef(null),
    refForm: useRef(null),
  });

  const onEvent = (data) => {
    return {
      DataGrid: refs.current.refDataGrid?.current?.onEvent(data),
      Form: refs.current.refForm?.current?.onEvent(data),
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

  const ShowModal = (rowSelected, action) => {
    if (action == "delete") {
      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắn chắn muốn xóa đợt thực hiện quyền này?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          OnSubmit(rowSelected, action);
        },
      });
    } else if (action == "approve") {
      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắn chắn muốn duyệt đợt thực hiện quyền này?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          OnSubmit(rowSelected, action);
        },
      });
    } else {
      onEvent({
        type: "OPEN_POPUP",
        data: { action: action, values: rowSelected },
      });
    }
  };

  return (
    <>
      <div className="group">
        <header className="header">
          <h3 className="title">
            <span className="previous">Thực hiện quyền / </span>
            Danh sách thực hiện quyền trả cổ tức bằng cổ phiếu
          </h3>

          <div className="controls"></div>
        </header>
        {/* content */}
        <div className="group__table">
          <div className="group__table_top">
            <Form
              form={formSearch}
              onKeyDown={(e) => {
                if (e.code == "Enter") {
                  Search();
                }
              }}
            >
              <ItemSearch />
            </Form>
            <div className="group__table_control">
              <Button
                type="primary"
                onClick={() => {
                  Search();
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
                Tìm kiếm
              </Button>

              <Button
                type="outline"
                className="light-orange"
                onClick={() => {
                  ShowModal(null, "create");
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Thêm mới</span>
              </Button>
            </div>
          </div>

          <div className="group__table-container">
            <DataTableV2
              ref={refs.current.refDataGrid}
              columns={columns}
              SearchData={apiClient?.SearchData}

            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostList;
