import { useState } from "react"
import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const SurgeonSidebar = ({
    collapsed,
    name,
    role,
    image,
}) => {

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState({
        recipient: false,
        report: false,
        accedent: false,
        request: false,
    });
    return (
        <div
            className={`bg-slate-700 overflow-auto h-screen fixed text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex flex-col h-full mt-0 overflow-scroll">
                {collapsed ? (

                    // collapsed btn
                    <div className="flex flex-col items-center">
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/addrecipient"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="Add Recipient"

                        >
                            {/* <BellOutlined className="text-2xl" /> */}
                            <MdSpaceDashboard className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/viewrecipient"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="View Recipients"

                        >
                            {/* <IoIosPersonAdd className="text-2xl" /> */}
                            <MdOutlineGroupAdd className="text-2xl" />


                        </Link>

                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/surgondashboard/sendRequestCornea"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="Send Cornea"
                        >
                            {/* <IoIosPersonAdd className="text-2xl" /> */}
                            <MdOutlineGroupAdd className="text-2xl" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* user progfile inage */}
                        <img
                            className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
                            src={image}
                            alt="user photo"
                        />
                        {/* <span className="text-2xl font-semibold mt-10 ml-10 text-pink-500">
                            {role}
                        </span>
                        <span className="text-2xl font-semibold  ml-10">{name}</span> */}
                        {/* btn */}
                        <div className="mt-4 flex flex-col items-center">

                            {/* <SideCustome
                                headerProps={{
                                    onClick: () =>
                                        setIsOpen({ ...isOpen, physical: !isOpen.physical }),
                                    iconLibrary: "bs",
                                    iconName: "BsFillExplicitFill",
                                    title: "Recipient",
                                    isOpen: isOpen.recipient,
                                }}
                                subtitleProps={[
                                    {
                                        link: "/surgondashboard/addrecipient",
                                        subtitle: "Add",
                                        iconLibrary: "md",
                                        iconName: "MdPlaylistAddCircle",
                                    },
                                    {
                                        link: "/surgondashboard/viewrecipient",
                                        subtitle: "View",
                                        iconLibrary: "md",
                                        iconName: "MdPlaylistAddCheckCircle",
                                    },

                                ]}
                            /> */}
                            <Link
                                to="/surgondashboard/addrecipient"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                // onClick={handleUserList}
                                data-tooltip-id="user-list"
                                data-tooltip-content="Add Recipient"
                            >
                                <CiBoxList className="text-2xl" />
                                <span className="ml-2"> {t("cornea:addRecipient")}</span>
                            </Link>
                            <Link
                                to="/surgondashboard/viewrecipient"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                data-tooltip-id="user-list"
                                data-tooltip-content="Recipient List"

                            // onClick={handleAddDonorClick}

                            >
                                <MdOutlineGroupAdd className="text-2xl" />
                                <span className="ml-2">{t("Recipient List")}</span>
                            </Link>
                            <Link
                                to="/surgondashboard/ocularpostlist"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                data-tooltip-id="user-list"
                                data-tooltip-content="Ocular post List" >
                                <MdOutlineGroupAdd className="text-2xl" />
                                <span className="ml-2">{t("Ocular post List")}</span>
                            </Link>
                            <Link
                                to="/surgondashboard/adverselist"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                data-tooltip-id="user-list"
                                data-tooltip-content="Adverse List" >
                                <MdOutlineGroupAdd className="text-2xl" />
                                <span className="ml-2">{t("Adverse List")}</span>
                            </Link>
                            <Link
                                to="/surgondashboard/sendRequestCornea"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                // onClick={handleUserList}
                                data-tooltip-id="user-list"
                                data-tooltip-content="Evaluated List"

                            // onClick={handleAddDonorClick}

                            >
                                <MdOutlineGroupAdd className="text-2xl" />
                                <span className="ml-2">Send Request</span>
                            </Link>

                            <Link
                                to="/surgondashboard/viewRequestedCornea"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                // onClick={handleUserList}
                                data-tooltip-id="user-list"
                                data-tooltip-content=" distribute Cornea"
                            >
                                <CiBoxList className="text-2xl" />
                                <span className="ml-2"> ViewCorneaRequest</span>
                            </Link>

                            <Link
                                to="/surgondashboard/recordaccident"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                // onClick={handleUserList}
                                data-tooltip-id="user-list"
                                data-tooltip-content="Record accident"
                            >
                                <CiBoxList className="text-2xl" />
                                <span className="ml-2"> {t("Record Accident")}</span>
                            </Link>
                            <Link
                                to="/surgondashboard/viewaccident"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                data-tooltip-id="user-list"
                                data-tooltip-content="Accidents list"
                            >
                                <MdOutlineGroupAdd className="text-2xl" />
                                <span className="ml-2">{t("Accident List")}</span>
                            </Link>

                        </div>
                    </>
                )}
            </div>


            {/* tooltips */}
            <Tooltip
                id="my-dashboard"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            <Tooltip
                id="add-donor"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            <Tooltip
                id="donor-list"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            <Tooltip
                id="add-user"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            <Tooltip
                id="user-list"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
        </div>
    );
};

export default SurgeonSidebar;
