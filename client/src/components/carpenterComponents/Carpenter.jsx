import { Outlet } from "react-router-dom";
import Footer from "../defaultComponents/Footer";
import CarpenterSidebar from "./CarpenterSidebar";

const Carpenter = () => {


  return (
    <>
      <div className="flex overflow-hidden">
        <CarpenterSidebar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
      <div className="ml-16 sm:ml-52 overflow-hidden">
        <Footer />
      </div>
    </>
  );
};

export default Carpenter;
