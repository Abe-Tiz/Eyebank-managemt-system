import React, { useEffect, useState } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useToast } from "@chakra-ui/react";
import { confirmAlert } from 'react-confirm-alert';

const PhysicalExamView = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const toast=useToast() 

  
const navigate=useNavigate()
  useEffect(() => {
    fetchPhysicalExam();
  }, []);

  const fetchPhysicalExam = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getOne/${id}`);
      setExam(response.data);
    } catch (error) {
      console.error("Failed to fetch physical exam:", error);
    }
  };

  //delete
  const deletePhysicalExam = (examId) => {
   
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this physical exam?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => performDelete(examId),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };
 
  const performDelete = async (examId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/delete/${examId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        fetchPhysicalExam();
        toast({
          title:"Physical exam deleted successfully.",
          status:"success",
          duration:3000,
          isClosable:true,
          position:"top",

        })
        // alert('Physical exam deleted successfully.');
      } else {
        throw new Error('Failed to delete physical exam.');
      }
    } catch (error) {
      console.error('Error deleting physical exam:', error);
    }
  };


  const handleCollect = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/getOne/${id}/collect`);
      navigate(`/labtechnicaldashboard/collectCornea/${id}`);
    } catch (error) {
      console.error("Failed to collect physical exam:", error);
    }
  };

  // const deletePhysicalExam = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:4000/api/getOne/${id}`);
  //     navigate('/labtechnicaldashboard');
  //   } catch (error) {
  //     console.error("Failed to delete physical exam:", error);
  //   }
  // };

  const navigateToEdit = (id) => {
    navigate(`/labtechnicaldashboard/editExams/${id}`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center font-bold mb-4 font-sans bg-blue-500 text-white rounded p-2 h-14">
        Physical Exam
      </h2>
      {exam ? (
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Height</h1>
              </th>
              <td className="border px-2 py-2">{exam.height}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Weight</h1>
              </th>
              <td className="border px-2 py-2">{exam.weight}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Sex</h1>
              </th>
              <td className="border px-2 py-2">{exam.sex}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Cause of Death</h1>
              </th>
              <td className="border px-2 py-2">{exam.causeOfDeath}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Date of Death</h1>
              </th>
              <td className="border px-2 py-2">{exam.dod}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Time of Death</h1>
              </th>
              <td className="border px-2 py-2">{exam.time}</td>
            </tr>

            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">Head</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.head ? 'Yes' : 'No'}</td>
            </tr>
            
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">isRefrigerated</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.isRefrigerated ? 'Yes' : 'No'}</td>
            </tr>

            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.neck ? 'Yes' : 'No'}</td>
            </tr>

            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.mouth ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.abdomen ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.arteries ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.back ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.genitals ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th className="px-2 py-2">
                <h1 className="font-bold">neck</h1>
              </th>
              <td className="border px-2 py-2">{exam.examined?.arms ? 'Yes' : 'No'}</td>
            </tr>
            <tr>

              <th className="px-2 py-2">
                <h1 className="font-bold">sexual</h1>
              </th>
              {exam.highRiskexamined.sexual === 'evidence' ? 'evidence' : 'Noevidence'}
            </tr>

            <tr>
<th className="px-2 py-2">
  <h1 className="font-bold">analInterCourse</h1>
</th>
<td className="border px-2 py-2">{exam.highRiskexamined?.analInterCourse? 'evidemce':'no evidence'}</td>
</tr>
<tr>
<th className="px-2 py-2">
  <h1 className="font-bold">NonMedical</h1>
</th>
<td className="border px-2 py-2">{exam.highRiskexamined?.NonMedical? 'evidemce':'no evidence'}</td>
</tr>
<tr>
<th className="px-2 py-2">
  <h1 className="font-bold">oralThrush</h1>
</th>
<td className="border px-2 py-2">{exam.highRiskexamined?.oralThrush? 'evidemce':'no evidence'}</td>
</tr>
<tr>
<th className="px-2 py-2">
  <h1 className="font-bold">Blue</h1>
</th>
<td className="border px-2 py-2">{exam.Blue}</td>
</tr>
<tr>
<th className="px-2 py-2">
  <h1 className="font-bold">enlargedLiver</h1>
</th>
<td className="border px-2 py-2">{exam.enlargedLiver}</td>
</tr>

          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleCollect(id)}
        >
          Collect
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => navigateToEdit(id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deletePhysicalExam(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PhysicalExamView;