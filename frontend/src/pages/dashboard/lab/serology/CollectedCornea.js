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
import TableHeader from "../TableHeader";
import TableRowCornea from "../TableRowCornea";
import Pagination from "../../../../components/Pagination";
import Row from "./Row";
import NotFound from "../../../../components/NotFound";
import LoadingCircle from "../../../../components/LoadingCircle";
import CommonTablHeader from "./CommonTablHeader";
import { useTranslation } from "react-i18next";
// import NotFound from './../../../../components/NotFound';

const CollectedCornea = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
   const [loading, setLoading] = useState(true);
  const { searchTerm, handleChange, data, error } = useSearch("cornea");
  const navigate = useNavigate();
  const [corneas, setCorneas] = useState([]);
  const {t} = useTranslation()

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
        const response = await axios.get("https://eyebank-backend-2.onrender.com/cornea/read");
        const cornData = response.data;
        const filteredCorneas = cornData.filter(
          (cornea) =>
            cornea.isTested !== true &&
            cornea.expirationDate !== 14 &&
            cornea.isDiscarded !== true
        );
        setCorneas(filteredCorneas);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderCornea = searchTerm ? data : currentCorneas;
  const notTestCornes = renderCornea.filter((item) => item.isTested !== true);
  //  console.log("searched:", notTestCornes);
  return (
    <div>
      <TableContainer>
        <div className="w-full mt-2 flex justify-between ">
          <Text fontSize="xl" className="text-center text-black mt-0 mb-4">
            {t("serology:titleSerology")}
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
                  first={t("serology:lotnumber")}
                  second={t("serology:position")}
                  third={t("serology:clarity")}
                  forth={t("serology:size")}
                  fifth={t("serology:eyelid")}
                  six={t("serology:iriscolor")}
                  seven={t("donor:donorAction")}
                />
                {/* Table body */}
                <tbody>
                  {notTestCornes ? (
                    notTestCornes.map((cornea, index) => (
                      <Row key={index} cornea={cornea} />
                    ))
                  ) : (
                    <NotFound />
                  )}
                </tbody>
              </Table>
              {/* Pagination Controls */}
              {notTestCornes && (
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

export default CollectedCornea;
