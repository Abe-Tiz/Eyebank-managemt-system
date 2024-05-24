
import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Row = ({ cornea }) => {
  const { t } = useTranslation();
  return(
    <Tr key={cornea._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <Td>{cornea.lotNo}</Td>
      <Td>{cornea.position}</Td>
      <Td>{cornea.clarity}</Td>
      <Td> {cornea.size}</Td>
      <Td> {cornea.eyeLid}</Td>
      <Td> {cornea.irisColor}</Td>

      <Td className=" text-center ">
        <Link
          className="text-blue-600"
          to={`/labtechnicaldashboard/testserology/${cornea._id}`}
        >
          {t('serology:test')}
        </Link>
      </Td>
    </Tr>
  )
};

export default Row;
