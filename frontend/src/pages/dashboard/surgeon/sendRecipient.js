import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";

const sendRecipient = () => {
    const [recipinentname, setRecipientname] = useState("");
    const [age, setAge] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [surgeons, setSurgeons] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [surgeryType, setSurgeryType] = useState("");
    const [address, setAddress] = useState("");
    const [surgeonName, setSurgeonName] = useState("");
    const [hospital, setHospital] = useState("");

    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchSurgeon = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user");
                setSurgeons(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSurgeon();
    }, []);

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/hospital/read");
                setHospitals(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHospitalData();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            recipinentname,
            age,
            diagnosis,
            surgeonName,
            address,
            hospital,
            surgeryType,
        };
        console.log(data);
        try {
            const response = await axios.post(
                "http://localhost:4000/recipient/create",
                data
            );
            console.log(response.data);
            toast({
                title: "Data Registered successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate("/surgondashboard/viewrecipient");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2
                className=""
                style={{ textAlign: "center", background: "#6af" }}
            >
                Welcome to Cornea Recovery Form
            </h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2">
                    <label>
                        Recipient Name:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={recipinentname}
                            onChange={(e) => setRecipientname(e.target.value)}
                        />
                    </label>
                    <label>
                        Age:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>
                    <label>
                        Surgeon:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={surgeonName}
                            onChange={(e) => setSurgeonName(e.target.value)}
                        >
                            {surgeons.map((surgeon, index) => (
                                <option key={index} value={surgeon._id}>
                                    {surgeon.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Diagnosis:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        />
                    </label>
                    <label>
                        Surgery Type:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={surgeryType}
                            onChange={(e) => setSurgeryType(e.target.value)}
                        >
                            <option value="">Select surgeon type</option>
                            <option value="hospital 1">hospital 1</option>
                            <option value="hospital 2">hospital 2</option>
                            <option value="hospital 3">hospital 3</option>
                        </select>
                    </label>
                    <label>
                        Hospitals:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={hospital}
                            onChange={(e) => setHospital(e.target.value)}
                        >
                            <option value="">Select Hospital</option>
                            {hospitals.map((hospital) => (
                                <option key={hospital._id} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Address:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                            <option value="">Select Address</option>
                            <option value="hospital 1">hospital 1</option>
                            <option value="hospital 2">hospital 2</option>
                            <option value="hospital 3">hospital 3</option>
                        </select>
                    </label>
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                    >
                        Register Cornea
                    </button>
                </div>
            </form>
        </div>
    );
};

export default sendRecipient;