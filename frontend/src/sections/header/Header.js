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
import { logo} from "../../static/assets/icons/eye.png";


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

  const hideNavbar = () => {
    setShowNavbar(false);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid navbar-containe">
        <Link to="/" className="logo">
           <
          {/* <Brand style={{ width: "50px", height: "50px", marginTop: "-30px",backgroundColor:"white",borderRadius:"50%"}} /> */}
        </Link>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {showNavbar ? (
            <IoMdClose color="white"/>
          ) : (
            <Hamburger color="white" />
          )}
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={hideNavbar}>
                {t("translation:Home")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" onClick={hideNavbar}>
                {t("translation:About")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/awareness" onClick={hideNavbar}>
                {t("translation:Awarness")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={hideNavbar}>
                {t("translation:Contact")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/registerDonor" onClick={hideNavbar}>
                {t("translation:Donor")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={hideNavbar}>
                {t("translation:Login")}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* <ButtonPrimary title={t("translation:Login")}/> */}

        <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
      <button
        className="btn btn-link dropdown-toggle"
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