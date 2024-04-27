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

const ViewTissue = () => {
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/cornea/read");
                const data = response.data;
                setCorneas(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
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
                            <Th>LotNo</Th>
                            <Th>Date</Th>
                            <Th> Technical</Th>
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
                        {corneas
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
                            .map((cornea, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
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
                                        {
                                            cornea.evaluation && cornea.evaluation.approval !== 'yes' && cornea.evaluation.approval !== 'no' ? (
                                                <Td>
                                                    <Link to={`/medicaldirectordashboard/evaluatecornea/${cornea._id}`}>Evaluate</Link>
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
            </TableContainer>
        </div >
    );
};

export default ViewTissue;