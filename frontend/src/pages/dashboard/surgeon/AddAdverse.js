import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast, Text } from "@chakra-ui/react";
import ButtonComponent from "../../../components/ButtonComponent";

const AddAdverse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const toast = useToast();
  const [dateOfadverse, setdateOfadverse] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [lotNoData, setLotNoData] = useState([]);
  const [lotNoDataadversed, setLotNoDatAdversed] = useState([]);
  const [adverseReaction, setAdverseReaction] = useState("");
  const [probablityCase, setProbablityCase] = useState("");
  const [donorTissue, setDonorTissue] = useState("");
  const [donorTissueError, setDonorTissueError] = useState("");
  const [adverseReactionError, setAdverseReactionError] = useState("");
  const [probabilityCaseError, setProbabilityCaseError] = useState("");
  const [ocular, setOcular] = useState([]);
  const [adversePost, setAdversePost] = useState(true);
  const adverse = {
    dateOfadverse,
    lotNo,
    adverseReaction,
    probablityCase,
    donorTissue,
    adversePost,
  };

  useEffect(() => {
    const getAllRecipients = async () => {
      try {
        // Retrieve the surgeon ID from local storage
        const response = await axios.get(
          "http://localhost:4000/recipient/read"
        );
        const data = response.data;
        setOcular(data);
        const lotData = data.filter((item) => item.Post === true);
      } catch (error) {
        console.error(error);
      }
    };
    getAllRecipients();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surgeonName = localStorage.getItem("surgeonName"); // Retrieve the surgeon ID from local storage
        const response = await axios.get(
          "http://localhost:4000/distribution/eachsurgeon",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              surgeonName: surgeonName, // Pass the surgeon ID as a query parameter
            },
          }
        );
        const data = response.data;
        console.log("distaa:", data);
        setLotNoData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  const sss = ocular.map((oc) => oc.adverse);
  const advers = sss.map((advers) => advers.lotNo);
 
  const handleSave = async () => {
    // console.log(adverse);
    try {
      await axios.put(`http://localhost:4000/recipient/adverse/${id}`, {
        adverse,
      });
      toast({
        title: t("Success"),
        description: t("Adverse reaction saved successfully."),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/surgondashboard/adverselist");
    } catch (error) {
      toast({
        title: t("Error"),
        description: t("Failed to save adverse reaction."),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
 
  return (
    <>
      <Text fontSize="3xl" className="ml-16 px-16 block">
        Adverse Reaction form
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label className=" ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="date"
            placeholder="Date Of Diagnosis"
            value={dateOfadverse}
            onChange={(e) => setdateOfadverse(e.target.value)}
          />
        </label>
        <label className=" ml-16 px-12 block">
          <select
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            value={lotNo}
            onChange={(e) => setLotNo(e.target.value)}
          >
            <option value="">{t("recepient:SelectlotNo")}</option>
            {lotNoData
              .filter((lot) => lot?.corneaId?.lotNo)
              .map((lot, index) => {
                const isAdversed = advers.includes(lot?.corneaId?.lotNo);
                if (!isAdversed) {
                  return (
                    <option key={index} value={lot?.corneaId?.lotNo}>
                      {lot?.corneaId?.lotNo}
                    </option>
                  );
                } else {
                  return null;  
                }
              })}
          </select>
        </label>
        <label className="ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="text"
            placeholder="Adverse Reaction"
            value={adverseReaction}
            pattern="^[a-zA-Z\s]+$"
            title="Please enter only text"
            onChange={(e) => {
              setAdverseReaction(e.target.value);
            }}
          />
          {adverseReactionError && (
            <div className="text-red-500 mt-2">{adverseReactionError}</div>
          )}
        </label>
        <label className="ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="text"
            placeholder="Probability Case"
            value={probablityCase}
            pattern="^[a-zA-Z\s]+$"
            title="Please enter only text"
            onChange={(e) => {
              // if (`/^[a-zA-Z\s]+$/`.test(e.target.value)) {
              setProbablityCase(e.target.value);
              // setProbabilityCaseError("");
              // } else {
              //     setProbablityCase(probablityCase);
              //     setProbabilityCaseError("Please enter only text");
              // }
            }}
          />
          {probabilityCaseError && (
            <div className="text-red-500 mt-2">{probabilityCaseError}</div>
          )}
        </label>
        <label className="ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="text"
            placeholder="Donor Tissue"
            value={donorTissue}
            pattern="^[a-zA-Z\s]+$"
            title="Please enter only text"
            onChange={(e) => {
              // if (`/^[a-zA-Z\s]+$/`.test(e.target.value)) {
              setDonorTissue(e.target.value);
              // setDonorTissueError("");
              // } else {
              //     setDonorTissue(donorTissue);
              //     setDonorTissueError("Please enter only text");
              // }
            }}
          />
          {donorTissueError && (
            <div className="text-red-500 mt-2">{donorTissueError}</div>
          )}
        </label>
        <div className="text-center mt-4 mb-2">
          <ButtonComponent
            label="Submit"
            title={"Send Adverse"}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default AddAdverse;
