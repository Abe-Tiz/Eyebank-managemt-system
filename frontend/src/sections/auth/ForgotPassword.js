import React, { useState, useEffect } from "react";
import "../../static/styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
import ButtonComponent from "../../components/ButtonComponent";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";
import { useToast } from "@chakra-ui/react";

const LoadingCircle = () => (
    <div class="text-center">
        <div role="status">
        <svg
            aria-hidden="true"
            class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
            />
            <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
            />
        </svg>
        <span class="sr-only">Loading...</span>
        </div>
    </div>
    );

    const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();

    // axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
        const response = await axios.post(
            `http://localhost:4000/user/forgot_password`,
            {
            email,
            }
        );

        if (response.data.message === "not verified") {
            console.log(response.data.message);
            toast({
                title: "Not Verified",
                description: "Please Verifiy Your Account.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } else {
            console.log(response.data.user.role);
            navigate("/login");
        }
        } catch (err) {
        setAttempts(attempts + 1);
        if (attempts >= 4) {
            // If attempts exceed 4, notify or block the user
            toast({
                title: "Too many failed attempts",
                description: "Your account has been locked. Please contact support.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } else {
            toast({
                title: "Error Occured!",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
        } finally {
        setIsLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

  return (
    <div className="signup__container container">
        <div className="login-form m-10">
            <h3 className="title text-2xl md:text-3xl font-semibold text-gray-800">
                {t("login:forgotPasswordLabel")}
            </h3>

            <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mt-4">
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {t("login:labelLoginEmail")}
                        <span class="text-red-500">*</span>
                    </label>

                    <div className="flex flex-col items-start">
                        <input
                            name="email"
                            type="email"
                            className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                            autoComplete="off"
                            required
                            pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            placeholder={t("common:emailPlaceholderLabel")}
                            onChange={handleEmailChange}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                            {t("login:labelErrorEmail")}
                        </span>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingCircle />
                ) : (
                    <ButtonComponent title={t("login:forgotpasswordButton")} />
                )}
                </div>
            </form>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
