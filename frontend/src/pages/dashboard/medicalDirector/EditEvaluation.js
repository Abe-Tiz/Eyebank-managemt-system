import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

const EditEvaluation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();

    // Example state variables
    const [corneaData, setCorneaData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [evaluater, setEvaluater] = useState('')
    const [epitheliam, setEpitheliem] = useState('');
    const [stroma, setStroma] = useState('');
    const [endothelium, setEndothelium] = useState('');
    const [approval, setApproval] = useState('');
    const [suiatablity, setSuiatablity] = useState('');
    const [reason, setReason] = useState('');
    const cornea = {
        epitheliam,
        stroma,
        endothelium,
        approval,
        evaluater,
        suiatablity,
        reason
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
    const handleApproval = (event) => {
        setApproval(event.target.value);
    }
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
            navigate('/medicaldirectordashboard/evaluatedlist');
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
                        Epitheliam:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={epitheliam === '' ? corneaData.evalualtion.epitheliam : epitheliam}
                            onChange={(e) => setEpitheliem(e.target.value)}
                        >
                            <option value={corneaData.epitheliam}>{corneaData.epitheliam}</option>
                            <option value="3">3 cm</option>
                            <option value="6">6 cm</option>
                            <option value="9">9 cm</option>
                        </select>
                    </label>

                </div>
                <div className='grid grid-cols-3'>
                    <label>
                        Stroma:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"

                            value={stroma === '' ? corneaData.stroma : stroma}
                            onChange={(e) => setStroma(e.target.value)}
                        >
                            <option value={corneaData.stroma}>{corneaData.stroma}</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                        </select>
                    </label>
                    <label>
                        endothelium:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"

                            value={endothelium === '' ? corneaData.endothelium : endothelium}
                            onChange={(e) => setEndothelium(e.target.value)}
                        >
                            <option value={corneaData.endothelium}>{corneaData.endothelium}</option>
                            <option value="Status 1">Status 1</option>
                            <option value="Status 2">Status 2</option>
                            <option value="Status 3">Status 3</option>

                        </select>
                    </label>

                </div>
                <div className='grid grid-cols-3'>
                    <div>
                        <label>
                            Approval:
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    value="yes"
                                    checked={approval === 'yes'}
                                    onChange={handleApproval}
                                />
                                Yes
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    value="no"
                                    checked={approval === 'no'}
                                    onChange={handleApproval}
                                />
                                No
                            </label>
                        </label>
                        {
                            approval === "yes" ? (<lable>
                                Select suiatablty
                                <select
                                    className="form-input mt-1 block w-1/3 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={suiatablity}
                                    onChange={(e) => setSuiatablity(e.target.value)}
                                >
                                    <option value="">Select Suiatablity</option>
                                    <option value="PK">PK</option>
                                    <option value="EK">EK</option>
                                    <option value="ALK">ALK</option>
                                    <option value="KLA">KLA</option>
                                    <option value="K-Pro">K-Pro</option>
                                    <option value="Therapeutic">Therapeutic</option>

                                </select>


                            </lable>) : (null)
                        }
                        {
                            approval === 'no' ? (<lable>
                                Select Reason
                                <select
                                    className="form-input mt-1 block w-1/3 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}

                                >
                                    <option value="">Select Reason</option>
                                    <option value="epitheliam">Epitheliam</option>
                                    <option value="stroma">Stroma</option>
                                    <option value="endothelium">Endothelium</option>
                                    <option value="descement"> Descement</option>
                                    <option value="other">Other</option>

                                </select>


                            </lable>) : (null)
                        }
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded">
                        Update
                    </button>
                </div>

            </form >
        </div >
    );
};

export default EditEvaluation;