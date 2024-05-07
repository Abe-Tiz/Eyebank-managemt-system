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

const OcularPostList = () => {
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
                const response = await axios.get("http://localhost:4000/recipient/read");
                const data = response.data;
                setRecipent(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    console.log("the recipient" + recipient);
    const handleEvaluated = async () => {
        setIsButtonClicked(true);
    };
    // const deleteOcular = async (id) => {
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
                    {/* <Text fontSize='2xl' className='text-center  mb-5 mt-6'>
                        <span className='font-bold'> List of Adverse Transplantation </span>
                    </Text> */}
                    <Table variant='simple'>
                        <Thead>
                            <Tr className="bg-gray-200 ">
                                <Th>S.No</Th>
                                <Th>Date Of Post</Th>
                                <Th>Lot No</Th>
                                <Th>Recipient</Th>
                                <Th>Surgeon Name</Th>
                                <Th>Hospital</Th>
                                <Th>Operation Eye</Th>
                                <Th>Non Operation Eye</Th>
                                <Th >Operations</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recipient
                                .filter(
                                    (cornea) =>
                                        cornea.ocularPost &&
                                        (cornea.ocularPost.Post === true)
                                )
                                .map((cornea, index) => (
                                    <Tr key={index} className="mb-2 text-lg" >
                                        <Td>{index + 1}</Td>
                                        <Td>{formatTimestamp(cornea.createdAt)}</Td>
                                        <Td>{cornea.ocularPost.lotNo}</Td>
                                        <Td>{cornea.recipientname}</Td>
                                        <Td>{cornea.surgeonName}</Td>
                                        <Td>{cornea.hospital.name}</Td>
                                        <Td>{cornea.ocularPost.surgeryType}</Td>
                                        <Td>{cornea.ocularPost.ocularOperativeEye}</Td>
                                        <Td>{cornea.ocularPost.ocularNonOperativeEye}</Td>
                                        <Td className='text-center ml-3 text-blue-600'>
                                            <Link to={`/surgondashboard/editocular/${cornea._id}`}>
                                                <EditIcon />
                                            </Link>
                                        </Td>
                                        {/* <Td className="text-center">
                                            <button className="text-red-600" onClick={() => deleteCornea(cornea._id)}>
                                                <DeleteIcon />
                                            </button>
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

export default OcularPostList;