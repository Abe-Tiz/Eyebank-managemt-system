import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./sections/auth/Login";
import Signup from "./sections/auth/Signup";
import Home from "./sections/auth/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { languages } from "./Languages";
import About from "./sections/about/About";
import AdminDashboard from "./components/AdminDashboard";
import LabTechnicalDashboard from "./components/LabTechnicalDashboard";
import LabDashboard from "./components/LabDashboard";
import Contact from "./sections/contact/contact";
import EyeCareAwareness from "./sections/awareness/getAwareness";
import CreateDonor from "./sections/donor/CreateDonor";
import DisplayDonor from "./sections/donor/DisplayDonor";
import PrintCard from "./sections/donor/PrintCard";
import EditDonor from "./sections/donor/EditDonor";
import ForgotPassword from "./sections/auth/ForgotPassword";
import ResetPassword from "./sections/auth/ResetPassword";
import Navbar from "./sections/header/Header";
import Footer from "./sections/footer/footer";
import CreateAwareness from "./sections/awareness/createAwareness";
import CreateVideo from "./sections/awareness/createVideo";
import DonorLog from "./sections/donor/DonorLog";
import ViewDonor from './sections/donor/ViewDonor';
import Edit from "./sections/donor/Edit";
import ViewUsers from './sections/auth/ViewUsers';
// lab technical 
import CollectCornea from "./components/labTechnical/CollectCornea";



function App() {
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const [isLoggedin, setIsLoggedin] = useState(false);

    const { t } = useTranslation();
    useEffect(() => {
        document.title = t("app_title");
        setIsLoggedin(localStorage.getItem("loggedIn") === "true");
    }, [currentLanguage, t]);

    return (
        <>
            {/* Conditionally render Navbar and Footer */}
            {!isLoggedin ? <Navbar /> : ""}

            <Routes>
                {/*  */}
                <Route path="/" element={isLoggedin ? <AdminDashboard /> : <Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/labtechnicaldashboard" element={<LabTechnicalDashboard />} />
                <Route path="/labdashboard" element={<LabDashboard />} />
                < Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/awareness" element={<EyeCareAwareness />} />
                <Route path="/createAwareness" element={<CreateAwareness />} />
                <Route path="/createVideo" element={<CreateVideo />} />
                <Route path="/registerDonor" element={<CreateDonor />} />
                <Route path="/displayDonor" element={<DisplayDonor />} />
                <Route path="/print/:id" element={<PrintCard />} />
                <Route path="/update/:id" element={<EditDonor />} />
                <Route path="/updateOne/:id" element={<Edit />} />
                <Route path="/donorlog" element={<DonorLog />} />
                <Route path="/viewdonor" element={<ViewDonor />} />
                <Route path="/userList" element={<ViewUsers />} />
                <Route path="/collectCornea" element={<CollectCornea />} />

            </Routes >

            {/* Conditionally render Navbar and Footer */}
            {!isLoggedin && <Footer />}
        </>
    );
}

export default App;
