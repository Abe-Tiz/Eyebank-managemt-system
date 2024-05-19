import React from "react";


const ReportTable = ({ data, distrData, pledData }) => {
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

    // Function to find the count for a given month
    const findCountByMonth = (dataArray, month) => {
        const monthData = dataArray.find((data) => data.month === month);
        return monthData ? monthData.count : 0;
    };

    // Function to check if any of the data types has a non-zero count for the month
    const hasNonZeroCount = (month) => {
        return (
            findCountByMonth(data, month) > 0 ||
            findCountByMonth(distrData, month) > 0 ||
            findCountByMonth(pledData, month) > 0
        );
    };

    return (
        <div className="mt-8 w-full">
            <table className="table-auto">
                <thead className="bg-blue-300 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Corneas Registered
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Distributed Corneas
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pledged Corneas
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {months.map(
                        (month, index) =>
                            hasNonZeroCount(month) && (
                                <tr
                                    className="bg-base-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={index}
                                >
                                    <td className="px-6 py-4" >{month}</td>
                                    <td className="px-6 py-4" >{findCountByMonth(data, month)}</td>
                                    <td className="px-6 py-4" >{findCountByMonth(distrData, month)}</td>
                                    <td className="px-6 py-4" >{findCountByMonth(pledData, month)}</td>
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;