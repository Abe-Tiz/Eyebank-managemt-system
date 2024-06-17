import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';
import useLoggedInUser from "../../../useHooks/useLoggedInUser";
import ButtonComponent from '../../../components/ButtonComponent';

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
    // const [evaluater, setEvaluater] = useState(n);
    const [evaluationComment, setEvaluationComment] = useState('');
    const [suiatablity, setSuiatablity] = useState('');
    const [reason, setReason] = useState('');


    const { user, setUser, getLoggedInUser } = useLoggedInUser("medical");


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
        const evaluation = {
            evaluationDate,
            epitheliam,
            stroma,
            endothelium,
            approval,
            evaluater: user && user.data.name,
            evaluationComment,
            suiatablity,
            reason
        };
        try {
            await axios.put(`http://localhost:4000/cornea/evaluate/${id}`, { evaluation });
            toast({
                title: t('Success'),
                description: t('Evalution  data saved successfully.'),
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
    const handleApproval = (event) => {
        setApproval(event.target.value);
    }
    if (isLoading) {
        return <div>{t('Loading...')}</div>;
    }
    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-4">Evaluate Cornea</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">
                    <label>
                        Endothelium:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={endothelium}
                            onChange={(e) => setEndothelium(e.target.value)}
                        >
                            <option value="">Select endothelium</option>
                            <option value="normal">Normal</option>
                            <option value="edema">Edema</option>
                            <option value="guttata">Guttata</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Stroma:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={stroma}
                            onChange={(e) => setStroma(e.target.value)}
                        >
                            <option value="">Select stroma</option>
                            <option value="normal">Normal</option>
                            <option value="edema">Corneal edema</option>
                            <option value="degeneration">Degeneration</option>
                            <option value="scarring">Scarring</option>
                            <option value="keratoconus">Keratoconus</option>
                        </select>
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <label>
                        Epithelium:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={epitheliam}
                            onChange={(e) => setEpitheliam(e.target.value)}
                        >
                            <option value="">Select epithelium</option>
                            <option value="normal">Normal</option>
                            <option value="irregularity">Irregularity</option>
                            <option value="erosion">Erosion</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Comment:
                        <textarea
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={evaluationComment}
                            onChange={(e) => setEvaluationComment(e.target.value)}
                        ></textarea>
                    </label>
                </div>
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
                <div className="text-center mt-4 mb-2">
                    <ButtonComponent label="Submit" title={"Evaluate"} type="submit" />
                </div>
            </form >
        </div >
    );
};

export default EvaluateCornea;