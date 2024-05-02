import React from "react";
import { Link } from "react-router-dom";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import useSearch from "../useHooks/useSearch";

const TableBody = ({ donors, donor, handleActivate, onOpen, searchTerm,currentCorneas }) => {
  const renderDonors = searchTerm ? donor : currentCorneas;
  // console.log("search term", searchTerm);
  // console.log("donor", renderDonors);

  return (
    <tbody>
      {renderDonors.map((donor) => (
        <tr
          key={donor._id}
          className="bg-base-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div className="ps-3">
              <div className="text-base font-semibold">{donor.name}</div>
              <div className="font-normal text-gray-500">{donor.email}</div>
            </div>
          </th>
          <td className="px-6 py-4">{donor.city}</td>
          <td className="px-6 py-4">{donor.mobile}</td>
          <td className="px-6 py-4">
            {donor.verified ? (
              <p className="hover:bg-base-200 text-blue-700 px-4 py-2 rounded font-bold">
                Active
              </p>
            ) : (
              <button
                onClick={() => handleActivate(donor._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Pending
              </button>
            )}
          </td>
          <td className="flex px-6 py-4">
            <Link
              to={`/adminDashboard/edit/${donor._id}`}
              className="flex items-center bg-transparent border-2 p-1  mr-5 font-medium text-white dark:text-blue-500 hover:bg-orange-700 hover:border-orange-700"
            >
              <RiEdit2Line size={20} color="#000" className="mr-2" />
            </Link>
            <button
              onClick={() => onOpen(donor._id)}
              className="flex items-center bg-transparent border-2 p-1 font-medium text-white dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
            >
              <RiDeleteBin2Line size={20} color="#000" className="mr-2" />
            </button>
           
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
