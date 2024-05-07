// TableHeader.js
import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

const TableHeader = () => (
  <Thead className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
    <Tr  >
      <Th  scope="col" className="px-6 py-3">LotNo</Th   >
      <Th  scope="col" className="px-6 py-3">Technical</Th>
      <Th  scope="col" className="px-6 py-3">Position</Th>
      <Th  scope="col" className="px-6 py-3">Suitablity</Th>
      {/* <Th >Clarity</Th>
            <Th >Size</Th>
            <Th >Eye Lid</Th> */}
      <Th  scope="col" className="px-6 py-3">Iris Color</Th>
      <Th  scope="col" className="px-6 py-3">Expiration Date</Th>
      <Th  scope="col" className="px-6 py-3" colSpan={3}>Operations</Th>
    </Tr>
  </Thead>
);

export default TableHeader;
