import React from "react";
import TableHeader from "../../components/TableHeader";
import TableBody from "../../components/TableBody";
import { useTranslation } from "react-i18next";
import Pagination from "../../components/Pagination";

const DonorTable = ({
  donors,
  handleActivate,
  onOpen,
  donor,
  searchTerm,
  totalPages,
  currentPage,
  setCurrentPage,
  paginate,
  currentCorneas
}) => {
  //   console.log("search term ", searchTerm);
  //   console.log("donor ", donor);

  const { t } = useTranslation();
  return (
    <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* table header */}
        <TableHeader
          name={t("register:LabelsignUpName")}
          city={t("donor:donorCity")}
          mobile={t("donor:donorMobile")}
          status="Status"
          action={t("donor:donorAction")}
        />

        {/* table body */}
        <TableBody
          donors={donors}
          handleActivate={handleActivate}
          onOpen={onOpen}
          donor={donor}
          searchTerm={searchTerm}
          currentCorneas={currentCorneas}
        />
      </table>
      {/* Pagination Controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default DonorTable;
