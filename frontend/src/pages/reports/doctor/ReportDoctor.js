import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from 'axios';
import { Bar } from "react-chartjs-2";
// import RecentDonor from './../pages/donor/RecentDonor';
import ReportCard from './ReportCard';

    const ReportDoctor = () => {
      const [reportData, setReportData] = useState({
        donor: 0,
        cornea: 0,
        evaluted: 0,
        user: 0,
      });

      // number of donor
      const numberDonor = async () => {
        try {
          const response = await axios.get(
            " https://eyebank-backend-2.onrender.com/report/recipient"
          );

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
          const response = await axios.get("https://eyebank-backend-2.onrender.com/report/user");

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
          const response = await axios.get(
            "https://eyebank-backend-2.onrender.com/report/evaluted"
          );

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
          const response = await axios.get(
            "https://eyebank-backend-2.onrender.com/report/cornea"
          );

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
        // { category: "cornea", number: reportData.cornea },
        // { category: "user", number: reportData.user },
        { category: "pledeged", number: reportData.donor },
      ];

    //   const chartRef = useRef(null);
    
        
          const datas = {
            labels: ["Recipient"],
            datasets: [
              {
                label: "Number of Items",
                data: [
                  reportData.donor,
                  reportData.cornea,
                  reportData.evaluted,
                  reportData.user,
                ],
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
          <div className="flex flex-wrap -mx-2">
            {data.map((item, index) => (
              <ReportCard
                key={index}
                category={item.category}
                number={item.number}
              />
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

export default ReportDoctor;
