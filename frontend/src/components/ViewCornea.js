import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
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

                            <Th>S.No</Th>
                            <Th>Date</Th>
                            <Th> Technical</Th>
                            <Th>Position</Th>
                            <Th>Lens</Th>
                            <Th>Clarity</Th>
                            <Th>Size</Th>
                            <Th>Eye Lid</Th>
                            <Th>Iris Color</Th>
                            <Th colSpan={3}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {corneas.map((cornea, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{cornea.dateOfRecovery}</Td>
                                <Td>{cornea.recoveryTechnical}</Td>
                                <Td>{cornea.position}</Td>
                                <Td>{cornea.lens}</Td>
                                <Td>{cornea.clarity}</Td>
                                <Td>{cornea.size}</Td>
                                <Td>{cornea.eyeLid}</Td>
                                <Td>{cornea.irisColor}</Td>
                                <div className='text-center'>
                                    <Td>
                                        <Link to={`/labtechnicaldashboard/editcornea/${cornea._id}`}><EditIcon /></Link>
                                    </Td>{" "}
                                    <Td>
                                        <button onClick={() => deleteCornea(cornea._id)}><DeleteIcon /></button>
                                    </Td>{" "}
                                    <Td>
                                        <Link to={`/labtechnicaldashboard/evaluatecornea/${cornea._id}`}>Evaluate</Link>
                                    </Td>
                                </div>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ViewCornea;