import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

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

  return (
    <div>
      <TableContainer>
        <Text
          fontSize="3xl"
          className="text-center bg-teal-600 text-white mt-0"
        >
          List of collected cornea
        </Text>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Ser.No</Th>
              <Th>Recovery Date</Th>
              <Th>Recovery Site</Th>
              <Th>Recovery Technical</Th>
              <Th>Serology Test</Th>
              <Th>Covid</Th>
              <Th colSpan={2}>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {corneas.map((cornea, index) => (
              <Tr key={index}>
                <Td>{cornea.dateOfRecovery}</Td>
                <Td>{cornea.recoverySite}</Td>
                <Td>{cornea.recoveryTechnical}</Td>
                <Td>{cornea.serologyTest}</Td>
                <Td>{cornea.covid}</Td>
                <Td>Edit</Td>
                <Td>Delete</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewCornea;
