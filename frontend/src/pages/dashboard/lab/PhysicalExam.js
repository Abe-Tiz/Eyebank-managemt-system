import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";

const PhysicalExam = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    donor_id: id,
    height: "",
    weight: "",
    sex: "",
    isRefrigerated: false,
    examined: {
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
      } else if (/^[a-zA-Z]+$/.test(value) || value === "") {
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
          [name]: "Only text characters are allowed.",
        }));
        // e.target.style.borderColor = "red"; // Apply red border
        // e.target.placeholder = "Enter only text"; // Change placeholder
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
        // e.target.style.borderColor = "red"; // Apply red border
        // e.target.placeholder = "Enter only numbers"; // Change placeholder
      }
    } else if (type === "checkbox") {
      setFormData((formData) => ({
        ...formData,
        examined: {
          ...formData.examined,
          [name]: e.target.checked,
        },
      }));
    } else if (type === "date") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/create", {
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
        isRefrigerated: false,
        examined: {
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
      alert("Data entered successfully!");
    } catch (error) {
      console.error(error);
      alert("Error: Data entry failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  mx-auto p-4 bg-white rounded  md:p-6 dark:bg-gray-800 dark:border-gray-700 z-auto"
    >
      <div className="w-full mb-6 mt-0 flex flex-wrap justify-center text-xl">
        <div className="w-full block">
          <h2 className="text-3xl text-center font-bold mb-4 font-sans bg-blue-500 text-white rounded p-2 h-14">
            Create Physical Exam
          </h2>
        </div>

        <div className="mb-4 mx-8">
          <label className="mb-2 font-bold" htmlFor="height">
            Height:
          </label>
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
          <label className="mb-2 font-bold" htmlFor="weight">
            Weight:
          </label>
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

        <div className="mb-4 mx-8">
          <label className="mb-2 font-bold" htmlFor="sex">
            Sex:
          </label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange1}
            placeholder="Sex"
            required
            className="w-32 px-3 py-2 border-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <hr className="my-4" style={{ borderTop: "2px solid black" }} />

      <div className="w-full mb-4 ml-5 text-xl">
        <h1 className="text-2xl text-center font-bold mb-4 font-san rounded p-2 h-14">
          Examined
        </h1>
        <div className="mb-4">
          <label className="flex items-center mx-auto">
            <input
              type="checkbox"
              name="isRefrigerated"
              checked={formData.isRefrigerated}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <div className="align-middle">
              <span className="align-middle">Is Refrigerated?</span>
            </div>
          </label>
        </div>
        <div className="grid grid-cols-4 gap-4 ml-16 font-bold">
          {Object.entries(formData.examined).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="flex items-center mx-auto">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="align-middle">{key}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" style={{ borderTop: "3px solid black" }} />

      <div className="w-full mb-4 text-xl">
        <h3 className="text-2xl text-center font-bold mb-4 font-san rounded p-2 h-14">
          High Risk Examined
        </h3>
        <div className="grid grid-cols-3 gap-4 ml-16 font-bold">
          {Object.entries(formData.highRiskexamined).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="flex items-center">
                {key}:
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="ml-2 px-3 py-2 border rounded"
                  required
                >
                  <option value="no evidence">NoEvidence</option>
                  <option value="evidence">Evidence</option>
                </select>
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" style={{ borderTop: "3px solid black" }} />

      <div className="w-full mb-4 text-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6">
          <div className="mb-4">
            <label className="block mb-2 font-bold" htmlFor="causeOfDeath">
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
            <label className="block mb-2 font-bold" htmlFor="dod">
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
            <label className="block mb-2 font-bold" htmlFor="time">
              Time:
            </label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="enter time"
              required
              className="w-48 px-3 py-2 border-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="story">
              Story:
            </label>
            <textarea
              // type="text"
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
            className="w-48 px-3 py-2 border-2 rounded bg-blue-600 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PhysicalExam;

//complete code
