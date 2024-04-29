// TableHeader.js
import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

const TableHeader = () => (
    <Thead>
        <Tr className="bg-gray-200 ">
            <Th >LotNo</Th>
            <Th >Date</Th>
            <Th >Technical</Th>
            <Th >Position</Th>
            <Th >Lens</Th>
            <Th >Clarity</Th>
            <Th >Size</Th>
            <Th >Eye Lid</Th>
            <Th >Iris Color</Th>
            <Th >Expiration Date</Th>
            <Th colSpan={3}>
                Operations
            </Th>
        </Tr>
    </Thead >
);

export default TableHeader;
