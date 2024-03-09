import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

const EditCornea = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();

    // Example state variables
    const [corneaData, setCorneaData] = useState({});
    const [recoveryTechnical, setRecoveryTechnical] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [eyeLid, setEyeLid] = useState('');
    const [size, setSize] = useState('');
    const [irisColor, setIrisColor] = useState('');
    const [corneaStatus, setCorneaStatus] = useState('');
    const [clarity, setClarity] = useState('');
    const [lens, setLens] = useState('');
    const cornea = {
        recoveryTechnical,
        eyeLid,
        size,
        irisColor,
        corneaStatus,
        clarity,
        lens
    };

    useEffect(() => {
        // Fetch cornea data from the server based on the provided ID
        const fetchCorneaData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/cornea/getOne/${id}`);
                setCorneaData(response.data);
                setIsLoading(false);
            } catch (error) {
                // Handle error
                toast({
                    title: t('Error'),
                    description: t('Failed to fetch cornea data.'),
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoading(false);
            }
        };

        fetchCorneaData();
    }, [id, t, toast]);

    const handleSave = async () => {
        // Example save functionality
        try {
            console.log(cornea);
            await axios.put(`http://localhost:4000/cornea/update/${id}`, cornea);
            toast({
                title: t('Success'),
                description: t('Cornea data saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/labtechnicaldashboard/viewCornea');
        } catch (error) {
            // Handle error
            toast({
                title: t('Error'),
                description: t('Failed to save cornea data.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (isLoading) {
        return <div>{t('Loading...')}</div>;
    }

    return (
        <div>
            <h1>{t('Edit Cornea')}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className='grid grid-cols-3'>
                    <label>
                        Recovery Technical:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={recoveryTechnical}
                            onChange={(e) => setRecoveryTechnical(e.target.value)}
                        >
                            <option value={corneaData.recoveryTechnical}>{corneaData.recoveryTechnical}</option>
                            <option value="Technical 1">Technical 1</option>
                            <option value="Technical 2">Technical 2</option>
                            <option value="Technical 3">Technical 3</option>
                        </select>
                    </label>
                    <label>
                        Size:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={size === '' ? corneaData.size : size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            <option value={corneaData.size}>{corneaData.size}</option>
                            <option value="3">3 cm</option>
                            <option value="6">6 cm</option>
                            <option value="9">9 cm</option>
                        </select>
                    </label>
                    <label>
                        Eye Lid:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={eyeLid}
                            onChange={(e) => setEyeLid(e.target.value)}
                        />
                    </label>
                </div>
                <div className='grid grid-cols-3'>
                    <label>
                        Iris Color:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"

                            value={irisColor}
                            onChange={(e) => setIrisColor(e.target.value)}
                        >
                            <option value={corneaData.irisColor}>{corneaData.irisColor}</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                        </select>
                    </label>
                    <label>
                        Cornea Status:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"

                            value={corneaStatus}
                            onChange={(e) => setCorneaStatus(e.target.value)}
                        >
                            <option value={corneaData.corneaStatus}>{corneaData.corneaStatus}</option>
                            <option value="Status 1">Status 1</option>
                            <option value="Status 2">Status 2</option>
                            <option value="Status 3">Status 3</option>

                        </select>
                    </label>
                    <label>
                        Clarity:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={clarity}
                            onChange={(e) => setClarity(e.target.value)}
                        >
                            <option value={corneaData.clarity}>{corneaData.clarity}</option>
                            <option value="clear 1">Clear 1</option>
                            <option value="clear 2">Clear 2</option>
                            <option value="clear 3">Clear 3</option>
                        </select>
                    </label>
                </div>
                <div className='grid grid-cols-3'>
                    <label>
                        Lens:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={lens}
                            onChange={(e) => setLens(e.target.value)}
                        >

                            <option value={corneaData.lens}>{corneaData.lens}</option>
                            <option value="Lens 1">Lens 1</option>
                            <option value="Lens 2">Lens 2</option>
                            <option value="Lens 3">Lens 3</option>
                        </select>
                    </label>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded">
                        Update
                    </button>
                </div>

            </form >
        </div >
    );
};

export default EditCornea;