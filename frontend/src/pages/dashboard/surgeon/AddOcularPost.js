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
    const [lotNo, setLotNo] = useState('');
    const [lotNoData, setLotNoData] = useState([]);
    const [ocularOperativeEye, setOcularOperativeEye] = useState('');
    const [ocularNonOperativeEye, setOcularNonOperativeEye] = useState('');
    const [Post, setOcularPost] = useState(true);
    const ocularPost = {
        dateOfSurgery,
        lotNo,
        ocularOperativeEye,
        ocularNonOperativeEye,
        Post
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surgeonName = localStorage.getItem('surgeonName'); // Retrieve the surgeon ID from local storage
                const response = await axios.get('http://localhost:4000/distribution/eachsurgeon',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                        params: {
                            surgeonName: surgeonName, // Pass the surgeon ID as a query parameter
                        },
                    }
                );
                const data = response.data;
                setLotNoData(data);
                console.log(surgeonName);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
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
            navigate('/surgondashboard/ocularpostlist');
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
    console.log(Post)
    return (
        <div>
            <h2 className="text-3xl mb-5 " style={{ textAlign: 'center' }}>Ocular Post Form</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >

                <label className=" ml-16 px-12 block">
                    <select
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={lotNo}
                        onChange={(e) => setLotNo(e.target.value)}
                    >
                        {lotNoData.map((lot, index) => (
                            <option key={index} value={lot.lotNo}>
                                {lot.lotNo}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="date" className=" ml-16 px-12 block">
                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="date"
                        id="date"
                        placeholder="Date of Surgery"
                        value={dateOfSurgery}
                        onChange={(e) => setDateOfSurgery(e.target.value)}
                        required
                    />
                </label>
                <label className=" ml-16 px-12 block">
                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        placeholder="Ocular Operative Eye"
                        value={ocularOperativeEye}
                        onChange={(e) => setOcularOperativeEye(e.target.value)}
                    />
                </label>
                <label className=" ml-16 px-12 block">
                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        placeholder='Ocular Non Operative Eye'
                        value={ocularNonOperativeEye}
                        onChange={(e) => setOcularNonOperativeEye(e.target.value)}
                    />
                </label>
                <button className=" bg-sky-600 text-center ml-40 hover:bg-teal-700 focus:outline-none text-white px-4 py-2 mt-2 rounded-md" type="submit">Send Ocular</button>
            </form >
        </div >
    );
};

export default AddOcularPost;