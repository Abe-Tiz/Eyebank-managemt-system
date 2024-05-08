 
import React ,{useEffect, useState}from 'react';
import axios from 'axios';
import ReportCard from '../../components/ReportCard';
import BarGraph from '../../graphs/BarGraph';
 
const Cornea = () => {
  const [corneaReport, setCorneaReport] = useState([]);
  const [distributedReport, setDistributedReport] = useState([]);
  const [pledgedReport, setPledgedReport] = useState([]);
  const [reportData, setReportData] = useState({
    pledge: 0,
    cornea: 0,
    evaluted: 0,
    serology:0,
    physical: 0,
    distributed:0
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
  // number of corneas
  const distributedCorneaInMonth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/report/distributed-month"
      );
      // console.log("cornea distribute:d",response.data);
      setDistributedReport(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  // number of corneas
  const pledgedCorneaInMonth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/report/pledge-month"
      );
      // console.log("cornea pledged report:", response.data);
      setPledgedReport(response.data);
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

      // console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  // number of Tested cornea
  const serologytestedCornea = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report/serology");

      setReportData((prevReportData) => ({
        ...prevReportData,
        serology: response.data,
      }));

      // console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const physicalExamined = async () => {
    try {
      const response = await axios.get("http://localhost:4000/report/physical");

      setReportData((prevReportData) => ({
        ...prevReportData,
        physical: response.data,
      }));

      // console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const distributedCornea = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/report/distributed"
      );

      setReportData((prevReportData) => ({
        ...prevReportData,
        distributed: response.data,
      }));

      // console.log(response.data);
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

      // console.log(response.data);
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
    serologytestedCornea();
    physicalExamined();
    distributedCornea();
    pledgedCorneaInMonth();
    distributedCorneaInMonth();
  }, [corneaReport]);
 
  const corneaData = corneaReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  const distributedCorneaData = distributedReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  const pledgedCorneaData = pledgedReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));
  
  const data = [
    { category: "cornea", number: reportData.cornea },
    { category: "evaluted", number: reportData.evaluted },
    { category: "serology", number: reportData.serology },
    { category: "physicalExamined", number: reportData.physical },
    { category: "pledeged", number: reportData.pledge },
    { category: "distributed", number: reportData.distributed },
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
        <BarGraph data={corneaData} distrData={distributedCorneaData} pledData={ pledgedCorneaData} />
      </div>
    </div>
  );
};

export default Cornea;