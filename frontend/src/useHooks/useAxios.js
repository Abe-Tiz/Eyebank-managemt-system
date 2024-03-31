import { useState, useEffect } from "react";
import axios from "axios";

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
