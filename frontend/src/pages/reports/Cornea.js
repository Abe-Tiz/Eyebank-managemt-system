 
import React ,{useEffect, useState}from 'react';
import axios from 'axios';
import ReportCard from '../../components/ReportCard';
import BarGraph from '../../graphs/BarGraph';
 
const Cornea = () => {
  const [corneaReport, setCorneaReport] = useState([]);
  const [reportData, setReportData] = useState({
    pledge: 0,
    cornea: 0,
    evaluted: 0,
  });
  
  // number of corneas
  const CorneaCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/report/cornea-month"
      );
      // console.log("cornea report", response.data);
      setCorneaReport(response.data);
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
  
  // number of donor
  const numberOfEvalutedCornea = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report/evaluted");

      setReportData((prevReportData) => ({
        ...prevReportData,
        evaluted: response.data,
      }));

      console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  
  // number of donor
  const numberDonor = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report");

      setReportData((prevReportData) => ({
        ...prevReportData,
        pledge: response.data,
      }));

      console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
    };
    
  useEffect(() => {
    CorneaCount();
    CollectedCornea();
      numberOfEvalutedCornea();
      numberDonor();
  }, [corneaReport]);
  
  // {
  //     corneaReport.map((item) => console.log(`month:${item.month},count:${item.count}`))
  //  }
  const corneaData = corneaReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));
  
  const data = [
    { category: "cornea", number: reportData.cornea },
    { category: "evaluted", number: reportData.evaluted },
    // { category: "stored", number: 15 },
    // { category: "ready", number: 5 },
    { category: "pledeged", number: reportData.pledge },
  ];
  
  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-2">
        {data.map((item, index) => (
          <ReportCard
            key={index}
            category={item.category}
            number={item.number}
          />
        ))}
      </div>
      <div>
        <BarGraph data={corneaData} />
      </div>
    </div>
  );
};

export default Cornea;