import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon, HStack,
    TagCloseButton,
} from '@chakra-ui/react'
import { Button, ButtonGroup, WrapItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';

const ViewTissue = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState([]);
    function formatTimestamp(timestamp) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return new Date(timestamp).toLocaleString('en-US', options);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/recipient/read");
                const data = response.data;
                setRecipient(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleEvaluated = async () => {
        setIsButtonClicked(true);

    };

    const deleteRecipient = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/recipient/delete/${id}`);
            setRecipient(recipient.filter((recipent) => recipent._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of Recipients
                </Text>
                <Table size='sm'>
                    <Thead>
                        <Tr>

                            <Th>S.No</Th>
                            <Th>Date</Th>
                            <Th> Recipinent Name</Th>
                            <Th>Age</Th>
                            <Th>Sex</Th>
                            <Th>Diagnosis</Th>
                            <Th>Surgery Type</Th>
                            <Th colSpan={4}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipient.map((recipent, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    {formatTimestamp(recipent.createdAt)}
                                </Td>
                                <Td>{recipent.recipientname}</Td>
                                <Td>{recipent.age}</Td>
                                <Td>{recipent.sex}</Td>
                                <Td>{recipent.diagnosis}</Td>
                                <Td>{recipent.surgeryType}</Td>
                                <Td>
                                    <Link to={`/surgondashboard/editrecipient/${recipent._id}`}>Ocular Post</Link>
                                </Td>
                                <Td>
                                    <Link to={`/surgondashboard/editrecipient/${recipent._id}`}>Adverse</Link>
                                </Td>
                                <Td>
                                    <Link to={`/surgondashboard/editrecipient/${recipent._id}`}>Edit</Link>
                                </Td>
                                <Td className='text-red-600'>
                                    <button onClick={() => deleteRecipient(recipent._id)}>Delete</button>
                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default ViewTissue;