import React from "react";
import {
  NotificationOutlined,
  UserOutlined,
  TagOutlined,
  BarChartOutlined,
  ReconciliationOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "./NavMenu.css";
import logoBlue2 from "../assets/images/logoBlue2.jpg";

const { Content, Sider } = Layout;

const items2 = [
  { key: "/charts", icon: <BarChartOutlined />, label: "Thống kê" },
  { key: "/userManage", icon: <UserOutlined />, label: "Quản lý người dùng" },
  {
    key: "3",
    icon: <ReconciliationOutlined />,
    label: "Quản lý hàng hóa",
    children: [
      { key: "/products", label: "Quản lý sản phẩm" },
      { key: "/QLHH", label: "Quản lý loại hàng" },
      { key: "/orders", label: "Quản lý đơn hàng" },
    ],
  },
  { key: "/comments", icon: <MessageOutlined />, label: "Quản lý bình luận" },
  { key: "/promotions", icon: <TagOutlined />, label: "Quản lý khuyến mãi" },
  {
    key: "6",
    icon: <NotificationOutlined />,
    label: "Notifications",
    children: [
      { key: "/notifications/messages", label: "Message Center" },
      { key: "/notifications/alerts", label: "System Alerts" },
    ],
  },
];

const NavMenu = ({ children, isHidden }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout className="container-all">
      <Layout className="container-allin">
        {!isHidden && (
          <Sider width={250} className="slider">
            <div className="logo-container">
              <img src={logoBlue2} className="logoBlue" alt="logo" />
            </div>
            <Menu
              className="menu"
              mode="inline"
              defaultSelectedKeys={["/charts"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
              onClick={handleMenuClick}
            />
          </Sider>
        )}

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default NavMenu;
