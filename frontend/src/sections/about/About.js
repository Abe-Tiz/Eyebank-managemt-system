import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";
import "../../static/styles/home.css";
import Header from "../header/Header";
import Footer from "../footer/footer";
// import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";



const About = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(true);

  return (
    <>
     <div className="mt-0 mb-0">
      <Header />
      <div className="mx-20 mb-3 mt-3 border-0 p-10 bg-white rounded-xl">
        <h1 className=" text-4xl font-bold text-center mt-1 font-sans">
          {t("about:whoweare")}
        </h1>
        <div className="section-container lg:columns-2 md:columns-1 sm:columns-1 gap-10">
          <div className="flex flex-col md:flex-row px-3 items-center ">
            <img
              src="../images/stakeholders.jpeg"
              alt="Stakeholders"
              className="rounded-2 mt-5"
            />
          </div>

          <div className="flex flex-col md:flex-row mt-5 px-3 items-center">
            <p className="pt-5 justify-center text-justify">
              {t("about:content")}
              {toggle && <p className="mt-1">{t("about:toggle")}</p>}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="btn bg-backcolor btn-primary  hover:bg-blue-600 text-white mt-3 mr-5 h-10"
              onClick={() => setToggle(!toggle)}
            >
             {t("about:readmore")} 
            </button>
          </div>
        </div>

        {/* Missions and Vissions */}

        <section className="bg-white my-5 py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 w-96 bg-white shadow-md transform hover:-translate-y-1 hover:shadow-lg transition duration-300">
                <h2 className="text-3xl font-bold mb-4">{t("about:mission")}</h2>
                <p className="text-gray-600">{t("about:missionStatement")}</p>
              </div>
              <div className="p-8 w-96 bg-white shadow-md transform hover:-translate-y-1 hover:shadow-lg transition duration-300">
                <h2 className="text-3xl font-bold mb-4">{t("about:vision")}</h2>
                <p className="text-gray-600 ">{t("about:visionStatement")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cards that show stackholders */}

        <section className="bg-white dark:bg-gray-900">
          <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm lg:mt-2 lg:mb-16 md:mb-10 sm:mb-10">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {t("about:ourteam")}
              </h2>
              <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                {t("about:teamStatement")}
              </p>
            </div>

            <div className="grid -space-x-1  lg:gap-x-0 md:gap-7 sm:gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5 bg-base-100 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-md transition duration-300 shadow-xl">
                <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-32 h-32 rounded-full "
                    src="../images/Joye.jpg"
                    alt=""
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{t("about:Yohannis")}</a>
                  </h3>
                  <p>{t("about:medicalDirector")}</p>
                  <ul className="flex justify-center mt-4 space-x-3">
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
                          <FaFacebook />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTwitter />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaGithub />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#3daded] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTelegram />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5 bg-base-100 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-md transition duration-300 shadow-xl">
                <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-32 h-32 rounded-full "
                    src="../images/Amsalu.jpg"
                    alt=""
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{t("about:Amsalu")}</a>
                  </h3>
                  <p>{t("about:labTechnician")}</p>
                  <ul className="flex justify-center mt-4 space-x-3">
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
                          <FaFacebook />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTwitter />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaGithub />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#3daded] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTelegram />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5 bg-base-100 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-md transition duration-300 shadow-xl">
                <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-32 h-32 rounded-full "
                    src="../images/Abebe.jpg"
                    alt=""
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{t("about:Abebe")}</a>
                  </h3>
                  <p>{t("about:technicalManager")}</p>
                  <ul className="flex justify-center mt-4 space-x-3">
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
                          <FaFacebook />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTwitter />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaGithub />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#3daded] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTelegram />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5  bg-base-100 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-md transition duration-300 shadow-xl">
                <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-32 h-32 rounded-full "
                    src="../images/Tefera.jpg"
                    alt=""
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{t("about:Tefera")}</a>
                  </h3>
                  <p>{t("about:councellor")}</p>
                  <ul className="flex justify-center mt-4 space-x-3">
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
                          <FaFacebook />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTwitter />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaGithub />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#3daded] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTelegram />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5 bg-base-100 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-md transition duration-300 shadow-xl">
                <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-32 h-32 rounded-full "
                    src="../images/Awoke.jpg"
                    alt=""
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{t("about:Awoke")}</a>
                  </h3>
                  <p>{t("about:technicalManager")}</p>
                  <ul className="flex justify-center mt-4 space-x-3">
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
                          <FaFacebook />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTwitter />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaGithub />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#3daded] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTelegram />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card card-compact w-72 h-80 mx-4 md:mb-5 sm:mb-5 bg-base-100 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-md transition duration-300 shadow-xl">
                <div className="text-center text-gray-500 mt-8 mb-8 pb-4 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-32 h-32 rounded-full "
                    src="../images/Lemlem.jpg"
                    alt=""
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{t("about:Lemlem")}</a>
                  </h3>
                  <p>{t("about:labTechnician")}</p>
                  <ul className="flex justify-center mt-4 space-x-3">
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
                          <FaFacebook />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#00acee] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTwitter />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaGithub />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#3daded] hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          className="w-8 h-7 mt-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <FaTelegram />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default About;
