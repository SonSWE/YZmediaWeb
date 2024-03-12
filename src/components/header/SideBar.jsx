import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFilePen,
  faUserTie,
  faGears,
  faScaleBalanced,
  faPaperPlane,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = React.forwardRef(({ onEvent, config, headerConfig }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.authReducer);
  const [lstItem, setLstItem] = useState([]);

  useEffect(() => {
    setLstItem(getListItemMenu());
  }, [location]);

  const lstIcon = {
    faHome,
    faFilePen,
    faUserTie,
    faGears,
    faScaleBalanced,
    faPaperPlane,
    faNewspaper,
  };

  //hiển thị menu từ danh sách quyền, quyền đã được phân và được đặt là hiển thị thì sẽ được hiện lên menu
  //url là Function_Url
  //label hiển thị là Function_Name
  //icon_name là lên class icon (thêm icon thì phải khai báo thêm icon vào lstIcon ở trên)
  const arrayToTree = (arr, prid = "0") => {
    return arr
      .filter(
        (item) => item.Function_Pri_Id == prid && item.Display_On_Menu == 1
      )
      .map((child) => {
        let item = {
          label: child.Function_Name,
          key: child.Function_Url,
          className:
            location.pathname === child.Function_Url
              ? "ant-menu-item-selected"
              : "",
          onClick: () => {
            navigate(child.Function_Url);
          },
        };

        // if (lstIcon[child.Icon_Name]) {
        //   item.icon = (
        //     <FontAwesomeIcon icon={lstIcon[child.Icon_Name] ?? undefined} />
        //   );
        // }

        //sondt comment vì chỉ tạo menu cha, menu con tạo ở dưới nội dung trang
        const lstChild = arr.filter(
          (e) =>
            e.Function_Pri_Id == child.Function_Id && e.Display_On_Menu == 1
        );

        if (lstChild && lstChild.length > 0) {
          item.onClick = undefined;
          item.children = arrayToTree(arr, child.Function_Id);
          // item.type = "group";
        }
        return item;
      });
  };

  const getListItemMenu = () => {
    let _lstItems = [
      {
        label: "Trang chủ",
        key: "DASHBOARD",
        className: location.pathname === "/" ? "ant-menu-item-selected" : "",
        onClick: () => {
          navigate("/");
        },
      },
      {
        label: "Quản lý bài viết",
        key: "POSTMANA",
        className:
          location.pathname === "/danh-sach-bai-viet"
            ? "ant-menu-item-selected"
            : "",
        onClick: () => {
          navigate("/danh-sach-bai-viet");
        },
      },
    ];
    // _lstItems = arrayToTree(userInfo?.FunctionSettings, "0");

    return _lstItems;
  };

  return (
    <>
      <div className="sideBar">
        <div className="sideBar__wrap">
          <a className="bars" href="/">
            <div className="logo"><img src={"data:image/png;base64,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"} alt="nvs" /></div>
          </a>

          {/* Menu */}
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="vertical"
            className="sidebar-menu"
            items={lstItem}
          />
        </div>
      </div>
    </>
  );
});

export default SideBar;
