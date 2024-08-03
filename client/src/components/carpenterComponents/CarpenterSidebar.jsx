import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdCoPresent } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const CarpenterSidebar = () => {

  return (
    <div className="mr-16 sm:mr-44 md:mr-56 ">
      <div className="h-screen fixed top-0 left-0 mt-16 bg-white border-r border-gray-50 shadow-lg py-4 px-2 md:p-4 md:px-6 text-gray-700 text-lg font-semibold">
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
            to="search"
            className={({ isActive }) =>
              `relative flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90   ${
                isActive ? "bg-myRed text-white" : "text-black"
              } `
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <CiSearch />
                </span>{" "}
                <span className="hidden sm:block">
                  Search{" "}
                </span>
              </div>
            </li>
          </NavLink>
          <NavLink
            to="attendance"
            className={({ isActive }) =>
              `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90   ${
                isActive ? "bg-myRed text-white" : "text-black"
              } `
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <MdCoPresent />
                </span>{" "}
                <span className="hidden sm:block">Attendance</span>
              </div>{" "}
            </li>
          </NavLink>
        </ol>
      </div>
    </div>
  );
};

export default CarpenterSidebar;
