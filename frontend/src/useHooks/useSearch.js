import { useState } from "react";
import axios from "axios";

const useSearch = (searchType) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      let url;
      let requestData = { name: searchTerm };
      switch (searchType) {
        case "donor":
          url = "http://localhost:4000/donor/search";
          break;
        case "user":
          url = "http://localhost:4000/user/search";
          break;
        case "cornea":
          url = "http://localhost:4000/cornea/search";
          requestData = { lotNo: searchTerm }; 
          break;
        // Add more cases for other search types as needed
      }
      const response = await axios.post(url, requestData);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      setData([]);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      fetchData();
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    data,
    error,
    handleChange,
  };
};

export default useSearch;