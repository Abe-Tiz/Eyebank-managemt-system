import React, { useState, useEffect } from "react";
import "../../static/styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import LoadingCircle from "./../../components/LoadingCircle";

const LoginDonor = () => {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
 
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/donor/login", {
        email,
        code,
      });
      const data = response.data;
      console.log(data)
      if (data.message === "Not verified") {
        toast({
          title: "Not Verified",
          description: "Please Verify Your Account.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
            localStorage.setItem("code", data.data.email);
            localStorage.setItem("loggedIn", true);
            toast({
              title: "Login Succeeded",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            // setRefreshed(true);
            navigate("/profile");  
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 404 &&
          error.response.data.message === "User is not found."
        ) {
          toast({
            title: "User Not Found",
            description: "Please check your email and try again.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (
          error.response.status === 500 &&
          error.response.data.message === "Password is not matched"
        ) {
          toast({
            title: "Incorrect Password",
            description: "Please double-check your password.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if (error.response.data.message === "Not verified") {
          toast({
            title: "Not Verified",
            description: "Please verify your account.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } else {
        console.log(error.message);
        toast({
          title: "Error Occurred!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
       
    }
  };

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="signup__container container">
      <div className="login-form m-10">
        <h3 className="title text-2xl md:text-3xl font-semibold text-gray-800">
          Login to Your Profile
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                    {t("login:labelErrorEmail")}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {/* {t("login:labelLoginPassword")}{" "} */}
                  Short Code:
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-center">
                  <input
                    name="code"
                    type="number"
                    placeholder="Enter Short Code"
                    onChange={handleCodeChange}
                    className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                    autoComplete="off"
                    required
                    pattern="[0-9]{4}$"
                  />
                  <span className="mt-1 hidden text-sm text-red-400">
                    {t("login:labelErrorPassword")}
                  </span>
                </div>
              </div>
              {isLoading ? (
                <LoadingCircle />
              ) : (
                <ButtonComponent title={t("login:loginTitleLabel")} />
              )}
            </div>
          </form>
        </div>
        {/* <Link to="/register" className="block mt-4 text-blue-500">
          {t("login:loginDontLabel")}? {t("login:loginNavigatToSignup")}
        </Link> */}
        <Link to="/forgot-password" className="block ml-3 text-blue-500">
          {t("login:forgotPasswordLabel")} ?
        </Link>
      </div>
    </div>
  );
};

export default LoginDonor;
