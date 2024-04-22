
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import ButtonComponent from "../../../../components/ButtonComponent";
import ButtonPrimary from "../../../../components/ButtonPrimary";

const SerologyTest = () => {
  const [bloodType, setBloodType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [tests, setTests] = useState([]);
  const [otherTestValue, setOtherTestValue] = useState("");
  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  // fetch loggedin user
  useEffect(() => {
    fetch("http://127.0.0.1:4000/user/userLogedin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data, "user logged in");
        setUserId(data.data._id);

        if (data.data === "token expired") {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, [navigate]);

  // Function to handle checkbox changes
 const handleCheckboxChange = (event) => {
   const { name, checked } = event.target;
    if (name === "other") {
      setIsOtherChecked(checked);
      if (checked) {
        setTests((prevTests) => [...prevTests, otherTestValue]);
      } else {
        setTests((prevTests) =>
          prevTests.filter((test) => test !== otherTestValue)
        );
      }
    } else {
      setTests((prevTests) => {
        if (checked && !prevTests.includes(name)) {
          return [...prevTests, name];
        }
        return prevTests.filter((test) => test !== name);
      });
    }
 };

//  function to handle other input field
const handleOtherInputChange = (event) => {
  const value = event.target.value;
  setOtherTestValue(value);
  if (isOtherChecked) {
    setTests((prevTests) => {
      // Remove the old 'otherTestValue' and add the new one
      return prevTests.filter((test) => test !== otherTestValue).concat(value);
    });
  }
};

   const handleDateChange = (e) => {
     setSelectedDate(e.target.value);
      // console.log("date:",e.target.value);
   };

   // Validation function for blood type
  const validateBloodType = (type) => {
    const validTypes = ['A', 'B', 'O', 'AB'];
    return validTypes.includes(type);
  };

  // Validation function for date of birth
  const validateDateOfBirth = (dob) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Simple regex for 'YYYY-MM-DD' format
    return regex.test(dob) && new Date(dob) <= new Date();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bloodType,
      userId,
      phId:id,
      tests,
      dob: selectedDate,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4000/blood/create",
        data
      );
      console.log(response.data);
      toast({
        title: "Data Registerd successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/labtechnicaldashboard/list-serology");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="mt-[-2] items-center">
      <h2 className="text-3xl " style={{ textAlign: "center" }}>
        Welcome to Serology Test Form
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex   gap-3 flex-wrap md:mr-4">
          <div className="mt-4">
            <label
              htmlFor="blood"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Blood Type:
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col items-start">
              <select
                name="blood"
                className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
              >
                <option value="">-- Select Blood type --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="O">O</option>
                <option value="AB">AB</option>
              </select>
              {/* Blood type validation message */}
              {!validateBloodType(bloodType) && (
                <span className="text-red-500">please Select blood type</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="sex"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth:
              <span class="text-red-500">*</span>
            </label>
            <div className="flex flex-col items-start">
              <input
                name="birthdate"
                className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block"
                type="date"
                autoComplete="off"
                required
                value={selectedDate}
                onChange={handleDateChange}
              />
              {/* Date of birth validation message */}
              {!validateDateOfBirth(selectedDate) && (
                <span className="text-red-500">please pick date of birth</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap md:mr-4 mt-2">
          <div className="mt-4 flex gap-5">
            <label
              htmlFor="sex"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Test Done:
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col md:flex-row md:gap-5 gap-0">
              <div className="flex flex-col items-start">
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="hiv"
                    checked={tests.hiv}
                    onChange={handleCheckboxChange}
                    className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                  />
                  HIV
                </label>
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="hepatitisB"
                    checked={tests.hepatitisB}
                    onChange={handleCheckboxChange}
                    className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                  />
                  HepatitisB
                </label>
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="hepatitisC"
                    checked={tests.hepatitisC}
                    onChange={handleCheckboxChange}
                    className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                  />
                  HepatitisC
                </label>
              </div>
              <div className="flex flex-col items-start ">
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="syphilis"
                    checked={tests.syphilis}
                    onChange={handleCheckboxChange}
                    className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                  />
                  Syphilis
                </label>
                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="vdrl"
                    checked={tests.vdrl}
                    onChange={handleCheckboxChange}
                    className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                  />
                  VDRL
                </label>

                <label className="label cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    name="other"
                    checked={tests.other}
                    onChange={handleCheckboxChange}
                    className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))]"
                  />
                  Other
                </label>
                {isOtherChecked && (
                  <input
                    name="otherTestInput"
                    id="otherTestInput"
                    placeholder="Enter other test"
                    value={otherTestValue}
                    onChange={handleOtherInputChange}
                    className="-mt-[50px] ml-[100px] block w-auto  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* btn */}
        <div className=" flex flex-row md:flex-col text-center mt-4 ">
          <ButtonPrimary onClick={() => navigate(-1)} title="Back" />

          <ButtonComponent
            customClass="w-64 justify-center  mb-3"
            title="Save"
          />
        </div>
      </form>
    </div>
  );
};
export default SerologyTest;