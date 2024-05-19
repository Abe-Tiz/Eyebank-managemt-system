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

const StoredCornea = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const navigate = useNavigate();
    const [corneas, setCorneas] = useState([]);
    const [distributed, setdistribute] = useState(true);
    const data = {
        distributed,
    };
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
    const handleDistribute = async (id) => {
        try {
            // await axios.put(`http://localhost:4000/cornea/distribute/${id}`, data);
            navigate(`/labtechnicaldashboard/distributeCornea/${id}`);
        } catch (error) {
            console.error("Failed to collect physical exam:", error);
        }
    };
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
        <div className="text-center mt-0">
          <TableContainer>
            <Text
              fontSize="2xl"
              className="text-center font-bold text-black mt-0"
            >
              <span> List of evaluated cornea </span>
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr className="bg-sky-600 text-white">
                  <Th className="text-white">S.No</Th>
                  <Th className="text-white">LotNo</Th>
                  <Th className="text-white">Date</Th>
                  <Th className="text-white">Evaluater</Th>
                  <Th className="text-white">Suiatablity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {corneas
                  .filter(
                    (cornea) =>
                      cornea.evaluation.approval === "yes" &&
                      cornea.distributed === false
                  )
                  .map((cornea, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{cornea.lotNo}</Td>
                      <Td>
                        {formatTimestamp(cornea.evaluation.evaluationDate)}
                      </Td>
                      <Td>{cornea.evaluation.evaluater}</Td>
                      <Td>{cornea.evaluation.suiatablity}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
};

export default StoredCornea;