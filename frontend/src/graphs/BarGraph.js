import React from "react";
import { Bar } from "react-chartjs-2";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarGraph = ({ data, distrData, pledData }) => {

  // Create a function to map the counts to the corresponding month
  const mapCountsToMonths = (dataArray) => {
    let countsByMonth = new Array(12).fill(0);  
    dataArray.forEach((monthData) => {
      const monthIndex = months.indexOf(monthData.month);
      if (monthIndex !== -1) {
        countsByMonth[monthIndex] = monthData.count;
      }
    });
    return countsByMonth;
  };
  

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Corneas Registered",
        data: mapCountsToMonths(data),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        width:10,
      },
      {
        label: "Distributed Corneas",
        data: mapCountsToMonths(distrData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Pledged Corneas",
        data: mapCountsToMonths(pledData),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let datasetLabel =
            data.datasets[tooltipItem.datasetIndex].label || "";
          return datasetLabel + ": " + tooltipItem.yLabel;
        },
      },
    },
  };

  return (
    <div className="mt-8 w-full">
      <p className="text-black font-serif  text-2xl font-normal mb-2">Report for each month Activity</p>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
