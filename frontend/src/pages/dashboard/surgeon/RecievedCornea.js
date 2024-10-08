import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchComponent from "../../../components/SearchComponent";
import useSearch from "../../../useHooks/useSearch";
import { useNavigate } from 'react-router-dom';
import Pagination from "../../../components/Pagination";
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';

const RecievedCornea = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();
    const [distributed, setdistribute] = useState([]);
    const surgeonName = localStorage.getItem("surgeonName");
    const { searchTerm, handleChange, data, error } = useSearch("distributed");



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Calculate the total number of pages
    const totalPages = Math.ceil(distributed.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCorneas = distributed.slice(indexOfFirstItem, indexOfLastItem);


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
            const surgeonName = localStorage.getItem("surgeonName");
            try {
                const response = await axios.get("https://eyebank-backend-2.onrender.com/distribution/read");
                const data = response.data;
                setdistribute(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleEvaluated = async () => {
        setIsButtonClicked(true);
    };
    const renderDistributed = searchTerm ? data : currentCorneas;
    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            <TableContainer>
                <div className="w-full mt-10 flex justify-between ">
                    <Text fontSize="3xl" className="text-center text-black mt-0 mb-4">
                        Recieved Corneas
                    </Text>
                    {/* search component */}
                    <SearchComponent
                        searchTerm={searchTerm}
                        handleChange={handleChange}
                    />
                </div>
                <Table >
                    <Thead>
                        <Tr className='bg-blue-300 '>
                            <Th  >No</Th>
                            <Th  > Hospital Name</Th>
                            <Th >Mode Of Traporation</Th>
                            {/* <Th >Suitability</Th> */}
                            {/* <Th >Surgeon</Th> */}
                            <Th >Distribution Date</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderDistributed
                            .filter((distribute) => distribute.name === surgeonName)
                            .map((distribute, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{distribute.hospitalName}</Td>
                                    <Td>{distribute.modeOfTransportation}</Td>
                                    {/* <Td>{distribute.suiatablity}</Td> */}
                                    {/* <Td>{distribute.name}</Td> */}
                                    <Td>
                                        {formatTimestamp(distribute.createdAt)}
                                    </Td>

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

export default RecievedCornea;