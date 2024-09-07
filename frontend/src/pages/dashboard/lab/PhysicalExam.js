import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PhysicalExam = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    donor_id: id,
    height: "",
    weight: "",
    sex: "",
    examined: {
      isRefrigerated: false,
      head: false,
      mouth: false,
      neck: false,
      arms: false,
      abdomen: false,
      genitals: false,
      arteries: false,
      back: false,
    },

    highRiskexamined: {
      sexual: "no evidence",
      analInterCourse: "no evidence",
      NonMedical: "no evidence",
      oralThrush: "no evidence",
      Blue: "no evidence",
      enlargedLiver: "no evidence",
    },
    causeOfDeath: "",
    dod: "",
    story: "",
    time: "",
  });

  const [, setErrors] = useState({});
  const [donate, setDonate] = useState(true);
  const donated = {
    donate,
  };

  const hanleDonate = async (id) => {
    try {
      await axios.post(`https://eyebank-backend-2.onrender.com/donor/donate/${id}`, donated);
      //navigate(`/labtechnicaldashboard/distributeCornea/${id}`);
    } catch (error) {
      console.error("Failed to collect physical exam:", error);
    }
  }
  const handleChange = (e) => {
    const { name, value, type, keyCode } = e.target;

    if (type === "text") {
      if (keyCode === 8 && value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
        setFormData((formData) => ({
          ...formData,
          [name]: "",
        }));
      } else if (/^[a-zA-Z\s]+$/.test(value) || value === "") { // Updated regex to include whitespace
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
      } else {
        toast({
          title: "Enter only text",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only text characters are allowed.",
        }));
      }



    } else if (type === "number") {
      if (keyCode === 8 && value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
        setFormData((formData) => ({
          ...formData,
          [name]: "",
        }));
      } else if (/^\d*$/.test(value) || value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only numeric characters are allowed.",
        }));
        toast({
          title: "Enter only numbers",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }


    else if (type === "checkbox") {
      setFormData((formData) => ({
        ...formData,
        examined: {
          ...formData.examined,
          [name]: e.target.checked,
        },
      }));
    }



    else if (type === "date") {
      if (isValidDate(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid date format.",
        }));
      }
    } else if (type === "select-one") {
      setFormData((formData) => ({
        ...formData,
        highRiskexamined: {
          ...formData.highRiskexamined,
          [name]: value === "evidence" ? "evidence" : "no evidence",
        },
      }));
    }
  };
  function isValidDate(dateString) {
    // Check if the dateString matches the expected format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }

    // Parse the date components (year, month, day)
    const [year, month, day] = dateString.split("-");

    // Create a new Date object and check if it is a valid date
    const dateObj = new Date(year, month - 1, day);
    const isValid =
      dateObj.getFullYear() == year &&
      dateObj.getMonth() + 1 == month &&
      dateObj.getDate() == day;

    return isValid;
  }
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  /////////////////

  const handleChange2 = (e, key) => {
    const { name, checked } = e.target;
    const updatedValue = checked ? "evidence" : "no evidence";
    setFormData((prevFormData) => ({
      ...prevFormData,
      highRiskexamined: {
        ...prevFormData.highRiskexamined,
        [name]: updatedValue,
      },
    }));
  };
  ///////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://eyebank-backend-2.onrender.com/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      // Reset the form after successful submission
      setFormData({
        height: "",
        weight: "",
        sex: "",
        examined: {
          isRefrigerated: false,
          head: false,
          mouth: false,
          neck: false,
          arms: false,
          abdomen: false,
          genitals: false,
          arteries: false,
          back: false,
        },
        highRiskexamined: {
          sexual: "no evidence",
          analInterCourse: "no evidence",
          NonMedical: "no evidence",
          oralThrush: "no evidence",
          Blue: "no evidence",
          enlargedLiver: "no evidence",
        },
        causeOfDeath: "",
        dod: "",
        story: "",
        time: "",
      });
      toast({
        title: "Data Registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/labtechnicaldashboard/examlist");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error: Data entry failed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    hanleDonate(id)

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  mx-auto p-4 bg-white rounded  md:p-6 dark:bg-gray-800 dark:border-gray-700 z-auto"
    >
      <div className="">
        <div className="w-full block">
          <h2 className="text-3xl text-center font-bold mb-4 font-sans text-black rounded p-2 h-14">
            Create Physical Exam
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 ml-16">
          <div className="mb-4 mx-8">
            <div className="ml-10">
              <label className="mb-2" htmlFor="height">
                Height:
              </label>
            </div>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height in cm"
              required
              className="w-32 px-3 py-2 border-2 rounded"
            />
          </div>

          <div className="mb-4 mx-8">
            <div className="ml-10">
              <label className="mb-2" htmlFor="weight">
                Weight:
              </label>
            </div>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight in kg"
              required
              className="w-32 px-3 py-2 border-2 rounded"
            />
          </div>

          <div className="mb-2 mx-8">
            <div className="ml-10">
              <label className="mb-2" htmlFor="sex">
                Sex:
              </label>
            </div>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange1}
              placeholder="Sex"
              required
              className="w-32 px-3 py-2 border-2 rounded"
            >
              <option disabled value="">Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* <option value="other">Other</option> */}
            </select>
          </div>
        </div>
      </div>
      {/* <hr className="my-4" style={{ borderTop: "2px solid black" }} /> */}

      <div className="w-full mb-4 ml-5 text-xl">
        <h1 className="text-2xl text-center font-bold mb-4 font-san rounded p-2 h-14">
          Examined
        </h1>

        <div className="grid grid-cols-3 gap-4 ml-16">
          {Object.entries(formData.examined).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="flex items-center mx-auto">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                  className="mr-2 border-2 "
                />
                <span className="align-middle">{key}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* <hr className="my-4" style={{ borderTop: "3px solid black" }} /> */}

      <div className="w-full mb-4 text-xl">
        <h3 className="text-2xl text-center font-bold mb-4 font-san rounded p-2 h-14">
          High Risk Examined
        </h3>
      
        <div className="grid grid-cols-3 gap-4 ml-16">
          {Object.entries(formData.highRiskexamined).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="flex items-center mx-auto">
                <input
                  type="checkbox"
                  name={key}
                  checked={value === "evidence"}
                  onChange={(e) => handleChange2(e, key)}
                  className="mr-2"
                />
                {key}
              </label>
            </div>
          ))}
        </div>

       
      </div>
      {/* <hr className="my-4" style={{ borderTop: "3px solid black" }} /> */}

      <div className="w-full mb-4 text-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6">
          <div className="mb-4">
            <label className="block mb-2" htmlFor="causeOfDeath">
              Cause of Death:
            </label>
            <input
              type="text"
              name="causeOfDeath"
              value={formData.causeOfDeath}
              onChange={handleChange}
              className="w-48 px-3 py-2 border-2 rounded"
              placeholder="enter cause of deaths"
              required
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="dod">
              Date of Death:
            </label>
            <input
              type="date"
              name="dod"
              value={formData.dod}
              onChange={handleChange}
              required
              className="w-48 px-3 py-2 border-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2" htmlFor="time">
              Time:
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange1}
              placeholder="enter time"
              required
              className="w-48 px-3 py-2 border-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="story">
              Story:
            </label>
            <textarea
              // type="string"
              name="story"
              value={formData.story}
              onChange={handleChange1}
              required
              className="w-full px-3 py-2 border-2 rounded"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-48 px-3 py-2 border-2 rounded bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PhysicalExam;
