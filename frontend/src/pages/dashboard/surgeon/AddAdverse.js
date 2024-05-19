import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast, Text } from '@chakra-ui/react';
import ButtonComponent from '../../../components/ButtonComponent';

const AddAdverse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [dateOfadverse, setdateOfadverse] = useState('');
    const [lotNo, setLotNo] = useState('');
    const [lotNoData, setLotNoData] = useState([]);
    const [adverseReaction, setAdverseReaction] = useState('');
    const [probablityCase, setProbablityCase] = useState('');
    const [donorTissue, setDonorTissue] = useState('');
    const [adversePost, setAdversePost] = useState(true);
    const adverse = {
        dateOfadverse,
        lotNo,
        adverseReaction,
        probablityCase,
        donorTissue,
        adversePost,
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
                console.log("dist:", data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

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
                    <select
                        className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={lotNo}
                        onChange={(e) => setLotNo(e.target.value)}
                    >
                        <option value=''>Select lotNo</option>
                        {lotNoData.map((lot, index) => (

                            <option key={index} value={lot.corneaId}>
                                {lot.corneaId.lotNo}
                            </option>
                        ))}
                    </select>
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
                <div className="text-center mt-4 mb-2">
                    <ButtonComponent label="Submit" title={"Send Adverse"} type="submit" />
                </div>
            </form >
        </>
    );
};

export default AddAdverse;