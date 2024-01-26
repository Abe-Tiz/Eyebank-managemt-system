import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { MdOutlineMail } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { useTranslation } from 'react-i18next';
 
const Card = ({id}) => {
  const [showButtons, setShowButtons] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(" ");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [kebele, setKebele] = useState("");
  const [HNumber, setHnumber] = useState("");
  const [mobile, setMobile] = useState("");
  
  const toast = useToast();
  const { t } = useTranslation();
  const imagePath = process.env.PUBLIC_URL + "/images/eye2.png";

  useEffect(() => {
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
    };
    fetchDonor();
  }, []);

    const handlePrint = () => {
      setShowButtons(false);
      window.print();
    };
    

  return (
    <div className="container m-10 bg-white px-5 py-5 max-w-md mx-auto border-2 shadow-md">
      <div className="text-center flex flex-col md:flex-row mt-2">
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
            {t("donor:cardDonor")}
          </h4>
          <div className="flex gap-4">
            <div>
              <div className="flex justify-start md:col-span-1 ">
                <label className="mr-3 text-sm font-bold text-gray-600 block">
                  {t("login:labelLoginEmail")}:
                </label>
                <p className="text-sm text-gray-800">eyebank@ethionet.et</p>
              </div>
              <div className="flex justify-start md:col-span-1 ">
                <label className="mr-3 text-sm font-bold text-gray-600 block">
                  {t("donor:faxLabel")}:
                </label>
                <p className="text-sm text-gray-800">+251-11-12249 83</p>
              </div>
            </div>
            <div>
              <div className="flex justify-start md:col-span-1 ">
                <label className="mr-1 text-sm font-bold text-gray-600 block">
                  <GiRotaryPhone />
                </label>
                <p className="text-sm text-gray-800">+251-11-122 38 38</p>
              </div>

              <div className="flex justify-start items-center md:col-span-1 ">
                <label className="mb-2 text-sm font-bold text-gray-600 block">
                  <MdOutlineMail />
                </label>
                <p className="text-sm text-gray-800">31642</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3">
        <div className="flex justify-start  md:col-span-1 ">
          <label
            htmlFor="fullName"
            className="  text-sm font-bold text-gray-600 block"
          >
            {t("register:LabelsignUpName")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {name}
          </p>
        </div>
        <div className="flex justify-start md:col-span-1 ">
          <label
            htmlFor="age"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorAge")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {age}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="refNumber"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:refNumberLabel")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {id}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="sex"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorSex")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {sex}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="city"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorCity")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {city}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="date"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:dateLabel")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="subcity"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorSubCity")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {subcity}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="kebele"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorKebele")}
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {kebele}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="kebele"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorHno")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {HNumber}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="kebele"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("login:labelLoginEmail")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {email}
          </p>
        </div>
        <div className="flex justify-start  md:col-span-1">
          <label
            htmlFor="kebele"
            className="mr-3 text-sm font-bold text-gray-600 block"
          >
            {t("donor:donorMobile")}:
          </label>
          <p className="px-1 text-sm border-b-2 border-gray-500 text-gray-800">
            {mobile}
          </p>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-blue-400">
          {t("donor:labelDonorCardBottom")}
        </h2>
      </div>

      {showButtons && (
        <div className="mb-3 flex justify-center">
          <button
            onClick={handlePrint}
            className="print-button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border-2  mr-2"
          >
            {t("common:printButtonLabel")}
          </button>
          <button
            onClick={() => window.history.back()}
            className="print-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 border-2 mr-2"
          >
            {t("common:backButtonLabel")}
          </button>
        </div>
      )}
      <style>
        {`
          @media print {
            .print-button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Card

