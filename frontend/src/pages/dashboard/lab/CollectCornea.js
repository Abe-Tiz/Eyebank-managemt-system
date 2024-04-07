
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
const CollectCornea = () => {
    const dateOfRecovery = Date.now();
    const [position, setPosition] = useState('');
    const [lotNo, setLotNo] = useState('');
    const [eyeLid, setEyeLid] = useState('');
    const [size, setSize] = useState('');
    const [irisColor, setIrisColor] = useState('');
    const [corneaStatus, setCorneaStatus] = useState('');
    const [clarity, setClarity] = useState('');
    const [lens, setLens] = useState('');
    const [epitheliam, setEpitheliam] = useState('');
    const [stroma, setStroma] = useState('');
    const [endothelium, setEndothelium] = useState('');
    const [approval, setApproval] = useState('');
    const [evaluationComment, setEvaluationComment] = useState('');
    const [suiatablity, setSuiatablity] = useState('');
    const [reason, setReason] = useState('');
    const [evaluater, setEvaluater] = useState('');
    const [collect, setCollect] = useState(true);
    const data = {
        collect,
    }
    //for recovery
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
            id,
            lotNo,
            dateOfRecovery,
            recoveryTechnical,
            position,
            eyeLid,
            size,
            irisColor,
            corneaStatus,
            clarity,
            // expirationDate,
            lens,
            epitheliam,
            stroma,
            endothelium,
            approval,
            evaluater,
            evaluationComment,
            suiatablity,
            reason
        }
        console.log(data);
        handleCollect(id);
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
    const handleCollect = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/collect/${id}`, data);
        } catch (error) {
            console.error("Failed to collect physical exam:", error);
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

    const recoveryTechnical = state.name
    const handlePosition = (event) => {
        setPosition(event.target.value);
    };
    return (
        <div className="mt-0">
            <h2 className="text-xl " style={{ textAlign: 'center', background: "#6af" }}>Welcome to Cornea Recovery Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2">
                    <label>

                        <input
                            type="text"
                            placeholder="Enter Lot No"
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={lotNo}
                            onChange={(e) => setLotNo(e.target.value)}
                        >
                        </input>
                    </label>
                    <label>
                        <input
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            placeholder="Enter eyeLid"
                            value={eyeLid}
                            onChange={(e) => setEyeLid(e.target.value)}
                        />
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}>
                            <option value="">Select Size</option>
                            <option value="3">3 cm</option>
                            <option value="6">6cm</option>
                            <option value="9">9cm</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={irisColor}
                            onChange={(e) => setIrisColor(e.target.value)}>
                            <option value="">Select Color</option>
                            <option value="blue">blue</option>
                            <option value="black">black</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={corneaStatus}
                            onChange={(e) => setCorneaStatus(e.target.value)}>
                            <option value="">Select  Status</option>
                            <option value="Status 1">Status 1</option>
                            <option value="Status 2">Status 2</option>
                            <option value="Status 3">Status 3</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={clarity}
                            onChange={(e) => setClarity(e.target.value)}
                        >
                            <option value="">Select Clarity</option>
                            <option value="clear 1">Clarity 1</option>
                            <option value="clear 2">Clarity 2</option>
                            <option value="clear 3">Clarity 3</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={lens}
                            onChange={(e) => setLens(e.target.value)}
                        >
                            <option value="">Select lens</option>
                            <option value="lens 1">lens 1</option>
                            <option value="lens 2">lens 2</option>
                            <option value="lens 3">lens 3</option>
                        </select>
                    </label>
                    <label>
                        Position:
                        <label className="mt-4">
                            <input
                                type="radio"
                                value="left"
                                className="ml-4"
                                checked={position === 'left'}
                                onChange={handlePosition}
                            />
                            Left
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="right"
                                className="ml-2"
                                checked={position === 'right'}
                                onChange={handlePosition}
                            />
                            Right
                        </label>
                    </label>
                </div>
                <div className="text-center mt-4">
                    <button
                        // onClick={handleFormSubmit}
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 bg-blue-500 hover:bg-blue-600  text-white font-semibold rounded"
                    >
                        Register Cornea
                    </button>
                </div>
            </form >
        </div >
    );
};

export default CollectCornea;