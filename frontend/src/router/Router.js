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
import Report from './../components/Report';
import DisplayDonor from "../sections/donor/DisplayDonor";
import Signup from './../sections/auth/Signup';
import ViewUsers from './../sections/auth/ViewUsers';
   
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/awareness",
        element: <Awareness />,
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
    ],
  },
]);

export default router;
