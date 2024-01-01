import React, { useEffect } from "react";
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
// import About from './config/sections/about/About';


function App() {
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

    const { t } = useTranslation();
    useEffect(() => {
        document.title = t("app_title");
    }, [currentLanguage, t]);

    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/awareness" element={<EyeCareAwareness />} />
          <Route path="/createAwareness" element={<CreateAwareness/>}/>
          <Route path="/createVideo" element={<CreateVideo/>}/>
          <Route path="/registerDonor" element={<CreateDonor />} />
          <Route path="/displayDonor" element={<DisplayDonor />} />
          <Route path="/print/:id" element={<PrintCard />} />
          <Route path="/update/:id" element={<EditDonor />} />
        </Routes>
        <Footer />
      </>
    );
}

export default App;
