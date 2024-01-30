import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu } from "antd";

// import logo from "../../assets/resource/image/XMLID_1_.png";

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
    let _lstItems = [];
    _lstItems = arrayToTree(userInfo?.FunctionSettings, "0");

    return _lstItems;
  };

  return (
    <>
      <div className="sideBar">
        <div className="sideBar__wrap">
          <a className="bars" href="/">
            <div className="logo">
              {/* <img src={logo} alt="nvs" /> */}
            </div>
          </a>

          {/* Menu */}
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode="horizontal"
            className="sidebar-menu"
            items={lstItem}
          />
        </div>
      </div>
    </>
  );
});

export default SideBar;
