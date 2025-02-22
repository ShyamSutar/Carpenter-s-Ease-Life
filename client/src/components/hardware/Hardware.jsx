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

      <div className="sm:ml-[10.625rem] md:ml-[13rem] overflow-hidden">
        <Footer />
      </div>
    </>
  );
};

export default Hardware;
