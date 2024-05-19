import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import MedicalSidebar from "../pages/dashboard/medicalDirector/MedicalSidebar";
import socketIOClient from "socket.io-client";
import HeaderComponent from "../pages/dashboard/admins/HeaderComponent";
import useLoggedInUser from "../useHooks/useLoggedInUser";



const { Content } = Layout;

const MedicalDirectorDashboard = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        image: "",
        isDropdownOpen: false,
        isLoggedin: false,
        collapsed: false,
        role: "",
    });

    const { user, setUser, getLoggedInUser } = useLoggedInUser("lab");

    const [reportData, setReportData] = useState({
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

    //! handle Logout
    // const handleLogout = () => {
    //     localStorage.removeItem("lab");
    //     navigate("/login");
    // };

    return (
        <Layout className=" bg-base-200 min-h-screen w-full grid  md:grid-cols-1 ">
            {/* side bar section */}
            <MedicalSidebar
                collapsed={state.collapsed}
                toggleSidebar={toggleSidebar}
                name={user && user.data.name}
                role={user && user.data.role}
            />

            <Layout
                className={`${state.collapsed ? "ml-20" : "ml-64"
                    }  bg-base-200 transition-all duration-300 ease-in-out flex-grow`}
            >
                {/* header componnet  */}
                <HeaderComponent
                    state={state}
                    image={user && user.data.image}
                    toggleSidebar={toggleSidebar}
                    newDonorCount={newDonorCount}
                    role="medicalDirector"
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

export default MedicalDirectorDashboard;
