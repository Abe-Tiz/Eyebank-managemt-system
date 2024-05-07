
import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ data }) => {
  const chartData = {
    labels: data.map((monthData) => monthData.month),
    datasets: [
      {
        label: "Corneas Registered",
        data: data.map((monthData) => monthData.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-8 w-3/4">
      {/* <h2>Corneas Registered by Month</h2> */}
      <Bar data={chartData} />
    </div>
  );
};

export default BarGraph;