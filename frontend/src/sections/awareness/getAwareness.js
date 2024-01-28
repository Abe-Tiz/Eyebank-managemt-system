import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

// const paragraphStyles = {
//   WebkitLineClamp: 4,
//   WebkitBoxOrient: "vertical",
//   overflow: "hidden",
//   display: "-webkit-box",
// };

function Awareness() {
  const { t } = useTranslation();
  const [awareness, setAwareness] = useState([]);
  const imagePath = process.env.PUBLIC_URL + "/images/eye2.png";
  const imagePath2 = process.env.PUBLIC_URL + "/images/sunglasses.jpg";
  const eyeEthiopia = process.env.PUBLIC_URL + "/images/eye-ethiop.jpg";
  const cornea = process.env.PUBLIC_URL + "/images/cornea.jpg";

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((result) => {
        if (Array.isArray(result.data)) {
          setAwareness(result.data);
        } else {
          console.log("Data is not an array");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/deleteAwareness/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="w-full max-w-screen-lg mx-auto py-8"
        style={{ width: "1600px", maxWidth: "90vw" }}
      >
        <div className=" mb-4 text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold italic text-purple-800 p-2 sm:p-4 md:ml-64">
          {t("awareness:awarenessTitle")}
        </div>
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-2">
            <div className="border  shadow-lg">
              <h3 className="text-xl text-center font-bold  text-blue-500 p-4">
                {t("awareness:awarenessSubTitle1")}
              </h3>
              <div className="relative overflow-hidden">
                <a
                  href="https://youtu.be/Z2tTP3eUtwM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group">
                    <div className="relative">
                      <img
                        className="w-1/2 mx-auto h-48 object-cover transition-all duration-300 group-hover:w-full group-hover:shadow-lg group-hover:bg-gray-200 rounded-lg"
                        src={cornea}
                        alt="Person 2"
                      />
                      <div className="absolute inset-0 flex items-center justify-center border-4 border-solid border-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-orange-500 text-white py-2 px-5 rounded-lg">
                          Go to Video
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div
                className={
                  isOpen
                    ? "p-4  bg-gray-100 rounded-lg shadow-lg"
                    : "p-4 line-clamp-6"
                }
              >
                <p className="text-gray-800 text-justify font-serif text-lg leading-7">
                  {t("awareness:awarnessContent1")}
                </p>
              </div>{" "}
              <button
                className="block mx-auto mt-4 mb-4 bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform hover:scale-110"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? t("awareness:readless") : t("awareness:readmore")}
              </button>
            </div>

            <div className="border shadow-lg">
              <h3 class="text-xl text-center capitalize   text-blue-500 font-bold p-4">
                {t("awareness:awarenessSubTitle2")}
              </h3>
              <div className="relative overflow-hidden">
                <a
                  href="https://youtu.be/hE0eZay2T0g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group">
                    <img
                      className="w-1/2 mx-auto h-48 object-cover transition-all duration-300 group-hover:w-full group-hover:shadow-lg group-hover:bg-gray-200 rounded-lg"
                      src={imagePath}
                      alt="Person 2"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-orange-500 text-white py-2 px-5">
                        Go to Video
                      </button>
                    </div>
                  </div>
                </a>
              </div>
              <div
                className={
                  isOpen1
                    ? "p-4  bg-gray-100 rounded-lg shadow-lg"
                    : "p-4 line-clamp-6"
                }
              >
                <p className="text-gray-800 text-justify  font-serif text-lg leading-7">
                  {t("awareness:awarnessContent2")}
                </p>
              </div>
              <button
                className="block mx-auto mt-4 mb-4 bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform hover:scale-110"
                onClick={() => setIsOpen1(!isOpen1)}
              >
                {isOpen1 ? t("awareness:readless") : t("awareness:readmore")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-2">
            <div className="border shadow-lg">
              <h3 className="text-xl text-center  text-blue-500 font-bold p-4">
                {t("awareness:awarenessSubTitle3")}
              </h3>
              <div className="relative overflow-hidden">
                <a
                  href="https://youtu.be/UfG6lmMUQUg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group">
                    <img
                      className="w-1/2 mx-auto h-48 object-cover transition-all duration-300 group-hover:w-full group-hover:shadow-lg group-hover:bg-gray-200 rounded-lg"
                      src={imagePath2}
                      alt="Person 2"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-orange-500 text-white py-2 px-5">
                        Go to Video
                      </button>
                    </div>
                  </div>
                </a>
              </div>
              <div
                className={
                  isOpen2
                    ? "p-4  bg-gray-100 rounded-lg shadow-lg"
                    : "p-4 line-clamp-6"
                }
              >
                <p className="text-gray-800 text-justify font-serif text-lg leading-7">
                  {t("awareness:awarnessContent3")}
                </p>
              </div>
              <button
                className="block mx-auto mt-4 mb-4 bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform hover:scale-110"
                onClick={() => setIsOpen2(!isOpen2)}
              >
                {isOpen2 ? t("awareness:readless") : t("awareness:readmore")}
              </button>
            </div>

            <div className="border shadow-lg">
              <h3 className="text-xl text-center  text-blue-500 font-bold p-4">
                {" "}
                {t("awareness:awarenessSubTitle4")}
              </h3>
              <div className="relative overflow-hidden">
                <a
                  href="https://youtu.be/jo_sMdptXi4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group">
                    <img
                      className="w-1/2 mx-auto h-48 object-cover transition-all duration-300 group-hover:w-full group-hover:shadow-lg group-hover:bg-gray-200 rounded-lg"
                      src={eyeEthiopia}
                      alt="Person 2"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-orange-500 text-white py-2 px-5">
                        Go to Video
                      </button>
                    </div>
                  </div>
                </a>
              </div>
              <div
                className={
                  isOpen3
                    ? "p-4  bg-gray-100 rounded-lg shadow-lg"
                    : "p-4 line-clamp-6"
                }
              >
                <p className="text-gray-800 text-justify font-serif text-lg leading-7">
                  {t("awareness:awarnessContent4")}
                </p>
              </div>
              <button
                className="block mx-auto mt-4 mb-4 bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform hover:scale-110"
                onClick={() => setIsOpen3(!isOpen3)}
              >
                {isOpen3 ? t("awareness:readless") : t("awareness:readmore")}
              </button>
            </div>

            {/* Add more awareness items here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awareness;
