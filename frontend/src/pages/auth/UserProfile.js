    import React, { useEffect, useState } from "react";
    import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
    import axios from "axios";
    import "../../static/styles/signup.css";
    import ButtonComponent from "../../components/ButtonComponent";
    import { useTranslation } from "react-i18next";
    import { useToast } from "@chakra-ui/react";
    import useLoggedInUser from "../../useHooks/useLoggedInUser";
    import DynamicIcon from "../../components/DynamicIcon";

    const UserProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [showpassword, setShowpassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();
    const { id } = useParams();
    const location = useLocation();
    const role = location.state;
    const { user } = useLoggedInUser(role.role);

    const userId = user?.data._id;
    // console.log("user id:", userId);

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
        // console.log(pics);

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
            setImageLoading(false);
            })
            .catch((err) => {
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
    };

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // setImageLoading(true);

        const data = axios.post(" http://localhost:4000/user/change-profile", {
        image,
        password,
        oldPassword,
        userId,
        });

        data
        .then((res) => {
            // alert("Registered successfully.");
            toast({
            title: "Updated  successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/adminDashboard/userList");
            console.log(res);
            // }
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

    //handle password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    //handle password change
    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    // confirm password
    const handleConfirmPassword = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setPasswordMatchError(password !== confirmPasswordValue);
    };

    // shiw password
    const handleOldShowPassword = () => {
        setShowpassword((prev) => ({
        ...prev,
        old: !prev.old,
        }));
    };

    const handleNewShowPassword = () => {
        setShowpassword((prev) => ({
        ...prev,
        new: !prev.new,
        }));
    };

    const handleCOnfirmShowPassword = () => {
        setShowpassword((prev) => ({
        ...prev,
        confirm: !prev.confirm,
        }));
    };

    return (
        <>
        <div className="container">
            <div className="login-form m-10 w-3/4 ">
            <h3 className="title">Change Your Password | Profile Image</h3>
            <div className="form ">
                <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-8 md:grid-cols-1 ">
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
                        />
                    </div>
                    </div>

                    <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Old {t("login:labelLoginPassword")}{" "}
                        <span class="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center">
                        <>
                        <input
                            name="oldPassword"
                            type={showpassword.old ? "text" : "password"}
                            className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                            autoComplete="off"
                            required
                            pattern="[0-9a-zA-Z]{8,}"
                            placeholder={t("common:passwordPlaceholderLabel")}
                            onChange={handleOldPassword}
                        />
                        <span
                            className="relative left-32 -top-8"
                            onClick={handleOldShowPassword}
                        >
                            {showpassword.old ? (
                            <DynamicIcon
                                library="io"
                                iconName="IoMdEye"
                                className="text-2xl text-gray-600"
                            />
                            ) : (
                            <DynamicIcon
                                library="io"
                                iconName="IoMdEyeOff"
                                className="text-2xl text-gray-600"
                            />
                            )}
                        </span>
                        </>

                        <span className="mt-1 hidden text-sm text-red-400">
                        {t("login:labelErrorPassword")}
                        </span>
                    </div>
                    </div>

                    <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        New {t("login:labelLoginPassword")}{" "}
                        <span class="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center">
                        <>
                        <input
                            name="password"
                            type={showpassword.new ? "text" : "password"}
                            className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                            autoComplete="off"
                            required
                            pattern="[0-9a-zA-Z]{8,}"
                            placeholder={t("common:passwordPlaceholderLabel")}
                            onChange={handlePassword}
                        />
                        <span
                            className="relative left-32 -top-8"
                            onClick={handleNewShowPassword}
                        >
                            {showpassword.new ? (
                            <DynamicIcon
                                library="io"
                                iconName="IoMdEye"
                                className="text-2xl text-gray-600"
                            />
                            ) : (
                            <DynamicIcon
                                library="io"
                                iconName="IoMdEyeOff"
                                className="text-2xl text-gray-600"
                            />
                            )}
                        </span>
                        </>

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
                        <>
                        <input
                            type={showpassword.confirm ? "text" : "password"}
                            name="password_confirmation"
                            placeholder="Confirm password"
                            className="block w-full border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                            autoComplete="off"
                            required
                            pattern="[0-9a-zA-Z]{8,}"
                            onChange={handleConfirmPassword}
                        />
                        <span
                            className="relative left-32 -top-8"
                            onClick={handleCOnfirmShowPassword}
                        >
                            {showpassword.confirm ? (
                            <DynamicIcon
                                library="io"
                                iconName="IoMdEye"
                                className="text-2xl text-gray-600"
                            />
                            ) : (
                            <DynamicIcon
                                library="io"
                                iconName="IoMdEyeOff"
                                className="text-2xl text-gray-600"
                            />
                            )}
                        </span>
                        </>

                        {passwordMatchError && (
                        <span className="mt-1 text-sm text-red-400">
                            {t("register:LabelConfirmPasswordError")}
                        </span>
                        )}
                    </div>
                    </div>
                    <ButtonComponent title={t("common:updateButtonLabel")} />
                </div>
                </form>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default UserProfile;
