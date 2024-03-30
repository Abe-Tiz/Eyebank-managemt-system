// TableHeader.js
import React from "react";
import { useTranslation } from "react-i18next";

const TableHeader = () => {
  const { t } = useTranslation();

  return (
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
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          {t("donor:donorAction")}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
