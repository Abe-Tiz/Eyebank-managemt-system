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
    const [corneaData, setCorneaData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [cornea, setCornea] = useState({
        recoveryTechnical: '',
        eyeLid: '',
        size: '',
        irisColor: '',
        corneaStatus: '',
        clarity: '',
        lens: '',
    });

    useEffect(() => {
        const fetchCorneaData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/cornea/getOne/${id}`);
                setCorneaData(response.data);
                setIsLoading(false);
            } catch (error) {
                handleFetchError();
            }
        };

        fetchCorneaData();
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

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/cornea/update/${id}`, {
                recoveryTechnical: cornea.recoveryTechnical || corneaData.recoveryTechnical,
                eyeLid: cornea.eyeLid || corneaData.eyeLid,
                size: cornea.size || corneaData.size,
                irisColor: cornea.irisColor || corneaData.irisColor,
                corneaStatus: cornea.corneaStatus || corneaData.corneaStatus,
                clarity: cornea.clarity || corneaData.clarity,
                lens: cornea.lens || corneaData.lens,
                position: position || corneaData.position,
            });

            toast({
                title: t('Success'),
                description: t('Cornea data saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/labtechnicaldashboard/viewCornea');
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

    const { recoveryTechnical, eyeLid, size, irisColor, clarity, lens } = cornea;

    return (
        <div>
            <h1 className="text-2xl font-bold  mb-4" style={{ textAlign: 'center' }}>{t('Edit Cornea')}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid ml-3 grid-cols-2">
                    <label>
                        Size:
                        <select
                            className="form-input mt-1  block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={size || corneaData.size}
                            onChange={(e) => setCornea({ ...cornea, size: e.target.value })}
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
                            value={eyeLid || corneaData.eyeLid}
                            onChange={(e) => setCornea({ ...cornea, eyeLid: e.target.value })}
                        />
                    </label>
                </div>
                <div className='grid ml-3 grid-cols-2'>
                    <label>
                        Iris Color:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:borderindigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={irisColor || corneaData.irisColor}
                            onChange={(e) => setCornea({ ...cornea, irisColor: e.target.value })}
                        >
                            <option value={corneaData.irisColor}>{corneaData.irisColor}</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="brown">Brown</option>
                        </select>
                    </label>
                    <label>
                        Clarity:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={clarity || corneaData.clarity}
                            onChange={(e) => setCornea({ ...cornea, clarity: e.target.value })}
                        />
                    </label>
                </div>
                <div className='grid ml-3 grid-cols-2'>
                    <label>
                        Lens:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={lens || corneaData.lens}
                            onChange={(e) => setCornea({ ...cornea, lens: e.target.value })}
                        />
                    </label>
                    <label>
                        Position:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={position || corneaData.position}
                            onChange={handlePosition}
                        >
                            <option value={corneaData.position}>{corneaData.position}</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </label>
                </div>
                <div className='text-center  '>
                    <button className="w-1/4 mb-3 bg-sky-600 hover:bg-blue-700 text-white  font-bold py-2 px-4 mt-5 rounded">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCornea;