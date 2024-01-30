import React, { useState, useImperativeHandle, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { Button } from "antd";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faTrash,
  faUserPlus,
  faGears,
  faUsers,
  faClipboardCheck,
  faBan,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Header = React.forwardRef(({ config, headerConfig, onEvent }, ref) => {
  const buttonConfig = headerConfig.buttonConfig;
  const location = useLocation();
  const navigate = useNavigate();

  const lstFunc = useSelector((state) => state.authReducer.FunctionSettings);

  const [rowSelected, setRowSelected] = useState(null);
  const [isRecord, setIsRecord] = useState("");

  // set event
  useImperativeHandle(ref, () => ({
    onEvent: (data) => {
      if (data.type === "SELECTION_ROW_CHANGE") {
        setRowSelected(data?.data);
      } else if (data.type === "REFRESH_FORM") {
        setRowSelected(null);
        setIsRecord("");
      }
    },
  }));

  useEffect(() => {
    if (rowSelected != null && rowSelected != undefined) {
      setIsRecord("isRecord");
    } else {
      setIsRecord("");
    }
  }, [location.pathname, rowSelected]);

  useEffect(() => {
    setIsRecord("");
  }, [location.pathname]);

  const handleDisabledButton = (config) => {
    //hàm disable viết riêng trong config nếu cần
    if (config && config?.disable != undefined) {
      return config.disable(rowSelected);
    } else {
      //nếu k có hàm disable thì không có bản ghi button sẽ disable
      return isRecord !== "isRecord";
    }
  };

  const handleCheckPermissions = (func_id) => {
    return true;
    // let _lstFunc = lstFunc.filter((item) => item.Function_Id === func_id);

    // // console.log(_lstFunc, func_id);

    // if (_lstFunc && _lstFunc.length > 0 && _lstFunc[0]?.Authcode === "1") {
    //   return true;
    // } else {
    //   toast.error("Không có quyền truy cập");
    //   return false;
    // }
  };

  return (
    <header className="header">
      <h3 className="title">{headerConfig?.title}</h3>

      <div className="controls">
        {/* Chi tiết */}
        {buttonConfig.detail_link?.isShow && (
          <Button
            className="primary-gray"
            disabled={handleDisabledButton()}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.detail_link?.Function_Id))
                buttonConfig.detail_link?.onclick(rowSelected);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
            <span>Chi tiết</span>
          </Button>
        )}

        {/* Cập nhật */}
        {buttonConfig.update?.isShow && (
          <Button
            disabled={handleDisabledButton()}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.update?.Function_Id))
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "update", values: rowSelected },
                });
            }}
          >
            <FontAwesomeIcon icon={faPencil} />
            <span>Cập nhật</span>
          </Button>
        )}

        {/* từ chối */}
        {buttonConfig.approve?.isShow && (
          <Button
            disabled={handleDisabledButton(buttonConfig.approve)}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.approve?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "approve", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
            <span>Duyệt</span>
          </Button>
        )}

        {/* từ chối */}
        {buttonConfig.unapprove?.isShow && (
          <Button
            disabled={handleDisabledButton(buttonConfig.unapprove)}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.unapprove?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "unapprove", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>Từ chối</span>
          </Button>
        )}

        {/* nút gỡ tin */}
        {buttonConfig.unpublic?.isShow && (
          <Button
            disabled={handleDisabledButton(buttonConfig.unpublic)}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.unpublic?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "unpublic", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>Gỡ tin</span>
          </Button>
        )}

        {/* Xóa */}
        {buttonConfig.delete?.isShow && (
          <Button
            className="default-red"
            disabled={handleDisabledButton()}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.delete?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "delete", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Xóa</span>
          </Button>
        )}

        {buttonConfig.permission?.isShow && (
          <Button
            disabled={handleDisabledButton()}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.permission?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "permission", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faGears} />
            <span>Phân quyền</span>
          </Button>
        )}

        {buttonConfig.group_user?.isShow && (
          <Button
            disabled={handleDisabledButton()}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.group_user?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "group_user", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Gán/gỡ người dùng</span>
          </Button>
        )}
        {/* Chi tiết */}
        {buttonConfig.detail?.isShow && (
          <Button
            className="primary-gray"
            disabled={handleDisabledButton()}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.detail?.Function_Id))
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "details", values: rowSelected },
                });
            }}
          >
            <FontAwesomeIcon icon={faEye} />
            <span>Chi tiết</span>
          </Button>
        )}

        {/* Import */}
        {buttonConfig.import?.isShow && (
          <Button
            //className="primary-orange"
            disabled={isRecord === "isRecord" ? true : false}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.import?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "import", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <span>Import</span>
          </Button>
        )}

        {/* Thêm */}
        {buttonConfig.add?.isShow && (
          <Button
            className="primary-orange"
            disabled={isRecord === "isRecord" ? true : false}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.add?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "create", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Thêm</span>
          </Button>
        )}

        {/* Đăng ký */}
        {buttonConfig.register?.isShow && (
          <Button
            className="primary-orange"
            disabled={isRecord === "isRecord" ? true : false}
            onClick={() => {
              if (handleCheckPermissions(buttonConfig.register?.Function_Id)) {
                onEvent({
                  type: "OPEN_POPUP",
                  data: { action: "create", values: rowSelected },
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Đăng ký</span>
          </Button>
        )}

        {/* button them: truy cap url them */}
        {buttonConfig.addWithRoute?.isShow && handleCheckPermissions(buttonConfig.addWithRoute?.Function_Id) && (
          <NavLink to={buttonConfig.addWithRoute?.url}>
            <Button className="primary-orange" disabled={isRecord === "isRecord" ? true : false}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Thêm</span>
            </Button>
          </NavLink>
        )}
      </div>
    </header>
  );
});

export default Header;
