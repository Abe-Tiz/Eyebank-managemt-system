
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
  return (
    <>
      <div className=" mx-20 mb-3 mt-3 border-0 p-10 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%">
        <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8 ">
          {/* images */}
          <div className="md:w-1/2 ">
            <img
              className="w-[300px] overflow-hidden"
              src="/images/home_image.png"
              alt="banner_image"
            />
          </div>

          {/* text */}
          <div className="md:w-1/2 space-y-7 px-4">
            <h2 className="md:text-5xl text-[#4A4A4A] text-4xl font-bold md:leading-snug leading-snug">
              See the world through someone else's{" "}
              <span className="text-green">Eyes.</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl">
              {t("translation:tagLabel")}
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="bg-green hover:bg-gray-400 px-3 py-2 text-2xl text-white font-extrabold mt-3 mr-5  "
            >
              {t("translation:homeContact")}
            </button>
            <button
              onClick={() => navigate("/registerDonor")}
              className="bg-[#4A4A4A] hover:bg-gray-400 px-5 py-2 text-2xl text-white font-extrabold mt-3 mr-5 "
            >
              {t("translation:Donor")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
