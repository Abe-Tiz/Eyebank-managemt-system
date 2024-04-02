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

const ViewCornea = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [corneas, setCorneas] = useState([]);

    function formatTimestamp(timestamp) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return new Date(timestamp).toLocaleString('en-US', options);
    }
    function formatExiryDate(expiryDate) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Date(expiryDate).toLocaleString('en-US', options);
    }

    // const [time, setTime] = useState(new Date());

    // useEffect(() => {
    //     const intervalID = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalID);
    //     };
    // }, []);
    // const calculateRemainingTime = () => {
    //     if (expirationDate) {
    //         const remainingTime = expirationDate - currentTime;
    //         const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    //         const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //         const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    //         const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    //         return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    //     }
    //     return "";
    // };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/cornea/read");
                const data = response.data;
                setCorneas(data);
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

    const deleteCornea = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/cornea/delete/${id}`);
            setCorneas(corneas.filter((cornea) => cornea._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of collected cornea
                </Text>

                <Table size='sm'>
                    <Thead>
                        <Tr>

                            <Th>S.No</Th>
                            <Th>Date</Th>
                            <Th> Technical</Th>
                            <Th>Position</Th>
                            <Th>Lens</Th>
                            <Th>Clarity</Th>
                            <Th>Size</Th>
                            <Th>Eye Lid</Th>
                            <Th>Iris Color</Th>
                            <Th>Exiption Date</Th>
                            <Th colSpan={3}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {corneas.map((cornea, index) => (
                            <Tr key={index}>
                                <Td>{cornea.lotNo}</Td>
                                <Td>
                                    {formatTimestamp(cornea.createdAt)}
                                </Td>
                                <Td>{cornea.recoveryTechnical}</Td>
                                <Td>{cornea.position}</Td>
                                <Td>{cornea.lens}</Td>
                                <Td>{cornea.clarity}</Td>
                                <Td>{cornea.size}</Td>
                                <Td>{cornea.eyeLid}</Td>
                                <Td>{cornea.irisColor}</Td>
                                <Td>{formatExiryDate(cornea.expirationDate)}</Td>
                                <div className='text-center'>
                                    <Td className='text-center ml-3 text-blue-600'>
                                        <Link to={`/labtechnicaldashboard/editcornea/${cornea._id}`}><EditIcon /></Link>
                                    </Td>{" "}
                                    <Td className='text-center ml-3 text-red-600'>
                                        <button onClick={() => deleteCornea(cornea._id)}><DeleteIcon /></button>
                                    </Td>{" "}


                                </div>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </div >
    );
};

export default ViewCornea;