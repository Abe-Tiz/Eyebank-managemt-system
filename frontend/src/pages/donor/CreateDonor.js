import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../static/styles/donor.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";


const initialState = {
  name: "",
  email: "",
  age: "",
  sex: " ",
  city: "",
  subcity: "",
  kebele: "",
  HNumber: "",
  mobile: "",
};

const citiesInEthiopia = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Gondar",
  "Hawassa",
];

// Subcities for each city
const subcitiesInEthiopia = {
  "Addis Ababa": [
    "Arada",
    "Kirkos",
    "Yeka",
    "Gulele",
    "Lideta",
    "Addis Ketema",
    "Akaky Kaliti",
    "Nifas Silk-Lafto",
    "Kolfe Keranio",
    "Bole",
  ],
  "Dire Dawa": ["Abuna", "Dirdabò", "Oboshe", "ድሬዳዋ", "Ware Roble"],
  Mekelle: [
    "Ayder",
    "Hawelti",
    "Adi Haqi",
    "Hadnet",
    "Kedamay",
    "Weyane",
    "Quiha",
    "Semien",
  ],
  Gondar: ["Fasil", "Jantekel", "Arada", "Zobel ", "Maraki ", "Azezo "],
  Hawassa: [
    " Hayek Dare",
    " Menehariya",
    "Tabore",
    "Misrak",
    "BahileAdarash",
    "Addis Ketema",
    "Hawela Tula",
    "Mehalketema",
  ],
};

const CreateDonor = () => {
  const [formData, setFormData] = useState(initialState);
  const [isName, setIsName] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isValidAge, setIsValidAge] = useState(false);
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedCity, setSelectedCity] = useState("");
   const [selectedSubcity, setSelectedSubcity] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const imagePath = process.env.PUBLIC_URL + "/images/eye2.png";

  // Disable submit button until all fields are filled in
  const canSubmit = Object.values(formData).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
    };

    axios
      .post("http://localhost:4000/donor/register", payload)
      .then((res) => {
        if (
          !formData.name ||
          !formData.email ||
          !formData.sex ||
          !formData.age
        ) {
          toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Registration succeeded.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });

          // console.log(res.data.result);
          navigate("/viewdonor", {
            state: {
              data: res.data.result,
            },
          });
          // Clear the form data after successful registration
          setFormData(initialState);
          setIsName(false);
          setIsMobile(false);

        }
      })
      .catch((err) => {
        toast({
          title: "Error Occurred!",
          description: err.response.data.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleAge = (e) => {
    setFormData({ ...formData, age: e.target.value });
  };

  // const handleSubcity = (e) => {
  //   setFormData({ ...formData, subcity: e.target.value });
  // };

  const handleCity = (e) => {
    setSelectedCity(e.target.value);
    setFormData({ ...formData, city: e.target.value, subcity: "" });
  };

  const handleSubcity = (e) => {
    setSelectedSubcity(e.target.value);
    setFormData({ ...formData, subcity: e.target.value });
  };


  const handleKebele = (e) => {
    setFormData({ ...formData, kebele: e.target.value });
  };

  const handleHouseNumber = (e) => {
    setFormData({ ...formData, HNumber: e.target.value });
    setIsName(true);
  };

  const handleMobile = (e) => {
    setFormData({ ...formData, mobile: e.target.value });
    setIsMobile(true);
  };

  // const handleCity = (e) => {
  //   setFormData({ ...formData, city: e.target.value });
  // };

  const handleSex = (e) => {
    setFormData({ ...formData, sex: e.target.value });
  };

  const handleEmail = (e) => {
  setFormData({ ...formData, email: e.target.value });
};

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };


useEffect(() => {
  if (selectedDate) {
    const birthdate = new Date(selectedDate);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthdate;
    const ageInYears = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );

    if (ageInYears < 2 || ageInYears > 80) {
      setIsValidAge(true);
    } else {
      setIsValidAge(false);
      setFormData({ ...formData, age: ageInYears.toString() });
      console.log(formData.age, "Years");
    }
  }
}, [selectedDate]);
  

   // Size of the circles
  const circleSize = 32;

  return (
    <>
      <div class="relative bg-white min-h-screen flex items-center justify-center md:mt-4">
        <div
          className={`absolute top-8 left-16 w-52 h-52 bg-yellow-400 rounded-full opacity-60`}
        ></div>
        <div
          className={`absolute bottom-10 right-16 w-52 h-52 bg-orange-500 rounded-full opacity-60`}
        ></div>

        <div class="bg-gray-300 rounded-md overflow-hidden shadow-md p-6 mx-auto w-3/4 relative">
          <div
            className={`absolute top-10 left-10 w-64 h-64 bg-indigo-400 rounded-full opacity-30`}
          ></div>
          <div
            className={`absolute -top-10 -right-10 w-${circleSize} h-${circleSize} bg-purple-600 rounded-full opacity-30`}
          ></div>
          <div
            className={`absolute -bottom-10 -left-10 w-${circleSize} h-${circleSize} bg-pink-400 rounded-full opacity-30`}
          ></div>
          <div
            className={`absolute -bottom-10 -right-10 w-${circleSize} h-${circleSize} bg-blue-400 rounded-full opacity-30`}
          ></div>

          <div className="flex flex-col md:flex-row mt-6">
            <div className="flex justify-center mb-4 md:mb-0">
              <img
                className="w-32 h-32 rounded-full m-3"
                src={imagePath}
                alt="Profile-mage"
              />
            </div>
            <div className="flex flex-col justify-center ml-0 md:ml-4 mb-4 md:mb-0">
              <h3 className="block font-sans text-2xl ml-10 md:text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit">
                {t("donor:labelDonor")}
              </h3>
              <h4 className="block font-sans text-xl md:text-2xl antialiased font-semibold leading-snug tracking-normal text-inherit">
                {t("donor:subTitleDonor")}
              </h4>
            </div>
          </div>

          <div className="form">
            <form onSubmit={handleSubmit} className="group">
              <div className="flex justify-between flex-col md:flex-row md:w-auto md:m-4">
                <div className="flex flex-column justify-item-start  md:mr-4">
                  <div className="mt-4">
                    <label
                      htmlFor="age"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("register:LabelsignUpName")}
                      <span class="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        name="name"
                        type="text"
                        pattern="[a-zA-Z ]{6,}"
                        required
                        placeholder={t("common:namePlaceholderLabel")}
                        onChange={handleName}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("register:LabelFullNameError")}
                      </span>
                    </div>
                  </div>
                  {isName && (
                    <div className="mt-4">
                      <label
                        htmlFor="age"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("donor:donorAge")}
                        <span class="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col items-start">
                        <input
                          name="birthdate"
                          className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-60"
                          type="date"
                          autoComplete="off"
                          required
                          value={selectedDate}
                          onChange={handleDateChange}
                        />

                        {isValidAge && (
                          <div className="warning text-danger">
                            {t("donor:donorAgeError")}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {isMobile && (
                    <div className="mt-4">
                      <label
                        htmlFor="sex"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("donor:donorSex")}
                        <span class="text-red-500">*</span>
                      </label>
                      <select
                        name="sex"
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60"
                        onChange={handleSex}
                      >
                        <option value="">{t("donor:placeHolderSex")}</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorSexError")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-column justify-item-start  md:mr-4">
                  <div className="mt-4">
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("donor:donorCity")}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <select
                        name="city"
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-60"
                        onChange={handleCity}
                        value={selectedCity}
                      >
                        <option value="">{t("donor:placeHolderCity")}</option>
                        {citiesInEthiopia.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorCityError")}
                      </span>
                    </div>
                  </div>
                  {/* {isName && (
                    <div className="mt-4">
                      <label
                        htmlFor="subcity"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("donor:donorSubCity")}
                        <span class="text-red-500">*</span>
                      </label>

                      <div className="flex flex-col items-start">
                        <input
                          name="subcity"
                          type="text"
                          pattern="[0-9a-zA-Z ]{2,}"
                          required
                          className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                          placeholder={t("donor:placeHolderSubcity")}
                          onChange={handleSubcity}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          {t("donor:donorSubCityError")}
                        </span>
                      </div>
                    </div>
                  )} */}

                  {selectedCity && isName && (
                      <div className="mt-4">
                        <label
                          htmlFor="subcity"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {t("donor:donorSubCity")}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col items-start">
                          <select
                            name="subcity"
                            className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-60"
                            onChange={handleSubcity}
                            value={selectedSubcity}
                          >
                            <option value="">
                              {t("donor:placeHolderSubcity")}
                            </option>
                            {subcitiesInEthiopia[selectedCity].map(
                              (subcity) => (
                                <option key={subcity} value={subcity}>
                                  {subcity}
                                </option>
                              )
                            )}
                          </select>
                          <span className="mt-1 hidden text-sm text-red-400">
                            {t("donor:donorSubCityError")}
                          </span>
                        </div>
                      </div>
                    )}

                  {isMobile && (
                    <div className="mt-4">
                      <label
                        htmlFor="kebele"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("donor:donorKebele")}
                        <span class="text-red-500">*</span>
                      </label>

                      <div className="flex flex-col items-start">
                        <input
                          name="kebele"
                          type="text"
                          pattern="[0-9a-zA-Z ]{2,}"
                          required
                          className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                          placeholder={t("donor:placeHolderKebele")}
                          onChange={handleKebele}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          {t("donor:donorKebeleError")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-column justify-item-start ">
                  <div className="mt-4">
                    <label
                      htmlFor="hno"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("donor:donorHno")}
                      <span class="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        name="houseNumber"
                        type="numeric"
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[0-9]{2,12}"
                        placeholder={t("donor:placeHolderHNo")}
                        onChange={handleHouseNumber}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorHnoError")}
                      </span>
                    </div>
                  </div>
                  {isName && (
                    <div className="mt-4">
                      <label
                        htmlFor="mobile"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("donor:donorMobile")}
                        <span class="text-red-500">*</span>
                      </label>

                      <div className="flex flex-col items-start">
                        <input
                          name="mobile"
                          type="numeric"
                          className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                          autoComplete="off"
                          required
                          pattern="[0-9]{10}"
                          placeholder={t("donor:placeHolderMobile")}
                          onChange={handleMobile}
                        />

                        <span className="mt-1 hidden text-sm text-red-400">
                          {t("donor:donorMobileError")}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* </div> */}

                  {isMobile && (
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
                          className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                          autoComplete="off"
                          required
                          pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          placeholder={t("common:emailPlaceholderLabel")}
                          onChange={handleEmail}
                        />
                        <span className="mt-1 hidden text-sm text-red-400">
                          {t("login:labelErrorEmail")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="d-flex justify-content-center pt-3 mb-4">
                <div className="mt-4 flex items-center">
                  <button
                    onClick={() => window.history.back()}
                    className=" bg-green px-5 py-2  border-2 hover:bg-transparent text-white hover:text-green font-extrabold text-xl mt-3 mr-5 "
                  >
                    {t("common:backButtonLabel")}
                  </button>
                </div>

                <div className="mt-4 flex items-center">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`bg-green text-xl px-5 py-2 border-2   hover:bg-gray-600 text-black-700 hover:text-white hover:font-extrabold font-extrabold mt-3 mr-5   focus:outline-none focus:ring-1 focus:ring-blue-300 ${
                      !canSubmit
                        ? "disabled:cursor-no-drop disabled:border-1 disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 group-invalid:pointer-events-none group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:opacity-80"
                        : ""
                    }`}
                  >
                    {t("common:registerButtonLabel")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDonor;
