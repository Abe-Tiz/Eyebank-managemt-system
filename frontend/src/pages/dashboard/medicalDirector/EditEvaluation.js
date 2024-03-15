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


    const [evaluateData, setEvaluationData] = useState({
        epitheliam: "",
        stroma: "",
        endothelium: "",
        approval: "",
        evaluater: "",
        suiatablity: "",
        reason: ""

    });

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
            console.log(evaluateData);
            await axios.put(`http://localhost:4000/cornea/update/${id}`, {
                epitheliam: evaluateData.epitheliam || corneaData.evaluation.epitheliam,
                stroma: evaluateData.stroma || corneaData.evaluation.stroma,
                endothelium: evaluateData.endothelium || corneaData.evaluation.endothelium,
                evaluater: evaluateData.evaluater || corneaData.evaluation.evaluater,
                approval: evaluateData.approval || corneaData.evaluation.approval,
                suiatablity: evaluateData.suiatablity || corneaData.evaluation.suiatablity,
                reason: evaluateData.reason || corneaData.evaluation.reason,

            });
            console.log(epitheliam)
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
                description: t('Failed to update cornea data.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const { epitheliam, stroma, endothelium, evaluater, approval, suiatablity, reason } = evaluateData;
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
                            value={epitheliam}
                            onChange={(e) => setEvaluationData({ ...evaluateData, epitheliam: e.target.value })}
                        >
                            <option value={corneaData.evaluation.epitheliam}>{corneaData.evaluation.epitheliam}</option>
                            <option value="3">3 cm</option>
                            <option value="6">6 cm</option>
                            <option value="9">9 cm</option>
                        </select>
                    </label>
                    <label>
                        Evaluator:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={evaluater}
                            onChange={(e) => setEvaluationData({ ...evaluateData, evaluater: e.target.value })}
                        >
                            <option value={corneaData.evaluation.evaluater}>{corneaData.evaluation.evaluater}</option>
                            <option value="awoke">Awoke</option>
                            <option value="amsalu">Amsalu</option>
                            <option value="leli">Leli</option>
                        </select>
                    </label>

                </div>
                <div className='grid grid-cols-3'>
                    <label>
                        Stroma:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"

                            value={stroma}
                            onChange={(e) => setEvaluationData({ ...evaluateData, stroma: e.target.value })}
                        >
                            <option value={corneaData.evaluation.stroma}>{corneaData.evaluation.stroma}</option>
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                        </select>
                    </label>
                    <label>
                        endothelium:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"

                            value={endothelium}
                            onChange={(e) => setEvaluationData({ ...evaluateData, endothelium: e.target.value })}
                        >
                            <option value={corneaData.evaluation.endothelium}>{corneaData.evaluation.endothelium}</option>
                            <option value="Status 1">Status 1</option>
                            <option value="Status 2">Status 2</option>
                            <option value="Status 3">Status 3</option>
                        </select>
                    </label>
                </div>
                <div className='grid grid-cols-3'>
                    <div>
                        <label>
                            <label>
                                Approval:
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        value="yes"
                                        checked={approval === 'yes'}
                                        onChange={(e) => setEvaluationData({ ...evaluateData, approval: e.target.value })}
                                    />
                                    Yes
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        value="no"
                                        checked={approval === 'no'}
                                        onChange={(e) => setEvaluationData({ ...evaluateData, approval: e.target.value })}
                                    />
                                    No
                                </label>
                            </label>
                        </label>
                        {
                            approval === "yes" ? (<label>
                                Select suiatablty
                                <select
                                    className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={suiatablity}
                                    onChange={(e) => setEvaluationData({ ...evaluateData, suiatablity: e.target.value })}
                                >
                                    <option value={corneaData.evaluation.suiatablity}>{corneaData.evaluation.suiatablity}</option>
                                    <option value="PK">PK</option>
                                    <option value="EK">EK</option>
                                    <option value="ALK">ALK</option>
                                    <option value="KLA">KLA</option>
                                    <option value="K-Pro">K-Pro</option>
                                    <option value="Therapeutic">Therapeutic</option>

                                </select>


                            </label>) : (null)
                        }
                        {
                            approval === 'no' ? (<label>
                                Select Reason
                                <select
                                    className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={reason}
                                    onChange={(e) => setEvaluationData({ ...evaluateData, reason: e.target.value })}
                                >
                                    <option value={corneaData.evaluation.reason}>{corneaData.evaluation.reason}</option>
                                    <option value="epitheliam">Epitheliam</option>
                                    <option value="stroma">Stroma</option>
                                    <option value="endothelium">Endothelium</option>
                                    <option value="descement"> Descement</option>
                                    <option value="other">Other</option>

                                </select>


                            </label>) : (null)
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