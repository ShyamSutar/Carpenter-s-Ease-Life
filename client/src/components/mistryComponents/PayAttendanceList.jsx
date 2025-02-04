import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import { toast } from "react-toastify";

const PayShowAttendance = ({ setShow3, carpenter, setRefresh }) => {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);

  const user = useSelector(state => state?.auth?.userData)
  const dispatch = useDispatch();

  const attendancePoints = {
    "O": 1.5,
    "P": 1,
    "H": 0.5,
    "A": 0
};

  const handleApply = async(e) => {
    e.preventDefault();

    dispatch(toggle(true))

    let startDate = new Date(start).toLocaleDateString();
    let endDate = new Date(end).toLocaleDateString();
    
    const startDateFormatted = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateFormatted = new Date(endDate).setHours(23, 59, 59, 999);
    
    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/getEvents/${carpenter.carpenter._id}`,
        { withCredentials: true }
      );

    const fetchedEvents = response.data;

    const filteredIds = fetchedEvents
    .filter(item => {
        const itemStartDate = new Date(item.start).setHours(0, 0, 0, 0);
        return itemStartDate >= startDateFormatted && itemStartDate <= endDateFormatted;
    })
    .map(item => item._id); // Get only the _id

    
    const response3 = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/calendar/fetchIds`, {ids: filteredIds}, {withCredentials: true})
    
    let events2 = response3.data;
    
    // ---
    let totalAdvance = (events2.reduce((sum, item) => sum + item.advance, 0));
    let totalAttendance = (events2.reduce((sum, item) => sum + (attendancePoints[item.title] || 0), 0));
    let totalAmount = ((Number(totalAttendance) * Number( carpenter?.carpenter?.pay[user._id] || 600) - Number(totalAdvance || 0)).toFixed(2));

    const response4 = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/slip/addSlip/${carpenter.carpenter._id}`, {totalAdvance, totalAttendance, totalAmount}, {withCredentials: true})
    console.log(response4)
    
    const response2 = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/calendar/deleteRange`, {
        data: { ids: filteredIds },
        withCredentials: true
      })


    setRefresh(true)
    setRefresh(false)
    toast.success(`Paid from ${startDate} to ${endDate}`)
    setShow3(false)
    dispatch(toggle(false))
  };

  return (
    <div className="bg-slate-200 rounded shadow-sm w-full p-2 flex flex-col gap-4 z-50">
      <div className="mt-4">
        <label
          htmlFor="start"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Start:
        </label>
        <input
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="date"
          name="start"
          onChange={(e)=>setStart(e.target.value)}
          value={start}
            
        />
      </div>
      <div>
        <label
          htmlFor="end"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          End:
        </label>
        <input
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="date"
          name="end"
          onChange={(e)=>setEnd(e.target.value)}
          value={end}
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
          onClick={() => setShow3(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PayShowAttendance;
