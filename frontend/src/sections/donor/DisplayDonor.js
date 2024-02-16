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
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";

const DisplayDonor = () => {
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
          console.log("Array is empty.");
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

  // delete donor
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

  return (
    <>
      {loading ? (
        <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {t("register:LabelsignUpName")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("donor:donorCity")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("donor:donorMobile")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("donor:donorAction")}
                </th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr
                  key={donor._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {donor.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {donor.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{donor.city}</td>
                  <td className="px-6 py-4">{donor.mobile}</td>
                  <td className="flex px-6 py-4">
                    <Link
                      to={`/adminDashboard/edit/${donor._id}`}
                      className="flex items-center bg-transparent border-2 p-1  mr-5 font-medium text-white dark:text-blue-500 hover:bg-orange-700 hover:border-orange-700"
                    >
                      <RiEdit2Line size={20} color="#000" className="mr-2" />
                    </Link>
                    <button
                      onClick={() => onOpen(donor._id)}
                      className="flex items-center bg-transparent  border-2 p-1 font-medium text-white dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
                    >
                      <RiDeleteBin2Line
                        size={20}
                        color="#000"
                        className="mr-2"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
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
