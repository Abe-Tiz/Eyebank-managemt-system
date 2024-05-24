import React ,{useEffect, useState}from 'react';
import axios from 'axios';
import ReportCard from '../../components/ReportCard';
import BarGraph from '../../graphs/BarGraph';
import ReportTable from './ReportTable';
import ButtonPrimary from '../../components/ButtonPrimary';
import CorneaCard from './CorneaCard';
 
const Cornea = () => {
  const [corneaReport, setCorneaReport] = useState([]);
  const [distributedReport, setDistributedReport] = useState([]);
  const [pledgedReport, setPledgedReport] = useState([]);
  const [transplantedReport, setTransplantedReport] = useState([]);
  const [reportData, setReportData] = useState({
    pledge: 0,
    cornea: 0,
    evaluted: 0,
    serology: 0,
    physical: 0,
    distributed: 0,
    translanted:0
  });
  const [showReportTable, setShowReportTable] = useState(false);

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
  const transplantedCorneaInMonth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/report/transplanted"
      );
      // console.log("cornea pledged report:", response.data);
      setTransplantedReport(response.data);
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

      // console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  // number of Transplanted cornea per month
  const numberTransplantedCorn = async () => {
    try {
      const response = await axios.get(
        "  http://localhost:4000/report/transplant-total"
      );

      setReportData((prevReportData) => ({
        ...prevReportData,
            translanted: response.data,
      }));

      // console.log(response.data);
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
    transplantedCorneaInMonth();
    numberTransplantedCorn();
  }, [corneaReport]);

  // Function to toggle the ReportTable visibility
  const toggleReportTable = () => {
    setShowReportTable((prevShow) => !prevShow);
  };

  // Function to handle the printing of the ReportTable
  const printReport = () => {
    const printContent = document.getElementById('reportTable').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  // collected cornea
  const corneaData = corneaReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  // distributed cornea
  const distributedCorneaData = distributedReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  // pledged people
  const pledgedCorneaData = pledgedReport.map((item) => ({
    month: item.month,
    count: item.count,
  }));
  // pledged people
  const transplanteddCorneaData = transplantedReport.map((item) => ({
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
    { category: "translanted", number: reportData.translanted },
  ];

  return (
    <div className="p-4 flex flex-col">
      <div className="flex flex-wrap -mx-2">
        {data.map((item, index) => (
          <CorneaCard
            key={index}
            category={item.category}
            number={item.number}
          />
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start gap-2 items-center text-center">
          <p className="text-sky-700">
            Do you Want Cornea Report In Table Fomrate ?{" "}
          </p>
          <button
            onClick={toggleReportTable}
            className="  text-sky-700 border-1 border-sky-700 px-3 hover:border-sky-700 bg-gray-300 hover:bg-sky-700  hover:text-white  "
          >
            {showReportTable ? "Hide" : "Show"}
          </button>
        </div>
        <>
          <BarGraph
            data={corneaData}
            distrData={distributedCorneaData}
            pledData={pledgedCorneaData}
            transplantedData={transplanteddCorneaData}
          />
        </>

        {/* Conditional rendering of the ReportTable based on showReportTable state */}
        {showReportTable && (
          <>
            <div className="flex justify-between w-full ">
              <p className="font-serif font-normal text-sky-700  mt-10 ">
                Report for each month Activity In Table Format and Print If You
                want.{" "}
              </p>
            </div>

            <div id="reportTable">
              <ReportTable
                data={corneaData}
                distrData={distributedCorneaData}
                pledData={pledgedCorneaData}
                 transplantedData={transplanteddCorneaData}
              />
            </div>
            <ButtonPrimary onClick={printReport} title=" Print" />
          </>
        )}
      </div>
    </div>
  );
};

export default Cornea;