import React, { useState, useEffect } from "react";

function PhysicalExamView() {
  const [physicalExams, setPhysicalExams] = useState([]);

  useEffect(() => {
    // Function to fetch the physical exams data from the API
    const fetchPhysicalExams = async () => {
      try {
        const response = await fetch("http://localhost:4001/exams/getExams");
        if (response.ok) {
          const data = await response.json();
          setPhysicalExams(data.data); // Store the 'data' array from the response
        } else {
          console.error("Failed to fetch physical exams data");
        }
      } catch (error) {
        console.error("Error while fetching physical exams data:", error);
      }
    };

    // Call the fetchPhysicalExams function
    fetchPhysicalExams();
  }, []);

  const handleEdit = (id) => {
    // Update logic
  };
  //givem egit code

  const handleDelete = (id) => {
    // Delete logic
  };

  return (
    <div>
      {physicalExams.length > 0 ? (
        <table className="table-auto w-full border-b-orange-500 shadow">
          <thead className="bg-blue-500 text-white bordered">
            <tr>
              <th className="px-4 py-2">Height</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Sex</th>
              <th className="px-4 py-2">Refrigerated</th>
              <th className="px-4 py-2">Examined</th>
              <th className="px-4 py-2">High Risk Examined</th>
              <th className="px-4 py-2">Cause of Death</th>
              <th className="px-4 py-2">Date of Death</th>
              <th className="px-4 py-2">Story</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {physicalExams.map((exam) => (
              <tr key={exam._id}>
                <td className="border px-2 py-2 w-[10%]">{exam.height}</td>
                <td className="border px-2 py-2 w-[10%]">{exam.weight}</td>
                <td className="border px-2 py-2 w-[10%]">{exam.sex}</td>
                <td className="border px-2 py-2 w-[10%]">
                  {exam.isRefrigerated ? "Yes" : "No"}
                </td>
                <td className="border px-2 py-2 w-[40%]">
                  {" "}
                  {/* Widened column for "examined" */}
                  <ul className="grid grid-cols-2 gap-8">
                    {Object.entries(exam.examined[0]).map(
                      ([key, value], index) => (
                        <li
                          key={`${key}-${index}`}
                          className={`text-${value ? "green" : "red"}-500 ${
                            key === "Width" ||
                            key === "Height" ||
                            key === "Weight" ||
                            key === "Sex" ||
                            key === "Refrigerated"
                              ? "col-span-2"
                              : "col-span-1"
                          } ${
                            key === "Width" ||
                            key === "Height" ||
                            key === "Weight"
                              ? "w-48"
                              : ""
                          }`}
                        >
                          <span className="font-bold">{key}:</span>
                          <span className="font-normal">
                            {value ? "Yes" : "No"}
                          </span>
                          {index !==
                            Object.entries(exam.examined[0]).length - 1 && (
                            <hr className="my-2" />
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </td>
                <td className="border px-2 py-2 w-[20%]">
                  {" "}
                  {/* Widened column for "highRiskexamined" */}
                  <div className="border border-gray-300 rounded p-4 mt-4">
                    <ul>
                      {Object.entries(exam.highRiskexamined[0]).map(
                        ([key, value]) => (
                          <li key={key} className="flex items-center">
                            <span className="font-bold mr-2">{key}:</span>
                            <span
                              className={`font-normal text-${
                                value ? "green" : "red"
                              }-500`}
                            >
                              {value}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </td>
                <td className="border px-2 py-2 w-[10%]">
                  {exam.causeOfDeath}
                </td>
                <td className="border px-2 py-2 w-[10%]">
                  {new Date(exam.dod).toLocaleDateString()}
                </td>
                <td className="border px-2 py-2 w-[10%]">{exam.story}</td>
                <td className="border px-2 py-2 w-[10%]">{exam.time}</td>
                <td className="border px-2 py-2 w-[10%]">
                  <button
                    onClick={() => handleEdit(exam)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No physical exams found.</p>
      )}
    </div>
  );
}

export default PhysicalExamView;

//complete code
