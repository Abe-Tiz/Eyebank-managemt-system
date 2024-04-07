import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

const RequestedCorneas = () => {
  const toast = useToast();
  const [requestedCorneas, setRequestedCorneas] = useState([]);
  useEffect(() => {
    const getAllRequestedCorneas = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/requestCornea/getRequest"
        );
        setRequestedCorneas(data);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      }
    };

    getAllRequestedCorneas();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/requestCornea/delete-request/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:4000/requestCornea/approve/${id}`);
      // await axios.put(`http://localhost:4000/corneaRequest/approve/${id}`);
      setRequestedCorneas(
        requestedCorneas.map((p) =>
          p._id === id ? { ...p, isApproved: true } : p
        )
      );
      toast({
        title: "Requste Approved",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <div className="m-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
            {" "}
            <tr>
              <th scope="col" className="px-6 py-3">
                Surgeon
              </th>
              <th scope="col" className="px-6 py-3">
                Hospital
              </th>
              <th scope="col" className="px-6 py-3">
                Request
              </th>
              <th scope="col" className="px-6 py-3">
                Approve
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requestedCorneas.map((request) => (
              <tr
                key={request.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {" "}
                      {request.surgeon?.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{request.hospital?.hospitalName}</td>
                <td className="px-6 py-4">{request.descriptionOfRequest}</td>
                <td className="px-6 py-4">
                    {request.isApproved ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                       approved
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full "></div>
                        waitting
                      </div>
                    )}
                  </td>

                <td className="flex px-6 py-4">
                  <Link
                    to={`/medicaldirectordashboard/editRequestCornea/${request._id}`}
                    className="flex items-center bg-transparent border-2 p-1  mr-5 font-medium text-white dark:text-blue-500 hover:bg-orange-700 hover:border-orange-700"
                  >
                    <RiEdit2Line size={20} color="#000" className="mr-2" />
                    {/* {t("common:updateButtonLabel")} */}
                  </Link>
                  <button
                    className="flex items-center bg-transparent border-2 p-1 font-medium text-white dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
                    onClick={() => handleDelete(request._id)}
                  >
                    <RiDeleteBin2Line size={20} color="red" className="mr-2" />
                    {/* {t("common:deleteButtonLabel")} */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestedCorneas;
