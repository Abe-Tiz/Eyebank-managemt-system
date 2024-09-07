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
import { Button, Box, Flex, ButtonGroup, WrapItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';
import Pagination from '../../../components/Pagination';
import useSearch from '../../../useHooks/useSearch';
import SearchComponent from '../../../components/SearchComponent';
const ViewTissue = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [corneas, setCorneas] = useState([]);
    const { searchTerm, handleChange, data, error } = useSearch('cornea');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(corneas.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCorneas = corneas.filter(
        (cornea) =>
            cornea.evaluation &&
            (cornea.evaluation.approval !== 'yes') &&
            cornea.evaluation &&
            (cornea.evaluation.approval !== 'no') &&
            cornea.isTested &&
            (cornea.isTested === true)
    ).slice(indexOfFirstItem, indexOfLastItem);
    // Function to change page
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://eyebank-backend-2.onrender.com/cornea/read?searchTerm=${searchTerm}`);
                const data = response.data;
                setCorneas(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchTerm]);;
    const handleEvaluated = async () => {
        setIsButtonClicked(true);

    };
    function formatExiryDate(expiryDate) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Date(expiryDate).toLocaleString('en-US', options);
    }
    const deleteCornea = async (id) => {
        try {
            await axios.delete(`https://eyebank-backend-2.onrender.com/cornea/delete/${id}`);
            setCorneas(corneas.filter((cornea) => cornea._id !== id));
        } catch (error) {
            console.error(error);
        }
    };
    const renderCornea = searchTerm ? data : currentCorneas;
    return (
        <div>
            <TableContainer>
                {/* <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of collected cornea
                </Text> */}
                <Flex justify="flex-end" position="fixed" top={10} right={0} p={4}>
                    <Box mr={15}>
                        <SearchComponent searchTerm={searchTerm} handleChange={handleChange} />
                    </Box>
                </Flex>
                <Table className='mt-10' variant='simple'>
                    <Thead>
                        <Tr className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <Th>S.No</Th>
                            <Th>LotNo</Th>
                            <Th>Date</Th>
                            {/* <Th>Technical</Th> */}
                            <Th>Position</Th>
                            <Th>Lens</Th>
                            <Th>Clarity</Th>
                            <Th>Size</Th>
                            <Th>Eye Lid</Th>
                            <Th>Iris Color</Th>
                            <Th>Expiry Date</Th>
                            <Th colSpan={3}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderCornea
                            .filter(
                                (cornea) =>
                                    cornea.evaluation &&
                                    (cornea.evaluation.approval !== 'yes')
                            )
                            .filter(
                                (cornea) =>
                                    cornea.evaluation &&
                                    (cornea.evaluation.approval !== 'no')
                            )
                            .filter(
                                (cornea) =>
                                    cornea.isTested &&
                                    (cornea.isTested === true)
                            )
                            .map((cornea, index) => (
                                <Tr key={index} className="mb-2 text-lg">
                                    <Td>{index + 1}</Td>
                                    <Td>{cornea.lotNo}</Td>
                                    <Td>
                                        {formatTimestamp(cornea.createdAt)}
                                    </Td>
                                    {/* <Td>{cornea?.recoveryTechnical?.name}</Td> */}
                                    <Td>{cornea.position}</Td>
                                    <Td>{cornea.lens}</Td>
                                    <Td>{cornea.clarity}</Td>
                                    <Td>{cornea.size}</Td>
                                    <Td>{cornea.eyeLid}</Td>
                                    <Td>{cornea.irisColor}</Td>
                                    <Td>{formatExiryDate(cornea.expirationDate)}</Td>
                                    <div className='text-center'>
                                        {
                                            cornea.evaluation && cornea.evaluation.approval !== 'yes' && cornea.evaluation.approval !== 'no' ? (

                                                <Td>
                                                    <Button colorScheme='telegram'>
                                                        <Link className=' bg-sky-600' to={`/medicaldirectordashboard/evaluatecornea/${cornea._id}`}>Evaluate</Link></Button>
                                                </Td>
                                            ) : (
                                                <Td style={{ color: cornea.evaluation && cornea.evaluation.approval === 'yes' ? 'green' : 'red' }}>
                                                    {cornea.evaluation && cornea.evaluation.approval}
                                                </Td>
                                            )
                                        }
                                    </div>
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
            </TableContainer>
        </div >
    );
};

export default ViewTissue;