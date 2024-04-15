
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
const DistributeCornea = () => {
    const { id } = useParams();

    //const [dateOfRecovery, setDateOfRecovery] = useState('');
    // const [LotNo, setLotNo] = useState({ id });
    const [hospitalName, setHospitalName] = useState('');
    const [nameOfSurgeon, setNameOfSurgeon] = useState('');
    const [modeOfTransportation, setModeOfTransportation] = useState('');
    const [typeOfTissue, setTypeOfTissue] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    //const [nameOfTechnician, setNameOfTechnician] = useState('');
    //for recovery
    const [LotNo, setLot] = useState([])
    const [hospitals, setHospitals] = useState([])
    const [approved, setApprove] = useState([])
    const [labTechinician, setLabTechinician] = useState([])
    const [surgeons, setSurgeons] = useState([])
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();
    const [distributed, setdistribute] = useState(true);
    const distri = {
        distributed,
    };
    const [state, setState] = useState({
        name: ""
    })
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
    const nameOfTechnician = state.name
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            LotNo,
            hospitalName,
            nameOfSurgeon,
            approvedBy,
            modeOfTransportation,
            typeOfTissue,
            nameOfTechnician
        }
        console.log(data);
        handleDistribution(id);
        try {
            const response = await axios.post('http://localhost:4000/distribution/create', data);
            console.log(response.data);
            toast({
                title: "Data Registerd successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate('/labtechnicaldashboard/viewdistributed');
        }
        catch (err) {
            console.log(err);
        }
    };
    const handleDistribution = async (id) => {
        try {
            await axios.put(`http://localhost:4000/cornea/distribute/${id}`, distri);
            //navigate(`/labtechnicaldashboard/distributeCornea/${id}`);
        } catch (error) {
            console.error("Failed to collect physical exam:", error);
        }
    }
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
    useEffect(() => {
        const fetchLot = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/cornea/getOne/${id}`);
                const lotlist = response.data;
                setLot(lotlist.lotNo);
                setApprovedBy(lotlist.evaluation.evaluater);
                setTypeOfTissue(lotlist.evaluation.suiatablity);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLot();
    }, []);
    useEffect(() => {
        const fetchApproved = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user");
                setApprove(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApproved();
    }, []);
    useEffect(() => {
        const fetchlab = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user");
                setLabTechinician(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchlab();
    }, []);
    return (
        <div>
            <h2 className="text-3xl mb-4 " style={{ textAlign: 'center' }}>Welcome to Cornea Distribution Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid justify-center">
                    <label>
                        <select
                            className="form-input mt-3 block w-full  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}>
                            <option>select hospital Name</option>
                            {hospitals.map((hospital, index) => (
                                <option key={index} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={nameOfSurgeon}
                            onChange={(e) => setNameOfSurgeon(e.target.value)}>
                            <option>select Surgeon Name</option>
                            {surgeons.map((surgeon, index) => (
                                <option key={index} value={surgeon._id}>
                                    {surgeon.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <select
                            className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={modeOfTransportation}
                            onChange={(e) => setModeOfTransportation(e.target.value)}>
                            <option value="" disabled> Mode Of Transportation</option>
                            <option value="Amblunce">Amblunce</option>
                            <option value="Plane">Plane</option>
                        </select>
                    </label>
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 bg-sky-600 hover:bg-blue-600  text-white font-semibold rounded"
                    >
                        Distribute Cornea
                    </button>
                    {/* <Td className='text-center ml-3 text-blue-600'>
                        <Button colorScheme='blue' onClick={() => handleCollect(cornea._id)}>Distribute</Button>
                    </Td> */}
                </div>
            </form >
        </div >
    );
};

export default DistributeCornea;