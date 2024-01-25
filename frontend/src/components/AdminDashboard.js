import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Badge, Drawer } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import CreateDonor from "../sections/donor/CreateDonor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import "antd/dist/antd.css"; // Import Ant Design styles

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [displayCreateDonor, setDisplayCreateDonor] = useState(false);
  const [name, setName] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleAddDonorClick = () => {
    setDisplayCreateDonor(true);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:4000/user/userLogedin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "user logged in");
        setName(data.data.name);
        if (data.data === "token expired") {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme="dark"
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div
          style={{
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DashboardOutlined
            style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
            onClick={toggleCollapsed}
          />
        </div>
        <Menu
          mode="vertical"
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          inlineCollapsed={collapsed}
        >
          <Menu.Item
            key="addDonor"
            icon={<UserOutlined />}
            onClick={handleAddDonorClick}
          >
            Add Donor
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 80 : 200 }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              size={40}
              style={{ backgroundColor: "#87d068", marginRight: "10px" }}
              icon={<UserOutlined />}
            />
            <span>Admin {name}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Badge count={5} offset={[0, 5]} style={{ marginRight: "20px" }}>
              <BellOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
            </Badge>
            <SettingOutlined
              style={{
                fontSize: "18px",
                color: "#1890ff",
                cursor: "pointer",
              }}
            />
            <LogoutOutlined
              onClick={handleLogout}
              style={{
                fontSize: "18px",
                color: "#1890ff",
                marginLeft: "20px",
                cursor: "pointer",
              }}
            />
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <h1>Welcome to the Admin Dashboard</h1>
            {displayCreateDonor && <CreateDonor />}
            <p>Put your charts, tables, and other content here.</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;