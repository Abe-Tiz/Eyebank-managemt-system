
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import useLoggedInUser from "../../../useHooks/useLoggedInUser";

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
    const [collect, seCollect] = useState(true);

    const { user, setUser, getLoggedInUser } = useLoggedInUser("lab");
    const collectd = {
        collect,
    };

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
            await axios.put(`http://localhost:4000/api/collect/${id}`, collectd);
            //navigate(`/labtechnicaldashboard/distributeCornea/${id}`);
        } catch (error) {
            console.error("Failed to collect physical exam:", error);
        }
    }
   
    const recoveryTechnical = user && user.data.name
    const handlePosition = (event) => {
        setPosition(event.target.value);
    };
    return (
        <div className="mt-[-2]">
            <h2 className="text-3xl " style={{ textAlign: 'center' }}>Welcome to Cornea Recovery Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid mt-4 grid-cols-2">
                    <label>
                        <input
                            type="text"
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={lotNo}
                            placeholder="Lot No"
                            onChange={(e) => setLotNo(e.target.value)}
                        >
                        </input>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={eyeLid}
                            placeholder="eyeLid"
                            onChange={(e) => setEyeLid(e.target.value)}
                        >
                            <option value="">Select Eye Lid</option>
                            <option value="normal">Normal</option>
                            <option value="edematous">Edematous</option>
                            <option value="laceration">Laceration</option>
                            <option value="contusion">Contusion</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value);
                            }} >
                            <option value="">Select Size</option>
                            <option value="1">1 mm</option>
                            <option value="2">2 mm</option>
                            <option value="3 mm">3 mm</option>
                            <option value="4 mm">4 mm</option>
                            <option value="5 mm">5 mm</option>
                            <option value="6 mm">6 mm</option>
                            <option value="7 mm">7 mm</option>
                            <option value="8 mm">8 mm</option>
                            <option value="9 mm">9 mm</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={irisColor}
                            onChange={(e) => setIrisColor(e.target.value)}>
                            <option value="">Select Color</option>
                            <option value="Blue">Blue</option>
                            <option value="Brown">Brown</option>
                            <option value="Green">Green</option>
                            <option value="Hazel">Hazel</option>
                            <option value="Gray">Gray</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={corneaStatus}
                            onChange={(e) => setCorneaStatus(e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="Arcus">Arcus</option>
                            <option value="Defects">Defects</option>
                            <option value="Exposure">Exposure</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={clarity}
                            onChange={(e) => setClarity(e.target.value)}
                        >
                            <option value="">Select Clarity</option>
                            <option value="Clear">Clear</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Opaque">Opaque</option>
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={lens}
                            onChange={(e) => setLens(e.target.value)}
                        >
                            <option value="">Select lens</option>
                            <option value="Phakic">Phakic</option>
                            <option value="Pseudophakic">Pseudophakic</option>
                            <option value="Aphakic">Aphakic</option>
                        </select>
                    </label>
                    <label>
                        Position:
                        <label className="mt-4">
                            <input
                                type="radio"
                                value="left"
                                className="m-2"
                                checked={position === 'left'}
                                onChange={handlePosition}
                            />
                            Left
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="right"
                                className="m-2"
                                checked={position === 'right'}
                                onChange={handlePosition}
                            />
                            Right
                        </label>
                    </label>
                </div>
                <div className="text-center mt-4 mb-2">
                    <button
                        // onClick={handleFormSubmit}
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 border bg-sky-600  text-white font-semibold rounded"
                    >
                        Register Cornea
                    </button>
                </div>
            </form >
        </div >
    );
};
export default CollectCornea;