import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useSearch from "../../useHooks/useSearch";
import DonorTable from "./DonorTable";
import SearchComponent from "../../components/SearchComponent";
import DeleteAlertDialog from './../../components/DeleteAlertDialog';
import LoadingCircle from "../../components/LoadingCircle";

const DisplayDonor = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const toast = useToast();
    const { t } = useTranslation();
    const cancelRef = useRef();
    const { searchTerm, handleChange, data, error } = useSearch("donor");

     const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      // Calculate the total number of pages
      const totalPages = Math.ceil(donors.length / itemsPerPage);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentCorneas = donors.slice(indexOfFirstItem, indexOfLastItem);

      // Function to change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // fetch donors
    const fetchDonor = async () => {
        try {
            const response = await axios.get("https://eyebank-backend-2.onrender.com/donor");
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

    useEffect(() => {
        fetchDonor();
    }, [toast]);

    const onClose = () => setIsOpen(false);

    const onOpen = (id) => {
        setIsOpen(true);
        setDeleteId(id);
    };


    // handle delete donor
    const handleDelete = async () => {
        try {
            await axios.delete(`https://eyebank-backend-2.onrender.com/donor/delete/${deleteId}`);
            setDonors(donors.filter((donor) => donor._id !== deleteId));
            toast({
                title: "Donor Deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } finally {
            onClose();
        }
    };

    // activate donor
    const handleActivate = async (id) => {
        try {
            await axios.put(`https://eyebank-backend-2.onrender.com/donor/activate/${id}`);
            setDonors(
                donors.map((donor) =>
                    donor._id === id ? { ...donor, verified: true } : donor
                )
            );
            toast({
                title: "Donor Activated",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
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

    return (
        <>
            <div className="w-full mt-2 flex justify-end ">
                {/* search component */}
                <SearchComponent searchTerm={searchTerm} handleChange={handleChange} />
            </div>

            {/* donor table */}
            {loading ? (
                <DonorTable
                    donors={donors}
                    handleActivate={handleActivate}
                    onOpen={onOpen}
                    donor={data}
                    searchTerm={searchTerm}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    paginate={paginate}
                    currentCorneas={currentCorneas}
                />
            ) : (
                <LoadingCircle />
            )}

            {/* confirmation alert */}
            <DeleteAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                handleDelete={handleDelete}
                t={t}
            />
        </>
    );
};

export default DisplayDonor;
