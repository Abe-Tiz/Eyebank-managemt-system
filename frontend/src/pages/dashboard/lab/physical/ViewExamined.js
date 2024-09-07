import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Link,
  Td,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  Table,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

const ViewExamined = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const toast = useToast();
  // const [exam, setExam] = useState({
  //   exam_id: generateExamId(),
  // });
  useEffect(() => {
    fetchPhysicalExams();
  }, []);

  const fetchPhysicalExams = async () => {
    try {
      const response = await axios.get("https://eyebank-backend-2.onrender.com/api/getAll");
      setExams(response.data);
    } catch (error) {
      console.error("Failed to fetch physical exams:", error);
    }
  };

  const deletePhysicalExam = (examId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this physical exam?",
      buttons: [
        {
          label: "Yes",
          onClick: () => performDelete(examId),
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  const performDelete = async (examId) => {
    try {
      await axios.delete(`https://eyebank-backend-2.onrender.com/api/delete/${examId}`);
      fetchPhysicalExams();
      toast({
        title: "Physical exam deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting physical exam:", error);
    }
  };

  const navigateToDetails = (examId) => {
    navigate(`/labtechnicaldashboard/getOne/${examId}`);
  };

  const navigateToEdit = (examId) => {
    const exam = exams.find((exam) => exam._id === examId);
    if (exam) {
      navigate({
        pathname: `/labtechnicaldashboard/editExams/${examId}`,
        state: { exam },
      });
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredExams = exams.filter((exam) =>
    exam.exam_id && exam.exam_id.includes(searchText)
  );

    
  
    // Function to generate a random alphanumeric string for the exam ID
    // function generateExamId() {
    //   const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    //   const idLength = 4;
    //   let examId = 'em';
    //   for (let i = 0; i < idLength; i++) {
    //     const randomIndex = Math.floor(Math.random() * characters.length);
    //     examId += characters[randomIndex];
    //   }
    //   return examId;
    // }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold mb-4 font-sans text-black rounded p-2 h-14 ">
          Physical Exam
        </h2>
        <div className="flex bordered justify-end ml-36">
          <InputGroup>
            <Input
              placeholder="Search by Exam ID"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <InputRightElement>
              <Button onClick={() => setSearchText("")}>Clear</Button>
            </InputRightElement>
          </InputGroup>
        </div>
          </div>
      {filteredExams.length === 0 ? (
        <p>No physical exams found.</p>
      ) : (
        <Table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-2 py-2">
                <h1 className="font-bold">#</h1>
              </th>
              <th className="px-2 py-2">
                <h1 className="font-bold">Height</h1>
              </th>
              <th className="px-2 py-2">
                <h1 className="font-bold">Weight</h1>
              </th>
              <th className="px-2 py-2">
                <h1 className="font-bold">Sex</h1>
              </th>
              <th className="px-2 py-2">
                <h1 className="font-bold">Cause of Death</h1>
              </th>
              <th className="px-2 py-2">
                <h1 className="font-bold">Time of Death</h1>
              </th>
              <th className="px-16 py-2">
                <h1 className="font-bold">Actions</h1>
              </th>
            </tr>
          </thead>


          <tbody>
            {filteredExams.map((exam,index) => (
              <tr key={exam._id}>
                <Td className="px-2 py-2">{index + 1}</Td>
                <Td className="px-2 py-2">{exam.height}</Td>
                <Td className="px-2 py-2">{exam.weight}</Td>
                <Td className="px-2 py-2">{exam.sex}</Td>
                {/* <Td className="px-2 py-2">{exam.dod}</Td> */}

                <Td className=" px-2 py-2">{new Date(exam.dod).toLocaleString('en-ET',
                  { timeZone: 'Africa/Addis_Ababa', year: 'numeric', month: 'long', day: 'numeric' })}</Td>

                <Td className="px-2 py-2">{exam.time}</Td>

                <Td className="grid grid-cols-3  px-2 py-2">
                  <Td className="px-2 py-2 text-blue-500">
                    <Link
                      className="text-gray-600 text-xl hover:text-blue-700"
                      onClick={() => navigateToDetails(exam._id)}
                    >
                      <FaEye />
                    </Link>
                  </Td>

                  {/* <Td className=' text-center ml-3 text-blue-600'>
                      <Link onClick={() => handleCollect(exam._id)}>Collect</Link>


                    </Td> */}

                  <Td className=" px-2 py-2 text-green-500">
                    <Link
                      className="text-green-600 text-xl ml-5 hover:text-green-700"
                      onClick={() => navigateToEdit(exam._id)}
                    >
                      <EditIcon />
                    </Link>
                  </Td>
                  <Td className=" px-2 py-2 text-red-600">
                    <Link
                      className="text-red-600 text-xl ml-5 hover:text-red-700"
                      onClick={() => deletePhysicalExam(exam._id)}
                    >
                      <DeleteIcon />
                    </Link>
                  </Td>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ViewExamined;