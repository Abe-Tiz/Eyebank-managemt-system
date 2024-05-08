import HeaderComponent from "../pages/dashboard/admins/HeaderComponent";
import React, { useEffect, useState } from "react";
import { Layout, Badge } from "antd";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import SurgeonSidebar from "../pages/dashboard/surgeon/SurgeonSideBar";
import useLoggedInUser from "../useHooks/useLoggedInUser";
const { Header, Content } = Layout;
const SurgeonDashboard = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { user, setUser, getLoggedInUser } = useLoggedInUser("doctor");
    const [state, setState] = useState({
        name: "",
        image: "",
        isDropdownOpen: false,
        isLoggedin: false,
        collapsed: false,
        role: "",
    });

    // const handleSearch = () => {
    //     const sampleList = [
    //         { id: 1, name: "John Doe" },
    //         { id: 2, name: "Jane Doe" },
    //     ];
    //     const results = sampleList.filter((item) =>
    //         item.name.toLowerCase().includes(searchText.toLowerCase())
    //     );
    //     setSearchResults(results);
    // };
    // const handleSearchInputChange = (e) => {
    //     setSearchText(e.target.value);
    // };
    // const toggleDropdown = () => {
    //     setState({ ...state, isDropdownOpen: !state.isDropdownOpen });
    // };

    const toggleSidebar = () => {
        setState((prev) => ({ ...prev, collapsed: !prev.collapsed }));
    };

    //! handle Logout
    const handleLogout = () => {
        localStorage.removeItem("doctor");
        navigate("/login");
    };
 
    return (
      <Layout className=" bg-base-200 min-h-screen w-full grid  md:grid-cols-1  ">
        <SurgeonSidebar
          collapsed={state.collapsed}
          toggleSidebar={toggleSidebar}
          name={user && user.data.name}
          image={user && user.data.image}
          role={user && user.data.role}
        />

        <Layout
          className={`${
            state.collapsed ? "ml-20" : "ml-64"
          }  bg-base-200 transition-all duration-300 ease-in-out flex-grow`}
        >
          <HeaderComponent
            name={state.name}
            role={state.role}
            state={state}
            toggleSidebar={toggleSidebar}
            // newDonorCount={newDonorCount}
          />
          <Content className="p-4 mt-1">
            <div className=" bg-slate-100  w-full">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
};

export default SurgeonDashboard;
