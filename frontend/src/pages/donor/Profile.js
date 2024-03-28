import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaPrint } from "react-icons/fa";
import ProfileDetail from "./ProfileDetail";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    isLoggedin: false,
    email: "",
    id: "",
    sex: "",
    HNumber: "",
    age: "",
    city: "",
    subcity: "",
    kebele: "",
    mobile: "",
    isVolunter: false,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedInDonor = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:4000/donor/donorLogedin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              code: localStorage.getItem("code"),
            }),
          }
        );
        const data = await response.json();

        if (data.data === "token expired") {
          localStorage.clear();
          navigate("/donor-login");
          return;
        }
        setProfileData({
          name: data.data.name,
          isLoggedin: true,
          email: data.data.email,
          id: data.data._id,
          sex: data.data.sex,
          HNumber: data.data.HNumber,
          age: data.data.age,
          city: data.data.city,
          subcity: data.data.subcity,
          kebele: data.data.kebele,
          mobile: data.data.mobile,
          isVolunter: data.data.isVolunter,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getLoggedInDonor();
  }, [navigate]);

  return (
    <div className="container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-gray-800 mt-3">Your Profile</h2>
      <div className="flex bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% md:flex-row flex-col justify-between gap-10 overflow-hidden mx-auto container m-5 p-5 rounded-lg shadow-md">
        {/* Left Section */}
        <div className="bg-yellow-400 shadow-lg p-5 w-1/4 flex flex-col items-center justify-center gap-3">
          <div className="avatar w-32 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                profileData.sex === "female"
                  ? "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              }
              alt="User Avatar"
            />
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <div
              className={`badge ${
                profileData.isVolunter ? "badge-secondary" : "badge-accent"
              }`}
            >
              {t("register:LabelsignUpName")}: {profileData.name}
            </div>
            <div
              className={`badge ${
                profileData.isVolunter ? "badge-secondary" : "badge-accent"
              }`}
            >
              {profileData.isVolunter ? "Am Volunter" : "Not Volunter"}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-3/4 p-5 border-l-4">
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-8">
           
            <div className="md:w-1/2">
              <ProfileDetail
                label={t("login:labelLoginEmail")}
                value={profileData.email}
              />
              <ProfileDetail
                label={t("donor:AgeDonor")}
                value={profileData.age}
              />
              <ProfileDetail
                label={t("donor:donorMobile")}
                value={profileData.mobile}
              />
            </div>

            <div className="md:w-1/2">
              <ProfileDetail
                label={t("donor:donorKebele")}
                value={profileData.kebele}
              />
              <ProfileDetail
                label={t("donor:donorCity")}
                value={profileData.city}
              />
              <ProfileDetail
                label={t("donor:donorSubCity")}
                value={profileData.subcity}
              />
              <ProfileDetail
                label={t("donor:donorHno")}
                value={profileData.HNumber}
              />
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-center gap-16 mt-6">

            {/* Update Button */}
            <Link
              className="w-32 like-button bg-blue-500 text-white flex justify-center items-center text-center cursor-pointer px-3 py-3 rounded focus:outline-none border border-gray-300 hover:bg-blue-600 shadow-md"
              to={`/update/${profileData.id}`}
            >
              <FaEdit className="mr-2" />
              {t("common:updateButtonLabel")}
            </Link>

            {/* Print Button */}
            <Link
              className="w-32 like-button bg-orange-500 text-white flex justify-center items-center text-center cursor-pointer px-3 py-3 rounded focus:outline-none border border-gray-300 hover:bg-green-600 shadow-md"
              to={`/print/${profileData.id}`}
            >
              <FaPrint className="mr-2" />
              {t("common:printButtonLabel")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
