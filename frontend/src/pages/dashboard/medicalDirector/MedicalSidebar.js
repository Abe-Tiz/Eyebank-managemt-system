// import { IoIosPersonAdd } from "react-icons/io";
// import { MdOutlineGroupAdd } from "react-icons/md";
// import { MdSpaceDashboard } from "react-icons/md";
// import { PiUserListBold } from "react-icons/pi";
// import { CiBoxList } from "react-icons/ci";
// import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";
// import { useTranslation } from 'react-i18next';
// import { Link } from "react-router-dom";
// // import DynamicIcon from "../../../components/DynamicIcon";


// const MedicalSidebar = ({
//     collapsed,
//     name,
//     role,
//     image
// }) => {
//     const { t } = useTranslation();
//     return (
//         <div
//             className={`bg-indigo-900 overflow-auto h-screen fixed text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"
//                 }`}
//         >
//             <div className="flex flex-col h-full mt-0 overflow-scroll">
//                 {collapsed ? (

//                     // collapsed btn
//                     <div className="flex flex-col items-center">


//                         <Link
//                             className="text-white p-2 hover:bg-gray-800 rounded"
//                             to="/medicaldirectordashboard/viewTissue"
//                             data-tooltip-id="my-dashboard"
//                             data-tooltip-content="View Cornea"




//                         >


//                             <MdSpaceDashboard className="text-2xl" />
//                         </Link>


//                         <Link
//                             className="text-white p-2 hover:bg-gray-800 rounded"
//                             to="/medicaldirectordashboard/evaluatelist"
//                             data-tooltip-id="my-dashboard"
//                             data-tooltip-content="Evaluate Cornea"
//                         >
//                             {/* <IoIosPersonAdd className="text-2xl" /> */}
//                             <MdOutlineGroupAdd className="text-2xl" />
//                         </Link>

//                         <Link
//                             to="/medicaldirectordashboard/editRequestCornea/:id"
//                             className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                             // onClick={handleUserList}
//                             data-tooltip-id="request-list"
//                             data-tooltip-content="requested-List"
//                         // to="/medicaldirectordashboard/editRequestCornea/:id"
//                         // className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                         // // onClick={handleUserList}
//                         // data-tooltip-id="request-list"
//                         // data-tooltip-content="requested-List"

//                         // onClick={handleAddDonorClick}

//                         >
//                             <MdOutlineGroupAdd className="text-2xl" />

//                         </Link>
//                         {/* >
//                             <MdOutlineGroupAdd className="text-2xl" />

//                         </Link> */}

//                     </div>
//                 ) : (
//                     <>
//                         {/* user progfile inage */}
//                         <img
//                             className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
//                             src={image}
//                             alt="user photo"
//                         />
//                         <span className="text-lg font-semibold ml-10">{name}</span>
//                         <span className="text-lg font-semibold ml-10">{role}</span>
//                         {/* btn */}
//                         <div className="mt-4 flex flex-col items-center">
//                             <Link
//                                 to="/medicaldirectordashboard/viewTissue"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content=" view Tissue"

//                             >
//                                 <CiBoxList className="text-2xl" />
//                                 <span className="ml-2"> {t("cornea:viewTissueLabel")}</span>
//                             </Link>
//                             <Link
//                                 to="/medicaldirectordashboard/evaluatedlist"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Evaluated List"// onClick={handleAddDonorClick}

//                             >
//                                 <MdOutlineGroupAdd className="text-2xl" />
//                                 <span className="ml-2">{t("Evaluated List")}</span>
//                             </Link>
//                             <Link
//                                 to="/medicaldirectordashboard/approveRequest"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Evaluated List"

//                             // onClick={handleAddDonorClick}

//                             >
//                                 <CiBoxList className="text-2xl" />
//                                 <span className="ml-2">view Request</span>
//                             </Link>
//                             <Link
//                                 to="/medicaldirectordashboard/approvedList"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Approved List"
//                             >
//                                 <CiBoxList className="text-2xl" />
//                                 <span className="ml-2">ApprovedList</span>
//                             </Link>
//                         </div>
//                     </>
//                 )}
//             </div>
//             <Tooltip
//                 id="my-dashboard"
//                 style={{ backgroundColor: "#940B92", color: "#fff" }}
//             />
//             <Tooltip
//                 id="add-donor"
//                 style={{ backgroundColor: "#940B92", color: "#fff" }}
//             />
//             <Tooltip
//                 id="donor-list"
//                 style={{ backgroundColor: "#940B92", color: "#fff" }}
//             />
//             <Tooltip
//                 id="add-user"
//                 style={{ backgroundColor: "#940B92", color: "#fff" }}
//             />
//             <Tooltip
//                 id="user-list"
//                 style={{ backgroundColor: "#940B92", color: "#fff" }}
//             />
//         </div>
//     );
// };

// export default MedicalSidebar;

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
// import { useTranslation } from "react-i18next";

// Import the necessary library or module
import { useToast } from '@chakra-ui/react';

// Make sure the library is properly initialized, if required
// initializeLibrary();

// Call the `toast.error` function
// try {
//   // Your code that may throw an error
// } catch (error) {
//   toast.error('An error occurred: ' + error.message);
// }

const MedicalSidebar = ({ collapsed, name, role }) => {
    const { t } = useTranslation();
    const { toast } = useToast()

    const [isOpen, setIsOpen] = useState({
        approvedList: false,
        approvedRequest: false,
        editEvaluation: false,
        EvaluateCornea: false,
        viewTissue: false,
    });

    return (
      <div
        className={`bg-slate-700 overflow-auto h-screen fixed text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full mt-0 overflow-scroll">
          {collapsed ? (
            <div className="flex flex-col items-center">
              <Link
                className="text-white p-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard"
                data-tooltip-id="my-dashboard"
                data-tooltip-content="Collect Cornea"
              >
                <MdSpaceDashboard className="text-2xl" />
              </Link>
              <Link
                className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard/evaluatecornea/:id"
                data-tooltip-id="donor-list"
                data-tooltip-content="Record Serology"
              >
                {/* <SettingOutlined className="text-2xl" /> */}
                <PiUserListBold className="text-2xl" />
              </Link>
              <Link
                className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard/evaluatedlist/:id"
                data-tooltip-id="user-list"
                data-tooltip-content=" Store cornea"
              >
                {/* <SettingOutlined className="text-2xl" /> */}
                <CiBoxList className="text-2xl" />
              </Link>
              <Link
                className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard/editevaluation/:id"
                data-tooltip-id="user-list"
                data-tooltip-content=" Distribute cornea"
              >
                {/* <SettingOutlined className="text-2xl" /> */}
                <CiBoxList className="text-2xl" />
              </Link>
              <Link
                className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard/approvedList"
                data-tooltip-id="user-list"
                data-tooltip-content=" View cornea"
              >
                {/* <SettingOutlined className="text-2xl" /> */}
                <CiBoxList className="text-2xl" />
              </Link>
              <Link
                className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard/approveRequest"
                data-tooltip-id="user-list"
                data-tooltip-content=" View cornea"
              >
                {/* <SettingOutlined className="text-2xl" /> */}
                <CiBoxList className="text-2xl" />
              </Link>
              <Link
                className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
                to="/medicaldirectordashboard/ViewTissue"
                data-tooltip-id="user-list"
                data-tooltip-content=" View Tssue"
              >
                {/* <SettingOutlined className="text-2xl" /> */}
                <CiBoxList className="text-2xl" />
              </Link>
            </div>
          ) : (
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
                      title: " Reports",
                      isOpen: isOpen.physical,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/ocular-report",
                        subtitle: "Ocular Post",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
                      },
                      {
                        link: "/medicaldirectordashboard/ocular-report",
                        subtitle: "Advers",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
                      },
                    ]}
                                    />
                                    
                  <SideCustome
                    headerProps={{
                      onClick: () =>
                        setIsOpen({ ...isOpen, physical: !isOpen.physical }),
                      iconLibrary: "bs",
                      iconName: "BsFillExplicitFill",
                      title: "ApprovedList",
                      isOpen: isOpen.physical,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/approvedList",
                        subtitle: "approvedList",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
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
                      title: "ApproveRequest",
                      isOpen: isOpen.serology,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/approveRequest",
                        subtitle: "approveRequest",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
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
                      title: "Editevaluation",
                      isOpen: isOpen.distribut,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/editevaluation",
                        subtitle: "editevaluation",
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
                      title: "Evaluatecornea",
                      isOpen: isOpen.cornea,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/viewTissue",
                        subtitle: "evaluatecornea",
                        iconLibrary: "md",
                        iconName: "MdStreetview",
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
                      title: "Evaluatedlist",
                      isOpen: isOpen.request,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/evaluatedlist",
                        subtitle: "evaluatedlist",
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
}
export default MedicalSidebar;
