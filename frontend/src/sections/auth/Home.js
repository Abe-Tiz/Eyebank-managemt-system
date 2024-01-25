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

  return (
    <>
      {/* <Header /> */}

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

            <div className="group bg-transparent shadow-lg rounded-lg overflow-hidden py-8 px-4 sm:px-6 lg:px-8 transition-transform transform hover:scale-105">
              <div className="max-w-3xl mx-auto">
                <blockquote className="text-2xl leading-8 font-medium font-mono  text-white  italic">
                  <span className="text-2xl text-yellow-500 font-bold font-mono ">
                    {t("translation:tagLabel2")}
                  </span>{" "}
                  {t("translation:tagLabel")}
                </blockquote>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <button
                onClick={() => navigate("/contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {t("translation:homeContact")}
              </button>
              <button
                onClick={() => navigate("/registerDonor")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {t("translation:Donor")}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
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
        </div>
      </div>
    </>
  );
};

export default Home;
