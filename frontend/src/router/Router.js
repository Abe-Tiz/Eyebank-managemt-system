import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from '../pages/home/Home';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import About from '../pages/about/About';
import Contact from "../pages/contact/contact";
import CreateDonor from "../pages/donor/CreateDonor";
import Login from '../pages/auth/Login';
import ViewDonor from '../pages/donor/ViewDonor';
import PrintCard from '../pages/donor/PrintCard';
import EditDonor from '../pages/donor/EditDonor';
import Report from './../components/Report';
import DisplayDonor from "../pages/donor/DisplayDonor";
import Signup from './../pages/auth/Signup';
import ViewUsers from './../pages/auth/ViewUsers';
import Edit from "../pages/donor/Edit";
import EditUser from './../pages/auth/EditUser';
// import StoredCornea from './../pages/corneas/StoredCornea';
import ViewCornea from '../pages/dashboard/lab/ViewCornea';
import DistributeCornea from '../pages/dashboard/lab/DistributeCornea';
import ViewDistributed from '../pages/dashboard/lab/ViewDistributed';
// import StoreCornea from '../pages/dashboard/lab/StoreCornea';
// import DiscardCornea from '../pages/dashboard/lab/DiscardCornea';
import ExamedList from '../pages/dashboard/lab/ExamedList';
// import ListOfPleged from '../pages/dashboard/lab/ListOfPleged';
// import EvaluatedList from '../pages/dashboard/lab/EvaluatedList';
// import EvaluateCornea from '../pages/dashboard/lab/EvaluateCornea';
import EditCornea from '../pages/dashboard/lab/EditCornea';
import RecordMedicalParticular from '../pages/dashboard/lab/RecordMedicalParticular';
import ScreenDonor from '../pages/dashboard/lab/ScreenDonor';
import RecordSerology from '../pages/dashboard/lab/RecordSerology';
import CollectCornea from '../pages/dashboard/lab/CollectCornea';
import LabTechnicalDashboard from "../layout/LabTechnicalLayout";
import AdminDashboard from "../layout/AdminLayout";
import MedicalDirectorDashboard from "../layout/MedicalDirectorLayout";
import LoginDonor from "../pages/donor/LoginDonor";
import Profile from './../pages/donor/Profile';
import ForgotCode from './../pages/donor/ForgotCode';
import ResetCode from './../pages/donor/ResetCode';
import ViewTissue from "../pages/dashboard/medicalDirector/ViewTissue";
import EvaluateCornea from "../pages/dashboard/medicalDirector/EvaluateCornea";
import EvaluatedList from "../pages/dashboard/medicalDirector/EvaluatedList";
import DiscardedList from "../pages/dashboard/medicalDirector/DiscardedList";
import EditEvaluation from "../pages/dashboard/medicalDirector/EditEvaluation";
import ApproveRequest from "../pages/dashboard/medicalDirector/ApproveRequest";
// import ApprovedList from "../pages/dashboard/medicalDirector/ApprovedList";
import PhysicalExam from "../pages/dashboard/lab/PhysicalExam";
import PhysicalExamView from "../pages/dashboard/lab/PhysicalExamView";
import ViewDetails from "../pages/dashboard/lab/ViewDetails";
import ViewSerology from "../pages/dashboard/lab/ViewSerology";
import ApprovedRequest from "../pages/dashboard/medicalDirector/ApprovedList";
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
import EditOcularPost from "../pages/dashboard/surgeon/EditOcularPost";
import EditAdverse from "../pages/dashboard/surgeon/EditAdverse";
import AddOcularPost from "../pages/dashboard/surgeon/AddOcularPost";
import AddAdverse from "../pages/dashboard/surgeon/AddAdverse";
import OcularPostList from "../pages/dashboard/surgeon/OcularPostList";
import AdverseList from "../pages/dashboard/surgeon/AdverseList";
import RecievedCornea from "../pages/dashboard/surgeon/RecievedCornea";
import Adverse from "../pages/dashboard/surgeon/Adverse";
import OcularPost from "../pages/dashboard/surgeon/OcularPost";

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
import ListSerology from "../pages/dashboard/lab/serology/ListSerology";

import RecordAccident from "../pages/dashboard/surgeon/RecordAccident";
import EditAccident from "../pages/dashboard/surgeon/EditAccident";
import AccidentList from "../pages/dashboard/surgeon/AccidentList";

import StoredCornea from "../pages/dashboard/lab/StoredCornea";
import CollectedCornea from "../pages/dashboard/lab/serology/CollectedCornea";
import SerologyTest from "../pages/dashboard/lab/serology/Serology";
import Cornea from "../pages/reports/Cornea";
// import Collected from "../pages/dashboard/lab/serology/Collected";
import Test from "../pages/dashboard/lab/serology/Test";
// import LoginDonor from './../pages/donor/LoginDonor';
import EditDistribute from './../pages/dashboard/lab/EditDistribute';
import OcularPostReport from "../pages/dashboard/medicalDirector/OcularPostReport";
import AdverseReport from "../pages/dashboard/medicalDirector/AdverseReport";
// import OcularPostReport from './../pages/dashboard/medicalDirector/OcularPostReport';
import DiscardCornea from './../pages/dashboard/lab/discard/DiscardCornea';
import UserProfile from "../pages/auth/UserProfile";
import ReportMedical from "../pages/reports/medical/ReportMedical";
// import Report from '../pages/reports/medical/Report';
import ListOfPleged from '../pages/dashboard/lab/ListOfPleged';
import ExaminedDonor from "../pages/dashboard/lab/physical/ExaminedDonor";
import ViewExamined from './../pages/dashboard/lab/physical/ViewExamined';

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
        element: <Cornea />,
      },
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
        path: "testserology/:id",
        element: <Test />,
      },
      {
        path: "serology",
        element: <Serology />,
      },
      {
        path: "list-serology",
        element: <ListSerology />,
      },
      // {
      //     path: "evaluatedList",
      //     element: <EvaluateList />,
      // },
      {
        path: "discardedlist",
        element: <DiscardedList />,
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
    //   {
    //     path: "getAll",
    //     element: <PhysicalExamView />,
    //   },
      {
        path: "getAll",
        element: <ViewExamined />,
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
        path: "examlist",
        element: <ExamedList />,
      },
      {
        path: "viewRequestCornea",
        element: <ViewRequestedCornea />,
      },
      {
        path: "viewDonor",
        element: <ListOfPleged />,
      },
      {
        path: "examined-donor",
        element: <ExaminedDonor />,
      },
      {
        path: "approvedRequest",
        element: <ApprovedRequest />,
      },
      // profile pass same with passed local storage variable name
      {
        path: "lab",
        element: <UserProfile />,
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
      // {
      //   path: "edithospital/:id",
      //   element: <EditHospital />,
      // },
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
      {
        path: "edit-hospital/:id",
        element: <EditHospital />,
      },
      {
        path: "admin",
        element: <UserProfile />,
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
        path: "ocularpost",
        element: <OcularPost />,
      },
      {
        path: "adverse",
        element: <Adverse />,
      },
      {
        path: "ocularpost/:id",
        element: <AddOcularPost />,
      },
      {
        path: "adverse/:id",
        element: <AddAdverse />,
      },
      {
        path: "editrecipient/:id",
        element: <EditRecipient />,
      },
      {
        path: "editocular/:id",
        element: <EditOcularPost />,
      },
      {
        path: "editadverse/:id",
        element: <EditAdverse />,
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
      {
        path: "recordaccident",
        element: <RecordAccident />,
      },
      {
        path: "editaccident/:id",
        element: <EditAccident />,
      },
      {
        path: "viewaccident",
        element: <AccidentList />,
      },
      {
        path: "recievedCornea",
        element: <RecievedCornea />,
      },
      {
        path: "doctor",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/medicaldirectordashboard",
    element: <MedicalDirectorDashboard />,
    children: [
      {
        path: "",
        element: <ReportMedical />,
      },
      {
        path: "viewTissue",
        element: <ViewTissue />,
      },
      {
        path: "evaluatecornea/:id",
        element: <EvaluateCornea />,
      },
      {
        path: "evaluatedlist",
        element: <EvaluatedList />,
      },
      {
        path: "discardedlist",
        element: <DiscardedList />,
      },
      {
        path: "editevaluation/:id",
        element: <EditEvaluation />,
      },
      {
        path: "viewRequestedCornea",
        element: <ViewRequestedCorneaSurgeon />,
      },
      {
        path: "approveRequest",
        element: <ApproveRequest />,
      },
      {
        path: "approvedList",
        element: <ApprovedList />,
      },
      {
        path: "SendRequestCornea",
        element: <SendRequestCornea />,
      },
      {
        path: "EditRequest/:id",
        element: <EditRequest />,
      },
      {
        path: "ocular-report",
        element: <OcularPostReport />,
      },
      {
        path: "adverse_report",
        element: <AdverseReport />,
      },
      {
        path: "medical",
        element: <UserProfile />,
      },
    ],
  },
]);

export default router;
