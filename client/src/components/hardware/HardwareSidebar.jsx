import { Link, NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiExport } from "react-icons/ti";
import { FaHome } from "react-icons/fa";

const HardwareSidebar = () => {

  return (
    <div className="mr-14 sm:mr-44 md:mr-56 ">
      <div className="h-screen fixed top-0 left-0 mt-16 bg-white border-r border-gray-50 shadow-lg py-4 md:p-4 md:px-6 text-gray-700 text-lg font-semibold">
        <ol>
          <Link
            to=""
            className="flex text-2xl font-bold border-b-2 mb-4 pb-2 justify-center"
          >
            <span className="sm:hidden block text-3xl">
              <FaHome />
            </span>{" "}
            <span className="hidden sm:block">Home</span>
          </Link>

          <NavLink
            to="notification"
            className={({ isActive }) =>
              `relative flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90   ${
                isActive ? "bg-myRed text-white" : "text-black"
              } `
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <IoIosNotificationsOutline />
                </span>{" "}
                <span className="hidden sm:block">
                  Notification{" "}
                </span>
              </div>
            </li>
          </NavLink>
          <NavLink
            to="supply"
            className={({ isActive }) =>
              `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90   ${
                isActive ? "bg-myRed text-white" : "text-black"
              } `
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <TiExport />
                </span>{" "}
                <span className="hidden sm:block">Supply</span>
              </div>{" "}
            </li>
          </NavLink>

        </ol>
      </div>
    </div>
  );
};

export default HardwareSidebar;
