// TableRow.js
import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Row = ({ cornea }) => (
  <Tr className="mb-2 text-lg">
    <Td>{cornea.lotNo}</Td>
    <Td>{cornea.position}</Td>
    <Td>{cornea.clarity}</Td>
    <Td> {cornea.size}</Td>
    <Td> {cornea.eyeLid}</Td>
    <Td> {cornea.irisColor}</Td>
    <Td>
      <Link
        to={`/labtechnicaldashboard/test-serology/${cornea._id}`}
        className=" flex items-center text-white bg-sky-700 border-2 rounded p-3 font-medium dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
      >
        Test
      </Link>
    </Td>
  </Tr>
);

export default Row;
