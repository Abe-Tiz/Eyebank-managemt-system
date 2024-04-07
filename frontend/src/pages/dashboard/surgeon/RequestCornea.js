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
  const [surgeons, setSurgeons] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [surgeon, setSurgeon] = useState("");
  const [hospital, setHospital] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [descriptionOfRequest, setDescriptionOfRequest] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSurgeons = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/user");
        setSurgeons(data);
      } catch (error) {
        console.error("Error fetching surgeons:", error);
      }
    };

    fetchSurgeons();
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/hospital/read");
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const handleSurgeonChange = (value) => {
    setSurgeon(value);
  };

  const handleHospitalChange = (value) => {
    setHospital(value);
  };

  const handleDescriptionOfRequestChange = (value) => {
    setDescriptionOfRequest(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestCorneaData = {
        surgeon,
        hospital,
        descriptionOfRequest,
        isApproved: false,
      };

      const { data } = await axios.post(
        "http://localhost:4000/requestCornea/send",
        requestCorneaData
      );
      navigate("/labtechnicaldashboard/viewRequestCornea");
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
          <h3 className="title text-3xl font-bold text-center mb-8 text-blue-600">
            Send Request
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9">
            <div className="flex justify-center items-center space-x-8">
              <div className="flex flex-col w-2/5">
                <Select
                  className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 italic dark:placeholder-gray-400 text-base"
                  value={surgeon}
                  onChange={handleSurgeonChange}
                  placeholder="Select Surgeon"
                >
                  <Option value="" disabled>
                    Select Surgeon
                  </Option>
                  {surgeons.map((surgeon) => (
                    <Option key={surgeon._id} value={surgeon._id}>
                      <span className="text-blue-600 font-semibold">
                        {surgeon.name}
                      </span>
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col w-2/4">
                <Select
                  className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 italic dark:placeholder-gray-400 text-base"
                  value={hospital}
                  onChange={handleHospitalChange}
                  placeholder="Select Hospital"
                >
                  <Option value="" disabled>
                    Select Hospital
                  </Option>
                  {hospitals.map((hospital) => (
                    <Option
                      key={hospital._id}
                      value={hospital._id}
                      className="py-2 px-4 hover:bg-blue-100"
                    >
                      <span className="text-blue-600 font-semibold">
                        {hospital.hospitalName}
                      </span>
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
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
