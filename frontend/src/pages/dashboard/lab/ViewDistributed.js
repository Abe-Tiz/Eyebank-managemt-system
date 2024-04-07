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

const Viewdistribute = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [distributed, setdistribute] = useState([]);

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
                const response = await axios.get("http://localhost:4000/distribution/read");
                const data = response.data;
                setdistribute(data);
                // setExpirationDate(new Date(data.expirationDate));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleEvaluated = async () => {
        setIsButtonClicked(true);

    };


    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of distribute distribute
                </Text>

                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Lot No</Th>
                            <Th> Hospital Name</Th>
                            <Th>Surgeon Name</Th>
                            <Th>Mode Of Traporation</Th>
                            <Th>Approved By</Th>
                            <Th>distribute By</Th>
                            <Th>Type of Tissue</Th>
                            <Th>Distribution Date</Th>
                            <Th >Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {distributed.map((distribute, index) => (
                            <Tr key={index}>
                                <Td>{distribute.LotNo}</Td>
                                <Td>{distribute.hospitalName.hospitalName}</Td>
                                <Td>{distribute.nameOfSurgeon.name}</Td>
                                <Td>{distribute.modeOfTransportation}</Td>
                                <Td>{distribute.approvedBy.name}</Td>
                                <Td>{distribute.nameOfTechnician.name}</Td>
                                <Td>{distribute.typeOfTissue}</Td>
                                <Td>
                                    {formatTimestamp(distribute.createdAt)}
                                </Td>
                                <Td className='text-center ml-3 text-blue-600'>
                                    <Link to={`/labtechnicaldashboard/editdistributed/${distribute._id}`}>
                                        <EditIcon />
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default Viewdistribute;