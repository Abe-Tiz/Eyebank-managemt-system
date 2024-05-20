import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import useLoggedInUser from './../../../useHooks/useLoggedInUser';
const DistributeCornea = () => {
  const { id } = useParams();
  const [hospitalName, setHospitalName] = useState("");
  const [name, setName] = useState("");
  const [modeOfTransportation, setModeOfTransportation] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [corneas, setCorneas] = useState([]);
  const { t } = useTranslation();
  const [distributed, setdistribute] = useState(true);
//  const [requestedCorneas, setRequestedCorneas] = useState([]);
  // const [suiatablity, setSuiatablity] = useState("");
       const { user, setUser, getLoggedInUser } = useLoggedInUser("doctor");
  const [requestedCorneas, setRequestedCorneas] = useState([]);
  const [suiatablity, setSuiatablity] = useState("");
  const [request, setRequest] = useState("");
  const [corneaId, setCorneaId] = useState("");
  const [corneaLot, setCorneaLot] = useState("");

  const distri = {
    distributed,
  };

  const [state, setState] = useState({
    name: "",
  });

  useEffect(() => {
    const getAllRequestedCorneas = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/requestCornea/getRequests"
        );

        setRequestedCorneas(data);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong");
      }
    };

    getAllRequestedCorneas();
  }, []);

  // console.log("id:",id)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (!id) {
          toast.error("Id is Undefined", {
            duration: 5000,
            position: "top",
          });
          return;
        }

      const response = await axios.get(
        `http://localhost:4000/requestCornea/getRequest/${id}`
      );
      console.log("Response data:", response.data);
        setRequest(response.data);
      // Using optional chaining to safely access nested properties
      setHospitalName(response.data?.hospital?.hospitalName);
      setName(response.data?.surgeon?.name);
      setSuiatablity(response.data?.suiatablity);
    } catch (error) {
      // Logging the error to the console and showing a toast message
      console.error(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
        {
          duration: 5000,
          position: "top",
        }
      );
    }
  };
  fetchRequest();
}, [id]);


  // console.log("doctor:",user)

  // useEffect(() => {
  //   fetch("http://127.0.0.1:4000/user/userLogedin", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem("token"),
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.data, "user logged in");
  //       setState((prev) => ({
  //         ...prev,
  //         name: data.data.name,
  //       }));

  //       if (data.data === "token expired") {
  //         localStorage.clear();
  //         navigate("/login");
  //       }
  //     });
  // }, [navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
       name,
      modeOfTransportation,
      corneaId,
      hospitalName,
      // corneaLot,
      id,
    };
    console.log("iddddd:",id);
    // handleDistribution(id);
    try {
      const response = await axios.post(
        "http://localhost:4000/distribution/create",
        data
      );
      console.log("dist:", response.data);
      toast({
        title: "Data Registerd successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/labtechnicaldashboard/viewdistributed");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDistribution = async (id) => {
    try {
      await axios.put(`http://localhost:4000/cornea/distribute/${id}`, distri);
      //navigate(`/labtechnicaldashboard/distributeCornea/${id}`);
    } catch (error) {
      console.error("Failed to collect physical exam:", error);
    }
  };

  useEffect(() => {
    const getAllStoredCorneas = async () => {
      try {
        const params = {
          suiatablity: suiatablity,
        };
        const queryString = new URLSearchParams(params).toString();
        //   console.log(queryString);

        const response = await axios.get(`http://localhost:4000/cornea/read`);

        const data = response.data;
        const filteredCornea = data.filter(
          (cornea) =>
            cornea.evaluation.approval === "yes" &&
            cornea.evaluation.suiatablity === request.suiatablity
        );

        console.log("tt:", filteredCornea);

        setCorneas(filteredCornea);
      } catch (error) {
        console.error(error);
      }
    };

    getAllStoredCorneas();
  }, [suiatablity]); // Use 'suitability' as the dependency
  const handleDistribute = async (id) => {
    try {
      await axios.put(`http://localhost:4000/cornea/distributed/${id}`);

      setCorneas(
        corneas.map((p) => (p._id === id ? { ...p, distributed: true } : p))
      );
      toast({
        title: "Cornea Distributed",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
console.log("waw",corneas)
  console.log("ta", corneaId);

  return (
    <div>
      <h2 className="text-3xl mb-4" style={{ textAlign: "center" }}>
        Welcome to Cornea Distribution Form
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid justify-center">
          <label>
            <input
              type="text"
              value={hospitalName}
              className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            />
          </label>
          <label>
            <input
              type="text"
              value={name}
              className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            />
          </label>
          <label>
            <select
              className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              value={modeOfTransportation}
              onChange={(e) => setModeOfTransportation(e.target.value)}
            >
              <option value="" disabled>
                Mode Of Transportation
              </option>
              <option value="Amblunce">Amblunce</option>
              <option value="Plane">Plane</option>
            </select>
          </label>
          <label>
            <select
              className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              value={corneaId}
              onChange={(e) => setCorneaId(e.target.value)}
            >
              <option value="">Select seriablitiy</option>
              {corneas.map((cornea) => (
                <option key={cornea._id} value={cornea._id}>
                  {cornea.evaluation.suiatablity}
                </option>
              ))}
            </select>
          </label>

          {/* <label>
            <select
              className="form-input mt-3 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              value={corneaLot}
              onChange={(e) => setCorneaLot(e.target.value)}
            >
              <option value="">Select lotNo</option>
              {corneas.map((cornea) => (
                <option key={cornea._id} value={cornea._id}>
                  {cornea.lotNo}
                </option>
              ))}
            </select>
          </label>  */}

          <div className="text-center mt-4">
            {/* {corneas.map((cornea, index) => ( */}
              <button
                // onClick={() => handleDistribute(cornea._id)}
                type="submit"
                className="w-1/2 mr-4 py-2 px-4 bg-sky-600 hover:bg-blue-600 text-white font-semibold rounded"
              >
                Distribute
              </button>
            {/* ))} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DistributeCornea;
