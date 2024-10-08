// TableRow.js
import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const TableRow = ({ cornea, formatTimestamp, deleteCornea }) => (
    <Tr className="mb-2 text-lg">
        <Td>{cornea.lotNo}</Td>
        <Td>{formatTimestamp(cornea.createdAt)}</Td>
        <Td>{cornea.recoveryTechnical}</Td>
        <Td>{cornea.position}</Td>
        <Td>{cornea.lens}</Td>
        <Td>{cornea.clarity}</Td>
        <Td> {cornea.size}</Td>
        <Td> {cornea.eyeLid}</Td>
        <Td> {cornea.irisColor}</Td>
        <Td>
            {" "}
            {cornea.expirationDate < 14
                ? `${14 - cornea.expirationDate} Day Left`
                : "Expired"}
        </Td>
        <Td className="text-blue-600" >
            <Link to={`/labtechnicaldashboard/editcornea/${cornea._id}`}>
                <EditIcon />
            </Link>
        </Td > {" "}
        <Td className="text-center">
            <button className="text-red-600" onClick={() => deleteCornea(cornea._id)}>
                <DeleteIcon />
            </button>
        </Td>
    </Tr>
);

export default TableRow;
