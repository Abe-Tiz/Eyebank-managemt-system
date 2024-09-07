import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../../components/ButtonComponent";
const { Option } = Select;

export default function SendRequestCornea() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [hospital, setHospital] = useState("");
  const [descriptionOfRequest, setDescriptionOfRequest] = useState("");
  const [suiatablity, setSuiatablity] = useState("");


  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const { data } = await axios.get("https://eyebank-backend-2.onrender.com/hospital/read");
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const surgeonId = localStorage.getItem('surgeonId');
    try {
      const requestCorneaData = {
        surgeon: surgeonId,
        hospital,
        descriptionOfRequest,
        isApproved: false,
        distribute: false,
        suiatablity,
      };

      const { data } = await axios.post(
        "https://eyebank-backend-2.onrender.com/requestCornea/send",
        requestCorneaData
      );
      navigate("/surgondashboard/viewRequestedCornea");
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-form ml-1 mt-1 w-3/5">
          <h3 className="title text-3xl font-bold text-center mb-4 text-sky-700">
            <span className="border-b-4 border-indigo-500">Send Request</span>
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9">
  

            <label>
              <select
                className="form-input mt-2 block  w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              >
                <option>Select hospital</option>
                {hospitals.map((hospital) => (
                  <option
                    key={hospital._id}
                    value={hospital._id}
                    className="py-2 px-4 hover:bg-blue-100"
                  >
                    <span className="text-blue-600 font-semibold">
                      {hospital.hospitalName}
                    </span>
                  </option>
                ))}
              </select>
            </label>

            <label>
              <select
                className="form-input mt-2 block  w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={suiatablity}
                onChange={(e) => setSuiatablity(e.target.value)}
              >
                <option value="">Select Suiatablity</option>
                <option value="PK">PK</option>
                <option value="EK">EK</option>
                <option value="ALK">ALK</option>
                <option value="KLA">KLA</option>
                <option value="K-Pro">K-Pro</option>
                <option value="Therapeutic">Therapeutic</option>
              </select>
            </label>
      
            <div className="flex flex-col">
              <textarea
                value={descriptionOfRequest}
                placeholder="Enter Cornea Request Description"
                className="form-textarea w-full h-40 shadow-sm border-2 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 italic dark:placeholder-gray-400 text-base"
                onChange={(e) => setDescriptionOfRequest(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <ButtonComponent
                title="Send"
                className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}