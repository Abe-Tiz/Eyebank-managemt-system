import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

const EditPhysicalExam = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [formData, setFormData] = useState([]);
    const [exam, setExam] = useState({
        height: '',
        weight: '',
        sex: '',
        examined: {
            isRefrigerated: false,
            head: false,
            mouth: false,
            neck: false,
            arms: false,
            abdomen: false,
            genitals: false,
            arteries: false,
            back: false,
        },
        highRiskexamined: {
            sexual: "no evidence",
            analInterCourse: "no evidence",
            NonMedical: "no evidence",
            oralThrush: "no evidence",
            Blue: "no evidence",
            enlargedLiver: "no evidence",
        },
        causeOfDeath: '',
        dateofdeath: '',
        time: '',

    });

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const response = await axios.get(`https://eyebank-backend-2.onrender.com/api/getOne/${id}`);
                setExam(response.data);
            } catch (error) {
                handleFetchError();
            }
        };

        fetchExamData();
    }, [id]);

    const handleFetchError = () => {
        toast({
            title: t('Error'),
            description: t('Failed to fetch exam data.'),
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
        });
    };

    const handleChange = (e) => {
        setExam((prevExam) => ({
            ...prevExam,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChange1 = (e) => {
        const { name, value, type, keyCode } = e.target;

        setFormData((formData) => ({
            ...formData,
            examined: {
                ...formData.examined,
                [name]: e.target.checked,
            },
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://eyebank-backend-2.onrender.com/api/update/${id}`, exam);
            toast({
                title: t('Success'),
                description: t('Physical exam updated successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/labtechnicaldashboard/getAll');
        } catch (error) {
            toast({
                title: t('Error'),
                description: t('Failed to update physical exam.'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">{t('Height')}</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2"
                        type="text"
                        name="height"
                        value={exam.height}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">{t('Weight')}</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2"
                        type="text"
                        name="weight"
                        value={exam.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">{t('Sex')}</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        name="sex"
                        value={exam.sex}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">{t('isRefrigerated')}</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2"
                        type="text"
                        name="causeOfDeath"
                        value={exam.examined?.isRefrigerated ? 'yes' : 'no'}
                        onChange={handleChange1}
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-2">{t('Cause of Death')}</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2"
                        type="text"
                        name="causeOfDeath"
                        value={exam.causeOfDeath}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">{t('Date of Death')}</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2"
                        type="date"
                        name="dateofdeath"
                        value={exam.dateofdeath || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">{t('Time')}</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2"
                        type="text"
                        name="time"
                        value={exam.time}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    type="submit"
                >
                    {t('Update')}
                </button>
            </form>
        </div>
    );
};

export default EditPhysicalExam;