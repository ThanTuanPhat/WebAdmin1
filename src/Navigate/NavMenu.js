import React, { useContext } from "react";
import {
  NotificationOutlined,
  UserOutlined,
  TagOutlined,
  BarChartOutlined,
  ReconciliationOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./NavMenu.css";
import { AdminContext } from "../Component/AdminProvider";
import logoBlue2 from "../assets/images/logoBlue2.jpg";
import Search from "../Component/Search";

const { Content, Sider } = Layout;

const NavMenu = ({ children, isHidden, onLogout }) => {
  const { admin } = useContext(AdminContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout className="container-all" style={{ minHeight: "100vh" }}>
      <Layout className="container-allin" style={{ height: "100%" }}>
        {!isHidden && (
          <Sider width={260} className="slider">
            <div className="logo-container">
              <img src={logoBlue2} className="logoBlue" alt="logo" />
            </div>

            <Menu
              className="menu"
              mode="inline"
              defaultSelectedKeys={["/charts"]}
              style={{ height: "50%", borderRight: 0 }}
              items={[
                {
                  key: "/charts",
                  icon: <BarChartOutlined />,
                  label: "Thống kê",
                },
                {
                  key: "/userManage",
                  icon: <UserOutlined />,
                  label: "Quản lý người dùng",
                },
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
                {
                  key: "/comments",
                  icon: <MessageOutlined />,
                  label: "Quản lý bình luận",
                },
                {
                  key: "/promotions",
                  icon: <TagOutlined />,
                  label: "Quản lý khuyến mãi",
                },
                {
                  key: "6",
                  icon: <NotificationOutlined />,
                  label: "Notifications",
                  children: [
                    { key: "/notifications/messages", label: "Message Center" },
                    { key: "/notifications/alerts", label: "System Alerts" },
                  ],
                },
              ]}
              onClick={handleMenuClick}
            />
          </Sider>
        )}
        <Layout className="right-component">
          <div className="headers-nav">
            <div className="hd-nav">
              <h1>Chào mừng, </h1>
              <p className="admin">{admin?.email}</p>
            </div>
            <Button onClick={onLogout} className="logout-btn">Đăng xuất</Button>
            <p className="date">{new Date().toLocaleDateString()}</p>
          </div>

          {!isHidden && (
            <div className="cpn-search" style={{ width: "95%" }}>
              <Search />
            </div>
          )}
          <Content
            style={{
              padding: 18,
              height: "50%",
              width: "100%",
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
