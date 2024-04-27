import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonComponent from "../../../components/ButtonComponent";
import { useNavigate, useParams } from "react-router-dom";

const EditRequest = () => {
  const navigate = useNavigate();
  const [descriptionOfRequest, setDescriptionOfRequest] = useState("");
  const [suiatablity, setSuiatablity] = useState("");
  const { id } = useParams();

  //get single request
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (!id) {
          toast.error("Id is Undefined", {
            duration: 5000,
            position: "top",
          });
          return;
        }
       
        const { data } = await axios.get(`http://localhost:4000/requestCornea/getRequest/${id}`);
        setDescriptionOfRequest(data.descriptionOfRequest);
        setSuiatablity(data.suiatablity);
      } catch (error) {
        toast.error(error.response.data.message, {
          duration: 5000,
          position: "top",
        });
      }
    };
    fetchRequest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!descriptionOfRequest) {
        toast.warning("Please Fill all the Fields", {
          duration: 5000,
          position: "top",
        });
        return;
      }

      await axios.put(
        `http://localhost:4000/requestCornea/updateRequest/${id}`,
        {
          descriptionOfRequest,
          suiatablity,
        }
      );

      toast.success("Updated successfully", {
        duration: 5000,
        position: "top",
      });
      navigate("/surgondashboard/viewRequestedCornea");
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 5000,
        position: "top",
      });
    }
  };

 
  return (
    <>
      <div className="container">
        <div className="login-form ml-1 mt-1 w-3/5">
          <h3 className="title text-3xl font-bold text-center mb-4 text-sky-700">
           Update Request
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9">
           
            <label>
              <select
                className="form-input mt-2 block  w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={suiatablity}
                onChange={(e) => setSuiatablity(e.target.value)}
              >
                <option value="">Select Suiatablity</option>
                <option value="PK">PK</option>
                <option value="EK">EK</option>
                <option value="ALK">ALK</option>
                <option value="KLA">KLA</option>
                <option value="K-Pro">K-Pro</option>
                <option value="Therapeutic">Therapeutic</option>
              </select>
            </label>

            <div className="flex flex-col">
              <textarea
                value={descriptionOfRequest}
                placeholder="Enter Cornea Request Description"
                className="form-textarea w-full h-40 shadow-sm border-2 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 italic dark:placeholder-gray-400 text-base"
                onChange={(e) => setDescriptionOfRequest(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <ButtonComponent
                title="Update"
                className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRequest;