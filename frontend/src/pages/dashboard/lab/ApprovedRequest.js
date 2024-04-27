
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@chakra-ui/react";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

const ApprovedRequest = () => {
    const toast = useToast();
    const [requestedCorneas, setRequestedCorneas] = useState([]);
    useEffect(() => {
        const getAllRequestedCorneas = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/requestCornea/getRequests"
                );
                setRequestedCorneas(data);
            } catch (error) {
                console.log(error);
                toast.error("Something Went Wrong");
            }
        };

        getAllRequestedCorneas();
    }, []);
    const navigate = useNavigate();

    // const handleApprove = async (id) => {
    //     try {
    //         await axios.put(http://localhost:4000/requestCornea/approve/${id});
    //         setRequestedCorneas(
    //             requestedCorneas.map((p) =>
    //                 p._id === id ? { ...p, isApproved: true } : p
    //             )
    //         );
    //         toast({
    //             title: "Requste Approved",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top",
    //         });
    //     } catch (error) {
    //         toast({
    //             title: "Error Occurred!",
    //             description: error.message,
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "top",
    //         });
    //     }
    // };

    const handleDistribute = async (id, suiatablity) => {
        try {
            const params = {
                suiatablity: suiatablity,
            };
            const queryString = new URLSearchParams(params).toString();


            const url = `/labtechnicaldashboard/distributeCornea/${id}?${queryString}`;
            navigate(url);
        } catch (error) {
            console.error("Failed to distribute cornea:", error);
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
                                Suiatablity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Discribtion
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Distribute
                            </th>


{/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {requestedCorneas
                            .filter((request) => request.distribute === false && request.isApproved === true)
                            .map((request, index) => (
                                <tr
                                    key={index}
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
                                    <td className="px-6 py-4">{request.suiatablity}</td>
                                    <td className="px-6 py-4">{request.descriptionOfRequest}</td>
                                    <td>
                                        {request.distribute === true ? (
                                            <p className="text-green-500 font-bold">Distributed</p>
                                        ) : (
                                            <Button
                                                colorScheme="blue"
                                                onClick={() => handleDistribute(request._id, request.suiatablity)}
                                            >
                                                distribute
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default ApprovedRequest;