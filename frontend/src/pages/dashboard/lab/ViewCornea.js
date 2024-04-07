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
                <Text fontSize='3xl' className='text-center text-black mt-0 mb-4'>
                    List of collected cornea
                </Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr className='bg-sky-600 text-white'>
                            <Th className='text-white'>LotNo</Th>
                            <Th className='text-white'>Date</Th>
                            <Th className='text-white' > Technical</Th>
                            <Th className='text-white'>Position</Th>
                            <Th className='text-white' >Lens</Th>
                            <Th className='text-white'>Clarity</Th>
                            <Th className='text-white'>Size</Th>
                            <Th className='text-white'>Eye Lid</Th>
                            <Th className='text-white'>Iris Color</Th>
                            <Th className='text-white'>Exiption Date</Th>
                            <Th className='text-white' colSpan={3}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {corneas.map((cornea, index) => (
                            <Tr key={index} className="mb-2 text-lg">
                                <Td className="text-lg xl:text-2xl">{cornea.lotNo}</Td>
                                <Td className="">
                                    {formatTimestamp(cornea.createdAt)}
                                </Td>
                                <Td >{cornea.recoveryTechnical}</Td>
                                <Td >{cornea.position}</Td>
                                <Td >{cornea.lens}</Td>
                                <Td >{cornea.clarity}</Td>
                                <Td > {cornea.size}</Td >
                                <Td > {cornea.eyeLid}</Td >
                                <Td > {cornea.irisColor}</Td >
                                <Td  > {formatExiryDate(cornea.expirationDate)}</Td >
                                <Td className=" text-center " >
                                    <Link className='text-blue-600' to={`/labtechnicaldashboard/editcornea/${cornea._id}`}>
                                        <EditIcon className="text-blue-600" />
                                    </Link>
                                </Td > {" "}
                                <Td Td className=" text-center" >
                                    <button
                                        onClick={() => deleteCornea(cornea._id)}
                                        className="text-red-600"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </Td > {" "}
                            </Tr >
                        ))
                        }
                    </Tbody >
                </Table >
            </TableContainer >

        </div >
    );
};

export default ViewCornea;