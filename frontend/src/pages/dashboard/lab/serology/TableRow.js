// TableRow.js
import React from "react";
import { Tr, Td, Link } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DynamicIcon from "../../../../components/DynamicIcon";

const TableRow = ({ blood, onOpen, deleteCornea }) => (
  <Tr className="mb-2 text-lg">
    {/* <Td>{blood._id}</Td> */}
    <Td>{blood.bloodType}</Td>
    <Td>{blood.tests.join(", ")}</Td>
  

    {/* <Td className="text-center">
      <Link to={`/labtechnicaldashboard/editcornea/${blood._id}`}>
        <EditIcon />
      </Link>
    </Td> */}
    <Td className="text-center">
      <button onClick={() => onOpen(blood._id)}>
        <DynamicIcon library="md" iconName="MdDelete" className="text-2xl text-red-400" />
      </button>
    </Td>
  </Tr>
);

export default TableRow;
