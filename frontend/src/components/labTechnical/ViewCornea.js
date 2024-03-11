import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';

const ViewCornea = () => {
    const [corneas, setCorneas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/cornea/read");
                setCorneas(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

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
                            <Th>Ser.No</Th>
                            <Th>Recovery Date</Th>
                            <Th>Recovery Site</Th>
                            <Th>Recovery Technical</Th>
                            <Th>Serology Test</Th>
                            <Th>Covid</Th>
                            <Th colSpan={3}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {corneas.map((cornea, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{cornea.dateOfRecovery}</Td>
                                <Td>{cornea.recoverySite}</Td>
                                <Td>{cornea.recoveryTechnical}</Td>
                                <Td>{cornea.serologyTest}</Td>
                                <Td>{cornea.covid}</Td>
                                <Td>
                                    <Link to={`/labtechnicaldashboard/editcornea/${cornea._id}`}>Edit</Link>
                                </Td>
                                <Td className='text-red-600'>
                                    <button onClick={() => deleteCornea(cornea._id)}>Delete</button>
                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ViewCornea;