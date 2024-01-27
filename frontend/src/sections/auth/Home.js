import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";
import Header from "../header/Header";
import Footer from "../footer/footer";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const imagePath = process.env.PUBLIC_URL + "/images/eye2.png";
  const imagePath2 = process.env.PUBLIC_URL + "/images/eyet2.jpg";
  const imagePath3 = process.env.PUBLIC_URL + "/images/eyet3.jpg";
  const imagePath4 =
    "https://content.jdmagicbox.com/comp/ahmednagar/c5/9999px241.x241.141227004503.z9c5/catalogue/prakash-netralaya-dr-chitgopekar-savedi-ahmednagar-eye-hospitals-ly3f6k8kxx.jpg?clr=";

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div className="mt-0 mb-0 pt-1">
        <div
          className="m-0 px-10 py-20  bg-cover bg-center bg-fixed  w-full h-auto flex flex-col justify-center items-center relative"
          style={{ backgroundImage: `url(${imagePath4})` }}
        >
          <div className="text-white text-center">
            {/* <h1 className="mb-10 text-4xl font-bold text-white">
              {t("translation:tagLabel2")}
            </h1> */}
            {/* <p className="text-white">{t("translation:tagLabel")}</p> */}

            <div className="group bg-gray-300 shadow-lg rounded-lg overflow-hidden py-8 px-4 sm:px-6 lg:px-8 transition-transform transform ">
              <div className="max-w-3xl mx-auto">
                <blockquote className="text-2xl leading-8 font-medium font-mono  text-black  italic">
                  <span className="text-2xl text-blue-500 font-bold font-mono ">
                    {t("translation:tagLabel2")}
                  </span>{" "}
                  {t("translation:tagLabel")}
                </blockquote>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <button
                onClick={() => navigate("/contact")}
                className="bg-gray-400 px-5 py-2 text-2xl border-2 border-gray-700  hover:bg-gray-600 text-orange-700 hover:text-white hover:font-extrabold font-extrabold mt-3 mr-5  "
              >
                {t("translation:homeContact")}
              </button>
              <button
                onClick={() => navigate("/registerDonor")}
                className="bg-transparent px-5 py-2 text-2xl  border-2 border-blue-700  hover:bg-orange-600 text-orange-700 font-extrabold mt-3 mr-5 "
              >
                {t("translation:Donor")}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-20 mb-3 mt-3 border-0 p-10 bg-white rounded-xl">
          <h1 className=" text-4xl font-bold text-center mt-1 font-sans  border-y-4 py-3 border-yellow-500 ">
            {t("about:whoweare")}
          </h1>
          <div className=" section-container lg:columns-2 md:columns-1 sm:columns-1 gap-10">
            <div className="flex flex-col md:flex-row px-3 items-center ">
              <img
                src="../images/stakeholders.jpeg"
                alt="Stakeholders"
                className="rounded-2 mt-5"
              />
            </div>

            <div className="flex flex-col md:flex-row mt-5 px-3 items-center">
              <p className="pt-5 justify-center text-justify">
                {/* {t("about:content")} */}
                {/* <p className="mt-1 font-semibold space-x-1 space-y-5 font-mono ">
                  {t("about:toggle")}
                </p> */}
                <p className="mt-1 font-semibold space-x-1 space-y-5 font-mono ">
                  {t("about:content")}{" "}
                </p>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-white  border-2 border-blue-700  hover:bg-orange-600 text-pink-600 font-extrabold mt-3 mr-5 px-5 py-2 "
                onClick={() => navigate("/About")}
              >
                {t("about:readmore")}
              </button>
            </div>
          </div>
        </div>

        {/* information page */}
        <div className="mx-20 mb-3 mt-3 border-0 p-10 bg-white rounded-xl">
          <h1 className=" text-4xl font-bold text-center mt-1 font-sans  border-y-4 py-3 border-yellow-500">
            {t("mracleTitle")}
          </h1>
          <div className="section-container lg:columns-2 md:columns-1 sm:columns-1 gap-10">
            <div className="flex flex-col md:flex-row px-3 items-center ">
              <img src={imagePath} alt="Eye" className="rounded-2 mt-5" />
            </div>

            <div className="flex flex-col md:flex-row mt-5 px-3 items-center">
              <p className="pt-5 justify-center text-justify">
                {/* {t("about:content")} */}
                <p className="mt-1 font-semibold space-x-1 space-y-1 font-mono ">
                  {" "}
                  {t("homeDescriptionLabel")}
                </p>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-white  border-2 border-blue-700  hover:bg-orange-600 text-pink-600 font-extrabold mt-3 mr-5 px-5 py-2 "
                onClick={() => navigate("/awareness")}
              >
                {t("about:readmore")}
              </button>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center justify-center">
          <img
            src={imagePath}
            alt="Eye"
            className="rounded shadow-lg mr-4 w-40 md:w-60 lg:w-48" // Adjust the width as needed
          />
          <div className="w-full md:w-1/2 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold my-4 font-segoe-mdl2">
              {t("mracleTitle")}
            </h2>
            <p className="text-sm md:text-base lg:text-lg font-segoe-mdl2">
              {t("homeDescriptionLabel")}
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
