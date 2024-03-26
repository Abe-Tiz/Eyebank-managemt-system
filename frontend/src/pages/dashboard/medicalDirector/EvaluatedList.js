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
                const response = await axios.get('http://localhost:4000/cornea/read');
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
            <div className='text-center mt-3'>
                <TableContainer>
                    <Text fontSize='2xl' className='text-center  bg-teal-400 text-white mt-6'>
                        <span> List of evaluated cornea </span>
                    </Text>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>S.No</Th>
                                <Th>Date</Th>
                                <Th>Evaluater</Th>
                                <Th>Epitheliam</Th>
                                <Th>Stroma</Th>
                                <Th>Endothelium</Th>
                                <Th>Approval</Th>
                                <Th>Suiatabl/Reason</Th>
                                <Th colSpan={2}>Operations</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {corneas
                                .filter(
                                    (cornea) =>
                                        cornea.evaluation &&
                                        (cornea.evaluation.approval === 'yes' || cornea.evaluation.approval === 'no')
                                )
                                .map((cornea, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{formatTimestamp(cornea.evaluation.evaluationDate)}</Td>
                                        <Td>{cornea.evaluation.evaluater}</Td>
                                        <Td>{cornea.evaluation.epitheliam}</Td>
                                        <Td>{cornea.evaluation.stroma}</Td>
                                        <Td>{cornea.evaluation.endothelium}</Td>
                                        <Td>{cornea.evaluation.approval}</Td>
                                        <Td>
                                            {cornea.evaluation.approval === 'yes'
                                                ? cornea.evaluation.suiatablity
                                                : cornea.evaluation.reason}
                                        </Td>
                                        <Td className='text-center ml-3 text-blue-600'>
                                            <Link to={`/medicaldirectordashboard/editevaluation/${cornea._id}`}>
                                                <EditIcon />
                                            </Link>
                                        </Td>
                                        <Td className='text-center ml-3 text-red-600'>
                                            <button onClick={() => deleteCornea(cornea._id)}>
                                                <DeleteIcon />
                                            </button>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default ViewTissue;