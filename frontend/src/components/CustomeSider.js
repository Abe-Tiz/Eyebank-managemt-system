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

const CustomSidebar = ({ collapsed, name, image }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`bg-indigo-900   h-screen fixed overflow-scroll overflow-x-hidden text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
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
              to="/adminDashboard/create-post"
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
            <img
              className="w-28 h-25 rounded-full mb-2 ml-10 mt-5"
              src={image}
              alt="user photo"
            />
            <span className="text-lg font-semibold ml-10">{name}</span>

            {/* btn */}
            <div className="mt-4 flex flex-col items-center">
              <Link
                to="/adminDashboard"
                className=" flex gap-2 text-white p-2 hover:bg-gray-800 rounded"
                // onClick={handleReport}
                data-tooltip-id="my-dashboard"
                data-tooltip-content="Dashboard"
              >
                <DynamicIcon
                  library="md"
                  iconName="MdSpaceDashboard"
                  className="text-2xl"
                />
                <span className="ml-2">{t("common:dashboardLabel")}</span>
              </Link>
              <Link
                to="/adminDashboard/addDonor"
                className=" flex gap-2 text-white p-2 hover:bg-gray-800 rounded"
                // onClick={handleAddDonorClick}

                data-tooltip-id="add-donor"
                data-tooltip-content="Add Donor"
              >
                <DynamicIcon
                  library="md"
                  iconName="MdOutlineGroupAdd"
                  className="text-2xl"
                />
                <span className="ml-2">{t("common:addDonorLabel")}</span>
              </Link>
              <Link
                to="/adminDashboard/donorList"
                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                // onClick={handleDisplayDonorClick}
                data-tooltip-id="donor-list"
                data-tooltip-content="Donor List"
              >
                {/* <PiUserListBold className="text-2xl" /> */}
                <DynamicIcon
                  library="pi"
                  iconName="PiUserListBold"
                  className="text-2xl"
                />
                <span className="ml-2">{t("common:listDonorLabel")}</span>
              </Link>
              <Link
                to="/adminDashboard/addUser"
                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                // onClick={handleAddUser}
                data-tooltip-id="add-user"
                data-tooltip-content="Add User"
              >
                {/* <IoIosPersonAdd className="text-2xl" /> */}
                <DynamicIcon
                  library="io"
                  iconName="IoIosPersonAdd"
                  className="text-2xl"
                />
                <span className="ml-2">{t("common:addUserrLabel")}</span>
              </Link>
              <Link
                to="/adminDashboard/userList"
                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                // onClick={handleUserList}
                data-tooltip-id="user-list"
                data-tooltip-content="User List"
              >
                {/* <CiBoxList className="text-2xl" /> */}
                <DynamicIcon
                  library="ci"
                  iconName="CiBoxList"
                  className="text-2xl"
                />
                <span className="ml-2"> {t("common:listUserrLabel")}</span>
              </Link>
              {/* <Link
                to="/adminDashboard/storeCornea"
                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                data-tooltip-id="user-list"
                data-tooltip-content="Store Cornea"
              >
                <CiBoxList className="text-2xl" />
                <span className="ml-2"> Store Cornea</span>
              </Link> */}
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
                <span className="ml-2"> Add Hospital</span>
              </Link>

              <Link
                to="/adminDashboard/create-post"
                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                data-tooltip-id="popular-posts"
                data-tooltip-content="Store Cornea"
              >
                {/* <IoCreate className="text-2xl" /> */}

                <DynamicIcon
                  library="md"
                  iconName="MdVisibility"
                  className="text-2xl"
                />
                <span className="ml-2"> Create Blog</span>
              </Link>
              <Link
                to="/adminDashboard/posts"
                className="flex gap-2 text-white p-2 mt-2 hover:bg-gray-800 rounded"
                data-tooltip-id="popular-posts"
                data-tooltip-content="Store Cornea"
              >
                {/* <MdVisibility className="text-2xl" /> */}
                <DynamicIcon
                  library="fa"
                  iconName="FaBookOpen"
                  className="text-2xl"
                />
                <span className="ml-2"> Blog List</span>
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

export default CustomSidebar;
