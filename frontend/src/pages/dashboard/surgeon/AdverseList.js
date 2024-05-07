import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    HStack,
    TagCloseButton,
} from '@chakra-ui/react';
import { Button, ButtonGroup, WrapItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    TableContainer,
} from '@chakra-ui/react';

const AdverseList = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [recipient, setRecipent] = useState([]);
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
                const response = await axios.get('http://localhost:4000/recipient/read');
                const data = response.data;
                setRecipent(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleEvaluated = async () => {
        setIsButtonClicked(true);
    };
    function formatTimestamp(timestamp) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Date(timestamp).toLocaleString('en-US', options);
    }
    // const deleteAdverse = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:4000/cornea/delete/${id}`);
    //         setCorneas(corneas.filter((cornea) => cornea._id !== id));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    return (
        <div>
            <div className='text-center'>
                <TableContainer>
                    {/* <Text fontSize='2xl' className='text-center  bg-teal-400 text-white mt-6'>
                        <span> List of Adverse Transplantation </span>
                    </Text> */}
                    <Table variant='simple'>
                        <Thead>
                            <Tr className="bg-gray-200 mx-0">
                                <Th>S.No</Th>
                                <Th>Date Of Diagnosis</Th>
                                <Th>Lot No</Th>
                                <Th>Adverse Reation</Th>
                                <Th>Probablity of Case</Th>
                                <Th>Donor Tissue</Th>
                                <Th>Patient</Th>
                                <Th>Operations</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recipient
                                .filter(
                                    (cornea) =>
                                        cornea.adverse &&
                                        (cornea.adverse.adversePost === true)
                                )
                                .map((cornea, index) => (
                                    <Tr key={index} className="mb-2 text-lg">
                                        <Td>{index + 1}</Td>
                                        <Td>{formatTimestamp(cornea.adverse.dateOfadverse)}</Td>
                                        <Td>{cornea.adverse.lotNo}</Td>
                                        <Td>{cornea.adverse.adverseReaction}</Td>
                                        <Td>{cornea.adverse.probablityCase}</Td>
                                        <Td>{cornea.adverse.donorTissue}</Td>
                                        <Td>{cornea.recipientname}</Td>

                                        <Td className='text-center ml-3 text-blue-600'>
                                            <Link to={`/surgondashboard/editadverse/${cornea._id}`}>
                                                <EditIcon />
                                            </Link>
                                        </Td>
                                        {/* <Td className='text-center ml-3 text-blue-600'>
                                            <Link to={`//${cornea._id}`}>
                                                <DeleteIcon />
                                            </Link>
                                        </Td> */}
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdverseList;