
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';

const RecievedCornea = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const navigate = useNavigate();
    const [distributed, setdistribute] = useState([]);
    const surgeonName = localStorage.getItem("surgeonName");

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
                const response = await axios.get("http://localhost:4000/distribution/read");
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
    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center text-black mt-0'>
                    Recieved Cornea
                </Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr className='bg-sky-600 text-white'>
                            <Th className='text-white' >No</Th>
                            <Th className='text-white' > Hospital Name</Th>
                            <Th className='text-white'>Mode Of Traporation</Th>
                            <Th className='text-white'>Suitability</Th>
                            {/* <Th className='text-white'>Surgeon</Th> */}
                            <Th className='text-white'>Distribution Date</Th>

                        </Tr>
                    </Thead>
                    <Tbody>

                        {distributed
                            .filter((distribute) => distribute.name === surgeonName)
                            .map((distribute, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{distribute.hospitalName}</Td>
                                    <Td>{distribute.modeOfTransportation}</Td>
                                    <Td>{distribute.suiatablity}</Td>
                                    {/* <Td>{distribute.name}</Td> */}
                                    <Td>
                                        {formatTimestamp(distribute.createdAt)}
                                    </Td>

                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default RecievedCornea;