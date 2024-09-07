import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RequestedCorneas = () => {
  const [requestedCorneas, setRequestedCorneas] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  useEffect(() => {
    const getAllRequestedCorneas = async () => {
      try {
        const { data } = await axios.get(
          "https://eyebank-backend-2.onrender.com/requestCornea/getRequest"
        );
        setRequestedCorneas(data);

        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      }
    };

    getAllRequestedCorneas();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`https://eyebank-backend-2.onrender.com/requestCornea/delete-request/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleApprove = (id) => {
    // Make the necessary API request to update the isApprove attribute
    // For example, using axios:
    
    axios
      .put(`https://eyebank-backend-2.onrender.com/corneaRequest/update-corneaRequest/${id}`, {
        isApproved: true,
      })
      .then((res) => {
        console.log(res);
        setIsApproved(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row dashboard">
      <div className="col-md-9">
        <h1
          className="text-4xl text-center font-bold text-gray-800 mb-8"
          style={{
            borderBottom: "2px solid purple",
            letterSpacing: "2px",
            textTransform: "capitalize",
          }}
        >
          All Requested Corneas
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Surgeon Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Hospital Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Description of Request
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                Is Approved
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(requestedCorneas) &&
                requestedCorneas.map((p, index) => (
                  <tr
                    key={p._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {p.surgeon?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {p.hospital?.hospitalName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {p.descriptionOfRequest}
                    </td>
                    <td className="px-2 py-2 whitespace-no-wrap text-right border-b border-gray-300">
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                        disabled={isApproved} // Disable the button if already approved
                      >
                        {isApproved ? "Approved" : "Approve"}
                      </button>
                      </td>
                      <td>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedCorneas;
