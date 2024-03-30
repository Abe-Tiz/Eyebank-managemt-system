import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import useSearch from "../../useHooks/useSearch";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";


const DisplayDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toast = useToast();
  const { t } = useTranslation();
  const cancelRef = useRef();

  const { searchTerm, setSearchTerm, donor, error } = useSearch();

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/donor/delete/${deleteId}`);
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

  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:4000/donor/activate/${id}`);
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
      {loading ? (
        <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* table header */}
            <TableHeader />

            {/* table body */}
            <TableBody
              donors={donors}
              handleActivate={handleActivate}
              onOpen={onOpen}
            />
          </table>
        </div>
      ) : (
        <div className="text-center text-blue-500 font-semibold text-lg">
          Loading....
        </div>
      )}

      {/* confirmation alert */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("donor:deleteTitleDonor")}
            </AlertDialogHeader>

            <AlertDialogBody>{t("donor:deleteSubtitleDonor")}</AlertDialogBody>

            <AlertDialogFooter>
              <button
                ref={cancelRef}
                onClick={onClose}
                className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded mr-2"
              >
                {t("donor:deleteCancelDonor")}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                {t("common:deleteButtonLabel")}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DisplayDonor;
