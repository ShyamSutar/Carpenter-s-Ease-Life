import { Outlet } from "react-router-dom";
import Footer from "../defaultComponents/Footer";
import PlywoodSidebar from "./PlywoodSidebar";

const Plywood = () => {
  return (
    <>
      <div className="flex overflow-hidden">
        <PlywoodSidebar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
      <div className="sm:ml-[10.625rem] md:ml-[13rem] overflow-hidden">
        <Footer />
      </div>
    </>
  );
};

export default Plywood;
