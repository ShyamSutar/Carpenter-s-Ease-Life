import Header from "./components/defaultComponents/Header";
import { Outlet, useNavigate } from "react-router-dom";
import useScrollToHash from './components/useScrollToHash.jsx';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authentication.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "flowbite";
import Loading from "./components/defaultComponents/Loading.jsx";
import "./App.css"

const App = () => {
  useEffect(() => {
    import("flowbite").then((flowbite) => flowbite.initFlowbite());
  }, []);

  useScrollToHash();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`, { withCredentials: true });
        const user = res.data;
        if (user._id) {
          dispatch(authActions.login({ userData: user }));
        } else {
          dispatch(authActions.logout());
          navigate("/");
        }
      } catch (error) {
        dispatch(authActions.logout());
        navigate('/');
      }
    };

    getUser();
  }, [dispatch, navigate]);

  return (
    <div className="overflow-x-auto relative">
      {/* Animated Background */}
      <div className="background">
        <ul className="background">
          {[...Array(25)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
      
      <Header />
      <Outlet />
      
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="hidden"><Loading /></div>
    </div>
  );
};

export default App;
