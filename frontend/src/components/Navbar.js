import React, { useEffect, useState } from 'react'
// import logo from '/images/log_ebms.jpg'
import { FaUserLarge } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
 import { IoMdClose } from "react-icons/io";
 
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

    const navItems = (
      <>
        <li>
          <a href="/">{t("translation:Home")}</a>
        </li>
        <li>
          <a href="/about"> {t("translation:About")}</a>
        </li>
       
        <li>
          <a href="/awareness"> {t("translation:Awarness")}</a>
        </li>
        <li>
          <a href="/contact"> {t("translation:Contact")}</a>
        </li>
        <li>
          <a href="/registerDonor"> {t("translation:Login")}</a>
        </li>
        
      </>
  );
  
    return (
      <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
        <div
          className={`navbar xl:px-24 ${
            isSticky
              ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out "
              : ""
          }`}
        >
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a href="/">
              <img className='w-20 h-20' src='/images/log_ebms.jpg' alt="logo" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          <div className="navbar-end">
            

            {/* cart items */}
            <div className={`dropdown ${isDropdownOpen ? "open" : ""} dropdown-end`}>
              <button
            className="bg-transparent border-4 border-purple-800 p-1 text-white font-bold  dropdown-toggle"
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

         
              <button
               
                className="btn bg-green text-white px-6 flex items-center gap-2 rounded-full"
              >
                <FaUserLarge /> Login
              </button>
           
          </div>
        </div>
      </header>
    );
}

export default Navbar
