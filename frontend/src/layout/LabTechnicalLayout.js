import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/dashboard/lab/SideBar";

import socketIOClient from "socket.io-client";
import HeaderComponent from "../pages/dashboard/admins/HeaderComponent";
import useLoggedInUser from "../useHooks/useLoggedInUser";

const ENDPOINT = "http://localhost:4000"; // Your server endpoint
const socket = socketIOClient(ENDPOINT);

const { Content } = Layout;

const LabTechnicalDashboard = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        image: "",
        isDropdownOpen: false,
        isLoggedin: false,
        collapsed: false,
        role: "",
    });

     const { user, setUser, getLoggedInUser } = useLoggedInUser("token");

    const [reportData, setReportData] = useState({
        donor: "",
        user: "",
    });

    const [newDonorCount, setNewDonorCount] = useState(0);

    // const getLoggedInUser = async () => {
    //     fetch("http://127.0.0.1:4000/user/userLogedin", {
    //         method: "POST",
    //         crossDomain: true,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             token: localStorage.getItem("token"),
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data.data, "user logged in");
    //             setState((prev) => ({
    //                 ...prev,
    //                 name: data.data.name,
    //                 image: data.data.image,
    //                 role: data.data.role,
    //                 isLoggedin: true,
    //             }));

    //             if (data.data === "token expired") {
    //                 localStorage.clear();
    //                 navigate("/login");
    //             }
    //         });
    // };

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

  

    useEffect(() => {
        numberDonor();
        getLoggedInUser();;
    }, [setReportData, navigate, newDonorCount]);

    const handleSearchInputChange = (e) => {
        // setSearchText(e.target.value);
    };

    const toggleDropdown = () => {
        setState({ ...state, isDropdownOpen: !state.isDropdownOpen });
    };

    const toggleSidebar = () => {
        setState((prev) => ({ ...prev, collapsed: !prev.collapsed }));
    };

    const [notifications, setNotifications] = useState([]);

    return (
      <Layout className=" bg-base-200 min-h-screen w-full grid  md:grid-cols-1 ">
        {/* side bar section */}
        <SideBar
          collapsed={state.collapsed}
          toggleSidebar={toggleSidebar}
          name={user && user.data.name}
          role={user && user.data.role}
        />

        <Layout
          className={`${
            state.collapsed ? "ml-20" : "ml-64"
          }  bg-base-200 transition-all duration-300 ease-in-out flex-grow`}
        >
          {/* header componnet  */}
          <HeaderComponent
            state={state}
            image={user && user.data.image}
            toggleSidebar={toggleSidebar}
            newDonorCount={newDonorCount}
            type="lab"
          />

          {/* content section  */}
          <Content className="p-4 mt-10">
            <div className=" bg-slate-100  w-full">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
};

export default LabTechnicalDashboard;
