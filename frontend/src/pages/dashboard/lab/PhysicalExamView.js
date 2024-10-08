import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link, Td } from "@chakra-ui/react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDisclosure } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'

const PhysicalExamView = () => {

  useEffect(() => {
    fetchPhysicalExams();
  }, []);
  const [collect, setcollect] = useState(true);

  const handleCollect = async (id) => {
    try {
      await axios.put(`https://eyebank-backend-2.onrender.com/api/collect/${id}`);
      navigate(`/labtechnicaldashboard/collectCornea/${id}`);
    } catch (error) {
      console.error("Failed to collect physical exam:", error);
    }
  };
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const toast = useToast()
  useEffect(() => {
    fetchPhysicalExams();
  }, []);

  const fetchPhysicalExams = async () => {
    try {
      const response = await fetch("https://eyebank-backend-2.onrender.com/api/getAll");
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Failed to fetch physical exams:", error);
    }
  };

  const deletePhysicalExam = (examId) => {

    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this physical exam?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => performDelete(examId),
        },
        {
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  };


  const performDelete = async (examId) => {
    try {
      const response = await fetch(
        `https://eyebank-backend-2.onrender.com/api/delete/${examId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        fetchPhysicalExams();
        toast({
          title: "Physical exam deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",

        })
        // alert('Physical exam deleted successfully.');
      } else {
        throw new Error('Failed to delete physical exam.');
      }
    } catch (error) {
      console.error('Error deleting physical exam:', error);
    }
  };

  const navigateToDetails = (examId) => {
    navigate(`/labtechnicaldashboard/getOne/${examId}`);
  };

  const navigateToEdit = (examId) => {
    const exam = exams.find((exam) => exam._id === examId);
    if (exam) {
      navigate({
        pathname: `/labtechnicaldashboard/editExams/${examId}`,
        state: { exam },
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center font-bold mb-4 font-sans bg-blue-500 text-white rounded p-2 h-14">
        Physical Exam
      </h2>
      {exams.length === 0 ? (
        <p>No physical exams found.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-2 py-2"><h1 className="font-bold">Height</h1></th>
              <th className="px-2 py-2"><h1 className="font-bold">Weight</h1></th>
              <th className="px-2 py-2"><h1 className="font-bold">Sex</h1></th>
              <th className="px-2 py-2"><h1 className="font-bold">Cause of Death</h1></th>
              <th className="px-2 py-2"><h1 className="font-bold">Date of Death</h1></th>
              <th className="px-2 py-2"><h1 className="font-bold">Time of Death</h1></th>
              <th className="px-8 py-2 col-span-3"><h1 className="font-bold">Actions</h1></th>
            </tr>
          </thead>
          <tbody>
            {exams
              .filter(
                (exam) =>
                  (exam.collect === false)
              )
              .map((exam, index) => (
                <tr key={index}>
                  <td className="border px-2 py-2">{exam.height}</td>
                  <td className="border px-2 py-2">{exam.weight}</td>
                  <td className="border px-2 py-2">{exam.sex}</td>
                  <td className="border px-2 py-2">{exam.causeOfDeath}</td>
                  <td className="border px-2 py-2">{exam.dod}</td>
                  <td className="border px-2 py-2">{exam.time}</td>
                  <td className="grid grid-cols-4 border px-2 py-2">
                    <td className="border px-2 py-2 text-blue-500">
                      <Link
                        className="text-gray-600 text-xl hover:text-blue-700"
                        onClick={() => navigateToDetails(exam._id)}
                      >
                        <FaEye />
                      </Link>
                    </td>

                    <td className='border text-center ml-3 text-blue-600'>
                      <Link onClick={() => handleCollect(exam._id)}>Collect</Link>


                    </td>

                    <td className="border px-2 py-2 text-green-500">
                      <Link
                        className="text-green-600 text-xl ml-5 hover:text-green-700"
                        onClick={() => navigateToEdit(exam._id)}
                      >
                        <EditIcon />
                      </Link>
                    </td>
                    <td className="border px-2 py-2 text-red-600">
                      <Link
                        className="text-red-600 text-xl ml-5 hover:text-red-700"
                        onClick={() => deletePhysicalExam(exam._id)}
                      >
                        <DeleteIcon />
                      </Link>
                    </td>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PhysicalExamView;