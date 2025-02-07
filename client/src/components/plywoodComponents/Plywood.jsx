import { Outlet } from "react-router-dom";
import Footer from "../defaultComponents/Footer";
import PlywoodSidebar from "./PlywoodSidebar";

const Plywood = () => {
  return (
    <>
      <div className="flex">
        <PlywoodSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <div className="ml-16 sm:ml-52">
        <Footer />
      </div>
    </>
  );
};

export default Plywood;
