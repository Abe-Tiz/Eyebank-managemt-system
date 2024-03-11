import React, { useEffect, useState } from "react";
import { Layout, Badge } from "antd";
import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import CustomSidebar from './../components/CustomeSider';

const { Header, Content } = Layout;

const AdminDashboard = () => {
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

    const [reportData, setReportData] = useState({
        donor: "",
        user: "",
    });

    useEffect(() => {
        const numberDonor = async () => {
            try {
                const response = await axios.get("http://localhost:4000/report");

                setReportData((prevReportData) => ({
                    ...prevReportData,
                    donor: response.data,
                }));

                console.log(response.data);
            } catch (error) {
                console.log("Error : ", error);
            }
        };

        const getLoggedInUser = async () => {
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
        };

        numberDonor();
        getLoggedInUser();
    }, [setReportData, navigate]);

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
    // useEffect(() => {
    //   fetch("http://127.0.0.1:4000/user/userLogedin", {
    //     method: "POST",
    //     crossDomain: true,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify({
    //       token: localStorage.getItem("token"),
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data.data, "user logged in");
    //       setState((prev) => ({
    //         ...prev,
    //         name: data.data.name,
    //         image: data.data.image,
    //         role: data.data.role,
    //         isLoggedin: true,
    //       }));

    //       if (data.data === "token expired") {
    //         localStorage.clear();
    //         navigate("/login");
    //       }
    //     });
    // }, [navigate]);

    return (
        <Layout className="min-h-screen w-full grid  md:grid-cols-1 ">
            <CustomSidebar
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
                <Header className="bg-base-100 p-4 shadow-lg flex justify-between text-center items-center">
                    <div className="flex items-center">
                        {state.collapsed ? (
                            <TfiMenuAlt
                                className="text-2xl text-gray-400 mr-2 cursor-pointer"
                                onClick={toggleSidebar}
                            />
                        ) : (
                            <GiHamburgerMenu
                                className="text-2xl text-gray-400 mr-2 cursor-pointer"
                                onClick={toggleSidebar}
                            />
                        )}
                    </div>

                    <div className="bg-base-100 flex items-center justify-center space-x-4">
                        <div className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle items-center justify-center text-center mr-5"
                                >
                                    <div className="indicator flex items-center  ">
                                        <Badge count={reportData.donor} className="mr-5 mt-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-5xl"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                />
                                            </svg>
                                        </Badge>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                                >
                                    <div className="card-body">
                                        <span className="font-bold text-lg">8 Items</span>
                                        <span className="text-info">Subtotal: $999</span>
                                        <div className="card-actions">
                                            <button className="btn btn-primary btn-block">
                                                View cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown dropdown-end ">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={state.image}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg text-black"
                                >
                                    <li>
                                        <a>Profile</a>
                                    </li>
                                    <li>
                                        <a> Setting</a>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout}>
                                            {" "}
                                            {t("common:logouttButtonLabel")}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* <input
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
            </Badge> */}

                        {/* <div className="navbar bg-base-100">
                <div className="flex-1">
                  <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none gap-2">
                  <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                      <li>
                        <a className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </a>
                      </li>
                      <li><a>Settings</a></li>
                      <li><a>Logout</a></li>
                    </ul>
                  </div>
                </div>
              </div> */}

                        {/* <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                type="button"
              >
                <img
                  class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={state.image}
                  alt="Bordered avatar"
                />
              </button>

           
              {
                state.isDropdownOpen && <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
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
      }
            </div> */}
                    </div>
                </Header>

                <Content className="p-4">
                    <div className="bg-white p-4 rounded shadow w-full">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
