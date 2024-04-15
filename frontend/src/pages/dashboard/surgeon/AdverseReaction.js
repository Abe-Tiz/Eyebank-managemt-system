import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast, Text } from '@chakra-ui/react';

const AdverseReaction = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [hospitals, setHospitals] = useState([]);
    //const [surgeonName, setSurgeonName] = useState('');
    const [dateOfDiagnosis, setDateOfDiagnosis] = useState('');
    const [adverseReaction, setAdverseReaction] = useState('');
    const [probablityCase, setProbablityCase] = useState('');
    const [donorTissue, setDonorTissue] = useState('');
    const [patient, setPatient] = useState('');
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
    const adverse = {
        id,
        surgeonName,
        dateOfDiagnosis,
        adverseReaction,
        probablityCase,
        donorTissue,
        patient
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

    const handleSave = async () => {
        // Example save functionality
        console.log(adverse);
        try {
            await axios.put(`http://localhost:4000/recipient/adverse/${id}`, { adverse });
            toast({
                title: t('Success'),
                description: t('Adverse reation saved successfully.'),
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
                Adverse Reaction form
            </Text>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">
                    <label>
                        Adverse Reaction:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={adverseReaction}
                            onChange={(e) => setAdverseReaction(e.target.value)}
                        />
                    </label>
                    <label>
                        probablity Case:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={probablityCase}
                            onChange={(e) => setProbablityCase(e.target.value)}
                        />
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <label>
                        Donor Tissue:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={donorTissue}
                            onChange={(e) => setDonorTissue(e.target.value)}
                        />
                    </label>
                </div>
                <button className="bg-teal-500 text-center ml-40 hover:bg-teal-700 focus:outline-none text-white px-4 py-2 mt-2 rounded-md" type="submit">Send</button>
            </form >
        </div >
    );
};

export default AdverseReaction;