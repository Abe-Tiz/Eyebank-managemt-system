import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const MedicalSidebar = ({
    collapsed,
    name,
    role,
    image
}) => {
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
                            to="/medicaldirectordashboard/viewTissue"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="View Cornea"
                        >
                            {/* <BellOutlined className="text-2xl" /> */}
                            <MdSpaceDashboard className="text-2xl" />
                        </Link>
                        <Link
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            to="/medicaldirectordashboard/evaluatelist"
                            data-tooltip-id="my-dashboard"
                            data-tooltip-content="Evaluate Cornea"
                        >
                            {/* <IoIosPersonAdd className="text-2xl" /> */}
                            <MdOutlineGroupAdd className="text-2xl" />
                        </Link>

                        <Link
                            to="/medicaldirectordashboard/editRequestCornea/:id"
                            className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            // onClick={handleUserList}
                            data-tooltip-id="request-list"
                            data-tooltip-content="requested-List"
                            // to="/medicaldirectordashboard/editRequestCornea/:id"
                            // className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                            // // onClick={handleUserList}
                            // data-tooltip-id="request-list"
                            // data-tooltip-content="requested-List"

                        // onClick={handleAddDonorClick}

                        >
                            <MdOutlineGroupAdd className="text-2xl" />

                        </Link>
                        {/* >
                            <MdOutlineGroupAdd className="text-2xl" />

                        </Link> */}

                    </div>
                ) : (
                    <>
                        {/* user progfile inage */}
                        <img
                            className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
                            src={image}
                            alt="user photo"
                        />
                        <span className="text-lg font-semibold ml-10">{name}</span>
                        <span className="text-lg font-semibold ml-10">{role}</span>
                        {/* btn */}
                        <div className="mt-4 flex flex-col items-center">
                            <Link
                                to="/medicaldirectordashboard/viewTissue"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                // onClick={handleUserList}
                                data-tooltip-id="user-list"
                                data-tooltip-content=" view Tissue"

                            >
                                <CiBoxList className="text-2xl" />
                                <span className="ml-2"> {t("cornea:viewTissueLabel")}</span>
                            </Link>
                            <Link
                                to="/medicaldirectordashboard/evaluatedlist"
                                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                // onClick={handleUserList}
                                data-tooltip-id="user-list"
                                data-tooltip-content="Evaluated List"// onClick={handleAddDonorClick}

                                >
                                    <MdOutlineGroupAdd className="text-2xl" />
                                    <span className="ml-2">{t("Evaluated List")}</span>
                                </Link>
                                <Link
                                    to="/medicaldirectordashboard/approveRequest"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content="Evaluated List"
    
                                // onClick={handleAddDonorClick}
    
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2">view Request</span>
                                </Link>
                                <Link
                                    to="/medicaldirectordashboard/approvedList"
                                    className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                                    // onClick={handleUserList}
                                    data-tooltip-id="user-list"
                                    data-tooltip-content="Approved List"
                                >
                                    <CiBoxList className="text-2xl" />
                                    <span className="ml-2">ApprovedList</span>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
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
    
    export default MedicalSidebar;
