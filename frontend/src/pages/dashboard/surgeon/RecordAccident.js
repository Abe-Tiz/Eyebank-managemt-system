import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import "../../static/styles/cornea.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import ButtonComponent from './../../../components/ButtonComponent';
const RecordAccident = () => {

    const { id } = useParams();
    const [category, setCategory] = useState('');
    const [errorType, setErrorType] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [surgeonName, setSurgeonName] = useState('');
    const [receipentName, setReceipentName] = useState('');
    const [dateOfAccident, setDateOfAccident] = useState('');
    const [timeOfAccident, setTimeOfAccident] = useState('');
    // Collectors

    const [hospitals, setHospitals] = useState([])
    const [receipents, setReceipents] = useState([])
    const [surgeons, setSurgeons] = useState([])

    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();
    const [accident, setAccident] = useState(true);
    const accid = {
        accident,
    };


    const [state, setState] = useState({
        name: ""
    })

    useEffect(() => {
        fetch("http://127.0.0.1:4000/user/userLogedin", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data, "user logged in");
                setState((prev) => ({
                    ...prev,
                    name: data.data.name,
                }));

                if (data.data === "token expired") {
                    localStorage.clear();
                    navigate("/login");
                }
            });
    }, [navigate]);
    const nameOfSurgeon = state.name
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            category,
            errorType,
            surgeonName,
            receipentName,
            hospitalName,
            dateOfAccident,
            timeOfAccident
        }
        console.log(data);
        handleAccident(id);
        try {
            const response = await axios.post('http://localhost:4000/accident/create', data);
            console.log(response.data);
            toast({
                title: "Data recorded successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate('/surgondashboard/viewaccident');
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleAccident = async (id) => {
        try {
            await axios.put(`http://localhost:4000/accident/${id}`, accid);
        } catch (error) {
            console.error("Failed to handle accident.", error);
        }
    }

    useEffect(() => {
        const fetchSurgeon = async () => {
            try {
                const response = await axios.get("http://localhost:4000/user");
                setSurgeons(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSurgeon();
    }, []);
    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/hospital/read");
                setHospitals(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHospitalData();
    }, []);
    useEffect(() => {
        const fetchRecipientData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/recipient/read");
                setReceipents(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipientData();
    }, []);
    return (
      <div>
        <h2 className="text-3xl mb-4" style={{ textAlign: "center" }}>
          Welcome to Accident Record Form
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2">
            <label>
              <input
                className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={category}
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label>
              <input
                className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={errorType}
                placeholder="Error Type"
                onChange={(e) => setErrorType(e.target.value)}
              />
            </label>
            <label>
              <select
                className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              >
                <option>select hospital Name</option>
                {hospitals.map((hospital, index) => (
                  <option key={index} value={hospital._id}>
                    {hospital.hospitalName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={nameOfSurgeon}
                onChange={(e) => setSurgeonName(e.target.value)}
              >
                <option>select Surgeon Name</option>
                {surgeons.map((surgeon, index) => (
                  <option key={index} value={surgeon._id}>
                    {surgeon.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                className="form-input mt-4 block w-4/5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                value={receipentName}
                onChange={(e) => setReceipentName(e.target.value)}
              >
                <option>Select Recipient </option>
                {surgeons.map((recipient, index) => (
                  <option key={index} value={recipient._id}>
                    {recipient.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="text-center mt-4">
            {/* <button
              type="submit"
              className="w-1/3 mr-4 py-2 px-4 bg-sky-600 hover:bg-blue-600 text-white font-semibold rounded"
            >
              Record Accident
            </button> */}
            <ButtonComponent
              onClick={() => navigate("/surgondashboard/viewaccident")}
              title=" Save"
              type="submit"
            />
          </div>
        </form>
      </div>
    );
}

export default RecordAccident