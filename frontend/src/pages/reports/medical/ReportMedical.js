import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import RepoCard from "./RepoCard";
import { Bar } from "react-chartjs-2";

const ReportMedical = () => {
  const [reportData, setReportData] = useState({
    donor: 0,
    cornea: 0,
    evaluted: 0,
    user: 0,
  });

  // number of donor
  const numberDonor = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report");

      setReportData((prevReportData) => ({
        ...prevReportData,
        donor: response.data,
      }));

      //  console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  // number of donor
  const numberUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report/user");

      setReportData((prevReportData) => ({
        ...prevReportData,
        user: response.data,
      }));

      //  console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  // number of donor
  const numberOfEvalutedCornea = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report/evaluted");

      setReportData((prevReportData) => ({
        ...prevReportData,
        evaluted: response.data,
      }));

      //  console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  // number of cornea
  const CollectedCornea = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report/cornea");

      setReportData((prevReportData) => ({
        ...prevReportData,
        cornea: response.data,
      }));

      //  console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    CollectedCornea();
    numberDonor();
    numberUsers();
    numberOfEvalutedCornea();
  }, [setReportData]);

  const data = [
    { category: "cornea", number: reportData.cornea },
    // { category: "user", number: reportData.user },
    { category: "evaluted", number: reportData.evaluted },
  ];

  const chartRef = useRef(null);

 const datas = {
   labels: ["Cornea","Evaluted"],
   datasets: [
     {
       label: "Number of Items",
       data: [reportData.cornea, reportData.evaluted],
       backgroundColor: [
         "rgba(54, 162, 235, 0.6)",
         "rgba(255, 206, 86, 0.6)",
         "rgba(75, 192, 192, 0.6)",
       ],
       borderColor: [
         "rgba(54, 162, 235, 1)",
         "rgba(255, 206, 86, 1)",
         "rgba(75, 192, 192, 1)",
       ],
       borderWidth: 1,
     },
   ],
 };

  return (
    <div className="p-4 ">
      {/* <p>helloo</p> */}
      <div className="flex gap-10 flex-wrap -mx-2">
        {data.map((item, index) => (
          <RepoCard key={index} category={item.category} number={item.number} />
        ))}
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="mt-8 w-3/4">
          <Bar data={datas} />
        </div>
      </div>
    </div>
  );
};

export default ReportMedical;
