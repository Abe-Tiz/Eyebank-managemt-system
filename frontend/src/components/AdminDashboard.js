import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LineChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={80} theme="dark" breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DashboardOutlined style={{ fontSize: "24px", color: "white" }} />
        </div>
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />} />
          <Menu.Item key="users" icon={<UserOutlined />} />
          <Menu.Item key="statistics" icon={<LineChartOutlined />} />
          <Menu.Item key="settings" icon={<SettingOutlined />} />
          <Menu.Item key="logout" icon={<LogoutOutlined />} />
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px" }}>
           
          <h1>Welcome to the Admin Dashboard</h1>
          <p>Put your charts, tables, and other content here.</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
