import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CustomSidebar from "../components/CustomeSidebar";

import socketIOClient from "socket.io-client";
import HeaderComponent from "../pages/dashboard/admins/HeaderComponent";
import useLoggedInUser from "../useHooks/useLoggedInUser";

// const ENDPOINT = "http://localhost:4000"; // Your server endpoint
// const socket = socketIOClient(ENDPOINT);

const { Content } = Layout;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
  const [countNotification, setCountNotification] = useState(0);
  
   const { user, setUser, getLoggedInUser } = useLoggedInUser("admin");

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
    const [numNotification, setNumNotification] = useState({
      donor: "",
      user: "",
    });

    const [newDonorCount, setNewDonorCount] = useState(0);
  
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
    const notification = async () => {
        try {
          const response = await axios.get(
            " http://localhost:4000/donor/notification"
          );
          
            setNotifications(response.data.notifications);
            setCountNotification(response.data.numUnverifiedDonors);
        //   console.log(
        //     response.data.notifications,
        //     // response.data.numUnverifiedDonors
        //   );
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    useEffect(() => {
        numberDonor();
        getLoggedInUser();
        notification();
    }, [setReportData, navigate, newDonorCount]);
  
  console.log("logggggg:",user);

    const toggleSidebar = () => {
        setState((prev) => ({ ...prev, collapsed: !prev.collapsed }));
    };

 //! handle Logout
    // const handleLogout = () => {
    //     localStorage.removeItem("admin");
    //     navigate("/login");
    // };

    return (
      <Layout className=" bg-base-100 min-h-screen w-full grid  md:grid-cols-1 ">
        {/* side bar section */}
        <CustomSidebar
          collapsed={state.collapsed}
          toggleSidebar={toggleSidebar}
          name={user && user.data.name}
          role={user && user.data.role}
          
        />

        <Layout
          className={`${
            state.collapsed ? "ml-20" : "ml-64"
          }  bg-base-100 transition-all duration-300 ease-in-out flex-grow`}
        >
          {/* header componnet  */}
          <HeaderComponent
            state={state}
            image={user && user.data.image}
            toggleSidebar={toggleSidebar}
            newDonorCount={countNotification}
            notifications={notifications}
            role="admin"
          />

          {/* content section  */}
          <Content className="p-4 mt-10">
            <div className=" bg-base-100  w-full">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
};

export default AdminDashboard;
