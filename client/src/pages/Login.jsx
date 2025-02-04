import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication";
import { toast } from "react-toastify";
import { toggle } from "../store/hiddenSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    "email": '',
    "password": ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({...inputs, [name]: value})
  }

  const getUser = async() => {
    const user = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`, {withCredentials: true});
    dispatch(authActions.login({userData: user.data}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      dispatch(toggle(true))
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`, inputs, {withCredentials: true});
      
      if(res.status === 200){
        getUser()
        navigate("/")
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }

      dispatch(toggle(false))
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage)
      dispatch(toggle(false))
    }
  }
  return (
    <div className="relative">
    {/* Animated Background */}
    <div className="background">
        <ul className="background">
          {[...Array(25)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
      <section className=" mt-12">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to='/'
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-12 h-12 mr-2"
              src="/images/logo.svg"
              alt="logo"
            />
            Login
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1> */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handleChange}
                    value={inputs.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    value={inputs.password}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-myRed hover:bg-red-700  focus:outline-none focus:ring-myRed font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-myRed hover:underline dark:text-primary-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
