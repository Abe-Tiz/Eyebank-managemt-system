import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { CiBoxList } from "react-icons/ci";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import DynamicIcon from "./DynamicIcon";
import SideCustome from "./SideCustome";
import { useState } from "react";

const CustomSidebar = ({ collapsed, name, image,role }) => {
  const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState({
      user:false,
      donor:false,
      hospital:false,
      blog:false,
      dashboard:false,
      active:false,
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
              to="/adminDashboard"
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
              to="/adminDashboard/addDonor"
              data-tooltip-id="add-donor"
              data-tooltip-content="Add Donor"
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
              to="/adminDashboard/donorList"
              data-tooltip-id="donor-list"
              data-tooltip-content="Donor List"
            >
              <DynamicIcon
                library="pi"
                iconName="PiUserListBold"
                className="text-2xl"
              />
            </Link>
            <Link
              className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
              to="/adminDashboard/addUser"
              data-tooltip-id="add-user"
              data-tooltip-content="Add User"
            >
              <DynamicIcon
                library="io"
                iconName="IoIosPersonAdd"
                className="text-2xl"
              />
            </Link>
            <Link
              className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
              to="/adminDashboard/userList"
              data-tooltip-id="user-list"
              data-tooltip-content="User List"
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
            <Link
              to="/adminDashboard/addhospital"
              className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
              data-tooltip-id="user-list"
              data-tooltip-content="Add Hospital"
            >
              {/* <CiBoxList className="text-2xl" /> */}
              <DynamicIcon
                library="ci"
                iconName="CiHospital1"
                className="text-2xl"
              />
            </Link>
            <Link
              className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
              to="/adminDashboard/create-post"
              data-tooltip-id="popular-posts"
              data-tooltip-content="Create Blog"
            >
              <DynamicIcon
                library="md"
                iconName="MdVisibility"
                className="text-2xl"
              />
            </Link>
            <Link
              className="text-white p-2 mt-2 hover:bg-gray-800 rounded"
              to="/adminDashboard/posts"
              data-tooltip-id="popular-posts"
              data-tooltip-content="Create Blog"
            >
              <DynamicIcon
                library="fa"
                iconName="FaBookOpen"
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
                    link: "/adminDashboard",
                    subtitle: t("common:dashboardLabel"),
                    iconLibrary: "md",
                    iconName: "MdSpaceDashboard",
                  },
                ]}
              />

              <SideCustome
                headerProps={{
                  onClick: () => setIsOpen({ ...isOpen, donor: !isOpen.donor }),
                  iconLibrary: "bs",
                  iconName: "BsFillExplicitFill",
                  title: "Donor",
                  isOpen: isOpen.donor,
                }}
                subtitleProps={[
                  {
                    link: "/adminDashboard/addDonor",
                    subtitle: t("common:addDonorLabel"),
                    iconLibrary: "md",
                    iconName: "MdOutlineGroupAdd",
                  },
                  {
                    link: "/adminDashboard/donorList",
                    subtitle: t("common:listDonorLabel"),
                    iconLibrary: "pi",
                    iconName: "PiUserListBold",
                  },
                ]}
              />

              <SideCustome
                headerProps={{
                  onClick: () => setIsOpen({ ...isOpen, user: !isOpen.user }),
                  iconLibrary: "bs",
                  iconName: "BsFillExplicitFill",
                  title: "User",
                  isOpen: isOpen.user,
                }}
                subtitleProps={[
                  {
                    link: "/adminDashboard/addUser",
                    subtitle: t("common:addUserrLabel"),
                    iconLibrary: "io",
                    iconName: "IoIosPersonAdd",
                  },
                  {
                    link: "/adminDashboard/userList",
                    subtitle: t("common:listUserrLabel"),
                    iconLibrary: "ci",
                    iconName: "CiBoxList",
                  },
                  {
                    link: "/adminDashboard/activate",
                    subtitle: "Activate Account",
                    iconLibrary: "vsc",
                    iconName: "VscActivateBreakpoints",
                  },
                ]}
              />

              <SideCustome
                headerProps={{
                  onClick: () => setIsOpen({ ...isOpen, blog: !isOpen.blog }),
                  iconLibrary: "bs",
                  iconName: "BsFillExplicitFill",
                  title: "Blog",
                  isOpen: isOpen.blog,
                }}
                subtitleProps={[
                  {
                    link: "/adminDashboard/create-post",
                    subtitle: "Create Blog",
                    iconLibrary: "md",
                    iconName: "MdVisibility",
                  },
                  {
                    link: "/adminDashboard/posts",
                    subtitle: " Blog List",
                    iconLibrary: "fa",
                    iconName: "FaBookOpen",
                  },
                ]}
              />

              <SideCustome
                headerProps={{
                  onClick: () =>
                    setIsOpen({ ...isOpen, hospital: !isOpen.hospital }),
                  iconLibrary: "bs",
                  iconName: "BsFillExplicitFill",
                  title: "Hospital",
                  isOpen: isOpen.hospital,
                }}
                subtitleProps={[
                  {
                    link: "/adminDashboard/viewhospital",
                    subtitle: "List",
                    iconLibrary: "ci",
                    iconName: "CiHospital1",
                  },
                  {
                    link: "/adminDashboard/addhospital",
                    subtitle: "Add",
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

export default CustomSidebar;
