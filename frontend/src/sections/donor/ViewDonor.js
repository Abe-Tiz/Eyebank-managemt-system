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
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className={`absolute top-8 left-64 w-52 h-52 bg-yellow-400 rounded-full opacity-60`}></div>
      <div className={`absolute bottom-10 right-64 w-52 h-52 bg-orange-500 rounded-full opacity-60`} ></div>

      <div className="bg-gray-300 rounded-md overflow-hidden shadow-md p-6 mx-auto w-96 relative">
        <div className={`absolute top-10 left-10 w-64 h-64 bg-indigo-400 rounded-full opacity-30`}  ></div>
        <div className={`absolute -top-10 -right-10 w-${circleSize} h-${circleSize} bg-purple-600 rounded-full opacity-30`} ></div>
        <div className={`absolute -bottom-10 -left-10 w-${circleSize} h-${circleSize} bg-pink-400 rounded-full opacity-30`}></div>
        <div className={`absolute -bottom-10 -right-10 w-${circleSize} h-${circleSize} bg-blue-400 rounded-full opacity-30`}></div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">{donorData.name} </h1>
        <p className="text-gray-700 mb-2">Email: {donorData.email}</p>
        <p className="text-gray-700 mb-2">City: {donorData.city}</p>
        <p className="text-gray-700 mb-2">Age: {donorData.age}</p>
        <p className="text-gray-700 mb-2">Sex: {donorData.sex}</p>
        <p className="text-gray-700 mb-2">Subcity: {donorData.subcity}</p>
        <p className="text-gray-700 mb-2">Kebele: {donorData.kebele}</p>
        <p className="text-gray-700 mb-2">House Number: {donorData.HNumber}</p>
        <p className="text-gray-700 mb-2">Mobile: {donorData.mobile}</p>
       
        <div className="flex justify-between mt-6 ">
          <Link
            className="like-button bg-transparent text-black cursor-pointer px-6 py-3 rounded focus:outline-none border border-gray-300 hover:bg-blue-600 shadow-md z-30"
            to={`/update/${donorData.id}`}
          >
            <FaEdit className="mr-2" />
            Edit
          </Link>
          <Link
            className="like-button bg-transparent text-black cursor-pointer px-6 py-3 rounded focus:outline-none border border-gray-300 hover:bg-green-600 shadow-md z-30"
            to={`/print/${donorData.id}`}
          >
            <FaPrint className="mr-2" />
            Print
          </Link>
        </div>
    
      </div>
    </div>
    // </div>
  );
};

export default ViewDonor;
