import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from 'axios';
import ReportCard from './ReportCard';
import RecentDonor from "../pages/donor/RecentDonor";
import Cornea from "../pages/reports/Cornea";
// import RecentDonor from './../pages/donor/RecentDonor';

    const Report = () => {
        const [reportData, setReportData] = useState({
            donor:0,
            cornea: 0,
            evaluted:0
        });

        // number of donor
         const numberDonor = async () => {
           try {
             const response = await axios.get("http://localhost:4000/report");

             setReportData((prevReportData) => ({
               ...prevReportData,
               donor: response.data,
             }));

             console.log(response.data);
           } catch (error) {
             console.log("Error : ", error);
           }
        };
        // number of donor
         const numberOfEvalutedCornea= async () => {
           try {
             const response = await axios.get(
               "http://localhost:4000/report/evaluted"
             );

             setReportData((prevReportData) => ({
               ...prevReportData,
               evaluted: response.data,
             }));

             console.log(response.data);
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

             console.log(response.data);
           } catch (error) {
             console.log("Error : ", error);
           }
        };
        
        useEffect(() => {
            CollectedCornea();
            numberDonor();
            numberOfEvalutedCornea()
        }, [setReportData]);

        

    const data = [
      { category: "cornea", number: reportData.cornea },
      { category: "evaluted", number: reportData.evaluted },
      { category: "stored", number: 15 },
      { category: "ready", number: 5 },
      { category: "pledeged", number: reportData.donor },
      // { category: "donor", number: 21 },
    ];

    const chartRef = useRef(null);
    
        useEffect(() => {
            const chart = () => {
             const ctx = chartRef.current.getContext("2d");

             // Destroy existing chart
             if (chartRef.current.chart) {
               chartRef.current.chart.destroy();
             }

             // Create a new chart
             chartRef.current.chart = new Chart(ctx, {
               type: "bar",
               data: {
                 labels: data.map((item) => item.category),
                 datasets: [
                   {
                     label: "Number of Items",
                     data: data.map((item) => item.number),
                     backgroundColor: [
                       "rgba(3, 138, 255, 0.6)",
                       "rgba(135, 211, 124, 0.6)",
                       "rgba(255, 206, 86, 0.6)",
                       "rgba(255, 255, 0, 0.6)",
                       "rgba(153, 102, 255, 0.6)",
                     ],
                     borderColor: [
                       "rgba(255, 99, 132, 1)",
                       "rgba(54, 162, 235, 1)",
                       "rgba(255, 206, 86, 1)",
                       "rgba(255, 255, 0, 1)",
                       "rgba(153, 102, 255, 1)",
                     ],
                     borderWidth: 1,
                   },
                 ],
               },
               options: {
                 scales: {
                   y: {
                     beginAtZero: true,
                   },
                 },
                 plugins: {
                   tooltip: {
                     enabled: true,
                     mode: "index",
                     intersect: false,
                   },
                 },
               },
             });
        }
            chart();
    }, [data]);

    return (
      <div className="p-4 ">
        {/* <h1 className="text-3xl font-bold mb-4">Cornea Report</h1> */}

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
            <canvas ref={chartRef}></canvas>
          </div>
          <RecentDonor />
        </div>
       
      </div>
    );
};

export default Report ;
