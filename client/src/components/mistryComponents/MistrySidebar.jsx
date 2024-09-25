import { Link, NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdCoPresent } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

const MistryHeader = () => {
  const [notificationsLength, setNotificationsLength] = useState([]);

  const fetchNotifications = async () => {
    try {
      const notifications = await axios.get(
        "http://localhost:5000/api/v1/notification/showNotification",
        { withCredentials: true }
      );
      setNotificationsLength(notifications.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications(); 

    const interval = setInterval(() => {
      fetchNotifications(); 
    }, 30000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="mr-16 sm:mr-44 md:mr-56 z-40">
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
            to="notifications"
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
                  Notifications{" "}
                  <span className="absolute -top-3 -right-2 bg-red-500 w-7 text-center h-7 rounded-full border-2 border-yellow-300">
                    {notificationsLength}
                  </span>
                </span>
              </div>
            </li>
          </NavLink>
          <NavLink
            to="show-attendance"
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

          <NavLink
            to="slip"
            className={({ isActive }) =>
              `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-90   ${
                isActive ? "bg-myRed text-white" : "text-black"
              } `
            }
          >
            <li>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <AiFillCreditCard />
                </span>{" "}
                <span className="hidden sm:block">Slip</span>
              </div>{" "}
            </li>
            
          </NavLink>
        </ol>
      </div>
    </div>
  );
};

export default MistryHeader;
