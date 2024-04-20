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
      serology:false
  });
  
    return (
      <div
        className={`bg-slate-700 overflow-auto h-screen fixed text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full mt-0 overflow-scroll">
          {collapsed ? (
            // collapsed btn
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
                to="/labtechnicaldashboard/viewDonor"
                data-tooltip-id="user-list"
                data-tooltip-content=" View donor"
              >
                <DynamicIcon
                  library="ci"
                  iconName="CiBoxList"
                  className="text-2xl"
                />
              </Link>
              <Link
                to="/labtechnicaldashboard/list-serology"
                className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                data-tooltip-id="list-serology"
                data-tooltip-content=" list serolog"
              >
                {/* <CiBoxList className="text-2xl" /> */}
                <DynamicIcon
                  library="md"
                  iconName="MdPlaylistAddCheckCircle"
                  className="text-2xl"
                />
              </Link>
              <Link
                to="/labtechnicaldashboard/serology"
                className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                // onClick={handleUserList}
                data-tooltip-id="user-list"
                data-tooltip-content=" distribute Cornea"
              >
                <DynamicIcon
                  library="tb"
                  iconName="TbRibbonHealth"
                  className="text-2xl"
                />
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
                  <Link
                    to="/labtechnicaldashboard/createExams"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content="PhysicalExams"
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2">Physical Add</span>
                  </Link>
                  <Link
                    to="/labtechnicaldashboard/getAll"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content="PhysicalExams"
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2">
                      {" "}
                      {/* {t("cornea:PhysicalExamView")} */}
                      Physical Exam
                    </span>
                  </Link>

                  <Link
                    to="/labtechnicaldashboard/viewCornea"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content=" view Cornea"
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2"> {t("cornea:viewCorneaLabel")}</span>
                  </Link>

                  <Link
                    to="/labtechnicaldashboard/discardCornea"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content=" discard Cornea"
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2"> Discared</span>
                  </Link>
                  <Link
                    to="/labtechnicaldashboard/storedCornea"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content=" store Cornea"
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2">
                      {" "}
                      {/* {t("cornea:storeCorneaLabel")} */}
                      Store
                    </span>
                  </Link>

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

                  <Link
                    to="/labtechnicaldashboard/viewDistributed"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content="View distribute "
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2">
                      {" "}
                      {/* {t("cornea:viewDistributeLabel")} */}
                      Distribution
                    </span>
                  </Link>
                  <Link
                    to="/labtechnicaldashboard/viewDonor"
                    className="flex gap-2 w-36 text-white p-2 hover:bg-gray-800 rounded"
                    // onClick={handleUserList}
                    data-tooltip-id="user-list"
                    data-tooltip-content=" View Donor"
                  >
                    <CiBoxList className="text-2xl" />
                    <span className="ml-2">Donors</span>
                  </Link>
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
};

export default CustomSidebar;
