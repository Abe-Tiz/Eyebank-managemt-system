import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Hamburger } from "../../static/assets/icons/hamburger.svg";
import { ReactComponent as Brand } from "../../static/assets/icons/eyel.svg";
import "../../static/styles/header.css";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import { languages } from "../../Languages";
// import ButtonComponent from "../../components/ButtonComponent";
// import ButtonPrimary from "../../components/ButtonPrimary";


const Navbar = () => {
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("app_title");
    }, [currentLanguage, t]);

    const [showNavbar, setShowNavbar] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    return (
        <nav className="navbar">
            <div className="container1">
                <Link to="/" className="logo">
                    <Brand style={{ width: "40px", height: "40px", marginTop: "0px" }} />
                </Link>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    {showNavbar ? (
                        <IoMdClose size={24} color="black" />
                    ) : (
                        <Hamburger size={24} color="black" />
                    )}
                </div>
                <div className={`nav-elements ${showNavbar && "active"}`}>
                    <ul>
                        <li>
                            <NavLink to="/">{t("translation:labelHome")}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/About">{t("labelAbout")}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/awareness">
                                {t("translation:labelAwarness")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">{t("translation:labelContact")}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/registerDonor">{t("translation:labelDonor")}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/login">{t("translation:labelLogin")}</NavLink>
                        </li>
                    </ul>
                </div>

                {/* <ButtonPrimary title={t("translation:labelLogin")}/> */}

                {/* <ButtonPrimary title={t("translation:labelLogin")}/> */}


                <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
                    <button
                        className="btn btn-link dropdown-_toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        onClick={toggleDropdown}
                    >
                        {t("translation:language")}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {languages.map(({ code, name, country_code }) => (
                            <li key={country_code}>
                                <a
                                    href="#"
                                    className={classNames("dropdown-item", {
                                        disabled: currentLanguageCode === code,
                                    })}
                                    onClick={() => {
                                        i18next.changeLanguage(code);
                                        setDropdownOpen(false); // Close the dropdown after selecting
                                    }}
                                >
                                    <span
                                        className={`flag-icon flag-icon-${country_code} mx-2`}
                                        style={{
                                            opacity: currentLanguageCode === code ? 0.5 : 1,
                                        }}
                                    ></span>
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;