import { Outlet } from "react-router-dom";
import MistrySidebar from "./MistrySidebar";
import Footer from "../defaultComponents/Footer";

const Mistry = () => {
  return (
    <>
      <div className="flex overflow-hidden">
        <MistrySidebar />

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

export default Mistry;
