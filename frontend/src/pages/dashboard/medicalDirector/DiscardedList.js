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

const DiscardedList = () => {
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
                const response = await axios.get('https://eyebank-backend-2.onrender.com/cornea/read');
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
            await axios.delete(`https://eyebank-backend-2.onrender.com/cornea/delete/${id}`);
            setCorneas(corneas.filter((cornea) => cornea._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <div>
        <div className="text-center mt-1">
          <TableContainer>
            {/* <Text fontSize='3xl' className='text-center text-black mt-0 mb-4'>
                        <span> List of evaluated cornea </span>
                    </Text> */}
            <Table variant="simple">
              <Thead className="bg-blue-300">
                <Tr>
                  <Th>S.No</Th>
                  <Th>LotNo</Th>
                  <Th>Date</Th>
                  <Th>Evaluater</Th>
                  <Th>Approval</Th>
                  <Th>Reason</Th>
                  <Th colSpan={2}>Operations</Th>
                </Tr>
              </Thead>
              <Tbody>
                {corneas
                  .filter(
                    (cornea) =>
                      cornea.evaluation && cornea.evaluation.approval === "no"
                  )
                  .map((cornea, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{cornea.lotNo}</Td>
                      <Td>
                        {formatTimestamp(cornea.evaluation.evaluationDate)}
                      </Td>
                      <Td>{cornea.evaluation.evaluater}</Td>
                      <Td>{cornea.evaluation.approval}</Td>
                      <Td>{cornea.evaluation.reason}</Td>

                      <Td className="text-center ml-3 text-blue-600">
                        <Link
                          to={`/medicaldirectordashboard/editevaluation/${cornea._id}`}
                        >
                          <EditIcon />
                        </Link>
                      </Td>
                      <Td className="text-center ml-3 text-red-600">
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

export default DiscardedList;