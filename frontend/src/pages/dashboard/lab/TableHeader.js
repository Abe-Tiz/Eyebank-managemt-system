// TableHeader.js
import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

const TableHeader = () => (
  <Thead>
    <Tr className="bg-sky-600 text-white">
      <Th className="text-white">LotNo</Th>
      <Th className="text-white">Date</Th>
      <Th className="text-white">Technical</Th>
      <Th className="text-white">Position</Th>
      <Th className="text-white">Lens</Th>
      <Th className="text-white">Clarity</Th>
      <Th className="text-white">Size</Th>
      <Th className="text-white">Eye Lid</Th>
      <Th className="text-white">Iris Color</Th>
      <Th className="text-white">Expiration Date</Th>
      <Th className="text-white" colSpan={3}>
        Operations
      </Th>
    </Tr>
  </Thead>
);

export default TableHeader;
