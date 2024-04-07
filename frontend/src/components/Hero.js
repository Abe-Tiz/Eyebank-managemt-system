
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import ButtonPrimary from "./ButtonPrimary";

const Hero = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
  return (
    <>
      <div className=" mx-20 mb-3 mt-3 border-0 p-10 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%">
        <div className="py-10 flex flex-col md:flex-row-reverse justify-between items-center gap-8 ">
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
              {t("common:HeroHeading")}{" "}
              <span className="text-green">{t("common:HeroSpan")}</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl">
              {t("translation:tagLabel")}
            </p>
            <div className="flex justify-around w-auto gap-5">
              <ButtonComponent
                onClick={() => navigate("/contact")}
                title={t("translation:homeContact")}
              />

              <ButtonPrimary
                onClick={() => navigate("/registerDonor")}
                title={t("translation:Donor")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
