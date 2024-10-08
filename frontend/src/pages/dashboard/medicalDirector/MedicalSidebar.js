import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DynamicIcon from "./../../../components/DynamicIcon";
import { useState } from "react";
import SideCustome from "../../../components/SideCustome";
import { useToast } from "@chakra-ui/react";

const MedicalSidebar = ({ collapsed, name, role }) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState({
      approvedList: false,
      approvedRequest: false,
      editEvaluation: false,
      EvaluateCornea: false,
      viewTissue: false,
      dashboard: false,
      hospital: false,
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
                        setIsOpen({ ...isOpen, dashboard: !isOpen.dashboard }),
                      iconLibrary: "md",
                      iconName: "MdSpaceDashboard",
                      title: " Dashboard",
                      isOpen: isOpen.dashboard,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard",
                        subtitle: "Dashboard",
                        iconLibrary: "md",
                        iconName: "MdSpaceDashboard",
                      },
                    ]}
                  />
                  <SideCustome
                    headerProps={{
                      onClick: () =>
                        setIsOpen({ ...isOpen, physical: !isOpen.physical }),
                      iconLibrary: "bs",
                      iconName: "BsFillExplicitFill",
                      title: " Request",
                      isOpen: isOpen.physical,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/approveRequest",
                        subtitle: "Approve",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
                      },
                      {
                        link: "/medicaldirectordashboard/approvedList",
                        subtitle: "approved List",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
                      },
                    ]}
                  />
                  <SideCustome
                    headerProps={{
                      onClick: () =>
                        setIsOpen({ ...isOpen, hospital: !isOpen.hospital }),
                      iconLibrary: "bs",
                      iconName: "BsFillExplicitFill",
                      title: " Hospital",
                      isOpen: isOpen.hospital,
                    }}
                    subtitleProps={[
                      {
                        link: "/medicaldirectordashboard/viewhospital",
                        subtitle: "List",
                        iconLibrary: "ci",
                        iconName: "CiHospital1",
                      },
                      {
                        link: "/medicaldirectordashboard/addhospital",
                        subtitle: "Add",
                        iconLibrary: "ci",
                        iconName: "CiHospital1",
                      },
                    ]}
                  />

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
                        link: "/medicaldirectordashboard/adverse_report",
                        subtitle: "Adverse",
                        iconLibrary: "md",
                        iconName: "MdPlaylistAddCheckCircle",
                      },
                    ]}
                  />

                  {/* for serology */}

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
                        link: "/medicaldirectordashboard/viewTissue",
                        subtitle: "Evaluate Cornea",
                        iconLibrary: "md",
                        iconName: "MdStreetview",
                      },
                      {
                        link: "/medicaldirectordashboard/evaluatedlist",
                        subtitle: "Evaluated List",
                        iconLibrary: "md",
                        iconName: "MdStreetview",
                      },
                      {
                        link: "/medicaldirectordashboard/discardedlist",
                        subtitle: "Discarded List",
                        iconLibrary: "md",
                        iconName: "MdStreetview",
                      },
                    ]}
                  />
                </div>
              </div>
            </>
          )}

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
      </div>
    );
};
export default MedicalSidebar;
