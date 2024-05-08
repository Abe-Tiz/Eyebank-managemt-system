
import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Row = ({ cornea }) => (
  <Tr key={cornea._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <Td>{cornea.lotNo}</Td>
    <Td>{cornea.position}</Td>
    <Td>{cornea.clarity}</Td>
    <Td> {cornea.size}</Td>
    <Td> {cornea.eyeLid}</Td>
    <Td> {cornea.irisColor}</Td>

    <Td className=" text-center ">
      <Link
        className="text-blue-600"
        to={`/labtechnicaldashboard/testserology/${cornea._id}`}
      >
        Test
      </Link>
    </Td>
  </Tr>
);

export default Row;
