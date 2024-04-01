import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { languages } from "./../../../Languages";
import classNames from "classnames";
import DynamicIcon from "../../../components/DynamicIcon";

const LanguageSelector = ({ currentLanguageCode }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        className="flex justify-center gap-3 bg-transparent p-1 text-gray-400 font-bold dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        onClick={toggleDropdown}
      >
        <DynamicIcon
          library="fa"
          iconName="FaGlobe"
          className="text-2xl text-blue-400"
        />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {languages.map(({ code, name, country_code }) => (
          <li>
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
                className={`flag-icon flag-icon-${country_code.toLowerCase()} mx-2`}
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
  );
};

export default LanguageSelector;
