import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const useLoggedInUser = (type) => {
    const [user, setUser] = useState(null);
    const [isPost, setIsPost] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to true assuming user is logged in
    const getLoggedInUser = useCallback(async () => {
        try {
            let token = null;

            switch (type) {
                case "admin":
                    token = localStorage.getItem("admin");
                    break;
                case "lab":
                    token = localStorage.getItem("lab");
                    break;
                case "medical":
                    token = localStorage.getItem("medical");
                    break;
                case "doctor":
                    token = localStorage.getItem("doctor");
                    break;
            }
            const response = await axios.post(
                "https://eyebank-backend-2.onrender.com/user/userLogedin",
                {
                    token: token,
                }
            );
            if (response.data.status === "ok") {
                setUser(response.data);
                setIsPost(!isPost);
            } else {
                setIsLoggedIn(!isLoggedIn);
            }
        } catch (error) {
            console.error("Error fetching logged in user", error);
        }
    }, [isPost]);
    useEffect(() => {
        getLoggedInUser();
    }, [getLoggedInUser]);

    return { user, setUser, isPost, isLoggedIn, getLoggedInUser };
};
export default useLoggedInUser;
