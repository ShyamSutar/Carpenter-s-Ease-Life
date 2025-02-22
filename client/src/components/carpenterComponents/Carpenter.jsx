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
      <div className="sm:ml-[10.625rem] md:ml-[13rem] overflow-hidden">
        <Footer />
      </div>
    </>
  );
};

export default Carpenter;
