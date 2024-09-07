import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

const EditAccident = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [hospitals, setHospitals] = useState([])
    const [surgeons, setSurgeons] = useState([])
    const [recipients, setRecipients] = useState([])

    const [accidentData, setAccidentData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [accident, setAccident] = useState({
        category: "",
        errorType: "",
        hospitalName: '',
        surgeonName: '',
        recipientName: '',
    });

    useEffect(() => {
        const fetchAccidenteData = async () => {
            try {
                const response = await axios.get(`https://eyebank-backend-2.onrender.com/accident/getOne/${id}`);
                setAccidentData(response.data);
                setIsLoading(false);
            } catch (error) {
                handleFetchError();
            }
        };
        fetchAccidenteData();
    }, [id]);

    const handleFetchError = () => {
        toast({
            title: t('Error'),
            description: t('Failed to fetch cornea data.'),
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchSurgeon = async () => {
            try {
                const response = await axios.get("https://eyebank-backend-2.onrender.com/user");
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
                const response = await axios.get("https://eyebank-backend-2.onrender.com/hospital/read");
                setHospitals(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHospitalData();
    }, []);
    useEffect(() => {
        const fetchRecipientData = async () => {
            try {
                const response = await axios.get("https://eyebank-backend-2.onrender.com/recipient/read");
                setRecipients(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipientData();
    }, []);


    const handleSave = async () => {
        try {
            await axios.put(`https://eyebank-backend-2.onrender.com/accident/update/${id}`, {
                category: accident.category || accidentData.category,
                errorType: accident.errorType || accidentData.errorType,
                hospitalName: accident.hospitalName || accidentData.hospitalName,
                surgeonName: accident.surgeonName || accidentData.surgeonName,
                recipientName: accident.recipientName || accidentData.recipientName,

            });
            toast({
                title: t('Success'),
                description: t('Accident updated successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/surgondashboard/viewaccident');
        } catch (error) {
            handleSaveError();
        }
    };

    const handleSaveError = () => {
        toast({
            title: t('Error'),
            description: t('Failed to update accident data.'),
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold  mb-4" style={{ textAlign: 'center' }}>{t('Edit Accident')}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">

                    <label>
                        Catagory
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={accident.category || accidentData.category}
                            onChange={(e) => setAccident({ ...accident, category: e.target.value })}
                        />
                    </label>
                    <label>
                        Error Type
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={accident.errorType || accidentData.errorType}
                            onChange={(e) => setAccident({ ...accident, errorType: e.target.value })}
                        />
                    </label>

                    <label>
                        Hospital Name:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={accident.hospitalName || accidentData.hospitalName}
                            onChange={(e) => setAccident({ ...accident, hospitalName: e.target.value })}
                        >
                            <option value={accidentData.hospitalName}>{accidentData.hospitalName}</option>
                            {hospitals.map((hospital, index) => (
                                <option key={index} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Surgeon Name:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={accident.surgeonName || accidentData.surgeonName}
                            onChange={(e) => setAccident({ ...accident, surgeonName: e.target.value })}
                        >
                            <option value={accidentData.surgeonName}>{accidentData.surgeonName}</option>
                            {surgeons.map((surgeon, index) => (
                                <option key={index} value={surgeon._id}>
                                    {surgeon.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Recipient Name:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={accident.recipientName || accidentData.recipientName}
                            onChange={(e) => setAccident({ ...accident, recipientName: e.target.value })}
                        >
                            <option value={accidentData.recipientName}>{accidentData.recipientName}</option>
                            {recipients.map((recipient, index) => (
                                <option key={index} value={recipient._id}>
                                    {recipient.name}
                                </option>
                            ))}
                        </select>
                    </label>

                </div>

                <div className='text-center '>
                    <button className="w-1/4 bg-sky-600 hover:bg-blue-700 text-white  font-bold py-2 px-4 mt-5 rounded">
                        Update
                    </button>
                </div>
            </form >
        </div >
    );
}

export default EditAccident