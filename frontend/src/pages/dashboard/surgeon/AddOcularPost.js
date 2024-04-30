import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast, Text } from '@chakra-ui/react';


const AddOcularPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [dateOfSurgery, setDateOfSurgery] = useState('');
    const [surgeryType, setSurgeryType] = useState('');
    const [ocularOperativeEye, setOcularOperativeEye] = useState('');
    const [ocularNonOperativeEye, setOcularNonOperativeEye] = useState('');
    const ocularPost = {
        dateOfSurgery,
        surgeryType,
        ocularOperativeEye,
        ocularNonOperativeEye

    };
    // useEffect(() => {
    //     // Fetch cornea data from the server based on the provided ID
    //     const fetchRecipientData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:4000/recipient/getOne/${id}`);
    //             setReciepentdata(response.data);
    //         } catch (error) {
    //             // Handle error
    //             toast({
    //                 title: t('Error'),
    //                 description: t('Failed to fetch cornea data.'),
    //                 status: 'error',
    //                 duration: 5000,
    //                 isClosable: true,
    //             });

    //         }
    //     };
    //     fetchRecipientData();
    // }, [id, t, toast]);
    // useEffect(() => {
    //     const fetchHospitalData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:4000/hospital/read");
    //             setHospitals(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchHospitalData();
    // }, []);
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
            <h2 className="text-3xl mb-5 " style={{ textAlign: 'center' }}>Ocular Post Form</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">
                    <label>

                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"

                            value={surgeryType}
                            onChange={(e) => setSurgeryType(e.target.value)}
                        >
                            <option value="">  surgery Type</option>
                            <option value="AK">AK</option>
                            <option value="PK">PK</option>
                            <option value="PKA">PKA</option>
                        </select>
                    </label>
                    <label htmlFor="date">
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="date"
                            id="date"
                            placeholder="Date of Surgery"
                            value={dateOfSurgery}
                            onChange={(e) => setDateOfSurgery(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <label>

                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            placeholder="Ocular Operative Eye"
                            value={ocularOperativeEye}
                            onChange={(e) => setOcularOperativeEye(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            placeholder='Ocular Non Operative Eye'
                            value={ocularNonOperativeEye}
                            onChange={(e) => setOcularNonOperativeEye(e.target.value)}
                        />
                    </label>
                </div>
                <button className=" bg-sky-600 text-center ml-40 hover:bg-teal-700 focus:outline-none text-white px-4 py-2 mt-2 rounded-md" type="submit">Send Ocular</button>
            </form >
        </div >
    );
};

export default AddOcularPost;