import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const EditRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isApproved, setIsApproved] = useState(false);
  const [descriptionOfRequest, setDescriptionOfRequest] = useState("");
  const [id, setId] = useState("");

  //get single request
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (!id) {
          toast({
            title: "Udefined",
            description: "Id is Undefined",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }

        const res = await axios.get(
          `http://localhost:4000/requestCornea/getRequest/${id}`
        );
        const requestData = res.data;
console.log("dl");
        console.log(requestData);

        console.log("teferaaaa");
        // Update state variables with the fetched data
        setDescriptionOfRequest(requestData.descriptionOfRequest);
        setIsApproved(requestData.isApproved);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };
    fetchRequest();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setImageLoading(true);

    const data = axios.put(
      `http://localhost:4000/requestCornea/updateRequest/${id}`,
      {
        descriptionOfRequest,
        isApproved,
      }
    );

    data
      .then((res) => {
        if (!descriptionOfRequest || !isApproved) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          // alert("Registered successfully.");
          toast({
            title: "Updated  successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/labtechnicaldashboard/viewRequestCornea");
          console.log(res);
        }
      })
      .catch((err) => {
        toast({
          title: "Error Occured!",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleDescriptionOfRequest = (e) => {
    setDescriptionOfRequest(e.target.value);
  };

  const handleIsApproved = (e) => {
    setIsApproved(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="login-form m-10 w-3/4 ">
          <h3 className="title">Update Request</h3>
          <div className="form ">
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 gap-8 md:grid-cols-1 ">
                <div className="mt-4">
                  <label
                    htmlFor="age"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description of Request
                    <span class="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                      name="descriptionOfRequest"
                      type="text"
                      value={descriptionOfRequest}
                      placeholder="description of Request"
                      onChange={handleDescriptionOfRequest}
                      pattern="[a-zA-Z ]{6,}"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="isApproved"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    isApproved
                    <span class="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                      name="isApproved"
                      type="text"
                      value={isApproved}
                      placeholder="isApproved"
                      onChange={handleIsApproved}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 flex justify-end">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                    Update Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRequest;
