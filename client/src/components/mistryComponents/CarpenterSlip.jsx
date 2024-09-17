import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CarpenterSlip = ({ events, data, id, refresh }) => {

  const user = useSelector(state => state?.auth?.userData?._id)

    const attendancePoints = {
        "O": 1.5,
        "P": 1,
        "H": 0.5,
        "A": 0
    };
    
    const [totalAdvance, setTotalAdvance] = useState(0);
    const [totalAttendance, setTotalAttendance] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(()=>{
      try {

        setTotalAdvance(events.reduce((sum, item) => sum + item.advance, 0));
        setTotalAttendance(events.reduce((sum, item) => sum + (attendancePoints[item.title] || 0), 0));
    
        setTotalAmount((Number(totalAttendance) * Number( data?.carpenter?.pay[user] || 600) - Number(totalAdvance || 0)).toFixed(2));
        
        // (async()=>{
        //   const response = await axios.patch(`http://localhost:5000/api/v1/users/totalAmount/${id}`, {totalAmount}, {withCredentials: true})
        //   console.log(response);
        // })();
      } catch (error) {
        console.log(error);
      }
    },[refresh, totalAdvance, totalAttendance, totalAmount, attendancePoints])
    
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">
                Advance
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.date}
                </th>
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">{event.advance}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3">{totalAttendance}</td>
              <td className="px-6 py-3">{totalAdvance}</td>
            </tr>
            <tr className="font-semibold text-gray-900 dark:text-white border-t-2">
              {/* <td className="px-6 py-3"></td> */}
              <th scope="row" colSpan={2} className="px-6 py-3 text-right text-base">
                Amount
              </th>
              <td className="px-6 py-3 font-bold text-base"> {totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CarpenterSlip;
