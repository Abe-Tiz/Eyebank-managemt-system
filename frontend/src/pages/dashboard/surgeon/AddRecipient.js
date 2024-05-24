import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import useLoggedInUser from "../../../useHooks/useLoggedInUser";
import ButtonComponent from '../../../components/ButtonComponent';

const AddRecipient = () => {
    const [recipientname, setRecipientname] = useState("");
    const [recipientNameWarning, setRecipientNameWarning] = useState("");
    const [age, setAge] = useState("");
    const [ageWarning, setAgeWarning] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [sex, setSex] = useState("");
    const [surgeons, setSurgeons] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [registerDate, setRegisterDate] = useState("");
    const [address, setAddress] = useState("");
    const [hospital, setHospital] = useState("");
    const [surgeryType, setSurgeryType] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneWarning, setPhoneWarning] = useState("");
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
    const { user, setUser, getLoggedInUser } = useLoggedInUser("doctor");

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
            surgeonName: user && user.data._id,
            dateOfSurgry,
            lotNo,
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
    return (
        <div>
            <h2 className="text-3xl mb-3 " style={{ textAlign: 'center' }}>Recipient Registration Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2">
                    <label>
                        <input
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={recipientname}
                            pattern="^[a-zA-Z\u1200-\u137F ]{6,}$"
                            type="text"
                            placeholder="Recipient Name"
                            title="Please enter a name without numbers"
                            onChange={(e) => {
                                if (/\d/.test(e.target.value)) {
                                    setRecipientNameWarning("Please enter a name without numbers");
                                } else {
                                    setRecipientNameWarning("");
                                    setRecipientname(e.target.value);
                                }
                            }}
                        />
                        {recipientNameWarning && (
                            <div className="text-red-500 mt-2">{recipientNameWarning}</div>
                        )}
                    </label>
                    <label>
                        <input
                            className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="number"
                            value={age || ""}
                            placeholder="Age"
                            min="1"
                            max="120"
                            title="Please enter a valid age (1-120)"
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (isNaN(value) || value < 1 || value > 120) {
                                    setAgeWarning("Please enter a valid age (1-120)");
                                } else {
                                    setAgeWarning("");
                                    setAge(value);
                                }
                            }}
                        />
                        {ageWarning && (
                            <div className="text-red-500 mt-2">{ageWarning}</div>
                        )}
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
                            className="form-input block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="tel"
                            placeholder="Phone"
                            value={phone || ""}
                            pattern="^\d{10,13}$"
                            title="Please enter a valid phone number (10 digits)"
                            onInput={(e) => {
                                const inputValue = e.target.value.replace(/\D/g, "");
                                if (inputValue.length > 13) {
                                    setPhoneWarning("Please enter a valid phone number (10-13 digits)");
                                    setPhone(inputValue.slice(0, 13));
                                } else {
                                    setPhoneWarning("");
                                    setPhone(inputValue);
                                }
                            }}
                        />
                        {phoneWarning && (
                            <div className="text-red-500 mt-2">{phoneWarning}</div>
                        )}
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
                    <div className=" text-center mt-4 mb-2">
                        <ButtonComponent label="Submit" title={"Register "} type="submit" />
                    </div>
                </div>
            </form >
        </div >
    );
};
export default AddRecipient;
