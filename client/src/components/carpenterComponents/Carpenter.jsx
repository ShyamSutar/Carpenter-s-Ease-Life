import { Outlet } from "react-router-dom";
import Footer from "../defaultComponents/Footer";
import CarpenterSidebar from "./CarpenterSidebar";

const Carpenter = () => {


  return (
    <>
      <div className="flex">
        <CarpenterSidebar />
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

export default Carpenter;
