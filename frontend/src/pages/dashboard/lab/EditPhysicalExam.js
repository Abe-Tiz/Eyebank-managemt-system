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

  const [exam, setExam] = useState({
    height: '',
    weight: '',
    sex: '',
    causeOfDeath: '',
    dateofdeath: '',
    time: '',
  });

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/getOne/${id}`);
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
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/update/${id}`, exam);
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
          <input
            className="w-full border border-gray-300 rounded-md p-2"
            type="text"
            name="sex"
            value={exam.sex}
            onChange={handleChange}
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
            type="Date"
            name="dateofdeath"
            value={exam.dateofdeath}
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