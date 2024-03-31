// TableHeader.js
import React from "react";
import { useTranslation } from "react-i18next";

const TableHeader = ({name,city,mobile,status,action}) => {
  const { t } = useTranslation();

  return (
    <thead className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          {name}
        </th>
        <th scope="col" className="px-6 py-3">
          {city}
        </th>
        <th scope="col" className="px-6 py-3">
          {mobile}
        </th>
        <th scope="col" className="px-6 py-3">
          {status}
        </th>
        <th scope="col" className="px-6 py-3">
          {action}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
