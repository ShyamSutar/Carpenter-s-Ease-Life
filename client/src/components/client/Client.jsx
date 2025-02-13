import { Outlet } from "react-router-dom";
import Footer from "../defaultComponents/Footer";
import ClientSidebar from "./ClientSidebar";

const Client = () => {
  return (
    <>
      <div className="flex overflow-hidden">
        <ClientSidebar />
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

export default Client;
