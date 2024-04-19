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

const ListSerology = () => {
  const { searchTerm, handleChange, data, error } = useSearch("blood");
  const navigate = useNavigate();
  const [blood, setBlood] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
        const response = await axios.get("http://localhost:4000/blood");
        const data = response.data;
        // console.log("cornea:", data);
        setBlood(data);
        // setExpirationDate(new Date(data.expirationDate));
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
        `http://localhost:4000/blood/delete/${deleteId}`
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

  console.log("blood:", blood);
  return (
    <>
      <div>
        <TableContainer>
          <Text fontSize="3xl" className="text-center text-black mt-0 mb-4">
            List of collected cornea
          </Text>
          <div className="w-full mt-2 flex justify-end ">
            {/* search component */}
            <SearchComponent
              searchTerm={searchTerm}
              handleChange={handleChange}
            />
          </div>
          <div>
            <Table variant="simple">
              {/* Table header */}
              <Thead>
                <Tr className="bg-sky-600 text-white">
                  <Th className="text-white">ID</Th>
                  <Th className="text-white">Blood Type</Th>
                  <Th className="text-white">Tested</Th>
                  <Th className="text-white" colSpan={3}>
                    Action
                  </Th>
                </Tr>
              </Thead>

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
                  <LoadingCircle />
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
    </>
  );
};

export default ListSerology;
