import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer, Input, Button, useTableStyles } from '@chakra-ui/react';

const ListOfPlege = () => {
    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
                    setFilteredDonors(donordata);
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

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = donors.filter((donor) =>
            donor.name.toLowerCase().includes(term)
        );
        setFilteredDonors(filtered);
    };

    return (
        <div>
            <TableContainer>
                <Text fontSize='3xl' className='text-center bg-teal-600 text-white mt-0'>
                    List of Plege Donor
                </Text>
                <div className="flex justify-end mb-4">
                    <Input
                        placeholder="Search by name"
                        w="250px"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border-4 border-blue"
                    />
                </div>
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
                        {filteredDonors.filter((donor) => (donor.verified === true) && donor.donate === false)
                            .map((donor, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{donor.name}</Td>
                                    <Td>{donor.email}</Td>
                                    <Td>{donor.city}</Td>
                                    <Td>{donor.mobile}</Td>
                                    <Td>{<Link to={`/labtechnicaldashboard/createExams/${donor._id}`} className="w-48 px-3 py-2 border-2 rounded bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700">donate</Link>}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
                {filteredDonors.length === 0 && (
                    <div className="flex justify-end mt-4">

                        {<Link to={`/labtechnicaldashboard/createExams`} className="w-24 px-3 py-2 border-2 rounded bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700">Add New</Link>}

                    </div>
                )}
            </TableContainer>
        </div>
    );
};

export default ListOfPlege;