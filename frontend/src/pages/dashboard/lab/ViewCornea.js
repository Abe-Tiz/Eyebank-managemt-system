import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon, HStack,
    TagCloseButton,
} from '@chakra-ui/react'
import { Button, ButtonGroup, WrapItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tr, Th, Td, Text, TableContainer } from '@chakra-ui/react';
import useSearch from '../../../useHooks/useSearch';
import SearchComponent from '../../../components/SearchComponent';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from '../../../components/Pagination';

const ViewCornea = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
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
        const response = await axios.get("http://localhost:4000/cornea/read");
        const data = response.data;
        // console.log("cornea:", data);
        setCorneas(data);
        // setExpirationDate(new Date(data.expirationDate));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleEvaluated = async () => {
    setIsButtonClicked(true);
  };

  const deleteCornea = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cornea/delete/${id}`);
      setCorneas(corneas.filter((cornea) => cornea._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderCornea = searchTerm ? data : currentCorneas;
  // console.log("cornea:", renderCornea);
  return (
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
            {/* <Thead>
              <Tr className="bg-sky-600 text-white">
                <Th className="text-white">LotNo</Th>
                <Th className="text-white">Date</Th>
                <Th className="text-white"> Technical</Th>
                <Th className="text-white">Position</Th>
                <Th className="text-white">Lens</Th>
                <Th className="text-white">Clarity</Th>
                <Th className="text-white">Size</Th>
                <Th className="text-white">Eye Lid</Th>
                <Th className="text-white">Iris Color</Th>
                <Th className="text-white">Exiption Date</Th>
                <Th className="text-white" colSpan={3}>
                  Operations
                </Th>
              </Tr>
            </Thead> */}
            <TableHeader />
            <Tbody>
              {renderCornea.map((cornea, index) => (
                <TableRow
                  key={index}
                  cornea={cornea}
                  formatTimestamp={formatTimestamp}
                  deleteCornea={deleteCornea}
                />
              ))}
            </Tbody>
          </Table>

          {/* Pagination Controls */}
          {/* <div className="pagination">
            <ButtonGroup isAttached variant="outline">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn"
                disabled={currentPage === 1 ? "disabled" : null}
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number + 1 ? "solid" : "outline"}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn"
                disabled={currentPage === totalPages ? "disabled" : null}
              >
                Next
              </button>
            </ButtonGroup>
          </div> */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default ViewCornea;