import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DynamicIcon from './../../../components/DynamicIcon';
import { useState } from "react";
import SideCustome from "../../../components/SideCustome";

const CustomSidebar = ({ collapsed, name, role }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState({
        serology: false,
        distribut: false,
        cornea: false,
        physical: false,
        request: false,
    });

    return (
        <div
            className={`bg-slate-700 overflow-auto h-screen fixed text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex flex-col h-full mt-0 overflow-scroll">
                {collapsed ? (
                    <div className="flex flex-col items-center">
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="Collect Cornea"
                        >
                            {/* <BellOutlined className="text-2xl" /> */}
                            <MdSpaceDashboard className="text-2xl" />
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
                        <Link
                            className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            to="/labtechnicaldashboard/viewRequestCornea"
                            data-tooltip-id="user-list"
                            data-tooltip-content=" View cornea"
                        >
                            {/* <SettingOutlined className="text-2xl" /> */}
                            <CiBoxList className="text-2xl" />
                        </Link>
                    </div>
                ) : (
                    // ) : (
                    //     <>
                    //         {/* user progfile inage */}
                    //         {/* btn */}
                    //         <div className="mt-4 flex flex-col items-center">

                    //             {/* user progfile inage */}
                    //             <img
                    //                 className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
                    //                 src={image}
                    //                 alt="user photo"
                    //             />
                    //             <span className="text-lg font-semibold ml-10">{name}</span>

                    //             {/* btn */}
                    //             <div className="mt-4 flex flex-col items-center">
                    //                 {/* <Link
                    //                     to="/labtechnicaldashboard/collectCornea"
                    //                     className=" flex gap-2 text-white p-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleReport}
                    //                     data-tooltip-id="my-dashboard"
                    //                     data-tooltip-content="Collect Cornea"
                    //                 >
                    //                     <MdSpaceDashboard className="text-2xl" />
                    //                     <span className="ml-2 ">{t("cornea:collectCorneaLabel")}</span>
                    //                 </Link> */}
                    //                 <Link
                    //                     to="/labtechnicaldashboard/createExams"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content="PhysicalExams"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:PhysicalExams")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/getAll"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content="PhysicalExams"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:PhysicalExamView")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/viewCornea"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" view Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:viewCorneaLabel")}</span>
                    //                 </Link>
                    //                 {/* <Link
                    //                     to="/labtechnicaldashboard/evaluatedList"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content="EvaluatedList"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:EvaluatedList")}</span>
                    //                 </Link> */}
                    //                 <Link
                    //                     to="/labtechnicaldashboard/serologyTest"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" serology test"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:serologytest")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/viewSerology"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" serology test"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:ViewSerology")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/discardCornea"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" discard Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:discardCorneaLabel")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/storedCornea"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" store Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:storeCorneaLabel")}</span>
                    //                 </Link>
                    //                 {/* <Link
                    //                     to="/labtechnicaldashboard/distributeCornea"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" distribute Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:distributeCorneaLabel")}</span>
                    //                 </Link> */}
                    //                 <Link
                    //                     to="/labtechnicaldashboard/viewDistributed"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content="View distribute "
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:viewDistributeLabel")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/viewDonor"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" View Donor"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> {t("cornea:viewdonor")}</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/labtechnicaldashboard/approvedRequest"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" distribute Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> ApprovedRequest</span>
                    //                 </Link>
                    //                 {/* <Link
                    //                     to="/medicaldirectordashboard/SendRequestCornea"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" distribute Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> Send request</span>
                    //                 </Link>
                    //                 <Link
                    //                     to="/medicaldirectordashboard/viewRequestedCornea"
                    //                     className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                    //                     // onClick={handleUserList}
                    //                     data-tooltip-id="user-list"
                    //                     data-tooltip-content=" distribute Cornea"
                    //                 >
                    //                     <CiBoxList className="text-2xl" />
                    //                     <span className="ml-2"> ViewCorneaRequest</span>
                    //                 </Link> */}

                    //             </div>
                    //         </div>
                    //     </>
                    // )}

                    <>
                        {/* user progfile inage */}
                        <div className="mt-4 flex flex-col items-center">
                            <span className="text-lg font-semibold mt-5 ml-10">{name}</span>
                            <span className="text-lg font-semibold ml-10 text-pink-500">
                                {role}
                            </span>

                            {/* btn */}
                            <div className="w-64- mt-4 flex flex-col justify-center items-center">
                                {/* for Physical Examninatiion */}
                                <SideCustome
                                    headerProps={{
                                        onClick: () =>
                                            setIsOpen({ ...isOpen, physical: !isOpen.physical }),
                                        iconLibrary: "bs",
                                        iconName: "BsFillExplicitFill",
                                        title: "Physical Examin",
                                        isOpen: isOpen.physical,
                                    }}
                                    subtitleProps={[
                                        {
                                            link: "/labtechnicaldashboard/getAll",
                                            subtitle: "View",
                                            iconLibrary: "md",
                                            iconName: "MdPlaylistAddCheckCircle",
                                        },
                                        {
                                            link: "/labtechnicaldashboard/createExams",
                                            subtitle: "Add",
                                            iconLibrary: "md",
                                            iconName: "MdPlaylistAddCircle",
                                        },
                                    ]}
                                />

                                {/* for serology */}
                                <SideCustome
                                    headerProps={{
                                        onClick: () =>
                                            setIsOpen({ ...isOpen, serology: !isOpen.serology }),
                                        iconLibrary: "gi",
                                        iconName: "GiTestTubes",
                                        title: "Serology",
                                        isOpen: isOpen.serology,
                                    }}
                                    subtitleProps={[
                                        {
                                            link: "/labtechnicaldashboard/list-serology",
                                            subtitle: "List",
                                            iconLibrary: "md",
                                            iconName: "MdPlaylistAddCheckCircle",
                                        },
                                        {
                                            link: "/labtechnicaldashboard/serology",
                                            subtitle: "Add",
                                            iconLibrary: "io",
                                            iconName: "IoIosAddCircle",
                                        },
                                    ]}
                                />

                                {/* for distribute */}
                                <SideCustome
                                    headerProps={{
                                        onClick: () =>
                                            setIsOpen({ ...isOpen, distribut: !isOpen.distribut }),
                                        iconLibrary: "fa",
                                        iconName: "FaHourglassEnd",
                                        title: "Distribution",
                                        isOpen: isOpen.distribut,
                                    }}
                                    subtitleProps={[
                                        {
                                            link: "/labtechnicaldashboard/viewDistributed",
                                            subtitle: "View",
                                            iconLibrary: "md",
                                            iconName: "MdOutlinePreview",
                                        },
                                    ]}
                                />

                                {/* for cornea */}
                                <SideCustome
                                    headerProps={{
                                        onClick: () =>
                                            setIsOpen({ ...isOpen, cornea: !isOpen.cornea }),
                                        iconLibrary: "gi",
                                        iconName: "GiMazeCornea",
                                        title: "Cornea",
                                        isOpen: isOpen.cornea,
                                    }}
                                    subtitleProps={[
                                        {
                                            link: "/labtechnicaldashboard/viewDonor",
                                            subtitle: "Donors",
                                            iconLibrary: "md",
                                            iconName: "MdStreetview",
                                        },
                                        {
                                            link: "/labtechnicaldashboard/viewCornea",
                                            subtitle: "View Cornea",
                                            iconLibrary: "fa",
                                            iconName: "FaClipboardList",
                                        },
                                        {
                                            link: "/labtechnicaldashboard/storedCornea",
                                            subtitle: "Store",
                                            iconLibrary: "gr",
                                            iconName: "GrDocumentStore",
                                        },
                                        {
                                            link: "/labtechnicaldashboard/discardCornea",
                                            subtitle: "Discard",
                                            iconLibrary: "md",
                                            iconName: "MdRemoveShoppingCart",
                                        },
                                    ]}
                                />
                                {/* for request cornea */}
                                <SideCustome
                                    headerProps={{
                                        onClick: () =>
                                            setIsOpen({ ...isOpen, request: !isOpen.request }),
                                        iconLibrary: "gi",
                                        iconName: "GiMazeCornea",
                                        title: "Request",
                                        isOpen: isOpen.request,
                                    }}
                                    subtitleProps={[
                                        {
                                            link: "/labtechnicaldashboard/viewRequestCornea",
                                            subtitle: "View Request",
                                            iconLibrary: "md",
                                            iconName: "MdStreetview",
                                        },


                                    ]}
                                />
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
}
export default CustomSidebar;
