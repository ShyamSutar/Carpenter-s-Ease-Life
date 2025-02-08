import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import { toast } from "react-toastify";

const DeleteShowAttendance = ({ setShow2, carpenter, setRefresh }) => {
  const user = useSelector((state) => state?.auth?.userData?._id);
  const dispatch = useDispatch();

  const handleApply = async (e) => {
    e.preventDefault();
    dispatch(toggle(true));

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/removeCarpenter/${carpenter.carpenter._id}`,
        {
          data: { mistryId: user },
          withCredentials: true,
        }
      );

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/deleteAllCalendar/${carpenter.carpenter._id}`,
        {
          data: { mistryId: user },
          withCredentials: true,
        }
      );

      setRefresh(true);
      toast.success("Deleted Successfully");
      setShow2(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    } finally {
      dispatch(toggle(false));
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6 flex flex-col gap-4 relative">
        <h3 className="text-lg font-bold text-gray-900 text-center">
          Confirm Deletion
        </h3>
        <p className="text-sm text-gray-700 text-center">
          Are you sure you want to remove
          <span className="font-semibold text-gray-900"> {carpenter.carpenter.username}</span>?
        </p>
        <div className="flex justify-between mt-4">
          <button
            className="py-2 px-6 bg-green-500 rounded text-white font-semibold hover:scale-105 transition-all"
            onClick={handleApply}
          >
            Yes, Remove
          </button>
          <button
            className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
            onClick={() => setShow2(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteShowAttendance;
