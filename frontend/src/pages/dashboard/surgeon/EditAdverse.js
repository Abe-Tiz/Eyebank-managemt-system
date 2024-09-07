import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';
import ButtonComponent from '../../../components/ButtonComponent';

const EditAdverseData = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();

    const [adverseReactionData, setAdverseReactionData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [adverseData, setAdverseData] = useState({
        dateOfAdverse: '',
        adverseDataReaction: '',
        probabilityCase: '',
        donorTissue: '',
    });

    useEffect(() => {
        const fetchAdverseReactionData = async () => {
            try {
                const response = await axios.get(`https://eyebank-backend-2.onrender.com/recipient/getOne/${id}`);
                setAdverseReactionData(response.data);
                setIsLoading(false);
            } catch (error) {
                toast({
                    title: t('Error'),
                    description: t('Failed to fetch adverseData data.'),
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoading(false);
            }
        };

        fetchAdverseReactionData();
    }, [id, t, toast]);
    const handleSave = async () => {
        try {
            await axios.put(`https://eyebank-backend-2.onrender.com/cornea/update/${id}`, {
                dateOfadverse: adverseData.dateOfAdverse || adverseReactionData.dateOfadverse,
                adverseDataReaction: adverseData.adverseDataReaction || adverseReactionData.adverseDataReaction,
                probabilityCase: adverseData.probabilityCase || adverseReactionData.probablityCase,
                donorTissue: adverseData.donorTissue || adverseReactionData.donorTissue,
            });
            toast({
                title: t('Success'),
                description: t('adverseData data saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/surgondashboard/adverselist');
        } catch (error) {
            toast({
                title: t('Error'),
                description: t('Failed to update adverseData data.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const { dateOfadverse, adverseDataReaction, probabilityCase, donorTissue } = adverseReactionData;
    if (isLoading) {
        return <div>{t('Loading...')}</div>;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>
                {t('Edit Evaluation')}
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid grid-cols-2">
                    <label>
                        Adverse Data post Date:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="date"
                            value={adverseData.dateOfAdverse || dateOfadverse}
                            onChange={(e) => setAdverseData({ ...adverseData, dateOfAdverse: e.target.value })}
                        />
                    </label>
                    <label>
                        Adverse Data Reaction:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={adverseData.adverseDataReaction || adverseDataReaction}
                            onChange={(e) => setAdverseData({ ...adverseData, adverseDataReaction: e.target.value })}
                        />
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <label>
                        Probability Case:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={adverseData.probabilityCase || probabilityCase}
                            onChange={(e) => setAdverseData({ ...adverseData, probabilityCase: e.target.value })}
                        />
                    </label>
                    <label>
                        Donor Tissue:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={adverseData.donorTissue || donorTissue}
                            onChange={(e) => setAdverseData({ ...adverseData, donorTissue: e.target.value })}
                        />
                    </label>
                </div>
                <div className="text-center mt-4 mb-2">
                    <ButtonComponent label="Submit" title={"Update"} type="submit" />
                </div>

            </form>
        </div>
    );
};
export default EditAdverseData;