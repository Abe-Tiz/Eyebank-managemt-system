// TableRow.js
import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const TableRowCornea = ({ cornea, formatTimestamp, deleteCornea }) => (
  <Tr className="mb-2 text-lg">
    <Td>{cornea.lotNo}</Td>
    {/* <Td>{formatTimestamp(cornea.createdAt)}</Td> */}
    <Td>{cornea.recoveryTechnical}</Td>
    <Td>{cornea.position}</Td>
    <Td>{cornea.evaluation.suiatablity}</Td>
    {/* <Td>{cornea.clarity}</Td>
    <Td> {cornea.size}</Td>
    <Td> {cornea.eyeLid}</Td> */}
    <Td> {cornea.irisColor}</Td>
    <Td>
      {" "}
      {cornea.expirationDate < 14
        ? `${14 - cornea.expirationDate} Day Left`
        : "Expired"}
    </Td>
    <Td className=" text-center ">
      <Link
        className="text-blue-600"
        to={`/labtechnicaldashboard/editcornea/${cornea._id}`}
      >
        <EditIcon className="text-blue-600" />
      </Link>
      {/* <Link
        className="text-blue-600"
        to={`/labtechnicaldashboard/serology/${cornea._id}`}
      >
        Test
      </Link> */}
    </Td>
  </Tr>
);

export default TableRowCornea;
