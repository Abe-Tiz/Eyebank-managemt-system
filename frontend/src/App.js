import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { languages } from "./Languages";
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
  

function App() {
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const [isLoggedin, setIsLoggedin] = useState(false);

    const { t } = useTranslation();
    useEffect(() => {
        document.title = t("app_title");
        setIsLoggedin(localStorage.getItem("loggedIn") === "true");
    }, [currentLanguage, t]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
