import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";

const ListOfPlege = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const toast = useToast();
    const { t } = useTranslation();
    const cancelRef = useRef();

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const response = await axios.get("http://localhost:4000/donor");
                const donordata = response.data;
                if (donordata && donordata.length > 0) {
                    setLoading(true);
                    setDonors(donordata);
                } else {
                    toast({
                        title: "Empty Array",
                        description: "Array is empty.",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                }
            } catch (error) {
                toast({
                    title: "Error Occurred!",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        };

        fetchDonor();
    }, [toast]);

    const onClose = () => setIsOpen(false);

    const onOpen = (id) => {
        setIsOpen(true);
        setDeleteId(id);
    };
    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of Plege Donor
                </Text>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>S.No</Th>
                            <Th>Name</Th>
                            <Th> Email</Th>
                            <Th>City</Th>
                            <Th>Mobile</Th>
                            <Th colSpan={3}>Operations</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {donors.filter((donor)=>(donor.verified===true) && donor.donate===false)
                        
                        .map((donor, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{donor.name}</Td>
                                <Td>{donor.email}</Td>
                                <Td>{donor.city}</Td>
                                <Td>{donor.mobile}</Td>
                                <Td>{<Link to={`/labtechnicaldashboard/createExams/${donor._id}`}>Donate</Link>}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div >
    )
}
export default ListOfPlege;
