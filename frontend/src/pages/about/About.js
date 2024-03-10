import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";
import "../../static/styles/home.css";
import { useTranslation } from "react-i18next";
 

 

const About = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(true);

   const Clients = [
    {
      name:  t("about:Yohannis") ,
      image: "../images/Joye.jpg",
      role:  t("about:medicalDirector") ,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name:  t("about:Amsalu") ,
      image: "../images/Amsalu.jpg",
      role:  t("about:labTechnician") ,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name:  t("about:Abebe") ,
      image: "../images/Abebe.jpg",
      role:  t("about:technicalManager") ,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name: t("about:Tefera"),
      image: "../images/Tefera.jpg",
      role:  t("about:councellor") ,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name:  t("about:Awoke") ,
      image: "../images/Awoke.jpg",
      role:  t("about:technicalManager") ,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name:  t("about:Lemlem") ,
      image: "../images/Lemlem.jpg",
      role: t("about:labTechnician") ,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
  ];
  

  return (
    <>
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%  mt-0 mb-0  ">
        {/* <Header /> */}
        <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% mx-20 mb-3 mt-3 border-0 p-10 bg-white rounded-xl">
          <h1 className=" text-4xl font-bold text-center mt-1 font-sans">
            {t("about:whoweare")}
          </h1>
          <div className="border-t-4 py-4  section-container lg:columns-2 md:columns-1 sm:columns-1 gap-10">
            <div className="flex flex-col md:flex-row px-3 items-center ">
              <img
                src="../images/stakeholders.jpeg"
                alt="Stakeholders"
                className="rounded-2 mt-5"
              />
            </div>
            <div className="flex flex-col md:flex-row mt-5 px-3 items-center">
              <p className="pt-5 justify-center text-justify">
                <p className="mt-1 text-[#4A4A4A] text-xl space-x-1 space-y-5 font-mono ">
                  {t("about:content")}{" "}
                </p>
                <p className="mt-1 text-[#4A4A4A] text-xl space-x-1 space-y-5 font-mono">
                  {t("about:toggle")}
                </p>
              </p>
            </div>
          </div>

          {/* Missions and Vissions */}

          <section className="bg-gray-500 my-5 py-10 w-full">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-8 w-96  shadow-md transform hover:-translate-y-1 hover:shadow-lg transition duration-300">
                  <h2 className="text-3xl font-bold mb-4">
                    {t("about:mission")}
                  </h2>
                  <p className="text-gray-600">{t("about:missionStatement")}</p>
                </div>
                <div className="p-8 w-96 bg-white shadow-md transform hover:-translate-y-1 hover:shadow-lg transition duration-300">
                  <h2 className="text-3xl font-bold mb-4">
                    {t("about:vision")}
                  </h2>
                  <p className="text-gray-600 ">{t("about:visionStatement")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cards that show stackholders */}
          <section className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% ">
            <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm lg:mt-2 lg:mb-16 md:mb-10 sm:mb-10">
                <h2 className="border-b-4 py-3  mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  {t("about:ourteam")}
                </h2>
                <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                  {t("about:teamStatement")}
                </p>
              </div>

              <div className="grid -space-x-1  lg:gap-x-0 md:gap-7 sm:gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                
                {/* clients */}
                {
                  Clients.map((client) => (
                  <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5 bg-base-100 transform hover:border-2  hover:shadow-md transition duration-300 ">
                    <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                      <img
                        className="mx-auto mb-4 w-32 h-32 rounded-full "
                        src={client.image}
                        alt=""
                      />
                      <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <a href="#">{client.name}</a>
                      </h3>
                      <p>{client.role}</p>
                      <ul className="flex justify-center mt-4 space-x-3">
                        
                        {/* icons*/}
                        {client.icon.map((icon) => (
                          <li>
                            <a
                              href="#"
                              className="text-[#39569c] hover:text-gray-900 dark:hover:text-white"
                            >
                              <svg
                                className="w-7 h-7 mt-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                               {icon}
                              </svg>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
