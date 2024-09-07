import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';
import ButtonComponent from '../../../components/ButtonComponent';

const EditOcularPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();

    const [ocularPostData, setocularPostData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [ocularData, setocularData] = useState({
        surgeryType: '',
        ocularOperativeEye: '',
        ocularNonOperativeEye: '',
    });
    useEffect(() => {
        const fetchocularPostData = async () => {
            try {
                const response = await axios.get(`https://eyebank-backend-2.onrender.com/recipient/getOne/${id}`);
                setocularPostData(response.data);
                setIsLoading(false);
            } catch (error) {
                toast({
                    title: t('Error'),
                    description: t('Failed to fetch ocular Data data.'),
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setIsLoading(false);
            }
        };

        fetchocularPostData();
    }, [id, t, toast]);
    const handleSave = async () => {
        try {
            await axios.put(`https://eyebank-backend-2.onrender.com/cornea/update/${id}`, {
                dateOfadverse: ocularData.dateOfAdverse || ocularPostData.dateOfadverse,
                ocularDataReaction: ocularData.ocularDataReaction || ocularPostData.ocularDataReaction,
                probabilityCase: ocularData.probabilityCase || ocularPostData.probablityCase,
                donorTissue: ocularData.donorTissue || ocularPostData.donorTissue,
            });
            toast({
                title: t('Success'),
                description: t('ocularData data saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/surgondashboard/ocularpostlist');
        } catch (error) {
            toast({
                title: t('Error'),
                description: t('Failed to update ocularData data.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const { dateOfadverse, ocularDataReaction, probabilityCase, donorTissue } = ocularPostData;

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
                            value={ocularData.dateOfAdverse || dateOfadverse}
                            onChange={(e) => setocularData({ ...ocularData, dateOfAdverse: e.target.value })}
                        />
                    </label>
                    <label>
                        Adverse Data Reaction:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={ocularData.ocularDataReaction || ocularDataReaction}
                            onChange={(e) => setocularData({ ...ocularData, ocularDataReaction: e.target.value })}
                        />
                    </label>
                </div>
                <div className="grid grid-cols-2">
                    <label>
                        Probability Case:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={ocularData.probabilityCase || probabilityCase}
                            onChange={(e) => setocularData({ ...ocularData, probabilityCase: e.target.value })}
                        />
                    </label>
                    <label>
                        Donor Tissue:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={ocularData.donorTissue || donorTissue}
                            onChange={(e) => setocularData({ ...ocularData, donorTissue: e.target.value })}
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
export default EditOcularPost;