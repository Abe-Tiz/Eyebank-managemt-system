import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../src/static/styles/header.css";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { languages } from './../Languages';


const Navbar = () => {
    const [isSticky, setSticky] = useState(false)
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const imagePath = process.env.PUBLIC_URL + "/images/log_ebms.jpg";

  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app_title");
  }, [currentLanguage, t]);
  
  // handle scroll functrions
  useEffect(() => {
    const handleScroll = () => {
      const offSet = window.scrollY;

      if (offSet > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
       window.addEventListener("scroll", handleScroll);
    }
  },[])

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
    <header className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%  max-w-full-2xl  mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-10">
    <nav  className={`bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% navbar xl:px-24 ${
            isSticky
              ? "shadow-md bg-base-200 transition-all duration-300 ease-in-out "
              : ""
          }`}>
      <div className="container-fluid bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100% ">
        <Link to="/" className="logo">
          {/* <Brand style={{ width: "50px", height: "50px", marginTop: "-30px",backgroundColor:"white",borderRadius:"50%"}} /> */}
          <img
            style={{
              width: "50px",
              height: "50px",
              marginTop: "-30px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
            src={imagePath}
            alt="Profile Image"
          />
        </Link>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {showNavbar ? (
            <IoMdClose color="gray" />
          ) : (
            <GiHamburgerMenu color="gray" />
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
              <NavLink to="/about" onClick={hideNavbar}>
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
            className="bg-transparent border-4 border-purple-800 p-1 text-gray-400 font-bold  dropdown-toggle"
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
      </header>
  );
};

export default Navbar;