import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import Notification from './../../donor/Notification';
import { languages } from './../../../Languages';
import LanguageSelector from './LanguageSelector';
import axios from 'axios'
import useSearch from "../../../useHooks/useSearch";

const HeaderComponent = ({
    state,
    toggleSidebar,
    newDonorCount,
    name,
    role,
    image,
    notifications,
    type,
}) => {
    const currentLanguageCode = cookies.get("i18next") || "en";
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const { searchTerm, handleChange, donor, error, getDonorByName } =
    //     useSearch();

    //! handle Logout
    const handleLogout = () => {
        localStorage.removeItem(type);
        navigate("/login");
    };
    useEffect(() => {
        document.title = t("app_title");
    }, [currentLanguage, t]);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    return (
        <div
            className={`p-2 flex justify-between text-center items-center fixed z-50  md:pr-5 pr-10  ${state.collapsed ? ` w-11/12 ml-8` : `w-4/5`
                }`}
        >
            <div className="flex items-center">
                {state.collapsed ? (
                    <TfiMenuAlt
                        className="text-2xl text-black mr-2 cursor-pointer"
                        onClick={toggleSidebar}
                    />
                ) : (
                    <GiHamburgerMenu
                        className="text-2xl text-black mr-2 cursor-pointer"
                        onClick={toggleSidebar}
                    />
                )}
                {/* language selector */}
                <LanguageSelector />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span className="text-2xl font-semibold  text-sky-600">
                    {role}
                </span>
                <span className="text-2xl font-semibold ml-5  text-sky-600">{name}</span>
            </div>
            <div className="bg-red-500 flex items-center justify-center space-x-4">
                <div className="flex-none gap-2">
                    {/* notification section  */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="ml-5 btn btn-ghost btn-circle items-center justify-center text-center mr-5"
                        >
                            <div className="indicator flex items-center  ">
                                <Badge className="mr-5 flex ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-5xl -mr-5 text-black"
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
                                    {newDonorCount > 0 ? (
                                        <span className="badge badge-secondary">
                                            {newDonorCount}
                                        </span>
                                    ) : (
                                        <span className="badge badge-secondary">0</span>
                                    )}
                                </Badge>
                            </div>
                        </div>

                        <div
                            tabIndex={0}
                            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                            {/* notification component */}
                            <Notification
                                newDonorCount={newDonorCount}
                                notifications={notifications}
                            />
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
                                <img alt="image" src={image} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg text-black"
                        >
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
