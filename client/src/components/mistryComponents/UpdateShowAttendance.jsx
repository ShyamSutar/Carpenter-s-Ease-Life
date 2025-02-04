import axios from "axios";
import { useState } from "react";
import { toggle } from "../../store/hiddenSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UpdateShowAttendance = ({ setShow, carpenter, setRefresh }) => {

  const [pay, setPay] = useState(carpenter.carpenter.pay);
  const dispatch = useDispatch();

  const handleApply = async(e) => {
    e.preventDefault();
    dispatch(toggle(true))

    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/updatePay/${carpenter.carpenter._id}`, {pay}, {withCredentials: true})
    
    toast.success(response.data.message)
    setRefresh(true)

    setShow(false)
    dispatch(toggle(false))
  };

  return (
    <div className="bg-slate-200 rounded shadow-sm w-full p-2 flex flex-col gap-4">
      <div className="mt-4">
        <label
          htmlFor="time2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Pay:
        </label>
        <input
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="Number"
          name="advance"
            onChange={(e)=>setPay(e.target.value)}
            value={pay}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="py-2 px-6 bg-green-500 rounded text-white font-semibold hover:scale-105 transition-all"
            onClick={handleApply}
        >
          Apply
        </button>
        <button
          className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
          onClick={() => setShow(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateShowAttendance;
