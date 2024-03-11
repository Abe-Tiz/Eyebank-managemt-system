import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from '../pages/home/Home';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import About from '../pages/about/About';
import Awareness from '../pages/awareness/getAwareness';
import CreateAwareness from '../pages/awareness/createAwareness';
import CreateVideo from '../pages/awareness/createVideo';
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
import StoredCornea from './../pages/corneas/StoredCornea';
import ViewCornea from '../components/ViewCornea';
import DistributeCornea from '../pages/dashboard/lab/DistributeCornea';
import StoreCornea from '../pages/dashboard/lab/StoreCornea';
import DiscardCornea from '../pages/dashboard/lab/DiscardCornea';
import EvaluateCornea from '../pages/dashboard/lab/EvaluateCornea';
import EditCornea from '../pages/dashboard/lab/EditCornea';
import RecordMedicalParticular from '../pages/dashboard/lab/RecordMedicalParticular';
import ScreenDonor from '../pages/dashboard/lab/ScreenDonor';
import RecordSerology from '../pages/dashboard/lab/RecordSerology';
import CollectCornea from '../pages/dashboard/lab/CollectCornea';
import LabTechnicalDashboard from "../layout/LabTechnicalLayout";
import AdminDashboard from "../layout/AdminLayout";
import PhysicalExam from "../pages/dashboard/lab/PhysicalExam";
import PhysicalExamView from "../pages/dashboard/lab/PhysicalExamView";
// import EditPage from "../sections/labTech/EditPage";

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
                path: "/reset_password/:id/:token",
                element: <ResetPassword />,
            },

            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/awareness",
                element: <Awareness />,
            },
            {
                path: "/createAwareness",
                element: <CreateAwareness />,
            },
            {
                path: "/createVideo",
                element: <CreateVideo />,
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
                path: "/print/:id",
                element: <PrintCard />,
            },
            {
                path: "/update/:id",
                element: <EditDonor />,
            },
            {
                path: "createExams",
                element: <PhysicalExam />,
              },
              {
                path: "getExams",
                element: <PhysicalExamView />,
              },
              // {
              //   path: "updateExam/:id",
              //   element: <EditPage />,
              // }
              
                
              
        ],
    },
    {
        path: "/labtechnicaldashboard",
        element: <LabTechnicalDashboard />,
        children: [
            {
                path: "collectCornea",
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
      
    ],
  },
]);

export default router;
