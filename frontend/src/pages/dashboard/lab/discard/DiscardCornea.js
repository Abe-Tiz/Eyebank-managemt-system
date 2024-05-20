import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from "@chakra-ui/react";
import useSearch from "../../../../useHooks/useSearch";
import SearchComponent from "../../../../components/SearchComponent";
import CommonTablHeader from "../serology/CommonTablHeader";
import Row from "../serology/Row";
import NotFound from "../../../../components/NotFound";
import Pagination from "../../../../components/Pagination";
import LoadingCircle from "../../../../components/LoadingCircle";
import DiscardRow from "./DiscardRow";


const DiscardCornea = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { searchTerm, handleChange, data, error } = useSearch("cornea");
  const navigate = useNavigate();
  const [corneas, setCorneas] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the total number of pages
  const totalPages = Math.ceil(corneas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCorneas = corneas.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cornea/read");
        const cornData = response.data;
        const filteredCorneas = cornData.filter(
          (cornea) =>
            cornea.isDiscarded === true
        );
        setCorneas(filteredCorneas);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderCornea = searchTerm ? data : currentCorneas;
 
   console.log("discarded:", renderCornea);
  return (
    <div>
      <TableContainer>
        <div className="w-full mt-2 flex justify-between ">
          <Text fontSize="3xl" className="text-center text-black mt-0 mb-4">
            List of collected cornea
          </Text>
          {/* search component */}
          <SearchComponent
            searchTerm={searchTerm}
            handleChange={handleChange}
          />
        </div>
        <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          {!loading ? (
            <>
              <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table header */}
                <CommonTablHeader
                  first="LotNo"
                  second="Position"
                  third="Clarity"
                  forth="Size"
                  fifth="Eye Lid"
                  six="Reason"
                />
                {/* Table body */}
                <tbody>
                  {renderCornea ? (
                    renderCornea.map((cornea, index) => (
                      <DiscardRow key={index} cornea={cornea} />
                    ))
                  ) : (
                    <NotFound />
                  )}
                </tbody>
              </Table>
              {/* Pagination Controls */}
              {renderCornea && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  paginate={paginate}
                />
              )}
            </>
          ) : (
            <LoadingCircle />
          )}
        </div>
      </TableContainer>
    </div>
  );
};

export default DiscardCornea;
