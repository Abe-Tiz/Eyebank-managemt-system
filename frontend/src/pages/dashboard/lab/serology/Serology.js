import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@chakra-ui/react";
import DynamicIcon from "../../../../components/DynamicIcon";
import LoadingCircle from './../../../../components/LoadingCircle';

const Serology = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [editExamId, setEditExamId] = useState(null);
    const [editedHeight, setEditedHeight] = useState("");
    const [editedWeight, setEditedWeight] = useState("");
    const [editedSex, setEditedSex] = useState("");
    const [collect, setCollect] = useState(true);
    // const { id } = useParams();
    useEffect(() => {
        fetchPhysicalExams();
    }, []);
    const data = {
        collect,
    }
    const fetchPhysicalExams = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/getAll");
            const data = await response.json();
            setExams(data);
            // console.log(data);
        } catch (error) {
            console.error("Failed to fetch physical exams:", error);
        }
    };
    const handleCollect = async (id) => {
        try {
            navigate(`/labtechnicaldashboard/collectCornea/${id}`);
        } catch (error) {
            console.error("Failed to collect physical exam:", error);
        }
    };
    const deletePhysicalExam = async (examId) => {
        try {
            const response = await fetch(`http://localhost:4001/api/delete/${examId}`, {
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
    const startEdit = (examId, height, weight, sex) => {
        setEditExamId(examId);
        setEditedHeight(height);
        setEditedWeight(weight);
        setEditedSex(sex);
    };

    const cancelEdit = () => {
        setEditExamId(null);
        setEditedHeight("");
        setEditedWeight("");
        setEditedSex("");
    };
    const navigateToDetails = (examId) => {
        navigate('/getOne/:id', { state: { examId: examId } });
    };

    const saveEdit = async (examId) => {
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
                }),
            });
            if (response.ok) {
                fetchPhysicalExams();
                setEditExamId(null);
                setEditedHeight("");
                setEditedWeight("");
                setEditedSex("");
                alert("Physical exam updated successfully.");
            } else {
                throw new Error("Failed to update physical exam.");
            }
        } catch (error) {
            console.error("Error updating physical exam:", error);
        }
    };

    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4"> Physicaly Examined People</h2>
        {exams.length === 0 ? (
          <LoadingCircle />
        ) : (
          <table className="table-auto w-full">
            <thead className="bg-sky-300">
              <tr>
                {/* <th className="px-4 py-2">NO</th> */}
                <th className="px-4 py-2">Height</th>
                <th className="px-4 py-2">Weight</th>
                <th className="px-4 py-2">Sex</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <>
                  {exam.collect === true && (
                    <tr key={index}>
                      {/* <td className="border px-4 py-2">{exam._id}</td> */}
                      <td className="border px-4 py-2">{exam.height}</td>
                      <td className="border px-4 py-2">{exam.weight}</td>
                      <td className="border px-4 py-2">{exam.sex}</td>
                      <td className="flex gap-2 items-center w-full">
                        <Link
                          className="w-full flex items-center text-white bg-sky-700 border-2 p-2 font-medium dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
                          to={`/labtechnicaldashboard/serology/${exam._id}`}
                        >
                          <DynamicIcon
                            library="gr"
                            iconName="GrTest"
                            className="text-2xl"
                          />{" "}
                          Serology
                        </Link>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};
export default Serology;
