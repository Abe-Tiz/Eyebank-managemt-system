import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import {
    DeleteOutlined,
    CheckCircleOutlined,
    DatabaseOutlined,
    GiftOutlined,
    MedicineBoxOutlined,
} from "@ant-design/icons";
import Chart from "chart.js/auto";
import axios from 'axios';


const ReportCard = ({ category, number }) => {
let icon, color, title;

    switch (category) {
        case "discarded":
        icon = <DeleteOutlined />;
        color = "bg-red-500";
        title = "Discarded Cornea";
        break;
        case "evaluated":
        icon = <CheckCircleOutlined />;
        color = "bg-green-500";
        title = "Evaluated Cornea";
        break;
        case "stored":
        icon = <DatabaseOutlined />;
        color = "bg-blue-500";
        title = "Stored Cornea";
        break;
        case "ready":
        icon = <GiftOutlined />;
        color = "bg-yellow-500";
        title = "Ready for Distribution";
        break;
        case "donor":
        icon = <MedicineBoxOutlined />;
        color = "bg-purple-500";
        title = "Registered Donor";
        break;
        default:
        icon = null;
        color = "bg-gray-500";
        title = "Unknown Category";
    }

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 px-2">
        <Card
            className={`${color} text-white`}
            title={title}
            size="small"
            hoverable
        >
            <div className="flex items-center justify-center">
            <div className="text-4xl mr-2">{icon}</div>
            <div>
                <h2 className="text-lg font-bold">{number}</h2>
                <p>Number </p>
            </div>
            </div>
        </Card>
        </div>
    );
    };

    const Report = () => {
        const [reportData, setReportData] = useState({
            donor:'',
            user:''
        });

        useEffect(() => {
            const numberDonor = async () => {
            try {
                const response = await axios.get(
                "http://localhost:4000/donor/countDonor"
                );

                setReportData((prevReportData) => ({
                ...prevReportData,
                donor: response.data,  
                }));

                console.log(response.data);
            } catch (error) {
                console.log("Error : ", error);
            }
            };

            numberDonor();
        }, [setReportData]);

        

    const data = [
      { category: "discarded", number: 10 },
      { category: "evaluated", number: 25 },
      { category: "stored", number: 15 },
      { category: "ready", number: 5 },
      { category: "donor", number: reportData.donor },
    ];

    const chartRef = useRef(null);
    
    useEffect(() => {
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
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
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
    }, [data]);

    return (
        <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Cornea Report</h1>
        <div className="flex flex-wrap -mx-2">
            {data.map((item, index) => (
            <ReportCard
                key={index}
                category={item.category}
                number={item.number}
            />
            ))}
        </div>
        <div className="mt-8">
            <canvas ref={chartRef}></canvas>
        </div>
        </div>
    );
};

export default Report ;
