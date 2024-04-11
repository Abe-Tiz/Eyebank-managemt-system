import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

const EditDistribute = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [hospitals, setHospitals] = useState([])
    const [surgeons, setSurgeons] = useState([])
    // const [modeOfTransportation, setModeOfTransportation] = useState('');
    const [distributeData, setDistributeData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [distribute, setDistribute] = useState({
        hospitalName: '',
        modeOfTransportation: '',
        nameOfSurgeon: '',
    });
    useEffect(() => {
        const fetchDistributeData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/distribution/getOne/${id}`);
                setDistributeData(response.data);
                setIsLoading(false);
            } catch (error) {
                handleFetchError();
            }
        };
        fetchDistributeData();
    }, [id]);
    const [position, setPosition] = useState('');
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
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/distribution/update/${id}`, {
                hospitalName: distribute.hospitalName || distributeData.hospitalName,
                modeOfTransportation: distribute.modeOfTransportation || distributeData.modeOfTransportation,
                nameOfSurgeon: distribute.nameOfSurgeon || distributeData.nameOfSurgeon,
            });
            toast({
                title: t('Success'),
                description: t('Distribution updated successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/labtechnicaldashboard/viewdistributed');
        } catch (error) {
            handleSaveError();
        }
    };

    const handleSaveError = () => {
        toast({
            title: t('Error'),
            description: t('Failed to save cornea data.'),
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    };

    const handlePosition = (event) => {
        setPosition(event.target.value);
    };

    const { modeOfTransportation, nameOfSurgeon, hospitalName } = distribute;

    return (
        <div>
            <h1 className="text-2xl font-bold  mb-4" style={{ textAlign: 'center' }}>{t('Edit Cornea')}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">
                    <label>
                        Surgeon Name:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={nameOfSurgeon || distributeData.nameOfSurgeon}
                            onChange={(e) => setDistribute({ ...distribute, nameOfSurgeon: e.target.value })}
                        >
                            <option value={distributeData.nameOfSurgeon}>{distributeData.nameOfSurgeon}</option>
                            {surgeons.map((surgeon, index) => (
                                <option key={index} value={surgeon._id}>
                                    {surgeon.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Hospital Name:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={hospitalName || distributeData.hospitalName}
                            onChange={(e) => setDistribute({ ...distribute, hospitalName: e.target.value })}
                        >
                            <option value={distributeData.hospitalName}>{distributeData.hospitalName}</option>
                            {hospitals.map((hospital, index) => (
                                <option key={index} value={hospital._id}>
                                    {hospital.hospitalName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Mode of Transportation:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={modeOfTransportation || distributeData.modeOfTransportation}
                            onChange={(e) => setDistribute({ ...distribute, modeOfTransportation: e.target.value })}
                        >
                            <option value={distributeData.modeOfTransportation}>{distributeData.modeOfTransportation}</option>
                            <option value="Car">Car</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Plane">Plane</option>
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
};

export default EditDistribute;