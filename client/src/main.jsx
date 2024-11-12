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
import CarpenterHome from "./components/carpenterComponents/CarpenterHome.jsx";
import CarpenterSearch from "./components/carpenterComponents/CarpenterSearch.jsx";
import { CarpenterAttendance } from "./components/carpenterComponents/CarpenterAttendance.jsx";
import CarpenterAttendanceSlug from "./components/carpenterComponents/CarpenterAttendanceSlug.jsx";
import Slip from "./components/mistryComponents/Slip.jsx";
import CarpenterSlip from "./components/carpenterComponents/CarpenterSlip.jsx";
import ProtectedRoute from "./components/defaultComponents/ProtectedRoute.jsx";

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
      </Route>
      <Route path="/mistry" element={<Mistry />}>
        <Route path="" element={<MistryHome />} />
        <Route path="notifications" element={<Notification />} />
        <Route path="show-attendance" element={<ShowAttendance />} />
        <Route path="attendance/:id" element={<Attendance />} />
        <Route path="slip" element={<Slip />} />
      </Route>
      </Route>
    // </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
