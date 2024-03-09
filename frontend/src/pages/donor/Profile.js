import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaPrint } from "react-icons/fa";

const Profile = () => {
  const [state, setState] = useState({
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
    isVolunter:false
  });
    
  const { t } = useTranslation();
    const location = useLocation();
      const navigate = useNavigate();

  useEffect(() => {
    const getLoggedInDonor = async () => {
      fetch("http://127.0.0.1:4000/donor/donorLogedin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          code: localStorage.getItem("code"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data, "user logged in");
          setState((prev) => ({
            ...prev,
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
          }));

          if (data.data === "token expired") {
            localStorage.clear();
            // navigate("/login");
          }
        });
    };

    getLoggedInDonor();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%   min-h-screen flex items-center justify-center flex-col mt-0">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-0">
        Your Profile{" "}
      </h2>
      <div className="flex  md:flex-row flex-col justify-between gap-8  overflow-hidden   p-6 mx-auto w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
        {/* left  */}
        <div className="">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              <img
                src={
                  state.sex === "female"
                    ? `https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`
                    : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <div className="badge badge-secondary badge-outline">
              {t("register:LabelsignUpName")}: {state.name}
            </div>
            {state.isVolunter ? (
              <div className="badge badge-secondary">Am Volunter</div>
            ) : (
              <div className="badge badge-accent">Not Volunter</div>
            )}
          </div>
        </div>

        {/* right */}

        <div className="">
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-8">
            <div className="md:w-1/2">
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("login:labelLoginEmail")}:{" "}
                <span className="text-gray-700 mb-2"> {state.email}</span>
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("donor:AgeDonor")}:{" "}
                <span className="text-gray-700 mb-2"> {state.age}</span>
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("donor:donorMobile")}:{" "}
                <span className="text-gray-700 mb-2"> {state.mobile}</span>
              </p>
            </div>

            <div className="md:w-1/2">
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("donor:donorKebele")}:{" "}
                <span className="text-gray-700 mb-2"> {state.kebele} </span>
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("donor:donorCity")}:{" "}
                <span className="text-gray-700 mb-2">{state.city} </span>
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("donor:donorSubCity")}:{" "}
                <span className="text-gray-700 mb-2">{state.subcity} </span>
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2">
                {t("donor:donorHno")}:{" "}
                <span className="text-gray-700 mb-2">{state.HNumber} </span>
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-6 ">
            {/* update btn */}
            <Link
              className="like-button bg-blue-500 text-white cursor-pointer px-3 py-3 rounded focus:outline-none border border-gray-300 hover:bg-blue-600 shadow-md  "
              to={`/update/${state.id}`}
            >
              <FaEdit className="mr-2" />
              {t("common:updateButtonLabel")}
            </Link>

            {/* print button */}
            <Link
              className="like-button bg-orange-500 text-white cursor-pointer px-3 py-3 rounded focus:outline-none border border-gray-300 hover:bg-green-600 shadow-md  "
              to={`/print/${state.id}`}
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
