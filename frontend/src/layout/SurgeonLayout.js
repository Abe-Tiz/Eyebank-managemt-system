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
    const { user, setUser, getLoggedInUser } = useLoggedInUser("token");
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
        localStorage.removeItem("doctor");
        navigate("/login");
    };

    //! handle loggedin user
    useEffect(() => {
        getLoggedInUser();
    }, [navigate]);

    return (
        <Layout className="min-h-screen w-full grid  md:grid-cols-1 ">

            <SurgeonSidebar
                collapsed={state.collapsed}
                toggleSidebar={toggleSidebar}
                name={user && user.data.name}
                image={user && user.data.image}
                role={user && user.data.role}
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

                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearchInputChange}
                        className="border p-2 rounded bg-gray-800 text-white"
                    />
                    <button
                        onClick={handleSearch}
                        className="text-white hover:text-gray-300 transition-all duration-300"
                    >
                        Search
                    </button>

                    <Badge count={5} offset={[0, 5]} className="mr-5">
                        <BellOutlined className="text-2xl text-blue-500" />
                    </Badge>
                    <div className="relative inline-block">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                            type="button"
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src={user && user.data.image}
                                alt="user photo"
                            />
                        </button>

                        {state.isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            <SettingOutlined className="text-2xl text-blue-500" />{" "}
                                            {t("common:settingButtonLabel")}
                                        </Link>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <button
                                        onClick={handleLogout}
                                        className="ml-5 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {t("common:logouttButtonLabel")}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>

            <Content className="p-4 mt-10">
                <div className="bg-slate-100  w-full">
                    <Outlet />
                </div>
            </Content>
        </Layout >
    );
};

export default SurgeonDashboard;
