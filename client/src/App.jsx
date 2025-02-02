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

const App = () => {

  //for navigating from register to /#...
  useScrollToHash();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const getUser = async() => {
      try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`, {withCredentials: true})
          const user = res.data;
          if(user._id){
            dispatch(authActions.login({userData: user}))
          }else{
            dispatch(authActions.logout());
            navigate("/")
          }
      } catch (error) {
        dispatch(authActions.logout());
        navigate('/')
      }
    }

    getUser()
  },[dispatch, navigate])
  
  return (
    <div className="overflow-x-auto">
      <Header/>
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
    </div>
  );
};

export default App;
