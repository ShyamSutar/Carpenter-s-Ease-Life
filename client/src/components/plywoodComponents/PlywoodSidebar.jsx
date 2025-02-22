import { Link, NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiExport } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";

const PlywoodSidebar = () => {

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
    <div className="relative min-h-screen sm:w-[10.625rem] md:w-[13.163em]">
      <button
        ref={menuButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-2 z-50 p-2 rounded-lg hover:bg-gray-100 sm:hidden" // Hide button on md and above
      >
        <BiDotsVerticalRounded className="text-2xl" />
      </button>

      <div className="">
        <div
          ref={sidebarRef}
          className={`z-30 fixed top-0 left-0 min-h-screen bg-white border-r border-gray-50 shadow-lg py-4 md:p-4 px-6 sm:px-1 md:px-6 text-gray-700 text-lg font-semibold transition-transform duration-300 ease-in-out sm:translate-x-0 ${
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
              to="notification"
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
                    <IoIosNotificationsOutline />
                  </span>
                  <span>Notifications</span>
                </div>
              </li>
            </NavLink>

            <NavLink
              to="supply"
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
                    <TiExport />
                  </span>
                  <span>Supply</span>
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
    </div>
  );
};

export default PlywoodSidebar;
