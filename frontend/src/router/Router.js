import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../sections/auth/Home";
import About from './../sections/about/About';
import Awareness from './../sections/awareness/getAwareness';
import Contact from './../sections/contact/contact';
import CreateDonor from "../sections/donor/CreateDonor";
import Login from './../sections/auth/Login';
import ViewDonor from "../sections/donor/ViewDonor";
import PrintCard from './../sections/donor/PrintCard';
import EditDonor from './../sections/donor/EditDonor';
import AdminDashboard from './../components/AdminDashboard';
import LabTechnicalDashboard from './../components/LabTechnicalDashboard';
import Report from './../components/Report';
import DisplayDonor from "../sections/donor/DisplayDonor";
import Signup from './../sections/auth/Signup';
import ViewUsers from './../sections/auth/ViewUsers';
import Edit from "../sections/donor/Edit";
import ForgotPassword from "../sections/auth/ForgotPassword";
import ResetPassword from "../sections/auth/ResetPassword";
import CreateAwareness from "../sections/awareness/createAwareness";
import CreateVideo from "../sections/awareness/createVideo";
//lab techinical services
import CollectCornea from "../components/labTechnical/CollectCornea";
import DonorRegistration from "../components/labTechnical/DonorRegistration";
import RecordSerology from "../components/labTechnical/RecordSerology";
import ScreenDonor from "../components/labTechnical/ScreenDonor";
import RecordMedicalParticular from "../components/labTechnical/RecordMedicalParticular";
import DiscardCornea from "../components/labTechnical/DiscardCornea";
import StoreCornea from "../components/labTechnical/StoreCornea";
import DistributeCornea from "../components/labTechnical/DistributeCornea";
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
        ],
    },
    {
        path: "/adminDashboard",
        element: <AdminDashboard />,
        children: [
            {
                path: "/adminDashboard/addDonor",
                element: <CreateDonor />,
            },
            {
                path: "/adminDashboard/report",
                element: <Report />,
            },
            {
                path: "/adminDashboard/donorList",
                element: <DisplayDonor />,
            },
            {
                path: "/adminDashboard/addUser",
                element: <Signup />,
            },
            {
                path: "/adminDashboard/userList",
                element: <ViewUsers />,
            },
            {
                path: "/adminDashboard/edit/:id",
                element: <Edit />,
            },
        ],
    },
    {
        path: "/labtechnicaldashboard",
        element: <LabTechnicalDashboard />,
        children: [
            {
                path: "/labtechnicaldashboard/collectCornea",
                element: <CollectCornea />,
            },
            {
                path: "/labtechnicaldashboard/donorRegistration",
                element: <DonorRegistration />,
            },
            {
                path: "/labtechnicaldashboard/recordSerology",
                element: <RecordSerology />,
            },
            {
                path: "/labtechnicaldashboard/screenDonor",
                element: <ScreenDonor />,
            },
            {
                path: "/labtechnicaldashboard/recordMedicalParticular",
                element: <RecordMedicalParticular />,
            },
            {
                path: "/labtechnicaldashboard/discardCornea",
                element: <DiscardCornea />,
            },
            {
                path: "/labtechnicaldashboard/storeCornea",
                element: <StoreCornea />,
            },
            {
                path: "/labtechnicaldashboard/distributeCornea",
                element: <DistributeCornea />,
            },
        ],
    }

]);

export default router;
