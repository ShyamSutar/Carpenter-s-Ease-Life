import { Outlet } from "react-router-dom";
import HardwareSidebar from "./HardwareSidebar";
import Footer from "../defaultComponents/Footer";

const Hardware = () => {
  return (
    <>
      <div className="flex overflow-hidden">
        <HardwareSidebar />

        <div className="flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </div>

      <div className="ml-16 sm:ml-52 overflow-hidden">
        <Footer />
      </div>
    </>
  );
};

export default Hardware;
