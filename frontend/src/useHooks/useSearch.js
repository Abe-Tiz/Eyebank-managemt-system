import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [donor, setDonors] = useState([]);
  const [error, setError] = useState(null);

  const getDonorByName = async () => {
    try {
      const response = await axios.post("http://localhost:4000/donor/search", {
        name: searchTerm,
      });
      setDonors(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      setDonors([]);
    }
  };

  const handleChange = (e) => {
      setSearchTerm(e.target.value);
      
      if (e.target.value) {
          getDonorByName();
      }
  };

 
  // Automatically fetch donors when the component mounts
  // useEffect(() => {
  //     getDonorByName();
  // }, []);

  return {
    searchTerm,
    setSearchTerm,
    donor,
    error,
    handleChange,
    getDonorByName,
   
  };
};

export default useSearch;
