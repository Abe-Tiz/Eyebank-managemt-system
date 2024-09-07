import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconButton, Button } from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmationModal from "./ConfirmationModal";
import SearchComponent from "../../../components/SearchComponent";
import useSearch from "../../../useHooks/useSearch";
import DynamicIcon from "../../../components/DynamicIcon";
const ViewHospital = () => {
    const [hospitals, setHospitals] = useState([]);
  const { searchTerm, handleChange, data, error } = useSearch("hospital");
    
  useEffect(() => {
        axios
            .get("https://eyebank-backend-2.onrender.com/hospital/read")
            .then((result) => setHospitals(result.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`https://eyebank-backend-2.onrender.com/hospital/delete/${id}`)
            .then((res) => {
                console.log(res);
                //window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const response = searchTerm ? data : hospitals;
    return (
      <>
        <div className="w-full px-5 mt-2 flex justify-between items-center ">
          <p>List of Hospitals Registred</p>

          {/* search component */}
          <SearchComponent
            searchTerm={searchTerm}
            handleChange={handleChange}
          />
        </div>
        <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  Type
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Hospital Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {response.map((hospital) => {
                return (
                  <tr
                    className="bg-base-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={hospital._id}
                  >
                    {/* <td className="px-6 py-4">{hospital.type}</td> */}
                    <td className="px-6 py-4">{hospital.hospitalName}</td>
                    <td className="px-6 py-4">{hospital.address}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <Link
                          to={`/adminDashboard/edit-hospital/${hospital._id}`}
                          className="btn"
                        >
                          <DynamicIcon
                            library="fa"
                            iconName="FaEdit"
                            className="text-2xl"
                          />
                        </Link>
                        <ConfirmationModal
                          id={hospital._id}
                          handleDelete={handleDelete}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default ViewHospital;