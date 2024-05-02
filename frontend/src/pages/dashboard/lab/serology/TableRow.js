// TableRow.js
import React from "react";
import { Tr, Td, Link } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DynamicIcon from "../../../../components/DynamicIcon";

const TableRow = ({ blood, onOpen }) => (
  <Tr className="mb-2 text-lg">
    {/* <Td>{blood._id}</Td> */}
    <Td>{blood.bloodType}</Td>
    <Td>{blood.cornId.position}</Td>
    <Td>{blood.cornId.corneaStatus}</Td>
    <Td>{blood.cornId.eyeLid}</Td>
    <Td>{blood.cornId.lotNo}</Td>
    <Td>{blood.tests.join(", ")}</Td>

    <Td className="text-center">
      <button onClick={() => onOpen(blood._id)}>
        <DynamicIcon
          library="md"
          iconName="MdDelete"
          className="text-2xl text-red-400"
        />
      </button>
    </Td>
  </Tr>
);

export default TableRow;
