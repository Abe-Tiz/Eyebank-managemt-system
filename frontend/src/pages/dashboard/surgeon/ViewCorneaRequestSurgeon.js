import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
const RequestedCorneas = () => {
  const toast = useToast();
  const [requestedCorneas, setRequestedCorneas] = useState([]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllRequestedCorneas = async () => {
      try {
        const surgeonId = localStorage.getItem("surgeonId"); // Retrieve the surgeon ID from local storage
  
        const response = await axios.get(
          "http://localhost:4000/requestCornea/getRequest",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              surgeonId: surgeonId, // Pass the surgeon ID as a query parameter
            },
          }
        );
  
        const data = response.data;
        setRequestedCorneas(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getAllRequestedCorneas();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/requestCornea/delete-request/${id}`
      );
      setRequestedCorneas(
        requestedCorneas.filter((request) => request._id !== id)
      );
      toast({
        title: "Request deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/surgondashboard/viewRequestedCornea");
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:4000/requestCornea/approve/${id}`);
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
              No
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
            {requestedCorneas
            .filter((request) => request.isGetCornea === false)
            .map((request, index) => (
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
                      {index +1}
                      {/* {request.surgeon?.name} */}
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
                    to={`/surgondashboard/EditRequest/${request._id}`}
                    className="flex items-center bg-transparent border-2 p-1  mr-5 font-medium text-white dark:text-blue-500 hover:bg-orange-700 hover:border-orange-700"
                  >
                    <RiEdit2Line size={20} color="#000" className="mr-2" />
                  </Link>

                  <Button colorScheme="red" onClick={onOpen}>
                    <DeleteIcon />
                  </Button>
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Delete request
                        </AlertDialogHeader>
                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              handleDelete(request._id);
                              onClose();
                            }}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
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
