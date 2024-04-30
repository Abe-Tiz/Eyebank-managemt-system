import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast, Text } from '@chakra-ui/react';

const AddAdverse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [dateOfadverse, setdateOfadverse] = useState('');
    const [adverseReaction, setAdverseReaction] = useState('');
    const [probablityCase, setProbablityCase] = useState('');
    const [donorTissue, setDonorTissue] = useState('');
    const [adversePost, setAdversePost] = useState(true);
    const adverse = {
        dateOfadverse,
        adverseReaction,
        probablityCase,
        donorTissue,
        adversePost,
    };

    const handleSave = async () => {
        console.log(adverse);
        try {
            await axios.put(`http://localhost:4000/recipient/adverse/${id}`, { adverse });
            toast({
                title: t('Success'),
                description: t('Adverse reaction saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/surgondashboard/adverselist');
        } catch (error) {
            toast({
                title: t('Error'),
                description: t('Failed to save adverse reaction.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Text fontSize='3xl' className='ml-16 px-16 block'>
                Adverse Reaction form
            </Text>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <label className=" ml-16 px-12 block">
                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="date"
                        placeholder="Date Of Diagnosis"
                        value={dateOfadverse}
                        onChange={(e) => setdateOfadverse(e.target.value)}
                    />
                </label>
                <label className=" ml-16 px-12 block">
                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        placeholder="Adverse Reaction"
                        value={adverseReaction}
                        onChange={(e) => setAdverseReaction(e.target.value)}
                    />
                </label>
                <label className=" ml-16 px-12 block">

                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        placeholder="Probablity Case"
                        value={probablityCase}
                        onChange={(e) => setProbablityCase(e.target.value)}
                    />
                </label>
                <label className="ml-16 px-12 block">
                    <input
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        type="text"
                        placeholder="Donor Tissue"
                        value={donorTissue}
                        onChange={(e) => setDonorTissue(e.target.value)}
                    />
                </label>
                <button className=" bg-sky-600 text-center ml-40 hover:bg-teal-700 focus:outline-none text-white px-4 py-2 mt-2 rounded-md" type="submit">Send Adverse</button>
            </form >
        </>
    );
};

export default AddAdverse;