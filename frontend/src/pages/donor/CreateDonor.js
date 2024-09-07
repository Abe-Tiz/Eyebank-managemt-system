import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../static/styles/donor.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonComponent from "../../components/ButtonComponent";
import InputField from "../../components/InputField";

const initialState = {
  name: "",
  email: "",
  age: "",
  dob: "",
  sex: " ",
  city: "",
  subcity: "",
  kebele: "",
  HNumber: "",
  mobile: "",
  isVolunter: false,
};

const citiesInEthiopia = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Gondar",
  "Hawassa",
  "Others",
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
  const [isValidAge, setIsValidAge] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  age: "",
  dob: "",
  sex: "",
  city: "",
  subcity: "",
  kebele: "",
  HNumber: "",
  mobile: "",
  isVolunteer: false,
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // if (/^[a-zA-Z ]+$/.test(value)) { }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const imagePath = process.env.PUBLIC_URL + "/images/eye2.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
    };

    axios
      .post("https://eyebank-backend-2.onrender.com/donor/register", payload)
      .then((res) => {
        if (
          !formData.name ||
          !formData.email 
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
            title: "Registration succeeded. we will send password on your email, cheeck your email.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setFormData(initialState);
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
  const handleCheckbox = (e) => {
    setFormData({ ...formData, isVolunter: e.target.checked });
  };

  useEffect(() => {
    if (formData.dob) {
     
      const birthdate = new Date(formData.dob);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate - birthdate;
      const ageInYears = Math.floor(
        ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
      );
//  console.log("dob:",ageInYears)
      if (ageInYears < 18 || ageInYears > 80) {
        setIsValidAge(true);
      } else {
        setIsValidAge(false);
      }
    }
  }, [formData.dob]);

  return (
    <>
      <div className="w-full relative bg-gradient-to-r from-[#FAFAFA] from-0% to-[#fcfcfcd5] t0-100%   min-h-screen flex flex-col items-center justify-center md:mt-4">
        {/* <div class=" bg-base-200 rounded-md overflow-hidden p-6 mx-auto w-full items-center relative"> */}
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
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("common:namePlaceholderLabel")}
                        pattern="[a-zA-Z\u1200-\u137F ]{6,}"
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        type="text"
                        autoComplete="off"
                        required
                      />

                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("register:LabelFullNameError")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="age"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("donor:donorAge")}
                      <span class="text-red-500">*</span>
                    </label>

                    <InputField
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      isValidAge={isValidAge}
                      placeholder={t("common:namePlaceholderLabel")}
                      errorMessage="Invalid age. Must be 18 or older."
                    />
                  </div>
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
                      className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                      value={formData.sex}
                      onChange={handleInputChange}
                    >
                      <option value="">{t("donor:placeHolderSex")}</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <span className="mt-1 hidden text-sm text-red-400">
                      {t("donor:donorSexError")}
                    </span>
                  </div>
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
                        // name="city"
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        // onChange={handleCity}
                        // value={selectedCity

                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      >
                        <option value="">{t("donor:placeHolderCity")}</option>
                        {citiesInEthiopia.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                        {/* {citiesInEthiopia.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))} */}
                      </select>
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorCityError")}
                      </span>
                    </div>
                  </div>
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
                        // name="subcity"
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        // onChange={handleSubcity}
                        // value={selectedSubcity}

                        name="subcity"
                        value={formData.subcity}
                        onChange={handleInputChange}
                      >
                        <option value="">
                          {t("donor:placeHolderSubcity")}
                        </option>

                        {formData.city &&
                          subcitiesInEthiopia[formData.city].map((subcity) => (
                            <option key={subcity} value={subcity}>
                              {subcity}
                            </option>
                          ))}
                        {/* {subcitiesInEthiopia[selectedCity].map((subcity) => (
                            <option key={subcity} value={subcity}>
                              {subcity}
                            </option>
                          ))} */}
                      </select>
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorSubCityError")}
                      </span>
                    </div>
                  </div>
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
                        pattern="[0-9a-zA-Z\u1200-\u137F  ]{2,}"
                        required
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        placeholder={t("donor:placeHolderKebele")}
                        value={formData.kebele}
                        onChange={handleInputChange}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorKebeleError")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-column justify-item-start  md:mr-4">
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
                        name="HNumber"
                        type="numeric"
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        // autoComplete="off"
                        required
                        pattern="[0-9]{2,12}"
                        placeholder={t("donor:placeHolderHNo")}
                        value={formData.HNumber}
                        onChange={handleInputChange}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorHnoError")}
                      </span>
                    </div>
                  </div>
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
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        // autoComplete="off"
                        required
                        pattern="[0-9]{10}"
                        placeholder={t("donor:placeHolderMobile")}
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />

                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorMobileError")}
                      </span>
                    </div>
                  </div>
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
                        className="border-2 border-gray-300 p-2 hover:bg-gray-200 w-full md:w-60 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        placeholder={t("common:emailPlaceholderLabel")}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("login:labelErrorEmail")}
                      </span>
                    </div>
                  </div>

                  {/* checkbox */}
                  <label className="cursor-pointer label">
                    <span className="label-text">am Voluntore </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={handleCheckbox}
                    />
                  </label>
                </div>
              </div>

              <div class="d-flex justify-content-center pt-3 mb-4">
                <div className="mt-4 flex items-center">
                  {/* <ButtonComponent title={t("login:loginTitleLabel")} /> */}
                  <ButtonPrimary
                    onClick={() => window.history.back()}
                    title={t("common:backButtonLabel")}
                  />
                </div>

                <div className="mt-4 flex items-center">
                  <ButtonComponent
                    // disabled={!canSubmit}
                    title={t("common:registerButtonLabel")}
                    // canSubmit={!canSubmit}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <Link to="/donor-login" className="block ml-3 text-blue-500">
                  {t("donor:HavePledge")}? {t("login:loginTitleLabel")}
                </Link>
              </div>
            </form>
          </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default CreateDonor;
