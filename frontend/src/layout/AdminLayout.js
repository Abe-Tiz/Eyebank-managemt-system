import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CustomSidebar from "./../components/CustomeSider";

import socketIOClient from "socket.io-client";
import HeaderComponent from "../pages/dashboard/admins/HeaderComponent";

const ENDPOINT = "http://localhost:4000"; // Your server endpoint
const socket = socketIOClient(ENDPOINT);

const { Content } = Layout;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [countNotification, setCountNotification] = useState(0);

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

    // console.log("notification:", notifications, countNotification);

    // get notification when new donor registers
    const newDOnorRetrive = () => {
        socket.on("newDonorNotification", (data) => {
            console.log("data : ", data.count);
            setNewDonorCount(data.count);
        });

        return () => {
            socket.off("newDonorNotification");
        };
    };

    useEffect(() => {
        numberDonor();
        getLoggedInUser();
        newDOnorRetrive();
        notification();
    }, [setReportData, navigate, newDonorCount]);

    const toggleSidebar = () => {
        setState((prev) => ({ ...prev, collapsed: !prev.collapsed }));
    };



    return (
      <Layout className=" bg-base-200 min-h-screen w-full grid  md:grid-cols-1 ">
        {/* side bar section */}
        <CustomSidebar
          collapsed={state.collapsed}
          toggleSidebar={toggleSidebar}
          name={state.name}
          image={state.image}
          role={state.role}
        />

        <Layout
          className={`${
            state.collapsed ? "ml-20" : "ml-64"
          }  bg-base-200 transition-all duration-300 ease-in-out flex-grow`}
        >
          {/* header componnet  */}
          <HeaderComponent
            state={state}
            toggleSidebar={toggleSidebar}
            newDonorCount={countNotification}
            notifications={notifications}
          />

          {/* content section  */}
          <Content className="p-4 mt-10">
            <div className=" bg-base-200  w-full">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
};

export default AdminDashboard;
