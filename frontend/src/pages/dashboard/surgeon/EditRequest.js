import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonComponent from "../../../components/ButtonComponent";
import { useNavigate, useParams } from "react-router-dom";

const EditRequest = () => {
  const navigate = useNavigate();
  const [descriptionOfRequest, setDescriptionOfRequest] = useState("");
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
       
        const res = await axios.get(`http://localhost:4000/requestCornea/getRequest/${id}`);
        const requestData = res.data;
        setDescriptionOfRequest(requestData.descriptionOfRequest);
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
        }
      );

      toast.success("Updated successfully", {
        duration: 5000,
        position: "top",
      });
      navigate("/labtechnicaldashboard/viewRequestCornea");
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 5000,
        position: "top",
      });
    }
  };

  const handleDescriptionOfRequest = (e) => {
    setDescriptionOfRequest(e.target.value);
  };

  return (
    <div className="container">
      <div className="login-form m-10 w-3/4 ">
        <h3 className="title">Update Request</h3>
        <div className="form ">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-1 ">
              <div className="mt-4">
                <div className="flex flex-col">
                  <textarea
                    value={descriptionOfRequest}
                    placeholder="Update Cornea Request Description"
                    className="form-textarea w-full h-40 shadow-sm border-2 border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 italic dark:placeholder-gray-400 text-base"
                    onChange={handleDescriptionOfRequest}
                  />
                </div>
              </div>
              <div className="mt-16">
                <ButtonComponent title="Update" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;