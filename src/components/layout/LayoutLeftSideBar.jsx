import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Content, Footer, Sider } = Layout;

const LayoutLeftSideBar = (props) => {
  const navigate = useNavigate();
  const getListItemMenu = () => {
    let _lstItems = [
      {
        label: "Trang chủ",
        key: "DASHBOARD",
        icon: <UserOutlined />,
        className: location.pathname === "/" ? "ant-menu-item-selected" : "",
        onClick: () => {
          navigate("/");
        },
      },
      {
        label: "Quản lý bài viết",
        key: "POSTMANA",
        icon: <UserOutlined />,
        className:
          location.pathname === "/danh-sach-bai-viet"
            ? "ant-menu-item-selected"
            : "",
        onClick: () => {
          navigate("/danh-sach-bai-viet");
        },
      },
    ];

    return _lstItems;
  };
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="main-layout scroll">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["POSTMANA"]}
          mode="inline"
          items={getListItemMenu()}
        />
      </Sider>

      <Layout>
        <props.component />

        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default LayoutLeftSideBar;
