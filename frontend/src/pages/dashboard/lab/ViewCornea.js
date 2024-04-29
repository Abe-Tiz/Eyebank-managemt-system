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
import useSearch from "../../../useHooks/useSearch";
import SearchComponent from "../../../components/SearchComponent";
import TableHeader from "./TableHeader";
//import TableRowCornea from "./serology/TableRowCornea";
import Pagination from "../../../components/Pagination";
import TableRowCornea from "./TableRowCornea";

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
                const filteredCornea = data.filter((cornea) => cornea.expirationDate !== 14)
                setCorneas(filteredCornea);
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
            setCorneas(
              corneas.filter(
                (cornea) => cornea._id !== id 
              )
            );
        } catch (error) {
            console.error(error);
        }
    };
    // const editcornea = async (id) => {
    //     navigate(`/labtechnicaldashboard/editcornea/${id}`);
    // };
    const renderCornea = searchTerm ? data : currentCorneas;
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
                        {/* Table header */}
                        <TableHeader />
                        {/* Table body */}
                        <Tbody>
                            {renderCornea.map((cornea, index) => (
                                <TableRowCornea
                                    key={index}
                                    cornea={cornea}
                                    formatTimestamp={formatTimestamp}
                                    deleteCornea={deleteCornea}
                                // editcornea={editcornea}
                                />

                            ))}
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
        </div >
    );
};

export default ViewCornea;
