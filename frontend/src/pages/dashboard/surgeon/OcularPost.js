import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast, Text } from '@chakra-ui/react';


const OcularPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [hospitals, setHospitals] = useState([]);
    //const [surgeonName, setSurgeonName] = useState('');
    const [dateOfSurgery, setDateOfSurgery] = useState('');
    const [surgeryType, setSurgeryType] = useState('');
    const [hospital, setHospital] = useState('');
    const [ocularOperativeEye, setOcularOperativeEye] = useState('');
    const [ocularNonOperativeEye, setOcularNonOperativeEye] = useState('');
    const [Reciepentdata, setReciepentdata] = useState({});
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
    const surgeonName = state.name
    const ocularPost = {
        id,
        dateOfSurgery,
        surgeryType,
        hospital,
        ocularOperativeEye,
        ocularNonOperativeEye,
        surgeonName
    };
    useEffect(() => {
        // Fetch cornea data from the server based on the provided ID
        const fetchRecipientData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/recipient/getOne/${id}`);
                setReciepentdata(response.data);
            } catch (error) {
                // Handle error
                toast({
                    title: t('Error'),
                    description: t('Failed to fetch cornea data.'),
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });

            }
        };
        fetchRecipientData();
    }, [id, t, toast]);
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
    const handleSave = async () => {
        // Example save functionality
        console.log(ocularPost);
        try {
            await axios.put(`http://localhost:4000/recipient/ocular/${id}`, { ocularPost });
            toast({
                title: t('Success'),
                description: t('Ocular post saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/surgondashboard/viewrecipient');
        } catch (error) {
            // Handle error
            toast({
                title: t('Error'),
                description: t('Failed to save ocular post.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    return (
        <div>
            <Text fontSize='3xl' className='text-center bg-teal-500 text-white mt-0'>
                Ocular post form
            </Text>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">

                    <label>
                        surgery Type:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={surgeryType}
                            onChange={(e) => setSurgeryType(e.target.value)}
                        />
                    </label>
                    <label>
                        Hospital Name:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={hospital}
                            onChange={(e) => setHospital(e.target.value)}
                        >
                            <option>select hospital Name</option>
                            {hospitals.map((hospital, index) => (

                                <option key={index} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <label>
                        ocular Operative Eye:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={ocularOperativeEye}
                            onChange={(e) => setOcularOperativeEye(e.target.value)}
                        />
                    </label>
                    <label>
                        ocular Non Operative Eye:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={ocularNonOperativeEye}
                            onChange={(e) => setOcularNonOperativeEye(e.target.value)}
                        />
                    </label>
                </div>
                <button className="bg-teal-500 text-center ml-40 hover:bg-teal-700 focus:outline-none text-white px-4 py-2 mt-2 rounded-md" type="submit">Send</button>
            </form >
        </div >
    );
};

export default OcularPost;