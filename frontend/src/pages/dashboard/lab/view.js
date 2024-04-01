
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PhysicalExamView = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [editExamId, setEditExamId] = useState(null);
  const [editedHeight, setEditedHeight] = useState("");
  const [editedWeight, setEditedWeight] = useState("");
  const [editedSex, setEditedSex] = useState("");
  const [editedDonorId, setEditedDonorId] = useState("");

  useEffect(() => {
    fetchPhysicalExams();
  }, []);

  const fetchPhysicalExams = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/getAll");
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Failed to fetch physical exams:", error);
    }
  };

  const deletePhysicalExam = async (examId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete/${examId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchPhysicalExams();
        alert("Physical exam deleted successfully.");
      } else {
        throw new Error("Failed to delete physical exam.");
      }
    } catch (error) {
      console.error("Error deleting physical exam:", error);
    }
  };

  const startEdit = (examId, height, weight, sex, donorId) => {
    setEditExamId(examId);
    setEditedHeight(height);
    setEditedWeight(weight);
    setEditedSex(sex);
    setEditedDonorId(donorId);
  };

  const cancelEdit = () => {
    setEditExamId(null);
    setEditedHeight("");
    setEditedWeight("");
    setEditedSex("");
    setEditedDonorId("");
  };

  const navigateToDetails = (examId) => {
    navigate(`/labtechnicaldashboard/getOne/${examId}`);
  };

  const saveEdit = async (examId, editedHeight, editedWeight, editedSex, editedDonorId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/update/${examId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height: editedHeight,
          weight: editedWeight,
          sex: editedSex,
          donorId: editedDonorId,
        }),
      });

      if (response.ok) {
        fetchPhysicalExams();
        setEditExamId(null);
        setEditedHeight("");
        setEditedWeight("");
        setEditedSex("");
        setEditedDonorId("");
        alert("Physical exam updated successfully.");
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update physical exam.");
      }
    } catch (error) {
      console.error("Error updating physical exam:", error);
      alert("An error occurred while updating the physical exam. Please try again.");
    }
  };

  const fetchDonor = async (donorId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/donors/${donorId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch donor with ID ${donorId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDonors = async () => {
      const examsWithDonors = [];
      for (const exam of exams) {
        const donor = await fetchDonor(exam.donorId);
        examsWithDonors.push({ ...exam, donor });
      }
      setExams(examsWithDonors);
    };

    fetchDonors();
  }, [exams]);
  if (!Array.isArray(exams)) {
    console.error("Exams is not an array:", exams);
    return <p>An error occurred while fetching exams.</p>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Physical Exams</h2>
      {exams.length === 0 ? (
        <p>No physical exams found.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Height</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Sex</th>
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id}>
                {editExamId === exam._id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editedHeight}
                        onChange={(e) => setEditedHeight(e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editedWeight}
                        onChange={(e) => setEditedWeight(e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editedSex}
                        onChange={(e) => setEditedSex(e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editedDonorId}
                        onChange={(e) => setEditedDonorId(e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => saveEdit(exam._id, editedHeight, editedWeight, editedSex, editedDonorId)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{exam.height}</td>
                    <td className="border px-4 py-2">{exam.weight}</td>
                    <td className="border px-4 py-2">{exam.sex}</td>
                    <td className="border px-4 py-2">{exam.donor ? exam.donor.name : ""}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => deletePhysicalExam(exam._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          startEdit(
                            exam._id,
                            exam.height,
                            exam.weight,
                            exam.sex,
                            exam.donorId
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => navigateToDetails(exam._id)}
                      >
                       Details
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PhysicalExamView;