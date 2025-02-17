import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const CarpenterSlip = ({ events, data, id, refresh }) => {
  const user = useSelector((state) => state?.auth?.userData);

  const dispatch = useDispatch();

  const attendancePoints = useMemo(() => ({
    O: 1.5,
    P: 1,
    H: 0.5,
    A: 0,
  }), []);

  const [totalAdvance, setTotalAdvance] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const calculateTotals = () => {
      const advanceSum = events.reduce((sum, item) => sum + (item.advance || 0), 0);
      const attendanceSum = events.reduce(
        (sum, item) => sum + (attendancePoints[item.title] || 0),
        0
      );
      const payRate = user.role === "mistry" ? data?.carpenter?.pay[user._id] : data?.carpenter?.pay[id];
      const amount = (Number(attendanceSum) * Number(payRate || 600) - Number(advanceSum || 0)).toFixed(2);

      setTotalAdvance(advanceSum);
      setTotalAttendance(attendanceSum);
      setTotalAmount(amount);
    };

    calculateTotals();
  }, [events, data, id, user, refresh, attendancePoints]);

  useEffect(() => {
    const updatePay = async () => {
      try {
        if (user && user.role === "mistry") {
          dispatch(toggle(true))
          await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/users/updatePay/${id}`,
            { totalAmount },
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.error("Error updating pay:", error);
      } finally{
        dispatch(toggle(false))
      }
    };

    if (totalAmount) {
      updatePay();
    }
  }, [totalAmount, id, user]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 rounded-s-lg sm:px-6">Date</th>
              <th scope="col" className="px-4 py-3 sm:px-6">Attendance</th>
              <th scope="col" className="px-4 py-3 rounded-e-lg sm:px-6">Advance</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sm:px-6"
                >
                  {event.date}
                </th>
                <td className="px-4 py-4 sm:px-6">{event.title}</td>
                <td className="px-4 py-4 sm:px-6">{event.advance}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-4 py-3 text-base sm:px-6">Total</th>
              <td className="px-4 py-3 sm:px-6">{totalAttendance}</td>
              <td className="px-4 py-3 sm:px-6">{totalAdvance}</td>
            </tr>
            <tr className="font-semibold text-gray-900 dark:text-white border-t-2">
              <th scope="row" colSpan={2} className="px-4 py-3 text-right text-base sm:px-6">Amount</th>
              <td className="px-4 py-3 font-bold text-base sm:px-6">{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CarpenterSlip;
