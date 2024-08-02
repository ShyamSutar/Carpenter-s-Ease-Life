import Header from "./components/defaultComponents/Header";
import { Outlet, useNavigate } from "react-router-dom";
import useScrollToHash from './components/useScrollToHash.jsx';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authentication.js";

const App = () => {
  //for navigating from register to /#...
  useScrollToHash();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const getUser = async() => {
      try {
          const res = await axios.get("http://localhost:5000/api/v1/users/getUser", {withCredentials: true})
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
    <div className="overflow-x-hidden">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
