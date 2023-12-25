import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsLockFill, BsFillPersonFill } from "react-icons/bs";
import "../../static/styles/signup.css";
import { FaImages } from "react-icons/fa";
import ButtonComponent from "../../components/ButtonComponent";
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
 
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);


  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

   const uploadImage = (pics) => {
      setImageLoading(true);
      // https://api.cloudinary.com/v1_1/dxa20yutc
      if (pics === undefined) {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      console.log(pics);

      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "mern-chat-app");
        data.append("cloud_name", "dxa20yutc");
        fetch("https://api.cloudinary.com/v1_1/dxa20yutc/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setImage(data.url.toString());
            console.log(data.url.toString());
            setImageLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setImageLoading(false);
          });
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setImageLoading(false);
        return;
      }
    }


  const handleConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;

    setConfirmPassword(confirmPasswordValue);

    // Check if passwords match and set error state
    setPasswordMatchError(password !== confirmPasswordValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setImageLoading(true);

    const data  = axios
      .post("http://localhost:4000/user/register", {
        name,
        email,
        image,
        password,
        role,
      });
    
      data.then((res) => {
        if (!name || !email || !password || !image || !role) {
            toast({
              title: "Please Fill all the Feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
        } else {
          // alert("Registered successfully.");
          toast({
            title: "Registered successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/login");
          console.log(res);
        }
      })
      .catch((err) => {
          toast({
            title: "Error Occured!",
            description: err.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
      });
  };

  //handle name change
  const handleName = (e) => {
    setName(e.target.value);
  };
  //handle email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
   
  //handle password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //handle role
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="login-form m-10">
          <h3 className="title">{t("register:titleLabel")}</h3>
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
                    htmlFor="age"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("register:LabelsignUpName")}{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                      name="name"
                      type="text"
                      placeholder={t("common:namePlaceholderLabel")}
                      onChange={handleName}
                      pattern="[a-zA-Z ]{6,}"
                      required
                    />
                    <span className="mt-1 hidden text-sm text-red-400">
                      {t("register:LabelFullNameError")}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("login:labelLoginEmail")}{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center">
                    <input
                      name="email"
                      type="email"
                      placeholder={t("common:emailPlaceholderLabel")}
                      onChange={handleEmail}
                      className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                      autoComplete="off"
                      required
                      pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <span className="mt-1 hidden text-sm text-red-400">
                      {t("login:labelErrorEmail")}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("register:LabelsignUpImage")}{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center">
                    <input
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImage(e.target.files[0])}
                      className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block valid:[&:not(:placeholder-shown)]:border-green-500"
                      autoComplete="off"
                      required
                    />
                    {/* <span className="mt-1 hidden text-sm text-red-400">
                      {t("register:LabelImageError")}
                    </span> */}
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="sex"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("register:LabelsignUpRole")}
                    <span class="text-red-500">*</span>
                  </label>
                  <select
                    name="sex"
                    className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60"
                    onChange={handleRole}
                  >
                    <option value="">{t("register:LabelRoleSelect")}</option>
                    <option value="admin">{t("register:LabelAdmin")}</option>
                    <option value="lab Techinician">
                      {t("register:LabelLabTechinician")}
                    </option>
                    <option value="medical Director">
                      {t("register:LabelMedicalDirector")}
                    </option>
                    <option value="doctor">{t("register:LabelDoctor")}</option>
                  </select>
                  <span className="mt-1 hidden text-sm text-red-400">
                    {t("register:LabelRoleError")}
                  </span>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("login:labelLoginPassword")}{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center">
                    <input
                      name="password"
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
                <ButtonComponent title={t("register:signUpLabel")} />
              </div>
            </form> 
          </div>
          <Link to="/login">
            {" "}
            {t("register:signupOptionLabel")} ? {t("login:loginTitleLabel")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
