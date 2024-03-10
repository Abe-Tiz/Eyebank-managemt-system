import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../static/styles/donor.css";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";

 
const EditDonor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(" ");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [kebele, setKebele] = useState("");
  const [HNumber, setHnumber] = useState("");
  const [mobile, setMobile] = useState("");

  const [isName, setIsName] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();
  const { id } = useParams();

  const imagePath = process.env.PUBLIC_URL + "/images/eye2.png";

  // Disable submit button until all fields are filled in
  const allData = {
    name,
    email,
    age,
    sex,
    city,
    subcity,
    kebele,
    HNumber,
    mobile,
  };
  const canSubmit = Object.values(allData).every(Boolean);

  useEffect(() =>{
    const fetchDonor = async () => {
        try {
          if (!id) {
            toast({
              title: "Udefined",
              description: "Id is Undefined",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }

          const res = await axios.get(`http://localhost:4000/donor/${id}`);
          const donorData = res.data;
          console.log(donorData);

          // Update state variables with the fetched data
          setName(donorData.name);
          setEmail(donorData.email);
          setAge(donorData.age);
          setSex(donorData.sex);
          setCity(donorData.city);
          setSubcity(donorData.subcity);
          setKebele(donorData.kebele);
          setHnumber(donorData.HNumber);
          setMobile(donorData.mobile);
        } catch (error) {
            toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
            });
        } 
    }
      fetchDonor();
  },[])

    
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      age,
      sex,
      city,
      subcity,
      kebele,
      HNumber,
      mobile,
    };

    axios
      .put(`http://localhost:4000/donor/update/${id}`, payload)
      .then((res) => {
        if (!name || !email || !sex || !age) {
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
            title: "Update successed.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/viewdonor", {
            state: {
              data: res.data.result,
            },
          });
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        toast({
          title: "Error Occured!",
          description: err,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleSubcity = (e) => {
    setSubcity(e.target.value);
  };

  const handleKebele = (e) => {
    setKebele(e.target.value);
  };

  const handleHouseNumber = (e) => {
    setHnumber(e.target.value);
    setIsName(true);
  };

  const handleMobile = (e) => {
    setMobile(e.target.value);
    setIsMobile(true);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleSex = (e) => {
    setSex(e.target.value);
  };

  return (
    <>
      <div className="flex mt-4 md:mt-4">
        <div className="container border-2 py-6 border-gray-300 mb-4">
          <div className="flex flex-col md:flex-row mt-6">
            <div className="flex justify-center mb-4 md:mb-0">
              <img
                className="w-32 h-32 rounded-full m-3"
                src={imagePath}
                alt="Profile Image"
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
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        name="name"
                        type="text"
                        value={name}
                        pattern="[0-9a-zA-Z ]{6,}"
                        required
                        placeholder={t("common:namePlaceholderLabel")}
                        onChange={handleName}
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
                      {t("donor:AgeDonor")}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        name="age"
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        type="numeric"
                        value={age}
                        autoComplete="off"
                        required
                        pattern="[2-9]|[1-7][0-9]|80"
                        placeholder="Enter Your Age"
                        onChange={handleAge}
                        readOnly
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorAgeError")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="sex"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("donor:donorSex")}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="flex flex-col items-start">
                      <input
                        name="sex"
                        type="text"
                        value={sex}
                        // pattern="[a-zA-Z ]{2,}"
                        required
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        // placeholder="Enter Your Sex"
                        onChange={handleSex}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorSexError")}
                      </span>
                    </div>

                    {/* <select
                      name="sex"
                      className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60"
                      onChange={handleSex}
                    >
                      <option value="">Select Sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <span className="mt-1 hidden text-sm text-red-400">
                      you must select the sex
                    </span> */}
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
                      <input
                        name="city"
                        type="text"
                        value={city}
                        pattern="[0-9a-zA-Z ]{2,}"
                        required
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        // placeholder="Enter Your City"
                        onChange={handleCity}
                      />
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
                      <input
                        name="subcity"
                        type="text"
                        value={subcity}
                        // pattern="[0-9a-zA-Z ]"
                        required
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        placeholder="Enter Sub City"
                        onChange={handleSubcity}
                      />
                      {/* <span className="mt-1 hidden text-sm text-red-400">
                        subcity must be  characters  
                      </span> */}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="kebele"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("donor:donorKebele")}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="flex flex-col items-start">
                      <input
                        name="kebele"
                        type="text"
                        value={kebele}
                        pattern="[0-9a-zA-Z ]{2,}"
                        required
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        placeholder="Enter Kebele"
                        onChange={handleKebele}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("donor:donorKebeleError")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-column justify-item-start ">
                  <div className="mt-4">
                    <label
                      htmlFor="hno"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("donor:donorHno")}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        name="houseNumber"
                        type="numeric"
                        value={HNumber}
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[0-9]{2,12}"
                        placeholder="Enter House Number"
                        onChange={handleHouseNumber}
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
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="flex flex-col items-start">
                      <input
                        name="mobile"
                        type="numeric"
                        value={mobile}
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[0-9]{10}"
                        placeholder="Enter Mobile/House Phone "
                        onChange={handleMobile}
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
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="flex flex-col items-start">
                      <input
                        name="email"
                        type="email"
                        value={email}
                        className="border-2 border-gray-300  p-2 hover:bg-gray-200 w-60  [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                        autoComplete="off"
                        required
                        pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="mt-1 hidden text-sm text-red-400">
                        {t("login:labelErrorEmail")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center pt-3 mb-4">
                <div className="mt-4 flex items-center">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-transparent px-5 py-2 text-2xl border-2 border-gray-700  hover:bg-gray-600 text-black hover:text-white hover:font-extrabold font-extrabold mt-3 mr-5 "
                  >
                    {t("common:backButtonLabel")}
                  </button>
                </div>
                <div className="mt-4 flex items-center">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`bg-gray-400 px-5 py-2 text-2xl border-2 border-gray-700  hover:bg-gray-600 text-black hover:text-white hover:font-extrabold font-extrabold mt-3 mr-5    focus:outline-none focus:ring-1 focus:ring-blue-300 ${
                      !canSubmit
                        ? "disabled:cursor-no-drop disabled:border-2 disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 group-invalid:pointer-events-none group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:opacity-80"
                        : ""
                    }`}
                  >
                    {t("common:updateButtonLabel")}
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

export default EditDonor;