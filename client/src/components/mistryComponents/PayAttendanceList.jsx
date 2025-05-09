import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";

const PayShowAttendance = ({ setShow3, carpenter, setRefresh }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();

  const attendancePoints = {
    O: 1.5,
    P: 1,
    H: 0.5,
    A: 0,
  };

  const validationSchema = Yup.object({
    start: Yup.string().required("Start date is required"),
    end: Yup.string()
      .required("End date is required")
      .test("is-after-start", "End date must be after start date", function (value) {
        const { start } = this.parent;
        return new Date(value) >= new Date(start);
      }),
  });

  const handleApply = async (e) => {
    e.preventDefault();
    if (!start || !end) {
      toast.error("Please select both start and end dates.");
      return;
    }

    try {
      await validationSchema.validate({start, end}, { abortEarly: false });
      setErrors({});
      setLoading(true);
      dispatch(toggle(true));

      let startDate = new Date(start).toLocaleDateString();
      let endDate = new Date(end).toLocaleDateString();

      const startDateFormatted = new Date(startDate).setHours(0, 0, 0, 0);
      const endDateFormatted = new Date(endDate).setHours(23, 59, 59, 999);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/getEvents/${
          carpenter.carpenter._id
        }`,
        { withCredentials: true }
      );

      const fetchedEvents = response.data;

      const filteredIds = fetchedEvents
        .filter((item) => {
          const itemStartDate = new Date(item.start).setHours(0, 0, 0, 0);
          return (
            itemStartDate >= startDateFormatted &&
            itemStartDate <= endDateFormatted
          );
        })
        .map((item) => item._id);

      const response3 = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/fetchIds`,
        { ids: filteredIds },
        { withCredentials: true }
      );

      let events2 = response3.data;
      let totalAdvance = events2.reduce((sum, item) => sum + item.advance, 0);
      let totalAttendance = events2.reduce(
        (sum, item) => sum + (attendancePoints[item.title] || 0),
        0
      );
      let totalAmount = (
        Number(totalAttendance) *
          Number(carpenter?.carpenter?.pay[user._id] || 600) -
        Number(totalAdvance || 0)
      ).toFixed(2);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/slip/addSlip/${
          carpenter.carpenter._id
        }`,
        { totalAdvance, totalAttendance, totalAmount },
        { withCredentials: true }
      );

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/deleteRange`,
        {
          data: { ids: filteredIds },
          withCredentials: true,
        }
      );

      setRefresh(true);
      toast.success(`Paid from ${startDate} to ${endDate}`);
      setShow3(false);
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
        <h3 className="text-lg font-bold text-gray-900">Pay Attendance</h3>

        <label htmlFor="start" className="text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          id="start"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
          type="date"
          name="start"
          onChange={(e) => setStart(e.target.value)}
          value={start}
        />
        {errors.start && (
          <div className="-mt-2 flex items-center gap-2 bg-red-100 text-red-600 text-sm rounded-md px-3 py-2 border border-red-300 dark:bg-red-400/10 dark:text-red-400">
            <span>{errors.start}</span>
          </div>
        )}

        <label htmlFor="end" className="text-sm font-medium text-gray-700">
          End Date:
        </label>
        <input
          id="end"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
          type="date"
          name="end"
          onChange={(e) => setEnd(e.target.value)}
          value={end}
        />
        {errors.end && (
          <div className="-mt-2 flex items-center gap-2 bg-red-100 text-red-600 text-sm rounded-md px-3 py-2 border border-red-300 dark:bg-red-400/10 dark:text-red-400">
            <span>{errors.end}</span>
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
            {loading ? "Processing..." : "Apply"}
          </button>
          <button
            className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
            onClick={() => {setShow3(false); setErrors({});}}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayShowAttendance;
