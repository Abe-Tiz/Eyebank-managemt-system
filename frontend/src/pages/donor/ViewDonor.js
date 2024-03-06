import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FaEdit, FaPrint } from "react-icons/fa";

const ViewDonor = () => {
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    age: "",
    sex: "",
    city: "",
    subcity: "",
    kebele: "",
    HNumber: "",
    mobile: "",
    id:'',
  });
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.data) {
      const newDonorData = location.state.data;

      setDonorData({
        name: newDonorData.name,
        email: newDonorData.email,
        city: newDonorData.city,
        age: newDonorData.age,
        sex: newDonorData.sex,
        subcity: newDonorData.subcity,
        kebele: newDonorData.kebele,
        HNumber: newDonorData.HNumber,
        mobile: newDonorData.mobile,
        id: newDonorData._id,
      });
    }
  }, [location.state]);

  // Size of the circles
  const circleSize = 32;

  
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-md overflow-hidden shadow-md p-6 mx-auto w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
         Profile
        </h2>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-8">
          <div className="md:w-1/2">
            <p className="text-xl font-bold text-gray-800 mb-2">
              {t("register:LabelsignUpName")}: <span>{donorData.name} </span>
            </p>
            <p className="text-xl font-bold text-gray-800 mb-2">
              {t("login:labelLoginEmail")}:{" "}
              <span className="text-gray-700 mb-2">{donorData.email} </span>
            </p>
          </div>

          <div className="md:w-1/2">
            <p className="text-xl font-bold text-gray-800 mb-2">
              {t("donor:donorKebele")}:{" "}
              <span className="text-gray-700 mb-2">{donorData.kebele} </span>
            </p>
            <p className="text-xl font-bold text-gray-800 mb-2">
              {t("donor:donorHno")}:{" "}
              <span className="text-gray-700 mb-2">{donorData.HNumber} </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-6 ">


          {/* update btn */}
          <Link
            className="like-button bg-blue-500 text-white cursor-pointer px-6 py-3 rounded focus:outline-none border border-gray-300 hover:bg-blue-600 shadow-md z-30"
            to={`/update/${donorData.id}`}
          >
            <FaEdit className="mr-2" />
            {t("common:updateButtonLabel")}
          </Link>

          {/* print button */}
          {
            donorData.verified && (
            <Link
              className="like-button bg-orange-500 text-white cursor-pointer px-6 py-3 rounded focus:outline-none border border-gray-300 hover:bg-green-600 shadow-md z-30"
              to={`/print/${donorData.id}`}
            >
              <FaPrint className="mr-2" />
              {t("common:printButtonLabel")}
            </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ViewDonor;
