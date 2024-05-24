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
import { Button, Box, Flex, ButtonGroup, WrapItem } from '@chakra-ui/react';
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
import Pagination from '../../../components/Pagination';
import useSearch from '../../../useHooks/useSearch';
import SearchComponent from '../../../components/SearchComponent';

const AdverseReport = () => {
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
    const { searchTerm, handleChange, data, error } = useSearch('recipient');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Calculate the total number of pages
    const totalPages = Math.ceil(recipient.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecipients = recipient.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function formatTimestamp(timestamp) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return new Date(timestamp).toLocaleString('en-US', options);
    }

    useEffect(() => {
        const getAllRecipients = async () => {
            try {
                const surgeonId = localStorage.getItem('surgeonId'); // Retrieve the surgeon ID from local storage
                const response = await axios.get(
                    'http://localhost:4000/recipient/read',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                        params: {
                            surgeonId: surgeonId, // Pass the surgeon ID as a query parameter
                        },
                    }
                );
                const data = response.data;
                setRecipient(data);
                console.log(surgeonId);
            } catch (error) {
                console.error(error);
            }
        };
        getAllRecipients();
    }, []);

    const handleEvaluated = async () => {
        setIsButtonClicked(true);
    };

    const deleteRecipient = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/recipient/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setRecipient(recipient.filter((recipient) => recipient._id !== id));
        } catch (error) {
            console.error(error);
        }
    };
    const renderRecipient = searchTerm ? data : currentRecipients;

    return (
        <div>
            <TableContainer>
                {/* <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of Recipients
                </Text> */}
                <Flex justify="flex-end" mb={3} position="fixed" top={10} right={0} p={4}>
                    <Box mr={15}>
                        <SearchComponent searchTerm={searchTerm} handleChange={handleChange} />
                    </Box>
                </Flex>
                <Table className='mt-8' variant='simple'>
                    <Thead>
                        <Tr className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <Th>S.No</Th>
                            <Th>Date Of Diagnosis</Th>
                            <Th>Lot No</Th>
                            <Th>Adverse Reation</Th>
                            <Th>Probablity of Case</Th>
                            <Th>Donor Tissue</Th>
                            <Th>Patient</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderRecipient
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
                                    {/* <Td className='text-center ml-3 text-blue-600'>
                                        <Link to={`/surgondashboard/editocular/${cornea._id}`}>
                                            <EditIcon />
                                        </Link>
                                    </Td> */}
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    paginate={paginate}
                />
            </TableContainer >
        </div >
    );
};

export default AdverseReport;