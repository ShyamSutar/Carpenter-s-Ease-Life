import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "flowbite";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Content from "./components/defaultComponents/Content.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Carpenter from "./components/carpenterComponents/Carpenter.jsx";
import Mistry from "./components/mistryComponents/Mistry.jsx";
import Attendance from "./components/mistryComponents/Attendance.jsx";
import Notification from "./components/mistryComponents/Notification.jsx";
import ShowAttendance from "./components/mistryComponents/ShowAttendance.jsx";
import MistryHome from "./components/mistryComponents/MistryHome.jsx";
import ShowSite from "./components/mistryComponents/ShowSite.jsx";
import CarpenterHome from "./components/carpenterComponents/CarpenterHome.jsx";
import CarpenterSearch from "./components/carpenterComponents/CarpenterSearch.jsx";
import { CarpenterAttendance } from "./components/carpenterComponents/CarpenterAttendance.jsx";
import CarpenterAttendanceSlug from "./components/carpenterComponents/CarpenterAttendanceSlug.jsx";
import Slip from "./components/mistryComponents/Slip.jsx";
import CarpenterSlip from "./components/carpenterComponents/CarpenterSlip.jsx";
// import ProtectedRoute from "./components/defaultComponents/ProtectedRoute.jsx";
import Plywood from "./components/plywoodComponents/Plywood.jsx";
import PlywoodHome from "./components/plywoodComponents/PlywoodHome.jsx";
import NotificationPlywood from "./components/plywoodComponents/NotificationPlywood.jsx";
import SiteSlug from "./components/mistryComponents/SiteSlug.jsx";
import PlywoodSupply from "./components/plywoodComponents/PlywoodSupply.jsx";
import PlywoodSlug from "./components/plywoodComponents/PlywoodSlug.jsx";
import Hardware from "./components/hardware/Hardware.jsx";
import HardwareHome from "./components/hardware/HardwareHome.jsx";
import NotificationHardware from "./components/hardware/NotificationHardware.jsx";
import HardwareSupply from "./components/hardware/HardwareSupply.jsx";
import HardwareSlug from "./components/hardware/HardwareSlug.jsx";
import Client from "./components/client/Client.jsx";
import ClientHome from "./components/client/ClientHome.jsx";
import NotificationClient from "./components/client/NotificationClient.jsx";
import ClientSupply from "./components/client/ClientSupply.jsx";
import ClientSlug from "./components/client/ClientSlug.jsx";
import Settings from "./components/common/Settings.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="/" element={<Content />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute/>}> */}

      <Route path="/carpenter" element={<Carpenter />}>
        <Route path="" element={<CarpenterHome />} />
        <Route path="search" element={<CarpenterSearch />} />
        <Route path="attendance" element={<CarpenterAttendance />} />
        <Route path="attendance/:id" element={<CarpenterAttendanceSlug />} />
        <Route path="slip" element={<CarpenterSlip />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/mistry" element={<Mistry />}>
        <Route path="" element={<MistryHome />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="show-attendance" element={<ShowAttendance />} />
        <Route path="attendance/:id" element={<Attendance />} />
        <Route path="slip" element={<Slip />} />
        <Route path="site" element={<ShowSite />} />
        <Route path="settings" element={<Settings />} />
        <Route path="siteSlug/:id" element={<SiteSlug />} />
      </Route>
      <Route path="/plywood" element={<Plywood/>}>
        <Route path="" element={<PlywoodHome />}/>
        <Route path="notification" element={<NotificationPlywood />} />
        <Route path="supply" element={<PlywoodSupply />} />
        <Route path="settings" element={<Settings />} />
        <Route path="plywoodSlug/:id" element={<PlywoodSlug />} />
      </Route>
      <Route path="/hardware" element={<Hardware/>}>
        <Route path="" element={<HardwareHome />}/>
        <Route path="notification" element={<NotificationHardware />} />
        <Route path="supply" element={<HardwareSupply />} />
        <Route path="settings" element={<Settings />} />
        <Route path="hardwareSlug/:id" element={<HardwareSlug />} />
      </Route>
      <Route path="/client" element={<Client/>}>
        <Route path="" element={<ClientHome />}/>
        <Route path="notification" element={<NotificationClient />}/>
        <Route path="supply" element={<ClientSupply />} />
        <Route path="settings" element={<Settings />} />
        <Route path="clientSlug/:id" element={<ClientSlug />} />
      </Route>
      </Route>
    //  </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
