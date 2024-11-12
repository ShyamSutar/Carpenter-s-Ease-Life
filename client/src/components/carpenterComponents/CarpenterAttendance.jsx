import { useEffect, useState } from "react";
import axios from "axios";
import CarpenterAttendanceList from "./CarpenterAttendanceList";

export const CarpenterAttendance = () => {
  const [showMistry, setShowMistry] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const showMistry = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/showMistry`,
          { withCredentials: true }
        );
        setShowMistry(showMistry.data.mistry);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="mt-28 ml-4 min-h-screen">
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
