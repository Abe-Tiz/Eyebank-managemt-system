import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
import "../../static/styles/signup.css";
import { FaImages } from "react-icons/fa";
import ButtonComponent from "../../components/ButtonComponent";
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
    
    const ResetPassword = () => {
    
    const [code, setCode] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();
    const {id,token} =  useParams();

    const handleConfirmPassword = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);

        //! Check if passwords match and set error state
        setPasswordMatchError(code !== confirmPasswordValue);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
        `https://eyebank-backend-2.onrender.com/user/reset-password/${id}/${token}`,
        {
            code,
        }
        );

        const responseData = response.data; // Extract the data from the response

        if (responseData.status === "Success") {
            toast({
                title: "Reset successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate("/login");
        } else {
            toast({
                title: "Reset failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    } catch (error) {
        toast({
            title: "Error Occurred",
            description: error.response?.data.message || "Internal server error",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    }
    };

    //! handle password change
    const handlePassword = (e) => {
        setCode(e.target.value);
    };

    return (
      <>
        <div className="container">
          <div className="login-form m-10">
            <h3 className="title">{t("register:resetPasswordLabel")}</h3>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <div className="mt-4">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("login:labelLoginNewPassword")}{" "}
                      <span class="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center">
                      <input
                        name="code"
                        type="password"
                        className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[0-9a-zA-Z]{8,}"
                        placeholder={t("common:passwordPlaceholderLabel")}
                        onChange={handlePassword}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("login:labelErrorPassword")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="password_confirmation"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("register:LabelConfirmPassword")}{" "}
                      <span class="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center">
                      <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        className="block w-full border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[0-9a-zA-Z]{8,}"
                        onChange={handleConfirmPassword}
                      />

                      {passwordMatchError && (
                        <span className="mt-1 text-sm text-red-400">
                          {t("register:LabelConfirmPasswordError")}
                        </span>
                      )}
                    </div>
                  </div>
                  <ButtonComponent
                    customClass="w-64 justify-center  mb-3"
                    title={t("register:resetPasswordButton")}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};

export default ResetPassword;
