import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import Hero from "../../components/Hero";
import ButtonComponent from "../../components/ButtonComponent";
  
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
        {/* hero section  */}
        <Hero />
        {/* about section */}
        <div className="mx-20 mb-3 mt-3 border-0 p-10 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%  rounded-xl">
          <h1 className=" text-4xl font-bold text-center mt-1 font-sans ">
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
                <p className="text-[#4A4A4A] text-xl">{t("about:content")} </p>
              </p>
            </div>
            <div className="flex justify-center">
              {/* <button
                className="bg-green hover:bg-gray-400 px-5 py-2 text-2xl text-white font-extrabold mt-3 mr-5 "
                onClick={() => navigate("/about")}
              >
                {t("about:readmore")}
              </button> */}
              <ButtonComponent
                onClick={() => navigate("/about")}
                title={t("about:readmore")}
                customClass="w-32"
              />
            </div>
          </div>
        </div>

        <div className=" bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% mx-20 mb-3 mt-3 border-0 p-10 bg-white rounded-xl">
          <h1 className=" text-4xl font-bold text-center mt-1 font-sans ">
            {t("mracleTitle")}
          </h1>
          <div className="section-container lg:columns-2 md:columns-1 sm:columns-1 gap-10">
            <div className="flex flex-col md:flex-row px-3 items-center ">
              <img src={imagePath} alt="Eye" className="rounded-2 mt-5" />
            </div>

            <div className="flex flex-col md:flex-row mt-5 px-3 items-center">
              <p className="pt-5 justify-center text-justify">
                {/* {t("about:content")} */}
                <p className="text-[#4A4A4A] text-xl ">
                  {" "}
                  {t("homeDescriptionLabel")}
                </p>
              </p>
            </div>
            <div className="flex justify-center">
              <ButtonComponent
                title={t("about:readmore")}
                onClick={() => navigate("/blog")}
                customClass="w-32"
              />
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="w-4/5 mx-auto my-16">
          <div className="flex overflow-x-hidden">
            <div className="full-screen-slide space-x-4 flex gap-10">
              <div className="min-w-max">
                <img
                  src="https://track.global/uploads/services/392.webp"
                  alt="Client Logo"
                  className="h-24"
                />
              </div>
              <div className="min-w-max">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzxChumv8SHhXzOFZM7zVYT6Xw7j1idzmSUQ&s"
                  alt="Client Logo"
                  className="h-24"
                />
              </div>
              <div className="min-w-max">
                <img
                  src="https://icladdis.com/images/ICL-LOGO-NEW.png"
                  alt="Client Logo"
                  className="h-24"
                />
              </div>
              <div className="min-w-max">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXmO_Vm7z13yTOUhw_bUdVOP2CvovhvdkjzA&s"
                  alt="etiotelecom Logo"
                  className="h-24"
                />
              </div>
              <div className="min-w-max">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/CBE_SA.png/220px-CBE_SA.png"
                  alt="cbe Logo"
                  className="h-24"
                />
              </div>
              <div className="min-w-max">
                <img
                  src="https://logos-world.net/wp-content/uploads/2023/01/Ethiopian-Airlines-Logo.png"
                  alt="airport Logo"
                  className="h-24"
                />
              </div>
              <div className="min-w-max">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WLm4yjrp2s9zCCbwYnnFS9MWJQDD2tB4jA&s"
                  alt="orbis Logo"
                  className="h-24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
