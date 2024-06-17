import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link, Td, Box, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td as ChakraTd, Button } from "@chakra-ui/react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDisclosure } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";

const ExamedList = () => {

    useEffect(() => {
        fetchPhysicalExams();
    }, []);
    const [collect, setcollect] = useState(true);

    const handleCollect = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/collect/${id}`);
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


       function formatTimestamp(timestamp) {
         const options = {
           year: "numeric",
           month: "short",
           day: "numeric",
         };
         return new Date(timestamp).toLocaleString("en-US", options);
       }

    const fetchPhysicalExams = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/getAll");
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
                `http://localhost:4000/api/delete/${examId}`,
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
      <Box p={6}>
        {exams.length === 0 ? (
          <Heading as="h3" size="lg" textAlign="center">
            No physical exams found.
          </Heading>
        ) : (
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr className="bg-blue-300">
                <Th>Height</Th>
                <Th>Weight</Th>
                <Th>Sex</Th>
                <Th>Cause of Death</Th>
                <Th>Date of Death</Th>
                <Th>Death Time</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {exams
                .filter((exam) => exam.collect === false)
                .map((exam, index) => (
                  <Tr key={index}>
                    <ChakraTd>{exam.height}</ChakraTd>
                    <ChakraTd>{exam.weight}</ChakraTd>
                    <ChakraTd>{exam.sex}</ChakraTd>
                    <ChakraTd>{exam.causeOfDeath}</ChakraTd>
                    <ChakraTd>{formatTimestamp(exam.dod)}</ChakraTd>
                    <ChakraTd>{exam.time}</ChakraTd>
                    <ChakraTd>
                      <Flex justify="center" gap={2}>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleCollect(exam._id)}
                        >
                          Collect
                        </Button>
                      </Flex>
                    </ChakraTd>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </Box>
    );
};

export default ExamedList;