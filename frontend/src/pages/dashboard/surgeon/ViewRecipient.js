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
    const [isOpen, setIsOpen] = useState({
        serology: false,
        distribut: false,
        cornea: false,
        physical: false,
        request: false,
    });
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
        const surgeonId= localStorage.getItem("surgeonId");
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/recipient/read",
                    {
                     headers:{
                        Autherization: `Bearer ${localStorage.getItem("token")}`,
                     },
                     params:{
                        surgeonId:surgeonId,
                     },
                    }
                    
                  
                );
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
                {/* <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of Recipients
                </Text> */}
                <Table variant='simple'>
                    <Thead>
                        <Tr className="bg-gray-200 ">
                            <Th>S.No</Th>
                            <Th> Register Date</Th>
                            <Th> Recipinent Name</Th>
                            <Th>Age</Th>
                            <Th>Sex</Th>
                            <Th>Address</Th>
                            <Th>Surgery Type</Th>
                            <Th className='text-center' colSpan={4}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipient.map((recipent, index) => (
                            <Tr key={index} className="mb-2 text-lg">
                                <Td>{index + 1}</Td>
                                <Td>
                                    {formatTimestamp(recipent.createdAt)}
                                </Td>
                                <Td>{recipent.recipientname}</Td>
                                <Td>{recipent.age}</Td>
                                <Td>{recipent.sex}</Td>
                                <Td>{recipent.address}</Td>
                                <Td>{recipent.surgeryType}</Td>
                                <Td >
                                    <Button colorScheme='telegram'>
                                        <Link to={`/surgondashboard/ocularpost/${recipent._id}`}>Ocular Post</Link>
                                    </Button>
                                </Td>
                                <Td >
                                    <Button colorScheme='orange'>
                                        <Link to={`/surgondashboard/adverse/${recipent._id}`}>Adverse</Link>
                                    </Button>
                                </Td>
                                <Td className="text-blue-600">
                                    <Link to={`/surgondashboard/editrecipient/${recipent._id}`}>
                                        <EditIcon /></Link>
                                </Td>
                                <Td >
                                    <button className="text-red-600" onClick={() => deleteRecipient(recipent._id)}>
                                        <DeleteIcon />
                                    </button>
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