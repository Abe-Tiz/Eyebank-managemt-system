import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import i18next from "i18next";
import cookies from "js-cookie";
import Notification from './../../donor/Notification';
import { languages } from './../../../Languages';
import LanguageSelector from './LanguageSelector';
import axios from 'axios'

const HeaderComponent = ({ state, toggleSidebar, newDonorCount }) => {
  const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  //! handle Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
    

      useEffect(() => {
        document.title = t("app_title");
      }, [currentLanguage, t]);

      const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


      const getDonorByName = async () => {
        try {
          const response = await axios.post("http://localhost:4000/donor/search", {
            name: searchTerm,
          });
          // setDonors(response.data);
          console.log(response.data);
          setError(null);
        } catch (err) {
          setError(err.response ? err.response.data.error : err.message);
          setDonors([]);
        }
      };

      const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
          getDonorByName();
        }
      };
    
  return (
    <div
      className={`bg-base-100 p-4 shadow-lg flex justify-between text-center items-center fixed z-50  ${
        state.collapsed ? ` w-11/12` : `w-4/5`
      }`}
    >
      <div className="flex items-center">
        {state.collapsed ? (
          <TfiMenuAlt
            className="text-2xl text-gray-400 mr-2 cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <GiHamburgerMenu
            className="text-2xl text-gray-400 mr-2 cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
        {/* language selector */}
        <LanguageSelector />
      </div>

      <div className="bg-base-100 flex items-center justify-center space-x-4">
        <div className="flex-none gap-2">
          {/* search  */}
          <div className="dropdown dropdown-end">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* notification section  */}
          <div className="dropdown dropdown-end">
            {/* notification */}
            <div
              tabIndex={0}
              role="button"
              className="ml-5 btn btn-ghost btn-circle items-center justify-center text-center mr-5"
            >
              <div className="indicator flex items-center  ">
                <Badge
                  count={
                    newDonorCount > 0 ? (
                      <span>{newDonorCount}</span>
                    ) : (
                      <span>0</span>
                    )
                  }
                  className="mr-5 mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-5xl"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </Badge>
              </div>
            </div>

            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              {/* notification component */}
              <Notification newDonorCount={newDonorCount} />
            </div>
          </div>

          {/* profile section */}
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={state.image} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg text-black"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a> Setting</a>
              </li>
              <li>
                <a onClick={handleLogout}>{t("common:logouttButtonLabel")}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
