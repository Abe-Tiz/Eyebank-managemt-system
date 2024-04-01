import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
const PhysicalExamView = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [editExamId, setEditExamId] = useState(null);
  const [editedHeight, setEditedHeight] = useState("");
  const [editedWeight, setEditedWeight] = useState("");
  const [editedSex, setEditedSex] = useState("");
  const [editCauseOfDeath, setEditCauseOfDeath] = useState("");
  const [editDateOfDeath, setEditDateOfDeath] = useState("");
  const [editTimeOfDeath, setEditTimeOfDeath] = useState("");

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
      const response = await fetch(
        `http://localhost:4000/api/delete/${examId}`,
        {
          method: "DELETE",
        }
      );
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

  const startEdit = (examId, height, weight, sex, causeOfDeath, dod, time) => {
    setEditExamId(examId);
    setEditedHeight(height);
    setEditedWeight(weight);
    setEditedSex(sex);
    setEditCauseOfDeath(causeOfDeath);
    setEditDateOfDeath(dod);
    setEditTimeOfDeath(time);
  };

  const cancelEdit = () => {
    setEditExamId(null);
    setEditedHeight("");
    setEditedWeight("");
    setEditedSex("");
    setEditCauseOfDeath("");
    setEditDateOfDeath("");
    setEditTimeOfDeath("");
  };
  const navigateToDetails = (examId) => {
    navigate(`/labtechnicaldashboard/getOne/${examId}`);
  };

  const saveEdit = async (examId, editedHeight, editedWeight, editedSex,editCauseOfDeath, editDateOfDeath, editTimeOfDeath) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/update/${examId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            height: editedHeight,
            weight: editedWeight,
            sex: editedSex,
            causeOfDeath: editCauseOfDeath,
            dod: editDateOfDeath,
            time: editTimeOfDeath,
          }),
        }
      );

      if (response.ok) {
        fetchPhysicalExams();
        setEditExamId(null);
        setEditedHeight("");
        setEditedWeight("");
        setEditedSex("");
        alert("Physical exam updated successfully.");
      } else {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to update physical exam."
        );
      }
    } catch (error) {
      console.error("Error updating physical exam:", error);
      alert(
        "An error occurred while updating the physical exam. Please try again."
      );
    }
  };
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
              <th className="px-4 py-2">Cause of Death</th>
              <th className="px-4 py-2">Date of Death</th>
              <th className="px-4 py-2">Time of Death</th>
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
                        value={editCauseOfDeath}
                        onChange={(e) => setEditCauseOfDeath(e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={editDateOfDeath}
                        onChange={(e) => setEditDateOfDeath(e.target.value)}
                      />
                    </td>
                    <td className="border px-4 py-2">
  <input
    type="text"
    value={moment(editTimeOfDeath).format("HH:mm")}
    onChange={(e) => setEditTimeOfDeath(e.target.value)}
  />
</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => saveEdit(exam._id)}
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
                    <td className="border px-4 py-2">{exam.causeOfDeath}</td>
                    <td className="border px-4 py-2">{exam.dod}</td>
                    <td className="border px-4 py-2">{exam.time}</td>
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
                            exam.causeOfDeath,
                            exam.dod,
                            exam.time
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
