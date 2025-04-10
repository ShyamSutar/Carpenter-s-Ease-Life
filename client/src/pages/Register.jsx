import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toggle } from "../store/hiddenSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string().nonempty("Role is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(toggle(true));
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        data,
        { withCredentials: true }
      );
      if (res.status === 201) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      dispatch(toggle(false));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      dispatch(toggle(false));
    }
  };

  return (
    <div className="relative">
      {/* Animated Background */}
      <div className="background">
        <ul className="background">
          {[...Array(35)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
      <section className=" my-24">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-12 h-12 mr-2" src="/images/logo.svg" alt="logo" />
            Register
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={`bg-gray-50 border ${
                      errors.username
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="Enter username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    placeholder="name@company.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter phone number"
                    className={`bg-gray-50 border ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
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
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className={`bg-gray-50 border ${
                      errors.role
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                    {...register("role")}
                  >
                    <option value="">Select...</option>
                    <option value="mistry">Mistry</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="plywood">Plywood Dealer</option>
                    <option value="hardware">Hardware Material</option>
                    <option value="client">Client</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-myRed hover:bg-red-700  focus:outline-none focus:ring-myRed font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-myRed hover:underline dark:text-primary-500"
                  >
                    Login here
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

export default Register;