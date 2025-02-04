import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import { toast } from "react-toastify";

const DeleteShowAttendance = ({ setShow2, carpenter, setRefresh }) => {

  const user = useSelector(state => state?.auth?.userData?._id);
  const dispatch = useDispatch();

  const handleApply = async(e) => {
    e.preventDefault();
    dispatch(toggle(true))

    await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/removeCarpenter/${carpenter.carpenter._id}`, 
        {
          data: { mistryId: user },
          withCredentials: true
        }
      );

    await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/deleteAllCalendar/${carpenter.carpenter._id}`, 
        {
          data: { mistryId: user },
          withCredentials: true
        }
    );
      
    setRefresh(true)
    setRefresh(false)
    toast.success("Deleted Successfully")
    setShow2(false)
    dispatch(toggle(false))
  };

  return (
    <div className="bg-slate-200 rounded shadow-sm w-full p-2 flex flex-col gap-4">
      <div className="mt-4">
        <h2
          htmlFor="time2"
          className="block mt-2 mb-3 text-md font-medium text-gray-900 dark:text-white"
        >
          Really want to Remove <br /> <span className="font-bold text-lg">{carpenter.carpenter.username}</span>?
        </h2>
      </div>

      <div className="flex gap-4">
        <button
          className="py-2 px-6 bg-green-500 rounded text-white font-semibold hover:scale-105 transition-all"
            onClick={handleApply}
        >
          Yes
        </button>
        <button
          className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
          onClick={() => setShow2(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteShowAttendance;
