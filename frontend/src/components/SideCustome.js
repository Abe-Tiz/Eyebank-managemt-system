import React, { useState } from "react";
import DynamicIcon from "./DynamicIcon";
import { Link } from "react-router-dom";

const SideCustome = ({ headerProps, subtitleProps }) => {

    return (
        <>
            <div>
                <div
                    className="flex gap-2 justify-between w-48  text-white p-2 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={headerProps.onClick}
                >
                    <div className="flex gap-3">
                        <DynamicIcon
                            library={headerProps.iconLibrary}
                            iconName={headerProps.iconName}
                            className="text-2xl"
                        />
                        <span>{headerProps.title}</span>
                    </div>

                    {headerProps.isOpen ? (
                        <DynamicIcon
                            library="io"
                            iconName="IoIosArrowUp"
                            className="text-2xl"
                        />
                    ) : (
                        <DynamicIcon
                            library="io"
                            iconName="IoIosArrowDown"
                            className="text-2xl"
                        />
                    )}
                </div>

                {/* Dropdown menu, conditional rendering based on isOpen state */}
                {headerProps.isOpen && (
                    <div className="bg-transparent  ml-3">
                        {subtitleProps.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className={`flex gap-2 w-full text-white p-2 hover:bg-gray-800 rounded`}
                                role="menuitem"
                                tabIndex="-1"
                                id={`menu-item-${index}`}

                            >
                                <DynamicIcon
                                    library={item.iconLibrary}
                                    iconName={item.iconName}
                                    className="text-2xl"
                                />
                                {item.subtitle}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SideCustome;
