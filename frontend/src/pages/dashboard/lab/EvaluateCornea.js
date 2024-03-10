import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

const EvaluateCornea = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [evaluationdata, setEvaluationdata] = useState('');
    const [evaluationDate, setEvaluationDate] = useState('');
    const [epitheliam, setEpitheliam] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [stroma, setStroma] = useState('');
    const [endothelium, setEndothelium] = useState('');
    const [approval, setApproval] = useState('');
    const [evaluater, setEvaluater] = useState('');
    const [evaluationComment, setEvaluationComment] = useState('');

    const evaluation = {
        evaluationDate,
        epitheliam,
        stroma,
        endothelium,
        approval,
        evaluater,
        evaluationComment
    };

    useEffect(() => {
        // Fetch cornea data from the server based on the provided ID
        const fetchCorneaData = async () => {
            try {

                const response = await axios.get(`http://localhost:4000/cornea/getOne/${id}`);
                setEvaluationdata(response.data);
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
        //console.log(evaluateCornea)
        try {
            await axios.put(`http://localhost:4000/cornea/evaluate/${id}`, { evaluation });
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
    const handleApproval = (event) => {
        setApproval(event.target.value);
    }
    if (isLoading) {
        return <div>{t('Loading...')}</div>;
    }
    return (
        <div>
            <h1>{t('Evaluate Cornea')}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <label>
                    Evaluation Date:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="date"
                        value={evaluationDate}
                        onChange={(e) => setEvaluationDate(e.target.value)}
                    />
                </label>
                <label>
                    endothelium:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={endothelium}
                        onChange={(e) => setEndothelium(e.target.value)}
                    />
                </label>
                <label>
                    stroma:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={stroma}
                        onChange={(e) => setStroma(e.target.value)}
                    />
                </label>
                <label>
                    epitheliam:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={epitheliam}
                        onChange={(e) => setEpitheliam(e.target.value)}
                    />
                </label>
                <label>
                    Evaluator:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={evaluater}
                        onChange={(e) => setEvaluater(e.target.value)}
                    />
                </label>
                <label>
                    Comment:
                    <input
                        className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        value={evaluationComment}
                        onChange={(e) => setEvaluationComment(e.target.value)}
                    />
                </label>
                <label>
                    Approval:
                    <br />
                    <label>

                        <input
                            type="radio"
                            value="positive"
                            checked={approval === 'positive'}
                            onChange={handleApproval}
                        />
                        Positive
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="negative"
                            checked={approval === 'negative'}
                            onChange={handleApproval}
                        />
                        Negative
                    </label>
                </label>
                <button className='bg-success' type=' submit'>Evaluate</button>
            </form>
        </div >
    );
};

export default EvaluateCornea;