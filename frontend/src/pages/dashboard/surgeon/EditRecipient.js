import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';
import ButtonComponent from '../../../components/ButtonComponent';

const EditRecipient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const toast = useToast();
    const [recipientData, setRecipientData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [recipient, setRecipient] = useState({
        recipientname: '',
        age: '',
        sex: '',
        phone: '',
        address: '',
        surgeryType: '',
        registerDate: '',
        hospital: '',

    });

    useEffect(() => {
        const fetchrecipientData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/recipient/getOne/${id}`);
                setRecipientData(response.data);
                setIsLoading(false);
            } catch (error) {
                handleFetchError();
            }
        };

        fetchrecipientData();
    }, [id]);

    const handleFetchError = () => {
        toast({
            title: t('Error'),
            description: t('Failed to fetch recipient data.'),
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        setIsLoading(false);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/recipient/update/${id}`, {
                recipientname: recipient.recipientname || recipientData.recipientname,
                age: recipient.age || recipientData.age,
                sex: recipient.sex || recipientData.sex,
                phone: recipient.phone || recipientData.phone,
                address: recipient.address || recipientData.address,
                surgeryType: recipient.surgeryType || recipientData.surgeryType,
                registerDate: recipient.registerDate || recipientData.registerDate,
                hospital: recipient.hospital || recipientData.hospital,
            });

            toast({
                title: t('Success'),
                description: t('Recipient data saved successfully.'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/surgondashboard/viewrecipient');
        } catch (error) {
            handleSaveError();
        }
    };

    const handleSaveError = () => {
        toast({
            title: t('Error'),
            description: t('Failed to save recipient data.'),
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    };
    const { recipientname, age, sex, phone, address, surgeryType, registerDate, hospital } = recipient;

    return (
        <div>
            <h1 className="text-2xl font-bold  mb-4" style={{ textAlign: 'center' }}>{t('Edit recipient')}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="grid ml-3 grid-cols-2">
                    <label>
                        Recipient
                        <input
                            className="form-input mt-1  block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={recipientname || recipientData.recipientname}
                            onChange={(e) => setRecipient({ ...recipient, recipientname: e.target.value })}
                        />
                    </label>
                    <label>
                        Eye Lid:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={age || recipientData.age}
                            onChange={(e) => setRecipient({ ...recipient, age: e.target.value })}
                        />
                    </label>
                </div>
                <div className='grid ml-3 grid-cols-2'>

                    <label>
                        Gender:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={sex || recipientData.sex}
                            onChange={(e) => setRecipient({ ...recipient, sex: e.target.value })}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={address || recipientData.address}
                            onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                        />
                    </label>
                </div>
                <div className='grid ml-3 grid-cols-2'>
                    <label>
                        phone:
                        <input
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={phone || recipientData.phone}
                            onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                        />
                    </label>
                    <label>
                        Surgery Type:
                        <select
                            className="form-input mt-1 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={surgeryType || recipientData.surgeryType}
                            onChange={(e) => setRecipient({ ...recipient, surgeryType: e.target.value })}
                        >
                            <option value={recipientData.surgeryType}>{recipientData.surgeryType}</option>
                            <option value="PK">PK</option>
                            <option value="AK">AK</option>
                            <option value="PKA">PKA</option>
                        </select>
                    </label>
                </div>
                <div className="text-center mt-4 mb-2">
                    <ButtonComponent label="Submit" title={"Update"} type="submit" />
                </div>
            </form >
        </div >
    );
};

export default EditRecipient;