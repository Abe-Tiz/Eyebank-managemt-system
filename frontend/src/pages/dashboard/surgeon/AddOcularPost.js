import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast, Text } from "@chakra-ui/react";
import ButtonComponent from "../../../components/ButtonComponent";
const AddOcularPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const toast = useToast();
  const [dateOfSurgery, setDateOfSurgery] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [lotNoData, setLotNoData] = useState([]);
  const [ocularOperativeEye, setOcularOperativeEye] = useState("");
  const [ocularOperativeEyeError, setOcularOperativeEyeError] = useState("");
  const [ocularNonOperativeEyeError, setOcularNonOperativeEyeError] =
    useState("");
  const [ocularNonOperativeEye, setOcularNonOperativeEye] = useState("");
  const [Post, setOcularPost] = useState(true);
  const [ocular, setOcular] = useState([]);

  const ocularPost = {
    dateOfSurgery,
    lotNo,
    ocularOperativeEye,
    ocularNonOperativeEye,
    Post,
  };

  const getAllRecipients = async () => {
    try {
      // Retrieve the surgeon ID from local storage
      const response = await axios.get("https://eyebank-backend-2.onrender.com/recipient/read");
      const data = response.data;
      setOcular(data);
      // console.log(data.name);
      // Update the lotNoData state with the relevant data from the ocular array
      //  const lotData = data.filter((item) => item.Post === true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surgeonName = localStorage.getItem("surgeonName"); // Retrieve the surgeon ID from local storage
        const response = await axios.get(
          "https://eyebank-backend-2.onrender.com/distribution/eachsurgeon",
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
    getAllRecipients();
  }, []);

  const handleSave = async () => {
    // console.log(ocularPost);
    try {
      await axios.put(`https://eyebank-backend-2.onrender.com/recipient/ocular/${id}`, {
        ocularPost,
      });
      toast({
        title: t("Success"),
        description: t("Ocular post saved successfully."),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/surgondashboard/ocularpostlist");
    } catch (error) {
      // Handle error
      toast({
        title: t("Error"),
        description: t("Failed to save ocular post."),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const sss = ocular.map((oc) => oc.ocularPost);
  const advers = sss.map((advers) => advers.lotNo);
  console.log("lottt:", ocular);
    console.log("lo:", advers);
    
  return (
    <div>
      <h2 className="text-3xl mb-5 " style={{ textAlign: "center" }}>
        Ocular Post Form
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label className=" ml-16 px-12 block">
          <select
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            value={lotNo}
            onChange={(e) => setLotNo(e.target.value)}
          >
            <option value="">Select lotNo</option>
            {/* {lotNoData.map((lot, index) => (
                            <option key={index} value={lot?.corneaId?.lotNo}>
                                {lot?.corneaId?.lotNo}
                            </option>
                        ))} */}

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
                  return null; // Skip rendering the option if the lot number is in advers array
                }
              })}
          </select>
        </label>
        <label htmlFor="date" className=" ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="date"
            id="date"
            placeholder="Date of Surgery"
            value={dateOfSurgery}
            onChange={(e) => setDateOfSurgery(e.target.value)}
            required
          />
        </label>
        <label className="ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="text"
            placeholder="Ocular Operative Eye"
            value={ocularOperativeEye}
            pattern="^[a-zA-Z\s]+$"
            title="Please enter only text"
            onChange={(e) => {
              if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
                setOcularOperativeEye(e.target.value);
                setOcularOperativeEyeError("");
              } else {
                setOcularOperativeEye(ocularOperativeEye);
                setOcularOperativeEyeError("Please enter only text");
              }
            }}
          />
          {ocularOperativeEyeError && (
            <div className="text-red-500 mt-2">{ocularOperativeEyeError}</div>
          )}
        </label>
        <label className="ml-16 px-12 block">
          <input
            className="form-input mt-3 block w-3/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            type="text"
            placeholder="Ocular Non Operative Eye"
            value={ocularNonOperativeEye}
            pattern="^[a-zA-Z\s]+$"
            title="Please enter only text"
            onChange={(e) => {
              if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
                setOcularNonOperativeEye(e.target.value);
                setOcularNonOperativeEyeError("");
              } else {
                setOcularNonOperativeEye(ocularNonOperativeEye);
                setOcularNonOperativeEyeError("Please enter only text");
              }
            }}
          />
          {ocularNonOperativeEyeError && (
            <div className="text-red-500 mt-2">
              {ocularNonOperativeEyeError}
            </div>
          )}
        </label>

        <div className="text-center mt-4 mb-2">
          <ButtonComponent label="Submit" title={"Send Ocural"} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddOcularPost;
