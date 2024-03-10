import React, { useState } from "react";
// import axios from "axios";

const PhysicalExam = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        examined: {
          ...prevData.examined,
          [name]: checked,
        },
      }));
    } else if (type === "select-one") {
      setFormData((prevData) => ({
        ...prevData,
        highRiskexamined: {
          ...prevData.highRiskexamined,
          [name]: value === "evidence" ? "evidence" : "no evidence",
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4001/exams/createExams", {
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
      className="w-full max-w-3xl mx-auto p-4 mt-10 bg-white rounded shadow md:p-6 dark:bg-gray-800 dark:border-gray-700"
    >
      
      <div className="card mb-6 shadow">
      <h2 className="text-3xl text-center font-bold mb-4 font-sans ">
        Create Physical Exam
      </h2>
  <div className="mb-4">
    <label className="block mb-2 font-bold flex justify-center" htmlFor="height">
      Height:
    </label>
    <div className="flex justify-center">
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
        required
        className="w-1/2 px-3 py-2 border rounded"
      />
    </div>
  </div>
  <div className="mb-4">
    <label className="block mb-2 flex justify-center" htmlFor="weight">
      Weight:
    </label>
    <div className="flex justify-center">
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        required
        className="w-1/2 px-3 py-2 border rounded"
      />
    </div>
  </div>
  <div className="mb-4">
    <label className="block mb-2 flex justify-center" htmlFor="sex">
      Sex:
    </label>
    <div className="flex justify-center">
      <select
        name="sex"
        value={formData.sex}
        onChange={handleChange1}
        required
        className="w-1/2 px-3 py-2 border rounded"
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
</div>

<div className="card mb-4 shadow">
  <div className="mb-4">
    <label className="flex items-center mx-auto">
      <input
        type="checkbox"
        name="isRefrigerated"
        checked={formData.isRefrigerated}
        onChange={handleChange}
        className="mr-2"
      />
      <span className="align-middle">Is Refrigerated?</span>
    </label>
  </div>
  <h3 className="text-lg font-bold mb-2">Examined</h3>
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(formData.examined).map(([key, value]) => (
      <div key={key} className="mb-2">
        <label className="flex items-center mx-auto">
          <input
            type="checkbox"
            name={key}
            checked={value}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="align-middle">{key}</span>
        </label>
      </div>
    ))}
  </div>
</div>
<div className="card mb-4 shadow">
  <h3 className="text-lg font-bold mb-2">High Risk Examined</h3>
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(formData.highRiskexamined).map(([key, value]) => (
      <div key={key} className="mb-2">
        <label className="flex items-center">
          {key}:
          <select
            name={key}
            value={value}
            onChange={handleChange}
            className="ml-2 px-3 py-2 border rounded"
          >
            <option value="no evidence">No Evidence</option>
            <option value="evidence">Evidence</option>
          </select>
        </label>
      </div>
    ))}
  </div>
</div>
<div className="card mb-4">
  <div className="flex flex-col items-center">
    <div className="mb-4">
      <label className="block mb-2" htmlFor="causeOfDeath">
        Cause of Death:
      </label>
      <input
        type="text"
        name="causeOfDeath"
        value={formData.causeOfDeath}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2" htmlFor="dod">
        Date of Death:
      </label>
      <input
        type="date"
        name="dod"
        value={formData.dod}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2" htmlFor="story">
        Story:
      </label>
      <textarea
        name="story"
        value={formData.story}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      ></textarea>
    </div>
    <div className="mb-4">
      <label className="block mb-2" htmlFor="time">
        Time:
      </label>
      <input
        type="text"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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