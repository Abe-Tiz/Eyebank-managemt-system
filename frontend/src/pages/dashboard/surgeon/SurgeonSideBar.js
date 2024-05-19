import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DynamicIcon from "../../../components/DynamicIcon";
import SideCustome from "../../../components/SideCustome";
import { useState } from "react";
const SurgeonSidebar = ({ collapsed, name, image, role }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState({
        recipient: false,
        ocular: false,
        Request: false,
        adverse: false,
        dashboard: false,
        accident: false,
    });


    return (
        <div
            className={`bg-gray-700   h-screen fixed overflow-scroll overflow-x-hidden text-white transition-all duration-300 ${collapsed ? "w-28" : "w-60"
                }`}
        >


            <div className="flex flex-col h-full mt-0">
                {collapsed ? (
                    <div className="flex flex-col items-center">
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="Dashboard"
                        >
                            <DynamicIcon
                                library="md"
                                iconName="MdOutlineGroupAdd"
                                className="text-2xl"
                            />
                        </Link>
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/addrecipient"
                            data-tooltip-id="addrecipient"
                            data-tooltip-content="addrecipient"
                        >

                            <DynamicIcon
                                library="md"
                                iconName="MdOutlineGroupAdd"
                                className="text-2xl"
                            />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/viewrecipient"
                            data-tooltip-id="view recipient"
                            data-tooltip-content="view recipient"
                        >
                            <DynamicIcon
                                library="pi"
                                iconName="PiUserListBold"
                                className="text-2xl"
                            />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/sendRequestCornea"
                            data-tooltip-id="send RequestCornea"
                            data-tooltip-content="send RequestCornea"
                        >
                            <DynamicIcon
                                library="io"
                                iconName="IoIosPersonAdd"
                                className="text-2xl"
                            />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/recievedCornea"
                            data-tooltip-id="recieved Cornea"
                            data-tooltip-content="recieved Cornea"
                        >
                            <DynamicIcon
                                library="ci"
                                iconName="CiBoxList"
                                className="text-2xl"
                            />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/adminDashboard/activate"
                            data-tooltip-id="user-list"
                            data-tooltip-content="User List"
                        >
                            <DynamicIcon
                                library="vsc"
                                iconName="VscActivateBreakpoints"
                                className="text-2xl"
                            />
                        </Link>

                    </div>
                ) : (
                    <>

                        <span className="text-lg font-semibold mt-5 ml-10">{name}</span>
                        <span className="text-lg font-semibold ml-10 text-pink-500">
                            {role}
                        </span>

                        <div className="w-64- mt-4 flex flex-col justify-center items-center">
                            <SideCustome
                                headerProps={{
                                    onClick: () =>
                                        setIsOpen({ ...isOpen, dashboard: !isOpen.dashboard }),
                                    iconLibrary: "md",
                                    iconName: "MdSpaceDashboard",
                                    title: t("common:dashboardLabel"),
                                    isOpen: isOpen.dashboard,
                                }}
                                subtitleProps={[
                                    {
                                        link: "/surgondashboard",
                                        subtitle: t("common:dashboardLabel"),
                                        iconLibrary: "md",
                                        iconName: "MdSpaceDashboard",
                                    },
                                ]}
                            />

                            <SideCustome
                                headerProps={{
                                    onClick: () => setIsOpen({ ...isOpen, recipient: !isOpen.recipient }),
                                    iconLibrary: "bs",
                                    iconName: "BsFillExplicitFill",
                                    title: "Recipient",
                                    isOpen: isOpen.recipient,
                                }}
                                subtitleProps={[
                                    {
                                        link: "/surgondashboard/addrecipient",
                                        subtitle: "Add Recipient",
                                        iconLibrary: "md",
                                        iconName: "MdOutlineGroupAdd",
                                    },
                                    {
                                        link: "/surgondashboard/viewrecipient",
                                        subtitle: "View Recipient",
                                        iconLibrary: "pi",
                                        iconName: "PiUserListBold",

                                    },
                                ]}
                            />

                            <SideCustome
                                headerProps={{
                                    onClick: () => setIsOpen({ ...isOpen, ocular: !isOpen.ocular }),
                                    iconLibrary: "bs",
                                    iconName: "BsFillExplicitFill",
                                    title: "Ocular Post",
                                    isOpen: isOpen.ocular,
                                }}

                                subtitleProps={[
                                    {
                                        link: "/surgondashboard/ocularpostlist",
                                        subtitle: "Ocular Postlist",
                                        iconLibrary: "io",
                                        iconName: "IoIosPersonAdd",
                                    },


                                ]}
                            />

                            <SideCustome
                                headerProps={{
                                    onClick: () => setIsOpen({ ...isOpen, adverse: !isOpen.adverse }),
                                    iconLibrary: "bs",
                                    iconName: "BsFillAlarmFill",
                                    title: "Adverse",
                                    isOpen: isOpen.adverse,
                                }}
                                subtitleProps={[
                                    {
                                        link: "/surgondashboard/adverselist",
                                        subtitle: "adverse list",
                                        iconLibrary: "md",
                                        iconName: "MdVisibility",
                                    },

                                ]}
                            />

                            <SideCustome
                                headerProps={{
                                    onClick: () =>
                                        setIsOpen({ ...isOpen, Request: !isOpen.Request }),
                                    iconLibrary: "bs",
                                    iconName: "BsFillCheckCircleFill",
                                    title: "Request Cornea",
                                    isOpen: isOpen.Request,
                                }}
                                subtitleProps={[
                                    {
                                        link: "/surgondashboard/sendRequestCornea",
                                        subtitle: "send RequestCornea",
                                        iconLibrary: "ci",
                                        iconName: "CiHospital1",
                                    },
                                    {
                                        link: "/surgondashboard/viewRequestedCornea",
                                        subtitle: "view RequestedCornea",
                                        iconLibrary: "ci",
                                        iconName: "CiHospital1",
                                    },
                                    {
                                        link: "/surgondashboard/recievedCornea",
                                        subtitle: "recieved Cornea",
                                        iconLibrary: "ci",
                                        iconName: "CiHospital1",
                                    },
                                ]}
                            />


                            <SideCustome
                                headerProps={{
                                    onClick: () =>
                                        setIsOpen({ ...isOpen, accident: !isOpen.accident }),
                                    iconLibrary: "bs",
                                    iconName: "BsFillXCircleFill",
                                    title: "Accident",
                                    isOpen: isOpen.accident,
                                }}
                                subtitleProps={[
                                    {
                                        link: "/surgondashboard/recordaccident",
                                        subtitle: "record accident",
                                        iconLibrary: "ci",
                                        iconName: "CiHospital1",
                                    },
                                    {
                                        link: "/surgondashboard/viewaccident",
                                        subtitle: "viewaccident",
                                        iconLibrary: "ci",
                                        iconName: "CiHospital1",
                                    },

                                ]}
                            />
                        </div>
                    </>
                )}
            </div>


            <Tooltip
                id="my-dashboard"
                style={{ backgroundColor: "#940B92", color: "#fff", zIndex: 5 }}
            />
            <Tooltip
                id="add-donor"
                style={{ backgroundColor: "#940B92", color: "#fff", zIndex: 4 }}
            />
            <Tooltip
                id="donor-list"
                style={{ backgroundColor: "#940B92", color: "#fff", zIndex: 3 }}
            />
            <Tooltip
                id="add-user"
                style={{ backgroundColor: "#940B92", color: "#fff", zIndex: 2 }}
            />
            <Tooltip
                id="user-list"
                style={{ backgroundColor: "#940B92", color: "#fff", zIndex: 1 }}
            />
        </div>
    );
};

export default SurgeonSidebar;









