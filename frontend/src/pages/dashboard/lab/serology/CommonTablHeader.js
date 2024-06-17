// TableHeader.js
import React from "react";
import { useTranslation } from "react-i18next";

const CommonTablHeader = ({eight, first, second, third, forth, fifth,six,seven }) => {
  const { t } = useTranslation();

  return (
    <thead className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {/* <th scope="col" className="px-6 py-3">
          {eight}
        </th> */}
        <th scope="col" className="px-6 py-3">
          {first}
        </th>
        <th scope="col" className="px-6 py-3">
          {second}
        </th>
        <th scope="col" className="px-6 py-3">
          {third}
        </th>
        <th scope="col" className="px-6 py-3">
          {forth}
        </th>
        <th scope="col" className="px-6 py-3">
          {fifth}
        </th>
        <th scope="col" className="px-6 py-3">
          {six}
        </th>
        <th scope="col" className="px-6 py-3">
          {seven}
        </th>
      </tr>
    </thead>
  );
};

export default CommonTablHeader;
