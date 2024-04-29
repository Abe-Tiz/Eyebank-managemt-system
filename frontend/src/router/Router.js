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
import EditUser from './../pages/auth/EditUser';
import ViewCornea from '../pages/dashboard/lab/ViewCornea';
import DistributeCornea from '../pages/dashboard/lab/DistributeCornea';
import ViewDistributed from '../pages/dashboard/lab/ViewDistributed';
//import StoreCornea from '../pages/dashboard/lab/StoreCornea';
import DiscardCornea from '../pages/dashboard/lab/DiscardCornea';
import EditDistribute from '../pages/dashboard/lab/EditDistribute';
import ListOfPlege from '../pages/dashboard/lab/ListOfPlege';
import EvaluatedList from '../pages/dashboard/lab/EvaluatedList';
//import EvaluateCornea from '../pages/dashboard/lab/EvaluateCornea';
import EditCornea from '../pages/dashboard/lab/EditCornea';
import RecordMedicalParticular from '../pages/dashboard/lab/RecordMedicalParticular';
import ScreenDonor from '../pages/dashboard/lab/ScreenDonor';
import RecordSerology from '../pages/dashboard/lab/RecordSerology';
import CollectCornea from '../pages/dashboard/lab/CollectCornea';
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
import ApproveRequest from "../pages/dashboard/medicalDirector/ApproveRequest";
// import ApprovedList from "../pages/dashboard/medicalDirector/ApprovedList";
import PhysicalExam from "../pages/dashboard/lab/PhysicalExam";
import PhysicalExamView from "../pages/dashboard/lab/PhysicalExamView";
import ViewDetails from "../pages/dashboard/lab/ViewDetails";
import ViewSerology from "../pages/dashboard/lab/ViewSerology";
import ApprovedRequest from "../pages/dashboard/lab/ApprovedRequest";
// import EditPage from "../sections/labTech/EditPage";
//surgeon
import SurgeonDashboard from "../layout/SurgeonLayout";


import ViewRequestedCornea from "../pages/dashboard/lab/ApprovedRequest";
import ViewRequestedCorneaSurgeon from "../pages/dashboard/surgeon/ViewCorneaRequestSurgeon";
import SendRequestCornea from "../pages/dashboard/surgeon/RequestCornea";
import EditRequest from "../pages/dashboard/surgeon/EditRequest";
import doctorRequestedCornea from "../pages/dashboard/surgeon/doctorRequestedCornea";
// import ApproveRequest from "../pages/dashboard/medicalDirector/ApproveRequest";
import ApprovedList from "../pages/dashboard/medicalDirector/ApprovedList";
import AddRecipient from "../pages/dashboard/surgeon/AddRecipient";
import ViewRecipient from "../pages/dashboard/surgeon/ViewRecipient"
import EditRecipient from "../pages/dashboard/surgeon/EditRecipient";
import OcularPost from "../pages/dashboard/surgeon/OcularPost";
import AdverseReaction from "../pages/dashboard/surgeon/AdverseReaction";
import OcularPostList from "../pages/dashboard/surgeon/OcularPostList";
import AdverseList from "../pages/dashboard/surgeon/AdverseList";
//admin
import AddHospital from "../pages/dashboard/admins/AddHospital";
import ViewHospital from "../pages/dashboard/admins/ViewHospital";
import EditHospital from "../pages/dashboard/admins/EditHospital";
//blog
import CreatePost from "../pages/dashboard/admins/CreatePost";
import EditPost from "../pages/dashboard/admins/EditPost";
import IndexPage from "../pages/dashboard/admins/IndexPage";
import BlogPage from "./../pages/blog/BlogPage";
import BlogDetail from "./../pages/blog/BlogDetail";
import EditPhysicalExam from "../pages/dashboard/lab/EditPhysicalExam";
import ActivateAccount from "../pages/dashboard/admins/ActivateAccount";
import Serology from "../pages/dashboard/lab/serology/Serology";
import SerologyTest from '../pages/dashboard/lab/serology/SerologyTest';
import ListSerology from "../pages/dashboard/lab/serology/ListSerology";

import RecordAccident from "../pages/dashboard/surgeon/RecordAccident";
import EditAccident from "../pages/dashboard/surgeon/EditAccident";
import AccidentList from "../pages/dashboard/surgeon/AccidentList";

import StoredCornea from "../pages/dashboard/lab/StoredCornea";
import CollectedCornea from "../pages/dashboard/lab/serology/CollectedCornea";
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
        path: "collectCornea/:id",
        element: <CollectCornea />,
      },
      {
        path: "recordSerology",
        element: <RecordSerology />,
      },
      {
        path: "viewSerology",
        element: <ViewSerology />,
      },
      {
        path: "cornea-serology",
        element: <CollectedCornea />,
      },
      {
        path: "screenDonor",
        element: <ScreenDonor />,
      },
      {
        path: "editcornea/:id",
        element: <EditCornea />,
      },
      {
        path: "discardCornea",
        element: <DiscardCornea />,
      },
      {
        path: "serology/:id",
        element: <SerologyTest />,
      },
      {
        path: "serology",
        element: <Serology />,
      },
      {
        path: "list-serology",
        element: <ListSerology />,
      },
      {
        path: "evaluatedList",
        element: <EvaluatedList />,
      },
      {
        path: "storedCornea",
        element: <StoredCornea />,
      },
      {
        path: "distributeCornea/:id",
        element: <DistributeCornea />,
      },
      {
        path: "editdistributed/:id",
        element: <EditDistribute />,
      },
      {
        path: "viewDistributed",
        element: <ViewDistributed />,
      },
      {
        path: "viewCornea",
        element: <ViewCornea />,
      },
      {
        path: "createExams/:id",
        element: <PhysicalExam />,
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
        path: "getOne/:id",
        element: <ViewDetails />,
      },
      {
        path: "editExams/:id",
        element: <EditPhysicalExam />,
      },
      {
        path: "posts",
        element: <IndexPage />,
      },
      {
        path: "viewDonor",
        element: <ListOfPlege />,
      },
      {
        path: "viewRequestCornea",
        element: <ViewRequestedCornea />,
      },
      {
        path: "viewDonor",
        element: <ListOfPlege />,
      },
      {
        path: "approvedRequest",
        element: <ApprovedRequest />,
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
        path: "storedCornea",
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
      {
        path: "activate",
        element: <ActivateAccount />,
      },
    ],
  },
 
  {
    path: "/surgondashboard",
    element: <SurgeonDashboard />,
    children: [
      {
        path: "addrecipient",
        element: <AddRecipient />,
      },
      {
        path: "viewrecipient",
        element: <ViewRecipient />,
      },
      {
        path: "ocularpost/:id",
        element: <OcularPost />,
      },
      {
        path: "adverse/:id",
        element: <AdverseReaction />,
      },
      {
        path: "editrecipient/:id",
        element: <EditRecipient />,
      },
      {
        path: "ocularpostlist",
        element: <OcularPostList />,
      },
      {
        path: "adverselist",
        element: <AdverseList />,
      },
      {
        path: "viewRequestedCornea",
        element: <ViewRequestedCorneaSurgeon />,
      },
      {
        path: "SendRequestCornea",
        element: <SendRequestCornea />,
      },
      {
        path: "EditRequest/:id",
        element: <EditRequest />,
      },
    ],
  },
  {
    path: "/medicaldirectordashboard",
    element: <MedicalDirectorDashboard />,
    children: [
      {
        path: " ",
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
        path: "viewRequestedCornea",
        element: <ViewRequestedCorneaSurgeon />,
        
      },

       
    ],
  },
]);
export default router;
