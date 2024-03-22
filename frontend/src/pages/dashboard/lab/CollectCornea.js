
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
const CollectCornea = () => {

    const dateOfRecovery = Date.now();
    const [recoveryTechnical, setRecoveryTechnical] = useState('');
    const [position, setPosition] = useState('');
    const [eyeLid, setEyeLid] = useState('');
    const [size, setSize] = useState('');
    const [irisColor, setIrisColor] = useState('');
    const [corneaStatus, setCorneaStatus] = useState('');
    const [clarity, setClarity] = useState('');
    const [lens, setLens] = useState('');
    //for recovery
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            dateOfRecovery,
            recoveryTechnical,
            position,
            eyeLid,
            size,
            irisColor,
            corneaStatus,
            clarity,
            lens,
        }
        console.log(data);
        try {
            const response = await axios.post('http://localhost:4000/cornea/create', data);
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

    const handlePosition = (event) => {
        setPosition(event.target.value);
    };
    return (
        <div>
            <h2 className="" style={{ textAlign: 'center', background: "#6af" }}>Welcome to Cornea Recovery Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2">

                    <label>
                        Recovery Technical:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={recoveryTechnical}
                            onChange={(e) => setRecoveryTechnical(e.target.value)}
                        >
                            <option value="">Select Technical</option>
                            <option value="Technical 1">Technical 1</option>
                            <option value="Technical 2">Technical 2</option>
                            <option value="Technical 3">Technical 3</option>
                        </select>
                    </label>
                    <label>
                        Position:
                        <br />
                        <label>
                            <input
                                type="radio"
                                value="left"
                                checked={position === 'left'}
                                onChange={handlePosition}
                            />
                            Left
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                value="right"
                                checked={position === 'right'}
                                onChange={handlePosition}
                            />
                            Right
                        </label>
                    </label>
                    <label>
                        eyeLid:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={eyeLid}
                            onChange={(e) => setEyeLid(e.target.value)}
                        />
                    </label>
                    <label>
                        size:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}>
                            <option value="">Select Size</option>
                            <option value="3">3 cm</option>
                            <option value="6">6cm</option>
                            <option value="9">9cm</option>
                        </select>

                    </label>
                    <label>
                        Iris Color:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={irisColor}
                            onChange={(e) => setIrisColor(e.target.value)}>
                            <option value="">Select Color</option>
                            <option value="blue">blue</option>
                            <option value="black">black</option>
                        </select>
                    </label>
                    <label>
                        Cornea Status
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={corneaStatus}
                            onChange={(e) => setCorneaStatus(e.target.value)}>
                            <option value="">Select  Status</option>
                            <option value="Status 1">Status 1</option>
                            <option value="Status 2">Status 2</option>
                            <option value="Status 3">Status 3</option>
                        </select>
                    </label>
                    <label>
                        clarity:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        Lens:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={lens}
                            onChange={(e) => setLens(e.target.value)}
                        >
                            <option value="">Select Cornea Evaluation</option>
                            <option value="lens 1">lens 1</option>
                            <option value="lens 2">lens 2</option>
                            <option value="lens 3">lens 3</option>
                        </select>
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