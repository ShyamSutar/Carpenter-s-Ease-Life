import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdCoPresent } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";

const CarpenterSidebar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 && // Only handle click outside on small screens
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        !menuButtonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        ref={menuButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-gray-100 sm:hidden" // Hide button on md and above
      >
        <GiHamburgerMenu  className="text-2xl" />
      </button>

      <div
        ref={sidebarRef}
        className={`z-30 fixed sm:static top-0 left-0 h-screen bg-white border-r border-gray-50 shadow-lg py-4 md:p-4 md:px-6 text-gray-700 text-lg font-semibold transition-transform duration-300 ease-in-out sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ol className="mt-16">
          <Link
            to=""
            className="flex text-2xl font-bold border-b-2 mb-4 pb-2 justify-center"
            onClick={handleNavClick}
          >
            <span className=" text-3xl">
              <FaHome />
            </span>
            <span>Home</span>
          </Link>

          <NavLink
            to="search"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `relative flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90 ${
                isActive ? "bg-myRed text-white" : "text-black"
              }`
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <CiSearch />
                </span>
                <span>
                  Search
                  
                </span>
              </div>
            </li>
          </NavLink>

          <NavLink
            to="attendance"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90 ${
                isActive ? "bg-myRed text-white" : "text-black"
              }`
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <MdCoPresent />
                </span>
                <span>Attendance</span>
              </div>
            </li>
          </NavLink>

          <NavLink
            to="slip"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90 ${
                isActive ? "bg-myRed text-white" : "text-black"
              }`
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <AiFillCreditCard />
                </span>
                <span>Slip</span>
              </div>
            </li>
          </NavLink>

          <NavLink
            to="settings"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90 ${
                isActive ? "bg-myRed text-white" : "text-black"
              }`
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <IoSettingsSharp />
                </span>
                <span>Settings</span>
              </div>
            </li>
          </NavLink>
        </ol>
      </div>
    </div>
  );
};

export default CarpenterSidebar;
