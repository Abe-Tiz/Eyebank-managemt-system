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
    const [isLoading, setIsLoading] = useState(true);
    const [corneaDate, setCorneaDate] = useState('');
    const [recoverySite, setRecoverySite] = useState('');
    const [recoveryTechnical, setRecoveryTechnical] = useState('');
    const [serologyTest, setSerologyTest] = useState('');
    const [covid, setCovid] = useState('');
    const cornea = {
        corneaDate,
        recoverySite,
        recoveryTechnical,
        serologyTest,
        covid
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
                <label>
                    Recovery Date:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="date"
                        value={corneaData.corneaDate}
                        onChange={(e) => setCorneaDate(e.target.value)}
                    />
                </label>
                <label>
                    Name of Surgeon:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={corneaData.nameOfSurgeon}
                        onChange={(e) => setRecoverySite(e.target.value)}
                    />
                </label>
                <label>
                    Recovery Site:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={corneaData.recoverySite}
                        onChange={(e) => setRecoverySite(e.target.value)}
                    />
                </label>
                <label>
                    Recovery Technical:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={corneaData.recoveryTechnical}
                        onChange={(e) => setRecoveryTechnical(e.target.value)}
                    />
                </label>
                <label>
                    Serology Test:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={corneaData.serologyTest}
                        onChange={(e) => setSerologyTest(e.target.value)}
                    />
                </label>
                <label>
                    Covid:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={corneaData.covid}
                        onChange={(e) => setCovid(e.target.value)}
                    />
                </label>
                <button type='submit'>{t('Save')}</button>
            </form>
        </div >
    );
};

export default EditCornea;