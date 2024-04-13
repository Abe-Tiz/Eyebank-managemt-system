
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
const SerologyTest = () => {
    const dateOfRecovery = Date.now();
    const [bloodType, setBloodType] = useState('');
    const [donorID, setDonorID] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    const [testingStatus, setTestingStatus] = useState('');
    const [testingResult, setTestingResult] = useState('');
    const { id } = useParams();
    const [state, setState] = useState({
        name: ""
    })
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            bloodType,
            donorID,
            referenceNo,
            testingStatus,
            testingResult,
            testTechnical
        }
        console.log(data);
        try {
            const response = await axios.post('http://localhost:4000/cornea/create',
                data
            );
            console.log(response.data);
            toast({
                title: "Data Registerd successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate('/labtechnicaldashboard/viewCornea');
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetch("http://127.0.0.1:4000/user/userLogedin", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data, "user logged in");
                setState((prev) => ({
                    ...prev,
                    name: data.data.name,
                }));

                if (data.data === "token expired") {
                    localStorage.clear();
                    navigate("/login");
                }
            });
    }, [navigate]);
    const testTechnical = state.name;
    return (
        <div className="mt-[-2]">
            <h2 className="text-3xl " style={{ textAlign: 'center' }}>Welcome to Serology Test Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid ml-12 mt-4">
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}>
                            <option value="">Select Blood type</option>
                            <option value="3">3 cm</option>
                            <option value="6">6cm</option>
                            <option value="9">9cm</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={testingStatus}
                            onChange={(e) => setTestingStatus(e.target.value)}>
                            <option value="">Select testing result</option>
                            <option value="3">3 cm</option>
                            <option value="6">6cm</option>
                            <option value="9">9cm</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={testingResult}
                            onChange={(e) => setTestingResult(e.target.value)}>
                            <option value="">Select testing result</option>
                            <option value="3">3 cm</option>
                            <option value="6">6cm</option>
                            <option value="9">9cm</option>
                        </select>
                    </label>
                </div>
                <div className="text-center mt-4 ">
                    <button
                        // onClick={handleFormSubmit}
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 mb-3 border bg-sky-600  text-white font-semibold rounded"
                    >
                        Register Serology
                    </button>
                </div>
            </form >
        </div >
    );
};
export default SerologyTest;