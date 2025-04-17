import axios from "axios";
import { useState } from "react";
import { toggle } from "../../store/hiddenSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const UpdateShowAttendance = ({ setShow, carpenter, setRefresh }) => {
  const [pay, setPay] = useState(carpenter?.carpenter?.pay || 600);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    pay: Yup.number()
    .typeError('Pay must be a number')
    .required('Pay is required')
    .positive('Pay must be a positive number')
    .max(1000000, 'Pay seems too high'),
  });

  const handleApply = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await validationSchema.validate({pay}, { abortEarly: false });
      setErrors({});
      setLoading(true);
      dispatch(toggle(true));

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/updatePay/${
          carpenter.carpenter._id
        }`,
        { pay },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setRefresh(true);
      setShow(false);
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        const errorMessage =
          err.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
      dispatch(toggle(false));
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-md rounded-lg w-80 p-6 flex flex-col gap-4 relative">
        <h3 className="text-lg font-bold text-gray-900">Update Pay</h3>

        <label htmlFor="pay" className="text-sm font-medium text-gray-700">
          Pay Amount:
        </label>
        <input
          id="pay"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
          type="number"
          min="1"
          name="pay"
          onChange={(e) => setPay(e.target.value)}
          value={pay}
        />

        {errors.pay && (
          <div className="flex items-center gap-2 bg-red-100 text-red-600 text-sm rounded-md px-3 py-2 border border-red-300 dark:bg-red-400/10 dark:text-red-400">
            <span>{errors.pay}</span>
          </div>
        )}

        <div className="flex justify-between">
          <button
            className={`py-2 px-6 rounded text-white font-semibold transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:scale-105"
            }`}
            onClick={handleApply}
            disabled={loading}
          >
            {loading ? "Updating..." : "Apply"}
          </button>
          <button
            className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
            onClick={() => {
              setShow(false);
              setErrors({});
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateShowAttendance;
