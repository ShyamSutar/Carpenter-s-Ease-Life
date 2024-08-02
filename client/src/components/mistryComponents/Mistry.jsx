import { Outlet } from "react-router-dom";
import MistrySidebar from "./MistrySidebar";
import Footer from "../defaultComponents/Footer";

const Mistry = () => {
  return (
    <>
      <div className="flex">
        <MistrySidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <div className="ml-16 sm:ml-52"><Footer /></div>
    </>
  );
};

export default Mistry;
