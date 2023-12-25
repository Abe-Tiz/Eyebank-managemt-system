import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "AM", "OR", "TR"],
    fallbackLng: "en",
    debug: false,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    ns: ["login", "translation", "common", "register","donor"],
    backend: {
      loadPath: "/assets/locals/{{lng}}/{{ns}}.json", //
      allowMultiLoading: true, //
    },
  });

export default i18next;
