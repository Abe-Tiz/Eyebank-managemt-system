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
                    url = "https://eyebank-backend-2.onrender.com/donor/search";
                    break;
                case "user":
                    url = "https://eyebank-backend-2.onrender.com/user/search";
                    break;
                case "cornea":
                    url = "https://eyebank-backend-2.onrender.com/cornea/search";
                    requestData = { lotNo: searchTerm };
                    break;
                case "blood":
                    url = "https://eyebank-backend-2.onrender.com/blood/search";
                    requestData = { lotNo: searchTerm };
                    break;
                case "hospital":
                    url = "https://eyebank-backend-2.onrender.com/hospital/search";
                    requestData = { hospitalName: searchTerm };
                    break;
                case "recipient":
                    url = "https://eyebank-backend-2.onrender.com/recipient/search";
                    requestData = { recipientname: searchTerm };
                    break;
                case "blood":
                    url = "https://eyebank-backend-2.onrender.com/blood/search";
                    requestData = { lotNo: searchTerm };
                    break;
                case "requestedCorneas":
                    url = "https://eyebank-backend-2.onrender.com/requestCornea/search";
                    requestData = { descriptionOfRequest: searchTerm };
                    break;
                case "distributed":
                    url = "https://eyebank-backend-2.onrender.com/distribution/search";
                    requestData = { hospitalName: searchTerm };
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
