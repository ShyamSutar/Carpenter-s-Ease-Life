import { useEffect, useState } from "react";
import axios from "axios";
import CarpenterAttendanceList from "./CarpenterAttendanceList";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

export const CarpenterAttendance = () => {
  const [showMistry, setShowMistry] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(toggle(true))
        const showMistry = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/showMistry`,
          { withCredentials: true }
        );
        setShowMistry(showMistry.data.mistry);
        dispatch(toggle(false))
      } catch (error) {
        console.log(error);
        dispatch(toggle(false))
      }
    })();
  }, []);

  return (
    <div className="mt-28 px-2 min-h-screen">
      <h1 className="font-bold text-2xl">Attendance</h1>
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {showMistry &&
          showMistry.map((mistry) => (
            <CarpenterAttendanceList key={mistry._id} mistry={mistry} />
          ))}
      </div>
    </div>
  );
};
