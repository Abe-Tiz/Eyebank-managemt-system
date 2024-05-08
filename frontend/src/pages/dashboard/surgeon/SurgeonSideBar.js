// import { useState } from "react"
// import { IoIosPersonAdd } from "react-icons/io";
// import { MdOutlineGroupAdd } from "react-icons/md";
// import { MdSpaceDashboard } from "react-icons/md";
// import { MdOutlineDisplaySettings } from "react-icons/md";
// import { CgDisplaySpacing } from "react-icons/cg";
// import { CgDisplayFullwidth } from "react-icons/cg";
// import { SiGoogledisplayandvideo360 } from "react-icons/si";
// import { MdOutlineAlarmAdd } from "react-icons/md";
// import { MdOutlineAddToQueue } from "react-icons/md";
// import { CgDisplayGrid } from "react-icons/cg";
// import { ImDisplay } from "react-icons/im";
// import { PiUserListBold } from "react-icons/pi";
// import { CiBoxList } from "react-icons/ci";
// import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";
// import { useTranslation } from 'react-i18next';
// import { Link } from "react-router-dom";

// import { VscArchive } from "react-icons/vsc";
// const SurgeonSidebar = ({
//     collapsed,
//     name,
//     role,
//     image,
// }) => {

//     const { t } = useTranslation();
//     const [isOpen, setIsOpen] = useState({
//         recipient: false,
//         report: false,
//         accedent: false,
//         request: false,
//     });
//     return (
//         <div
//             className={`bg-slate-700 overflow-auto h-screen fixed text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"
//                 }`}
//         >
//             <div className="flex flex-col h-full mt-0 overflow-scroll">
//                 {collapsed ? (

//                     // collapsed btn
//                     <div className="flex flex-col items-center">
//                         <Link
//                             className="text-white p-2 hover:bg-gray-800 rounded"
//                             to="/surgondashboard/addrecipient"
//                             data-tooltip-id="my-dashboard"
//                             data-tooltip-content="Add Recipient"

//                         >
//                             {/* <BellOutlined className="text-2xl" /> */}
//                             <MdSpaceDashboard className="text-2xl" />
//                         </Link>
//                         <Link
//                             className="text-white p-2 hover:bg-gray-800 rounded"
//                             to="/surgondashboard/viewrecipient"
//                             data-tooltip-id="my-dashboard"
//                             data-tooltip-content="View Recipients"

//                         >
//                             {/* <IoIosPersonAdd className="text-2xl" /> */}
//                             <MdOutlineGroupAdd className="text-2xl" />


//                         </Link>

//                         <Link
//                             className="text-white p-2 hover:bg-gray-800 rounded"
//                             to="/surgondashboard/sendRequestCornea"
//                             data-tooltip-id="my-dashboard"
//                             data-tooltip-content="Send Cornea"

//                         >
//                             {/* <IoIosPersonAdd className="text-2xl" /> */}
//                             <MdOutlineGroupAdd className="text-2xl" />


//                         </Link>

                        
//                         <Link
//                             className="text-white p-2 hover:bg-gray-800 rounded"
//                             to="/surgondashboard/recievedCornea"
//                             data-tooltip-id="my-dashboard"
//                             data-tooltip-content="RecievedCornea"

//                         >
//                             {/* <IoIosPersonAdd className="text-2xl" /> */}
//                             <MdOutlineGroupAdd className="text-2xl" />


//                         </Link>

//                     </div>
//                 ) : (
//                     <>
//                         {/* user progfile inage */}
//                         <img
//                             className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
//                             src={image}
//                             alt="user photo"
//                         />
//                         {/* <span className="text-2xl font-semibold mt-10 ml-10 text-pink-500">
//                             {role}
//                         </span>
//                         <span className="text-2xl font-semibold  ml-10">{name}</span> */}
//                         {/* btn */}
//                         <div className="mt-4 flex flex-col items-center">

//                             {/* <SideCustome
//                                 headerProps={{
//                                     onClick: () =>
//                                         setIsOpen({ ...isOpen, physical: !isOpen.physical }),
//                                     iconLibrary: "bs",
//                                     iconName: "BsFillExplicitFill",
//                                     title: "Recipient",
//                                     isOpen: isOpen.recipient,
//                                 }}
//                                 subtitleProps={[
//                                     {
//                                         link: "/surgondashboard/addrecipient",
//                                         subtitle: "Add",
//                                         iconLibrary: "md",
//                                         iconName: "MdPlaylistAddCircle",
//                                     },
//                                     {
//                                         link: "/surgondashboard/viewrecipient",
//                                         subtitle: "View",
//                                         iconLibrary: "md",
//                                         iconName: "MdPlaylistAddCheckCircle",
//                                     },

//                                 ]}
//                             /> */}
//                             <Link
//                                 to="/surgondashboard/addrecipient"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Add Recipient"
//                             >
//                                 <MdOutlineAddToQueue className="text-2xl" />
//                                 <span className="ml-2"> Add Respient</span>
//                             </Link>
//                             <Link
//                                 to="/surgondashboard/viewrecipient"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Recipient List"

//                             // onClick={handleAddDonorClick}

//                             >
//                                 <CgDisplaySpacing className="text-2xl" />
//                                 <span className="ml-2">All Recipient</span>
//                             </Link>
//                             <Link
//                                 to="/surgondashboard/ocularpostlist"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Ocular post List" >
//                                 <CgDisplayGrid className="text-2xl" />
//                                 <span className="ml-2">Ocullar List</span>
//                             </Link>
//                             <Link
//                                 to="/surgondashboard/adverselist"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Adverse List" >
//                                 <SiGoogledisplayandvideo360 className="text-2xl" />
//                                 <span className="ml-2">{t("Adverse List")}</span>
//                             </Link>
//                             <Link
//                                 to="/surgondashboard/sendRequestCornea"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Send Cornea"

//                             // onClick={handleAddDonorClick}

//                             >
//                                 <MdOutlineAlarmAdd className="text-2xl" />
//                                 <span className="ml-2">Send Request</span>
//                             </Link>

//                             <Link
//                                 to="/surgondashboard/viewRequestedCornea"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content=" distribute Cornea"
//                             >
//                                 <CgDisplayFullwidth className="text-2xl" />
//                                 <span className="ml-2"> View Request</span>
//                             </Link>

//                             <Link
//                                 to="/surgondashboard/recordaccident"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 // onClick={handleUserList}
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Record accident"
//                             >
//                                 <CiBoxList className="text-2xl" />
//                                 <span className="ml-2"> {t("Record Accident")}</span>
//                             </Link>
//                             <Link
//                                 to="/surgondashboard/viewaccident"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Accidents list"
//                             >
//                                 <ImDisplay className="text-2xl" />
//                                 <span className="ml-2">{t("Accident List")}</span>
//                             </Link>

//                             <Link
//                                 to="/surgondashboard/recievedCornea"
//                                 className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
//                                 data-tooltip-id="user-list"
//                                 data-tooltip-content="Recieved Cornea"
//                             >
//                                 <MdOutlineDisplaySettings className="text-2xl" />
//                                 <span className="ml-2">Recieved Cornea</span>
//                             </Link>

//                         </div>
//                     </>
//                 )}
//             </div>


//             {/* tooltips */}
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

// export default SurgeonSidebar;









import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DynamicIcon from "../../../components/DynamicIcon";
import SideCustome from "../../../components/SideCustome";
import { useState } from "react";

const SurgeonSidebar = ({ collapsed, name, image,role }) => {
  const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState({
      recipient:false,
      ocular:false,
      Request:false,
      adverse:false,
      dashboard:false,
      accident:false,
  });


  return (
    <div
      className={`bg-gray-700   h-screen fixed overflow-scroll overflow-x-hidden text-white transition-all duration-300 ${
        collapsed ? "w-28" : "w-60"
      }`}
    >


      <div className="flex flex-col h-full mt-0">
        {collapsed ? (
          // collapsed btn
          <div className="flex flex-col items-center">
            <Link
              className="text-white p-2 hover:bg-gray-800 rounded"
              to="/surgondashboard"
              data-tooltip-id="my-dashboard"
              data-tooltip-content="Dashboard"
            >
              {/* <BellOutlined className="text-2xl" /> */}
              {/* <MdSpaceDashboard className="text-2xl" /> */}
              <DynamicIcon
                library="md"
                iconName="MdSpaceDashboard"
                className="text-2xl"
              />
            </Link>
            <Link
              className="text-white p-2 hover:bg-gray-800 rounded"
              to="/surgondashboard/addrecipient"
              data-tooltip-id="addrecipient"
              data-tooltip-content="addrecipient"
            >
              {/* <IoIosPersonAdd className="text-2xl" /> */}
              {/* <MdOutlineGroupAdd className="text-2xl" /> */}
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
            {/* user progfile inage */}

            <span className="text-lg font-semibold mt-5 ml-10">{name}</span>
            <span className="text-lg font-semibold ml-10 text-pink-500">
              {role}
            </span>

            {/* btn */}
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
                  {
                    link: "/surgondashboard/ocularpostlist",
                    subtitle:"Ocular Postlist",
                    iconLibrary: "ci",
                    iconName: "CiBoxList",
                  },
                 
                ]}
              />

              <SideCustome
                headerProps={{
                  onClick: () => setIsOpen({ ...isOpen, adverse: !isOpen.adverse }),
                  iconLibrary: "bs",
                  iconName: "BsFillExplicitFill",
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
                  {
                    link: "/surgondashboard/adverselist",
                    subtitle: " adverse list",
                    iconLibrary: "fa",
                    iconName: "FaBookOpen",
                  },
                ]}
              />

              <SideCustome
                headerProps={{
                  onClick: () =>
                    setIsOpen({ ...isOpen, Request: !isOpen.Request }),
                  iconLibrary: "bs",
                  iconName: "BsFillExplicitFill",
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
                  iconName: "BsFillExplicitFill",
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

      {/* tooltips */}
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









