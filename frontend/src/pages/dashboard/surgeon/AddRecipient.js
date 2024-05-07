import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
const AddRecipient = () => {
    const [recipientname, setRecipientname] = useState("");
    const [age, setAge] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [sex, setSex] = useState("");
    const [surgeons, setSurgeons] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [registerDate, setRegisterDate] = useState("");
    const [address, setAddress] = useState("");
    const [hospital, setHospital] = useState("");
    const [surgeryType, setSurgeryType] = useState("");
    const [phone, setPhone] = useState("");
    //for ocurar and adverse reaction 
    const [dateOfSurgry, setDateOfSurgry] = useState("");
    const [ocularOperativeEye, setOcularOperativeEye] = useState("");
    const [ocularNonOperativeEye, setOcularNonOperativeEye] = useState("");
    const [dateOfadverse, setDateOfadverse] = useState("");
    const [adverseReaction, setAdvererReaction] = useState("");
    const [lotNo, setLotNo] = useState("");
    //for probablity
    const [probablityCase, setProbablityCase] = useState("");
    const [donorTissue, setDonorTissue] = useState("");
    const [patient, setPatient] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();
    const [state, setState] = useState({
        name: ""
    })
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
            recipientname,
            age,
            diagnosis,
            surgeryType,
            address,
            hospital,
            sex,
            phone,
            registerDate,
            surgeonName,
            dateOfSurgry,
            lotNo,
            ocularOperativeEye,
            ocularNonOperativeEye,
            dateOfadverse,
            adverseReaction,
            probablityCase,
            donorTissue,
            patient,

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
    const surgeonName = state.name
    return (
        <div>
            <h2 className="text-3xl mb-3 " style={{ textAlign: 'center' }}>Recipient Registration Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2">
                    <label>
                        <input
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={recipientname}
                            placeholder="Recipient Name"
                            onChange={(e) => setRecipientname(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="number"
                            value={age}
                            placeholder="Age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>
                </div>
                <div className="grid mt-3 grid-cols-2">
                    <label>
                        Sex:
                        <input
                            type="radio"
                            id="sex-male"
                            value="Male"
                            className="ml-2"
                            checked={sex === "Male"}
                            onChange={(e) => setSex(e.target.value)}
                        />
                        <label htmlFor="sex-male">Male</label>
                        <input
                            type="radio"
                            id="sex-female"
                            value="Female"
                            className="ml-2"
                            checked={sex === "Female"}
                            onChange={(e) => setSex(e.target.value)}
                        />
                        <label htmlFor="sex-female">Female</label>
                    </label>
                    <label>
                        <input
                            className="form-input  block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="number"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                </div>
                <div className="grid mt-3 grid-cols-2">
                    <label>
                        <select
                            className="form-input  block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={surgeryType}
                            onChange={(e) => setSurgeryType(e.target.value)}
                        >
                            <option value="">Select Surgeon Type</option>
                            <option value="PK">PK</option>
                            <option value="AK">AK</option>
                            <option value="PKA">PKA</option>
                        </select>
                    </label>
                    <label>
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
                </div>
                <div className="grid mt-3 grid-cols-2">
                    <label>
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                            <option value="">Select Address</option>
                            <option value="Addis Ababa">Addis Ababa</option>
                            <option value="Oromia">Oromia</option>
                            <option value="Amhara">Amhara</option>
                            <option value="Tigray">Tigray</option>
                            <option value="Benshangul">Benshangul</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        className="w-1/3 mr-4 py-2 px-4 border bg-sky-600  text-white font-semibold rounded"
                    >
                        Add Recipient
                    </button>
                </div>
            </form >
        </div >
    );
};
export default AddRecipient;
