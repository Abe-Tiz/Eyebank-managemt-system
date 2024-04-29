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
const { Header, Content } = Layout;

const SurgeonDashboard = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [state, setState] = useState({
        name: "",
        image: "",
        isDropdownOpen: false,
        isLoggedin: false,
        collapsed: false,
        role: "",
    });

    const handleSearch = () => {
        const sampleList = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Doe" },
        ];
        const results = sampleList.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(results);
    };
    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };
    const toggleDropdown = () => {
        setState({ ...state, isDropdownOpen: !state.isDropdownOpen });
    };

    const toggleSidebar = () => {
        setState((prev) => ({ ...prev, collapsed: !prev.collapsed }));
    };

    //! handle Logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    //! handle loggedin user
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
                setState((prev) => ({
                    ...prev,
                    name: data.data.name,
                    image: data.data.image,
                    role: data.data.role,
                    isLoggedin: true,
                }));

                if (data.data === "token expired") {
                    localStorage.clear();
                    navigate("/login");
                }
            });
    }, [navigate]);

    return (
        <Layout className="min-h-screen w-full grid  md:grid-cols-1 ">

            <SurgeonSidebar
                collapsed={state.collapsed}
                toggleSidebar={toggleSidebar}
                name={state.name}
                image={state.image}
                role={state.role}
            />

            <Layout
                className={`${state.collapsed ? "ml-20" : "ml-64"
                    } transition-all duration-300 ease-in-out flex-grow`}
            >
                <HeaderComponent
                    name={state.name}
                    role={state.role}
                    state={state}
                    toggleSidebar={toggleSidebar}
                // newDonorCount={newDonorCount}
                />

                <Content className=" mt-3 p-4">
                    <div className="bg-white pt-4 w-full">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SurgeonDashboard;
