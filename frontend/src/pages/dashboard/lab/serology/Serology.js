import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@chakra-ui/react";
import DynamicIcon from "../../../../components/DynamicIcon";
import LoadingCircle from './../../../../components/LoadingCircle';

const Serology = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
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

    return (
      <div className="w-auto mx-auto">
        <h2 className="text-2xl font-bold mb-4"> Physicaly Examined People</h2>
        {exams.length === 0 ? (
          <LoadingCircle />
        ) : (
          <table className="table-auto w-auto">
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
                      <td className="border px-4 py-2">{exam.height}</td>
                      <td className="border px-4 py-2">{exam.weight}</td>
                      <td className="border px-4 py-2">{exam.sex}</td>
                      <td className="flex gap-2 items-center w-full">
                        <Link
                          className="w-auto rounded-lg  flex items-center text-white bg-sky-700 border-2 p-3 font-medium dark:text-blue-500 hover:bg-green-700 hover:border-green-700"
                          to={`/labtechnicaldashboard/serology/${exam._id}`}
                        >
                          {/* <DynamicIcon
                            library="gr"
                            iconName="GrTest"
                            className="text-2xl"
                          />{" "} */}
                          Add
                        </Link>
                      </td>
                    </tr>
                  )
                  }
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};
export default Serology;
