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

const AccidentList = () => {

    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [accident, setAccident] = useState([]);

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
                const response = await axios.get("https://eyebank-backend-2.onrender.com/accident/read");
                const data = response.data;
                setAccident(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const deleteAccident = async (id) => {
        try {
            await axios.delete(`https://eyebank-backend-2.onrender.com/accident/delete/${id}`);
            setAccident(accident.filter((accident) => accident._id !== id));
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center text-black mt-0 mb-3'>
                    List of Reported Accidents
                </Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr className='bg-sky-600 text-white'>
                            <Th className='text-white'>Catagory</Th>
                            <Th className='text-white'>Error Type</Th>
                            <Th className='text-white'>Hospital Name</Th>
                            <Th className='text-white'>Surgeon Name</Th>
                            <Th className='text-white'>Recipient Name</Th>
                            <Th className='text-white'>Accident Time</Th>
                            <Th className='text-white' >Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {accident.map((accident, index) => (
                            <Tr key={index}>
                                <Td>{accident.category}</Td>
                                <Td>{accident.errorType}</Td>
                                <Td>{accident.hospitalName.hospitalName}</Td>
                                <Td>{accident.surgeonName.name}</Td>
                                <Td>{accident.receipentName !== null ? accident.receipentName : 'N/A'}</Td>
                                <Td> {formatTimestamp(accident.createdAt)} </Td>

                                <Td className='text-center ml-3 text-blue-600'>
                                    <Link className='mr-3 p-1' to={`/surgondashboard/editaccident/${accident._id}`}>
                                        <EditIcon />
                                    </Link>

                                    <Link className='mr-1 p-3 text-red-600' onClick={() => deleteAccident(accident._id)}>
                                        <DeleteIcon />
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default AccidentList