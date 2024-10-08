import {
  Table,
  TableContainer,
  Tbody,
  Text,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import SearchComponent from "../../../../components/SearchComponent";
import TableHeader from "../TableHeader";
import TableRow from "./TableRow";
import Pagination from "../../../../components/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSearch from "../../../../useHooks/useSearch";
import { Th } from "@chakra-ui/react";
import DeleteAlertDialog from "../../../../components/DeleteAlertDialog";
import { useTranslation } from "react-i18next";
import LoadingCircle from "./../../../../components/LoadingCircle";
import NotFound from "../../../../components/NotFound";
import CommonTablHeader from "./CommonTablHeader";

const ListSerology = () => {
  const { searchTerm, handleChange, data, error } = useSearch("blood");
  const navigate = useNavigate();
  const [blood, setBlood] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const toast = useToast();
  const { t } = useTranslation();
  const cancelRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil(blood.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCorneas = blood.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleString("en-US", options);
  }
  function formatExiryDate(expiryDate) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(expiryDate).toLocaleString("en-US", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://eyebank-backend-2.onrender.com/blood");
        const samplData = response.data;
        // console.log("sample::", data);
        setBlood(samplData);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onClose = () => setIsOpen(false);

  const onOpen = (id) => {
    setIsOpen(true);
    setDeleteId(id);
  };

  const deleteSerology = async () => {
    try {
      const response = await axios.delete(
        `https://eyebank-backend-2.onrender.com/blood/delete/${deleteId}`
      );
      // setBlood(blood.filter((cornea) => cornea._id !== id));
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const renderCornea = searchTerm ? data : currentCorneas;

  // console.log("serached:::", data);
  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
        <div>
          <TableContainer>
            <div className="w-full mt-2 flex justify-between ">
              <Text fontSize="3xl" className="text-center text-black mt-0 mb-4">
                {t("serology:testedTitle")}
              </Text>
              {/* search component */}
              <SearchComponent
                searchTerm={searchTerm}
                handleChange={handleChange}
              />
            </div>
            <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
              <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table header */}
                <CommonTablHeader
                  // eight="Name"
                  first={t("serology:bloodtype")}
                  second={t("serology:position")}
                  third={t("donor:statusLabel")}
                  forth={t("serology:eyelid")}
                  fifth={t("serology:lotnumber")}
                  six={t("serology:tested")}
                  seven={t("donor:donorAction")}
                />

                {/* Table body */}
                <Tbody>
                  {renderCornea ? (
                    renderCornea.map((blood, index) => (
                      <TableRow
                        key={index}
                        blood={blood}
                        formatTimestamp={formatTimestamp}
                        // deleteCornea={deleteSerology}
                        onOpen={onOpen}
                      />
                    ))
                  ) : (
                    <NotFound />
                  )}
                </Tbody>
              </Table>

              {/* Pagination Controls */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                paginate={paginate}
              />
            </div>
          </TableContainer>

          {/* confirmation alert */}
          <DeleteAlertDialog
            isOpen={isOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            handleDelete={deleteSerology}
            t={t}
          />
        </div>
      )}
    </>
  );
};

export default ListSerology;
