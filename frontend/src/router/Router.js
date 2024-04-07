import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import About from "../pages/about/About";
import Contact from "../pages/contact/contact";
import CreateDonor from "../pages/donor/CreateDonor";
import Login from "../pages/auth/Login";
import ViewDonor from "../pages/donor/ViewDonor";
import PrintCard from "../pages/donor/PrintCard";
import EditDonor from "../pages/donor/EditDonor";
import Report from "./../components/Report";
import DisplayDonor from "../pages/donor/DisplayDonor";
import Signup from "./../pages/auth/Signup";
import ViewUsers from "./../pages/auth/ViewUsers";
import Edit from "../pages/donor/Edit";
import EditUser from "./../pages/auth/EditUser";
import StoredCornea from "./../pages/corneas/StoredCornea";
import ViewCornea from "../components/ViewCornea";
import DistributeCornea from "../pages/dashboard/lab/DistributeCornea";
import StoreCornea from "../pages/dashboard/lab/StoreCornea";
import DiscardCornea from "../pages/dashboard/lab/DiscardCornea";
//import EvaluateCornea from '../pages/dashboard/lab/EvaluateCornea';
import EditCornea from "../pages/dashboard/lab/EditCornea";
import RecordMedicalParticular from "../pages/dashboard/lab/RecordMedicalParticular";
import ScreenDonor from "../pages/dashboard/lab/ScreenDonor";
import RecordSerology from "../pages/dashboard/lab/RecordSerology";
import CollectCornea from "../pages/dashboard/lab/CollectCornea";
import LabTechnicalDashboard from "../layout/LabTechnicalLayout";
import AdminDashboard from "../layout/AdminLayout";
import MedicalDirectorDashboard from "../layout/MedicalDirectorLayout";
import LoginDonor from "../pages/donor/LoginDonor";
import Profile from "./../pages/donor/Profile";
import ForgotCode from "./../pages/donor/ForgotCode";
import ResetCode from "./../pages/donor/ResetCode";
import ViewTissue from "../pages/dashboard/medicalDirector/ViewTissue";
import EvaluateCornea from "../pages/dashboard/medicalDirector/EvaluateCornea";
import EvaluateList from "../pages/dashboard/medicalDirector/EvaluatedList";
import EditEvaluation from "../pages/dashboard/medicalDirector/EditEvaluation";

import PhysicalExam from "../pages/dashboard/lab/PhysicalExam";
import PhysicalExamView from "../pages/dashboard/lab/PhysicalExamView";
import ViewDetails from "../pages/dashboard/lab/ViewDetails";
// import EditPage from "../sections/labTech/EditPage";
//surgeon
import SurgeonDashboard from "../layout/SurgeonLayout";
import sendRecipient from "../pages/dashboard/surgeon/sendRecipient";
import ViewRecipient from "../pages/dashboard/surgeon/ViewRecipient";
import ViewRequestedCornea from "../pages/dashboard/surgeon/ViewCorneaRequest";
import ViewRequestedCorneaSurgeon from "../pages/dashboard/surgeon/ViewCorneaRequestSurgeon";
import SendRequestCornea from "../pages/dashboard/surgeon/RequestCornea";
import EditRequest from "../pages/dashboard/surgeon/EditRequest";

import doctorRequestedCornea from "../pages/dashboard/surgeon/doctorRequestedCornea";

import AddHospital from "../pages/dashboard/admins/AddHospital";
import ViewHospital from "../pages/dashboard/admins/ViewHospital";
import EditHospital from "../pages/dashboard/admins/EditHospital";

//blog
import CreatePost from "../pages/dashboard/admins/CreatePost";
import EditPost from "../pages/dashboard/admins/EditPost";
import IndexPage from "../pages/dashboard/admins/IndexPage";
import BlogPage from "./../pages/blog/BlogPage";
import BlogDetail from "./../pages/blog/BlogDetail";
// import LoginDonor from './../pages/donor/LoginDonor';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/forgot-code",
        element: <ForgotCode />,
      },
      {
        path: "/reset_code/:id/:token",
        element: <ResetCode />,
      },
      {
        path: "/reset_password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/registerDonor",
        element: <CreateDonor />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/viewdonor",
        element: <ViewDonor />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/donor-login",
        element: <LoginDonor />,
      },
      {
        path: "/print/:id",
        element: <PrintCard />,
      },
      {
        path: "/update/:id",
        element: <EditDonor />,
      },
    ],
  },
  {
    path: "/labtechnicaldashboard",
    element: <LabTechnicalDashboard />,
    children: [
      {
        path: "",
        element: <CollectCornea />,
      },
      {
        path: "recordSerology",
        element: <RecordSerology />,
      },
      {
        path: "screenDonor",
        element: <ScreenDonor />,
      },
      {
        path: "recordMedicalParticular",
        element: <RecordMedicalParticular />,
      },
      {
        path: "discardCornea",
        element: <DiscardCornea />,
      },
      {
        path: "storeCornea",
        element: <StoreCornea />,
      },
      {
        path: "distributeCornea",
        element: <DistributeCornea />,
      },
      {
        path: "viewCornea",
        element: <ViewCornea />,
      },
      {
        path: "createExams",
        element: <PhysicalExam />,
      },
      {
        path: "getAll",
        element: <PhysicalExamView />,
      },
      {
        path: "viewRequestCornea",
        element: <ViewRequestedCornea />,
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "",
        element: <Report />,
      },
      {
        path: "addDonor",
        element: <CreateDonor />,
      },
      {
        path: "donorList",
        element: <DisplayDonor />,
      },
      {
        path: "addUser",
        element: <Signup />,
      },
      {
        path: "userList",
        element: <ViewUsers />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "edituser/:id",
        element: <EditUser />,
      },
      {
        path: "storeCornea",
        element: <StoredCornea />,
      },
      {
        path: "addhospital",
        element: <AddHospital />,
      },
      {
        path: "viewhospital",
        element: <ViewHospital />,
      },
      {
        path: "edithospital/:id",
        element: <EditHospital />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "edit-post/:slug",
        element: <EditPost />,
      },
      {
        path: "posts",
        element: <IndexPage />,
      },
    ],
  },
  {
    path: "/medicaldirectordashboard",
    element: <MedicalDirectorDashboard />,
    children: [
      {
        path: "",
        element: <ViewTissue />,
      },
      {
        path: "evaluatecornea/:id",
        element: <EvaluateCornea />,
      },
      {
        path: "evaluatedlist",
        element: <EvaluateList />,
      },
      {
        path: "editevaluation/:id",
        element: <EditEvaluation />,
      },
      {
        path: "sendRequestCornea",
        element: <SendRequestCornea />,
      },

      {
        path: "editRequestCornea/:id",
        element: <EditRequest />,
      },
      {
        path: "doctorRequestedCornea/:id",
        element: <doctorRequestedCornea />,
      },
      {
        path: "viewRequestedCorneaSurgeon",
        element: <ViewRequestedCorneaSurgeon />,
      },
    ],
  },
  //   {
  //     path: "/adminDashboard",
  //     element: <AdminDashboard />,
  //     children: [
  //       {
  //         path: "",
  //         element: <Report />,
  //       },
  //       {
  //         path: "addDonor",
  //         element: <CreateDonor />,
  //       },
  //       {
  //         path: "donorList",
  //         element: <DisplayDonor />,
  //       },
  //       {
  //         path: "addUser",
  //         element: <Signup />,
  //       },
  //       {
  //         path: "userList",
  //         element: <ViewUsers />,
  //       },
  //       {
  //         path: "edit/:id",
  //         element: <Edit />,
  //       },
  //       {
  //         path: "edituser/:id",
  //         element: <EditUser />,
  //       },
  //       {
  //         path: "storeCornea",
  //         element: <StoredCornea />,
  //       },
  //       {
  //         path: "create-post",
  //         element: <CreatePost />,
  //       },
  //       {
  //         path: "edit-post/:slug",
  //         element: <EditPost />,
  //       },
  //       {
  //         path: "posts",
  //         element: <IndexPage />,
  //       },
  //     ],
  //   },

  {
    path: "/surgondashboard",
    element: <SurgeonDashboard />,
    children: [
      {
        path: "sendRecipient",
        element: <sendRecipient />,
      },
      {
        path: "viewrecipient",
        element: <ViewRecipient />,
      },
      {
        path: "sendRequestCornea",
        element: <SendRequestCornea />,
      },
      // {
      //     path: "editrecipient/:id",
      //     element: <EditRecipient />,
      // },
    ],
  },
]);

export default router;
