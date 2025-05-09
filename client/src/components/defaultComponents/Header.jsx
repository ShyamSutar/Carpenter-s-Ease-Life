import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authentication";
import { toggle } from "../../store/hiddenSlice";

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);

  const status = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(toggle(true))
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(authActions.logout());
      navigate('/login');
      dispatch(toggle(false))
    } catch (error) {
      console.log(error);
      dispatch(toggle(false))
    }
  };

  // Close navbar if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle navbar when hamburger icon is clicked
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto " ref={navbarRef}>
          <Link
            to="/"
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse invisible sm:visible"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-myRed">
              <img src="/images/logo.svg" alt="logo" width={65} />
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:mr-1">
            {!status ? (
              <Link to={"/login"}>
                <button
                  type="button"
                  className="text-white bg-myRed hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:transition-all"
                >
                  Get started
                </button>
              </Link>
            ) : (
              <Link onClick={handleLogout}>
                <button
                  type="button"
                  className="text-white bg-myRed hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:transition-all"
                >
                  Logout
                </button>
              </Link>
            )}

            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
              onClick={toggleNavbar}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isNavbarOpen ? "block" : "hidden"}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 transition-all">
              <li>
                <NavLink
                  to="/"
                  onClick={toggleNavbar}
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? 'bg-myRed text-white' : 'text-black'} rounded md:bg-transparent ${isActive ? "md:text-myRed" : "md:text-black"} md:p-0 md:dark:text-blue-500`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <Link
                  to="/#services"
                  onClick={toggleNavbar}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  onClick={toggleNavbar}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  onClick={toggleNavbar}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
              {user === "mistry" && (
                <NavLink to="/mistry" onClick={toggleNavbar} className={({ isActive }) => `${isActive ? 'bg-myRed md:bg-transparent md:text-myRed text-white rounded' : 'text-gray-900'}`}>
                  <li className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mistry</li>
                </NavLink>
              )}
              {user === "carpenter" && (
                <NavLink to={'/carpenter'} onClick={toggleNavbar} className={({ isActive }) => `${isActive ? 'bg-myRed md:bg-transparent md:text-myRed text-white rounded' : 'text-gray-900'}`}>
                  <li className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Carpenter</li>
                </NavLink>
              )}
              {user === "plywood" && (
                <NavLink to={'/plywood'} onClick={toggleNavbar} className={({ isActive }) => `${isActive ? 'bg-myRed md:bg-transparent md:text-myRed text-white rounded' : 'text-gray-900'}`}>
                  <li className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Plywood</li>
                </NavLink>
              )}
              {user === "hardware" && (
                <NavLink to={'/hardware'} onClick={toggleNavbar} className={({ isActive }) => `${isActive ? 'bg-myRed md:bg-transparent md:text-myRed text-white rounded' : 'text-gray-900'}`}>
                  <li className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Hardware</li>
                </NavLink>
              )}
              {user === "client" && (
                <NavLink to={'/client'} onClick={toggleNavbar} className={({ isActive }) => `${isActive ? 'bg-myRed md:bg-transparent md:text-myRed text-white rounded' : 'text-gray-900'}`}>
                  <li className="block py-2 px-3 rounded md:hover:bg-transparent md:hover:text-myRed md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Client</li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
