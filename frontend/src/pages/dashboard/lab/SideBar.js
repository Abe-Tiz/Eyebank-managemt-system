import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CustomSidebar = ({ collapsed, name, image }) => {
    const { t } = useTranslation();

    return (
        <div
            className={`bg-indigo-900 overflow-auto h-screen fixed text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex flex-col h-full mt-0 overflow-scroll">
                {collapsed ? (
                    // collapsed btn
                    <div className="flex flex-col items-center">
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/collectCornea"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="Collect Cornea"
                        >
                            {/* <BellOutlined className="text-2xl" /> */}
                            <MdSpaceDashboard className="text-2xl" />
                        </Link>

                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/donorRegistration"
                            data-tooltip-id="add-donor"
                            data-tooltip-content="Register Donor"
                        >
                            {/* <IoIosPersonAdd className="text-2xl" /> */}
                            <MdOutlineGroupAdd className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/recordSerology"
                            data-tooltip-id="donor-list"
                            data-tooltip-content="Record Serology"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <PiUserListBold className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/screenDonor"
                            data-tooltip-id="add-user"
                            data-tooltip-content="Screen Donor"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <IoIosPersonAdd className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/recordMedicalParticular"
                            data-tooltip-id="user-list"
                            data-tooltip-content="Record Medical Particular"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <CiBoxList className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/discardCornea"
                            data-tooltip-id="user-list"
                            data-tooltip-content="Discard Cornea"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <CiBoxList className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/storeCornea"
                            data-tooltip-id="user-list"
                            data-tooltip-content=" Store cornea"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <CiBoxList className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/distributeCornea"
                            data-tooltip-id="user-list"
                            data-tooltip-content=" Distribute cornea"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <CiBoxList className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/viewCornea"
                            data-tooltip-id="user-list"
                            data-tooltip-content=" View cornea"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <CiBoxList className="text-2xl" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* user progfile inage */}


                        {/* btn */}
                        <div className="mt-4 flex flex-col items-center">

                            {/* user progfile inage */}
                            <img
                                className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
                                src={image}
                                alt="user photo"
                            />
                            <span className="text-lg font-semibold ml-10">{name}</span>

                            {/* btn */}
                            <div className="mt-4 flex flex-col items-center">
                                <Link
                                    to="/labtechnicaldashboard/collectCornea"
                                    className=" flex gap-2 text-white p-2 hover:bg-gray-800 rounded"
                                    // onClick={handleReport}
                                    data-tooltip-id="my-dashboard"
                                    data-tooltip-content="Collect Cornea"
                                >
                                    <MdSpaceDashboard className="text-2xl" />
                                    <span className="ml-2 ">{t("cornea:collectCorneaLabel")}</span>
                                </Link>
                                <Link
                                    to="/labtechnicaldashboard/viewCornea"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content=" view Cornea"
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2"> {t("cornea:viewCorneaLabel")}</span>
                                </Link>

                                <Link
                                    to="/labtechnicaldashboard/recordSerology"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleDisplayDonorClick}
                                    data-tooltip-id="donor-list"
                                    data-tooltip-content="Record Serology"
                                >
                                    <PiUserListBold className="text-2xl" />
                                    <span className="ml-2">{t("cornea:recordSerologyLabel")}</span>
                                </Link>
                                <Link
                                    to="/labtechnicaldashboard/screenDonor"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleAddUser}
                                    data-tooltip-id="add-user"
                                    data-tooltip-content="Screen Donor"
                                >
                                    <IoIosPersonAdd className="text-2xl" />
                                    <span className="ml-2">{t("cornea:screenDonorLabel")}</span>
                                </Link>
                                <Link
                                    to="/labtechnicaldashboard/recordMedicalParticular"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content="Record Medical Particular"
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2"> {t("cornea:recordMedicalParticularLabel")}</span>
                                </Link>
                                <Link
                                    to="/labtechnicaldashboard/discardCornea"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content=" discard Cornea"
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2"> {t("cornea:discardCorneaLabel")}</span>
                                </Link>
                                <Link
                                    to="/labtechnicaldashboard/storeCornea"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content=" store Cornea"
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2"> {t("cornea:storeCorneaLabel")}</span>
                                </Link>
                                <Link
                                    to="/labtechnicaldashboard/distributeCornea"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content=" distribute Cornea"
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2"> {t("cornea:distributeCorneaLabel")}</span>
                                </Link>

                            </div>
                        </div>
                    </>
                )}
            </div>



            {/* tooltips */}
            < Tooltip
                id="my-dashboard"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            < Tooltip
                id="add-donor"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            < Tooltip
                id="donor-list"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            < Tooltip
                id="add-user"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
            < Tooltip
                id="user-list"
                style={{ backgroundColor: "#940B92", color: "#fff" }}
            />
        </div >
    );
};

export default CustomSidebar;
