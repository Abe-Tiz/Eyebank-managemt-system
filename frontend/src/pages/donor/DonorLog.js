import React, { useState, useEffect } from "react";
// import "../../static/styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import ButtonComponent from './../../components/ButtonComponent';
import LoadingCircle from './../../components/LoadingCircle';

 

const DonorLog = () => {
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
        `http://localhost:4000/donor/displayByEmail`,
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
        console.log(response.data);
          navigate("/viewdonor", {
              state: {
                  data: response.data
              }
          });
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
          Enter Your Email
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

export default DonorLog;
