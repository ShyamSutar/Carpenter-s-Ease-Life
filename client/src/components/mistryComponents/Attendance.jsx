import axios from "axios";
import { useEffect, useState } from "react";
import ShowAttendanceList from "./ShowAttendanceList";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const ShowAttendance = () => {
  const [showCarpenters, setShowCarpenters] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(toggle(true));
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/showCarpenters`,
          { withCredentials: true }
        );
        setShowCarpenters(response.data.carpenters);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        dispatch(toggle(false));
      }
    })();
  }, [refresh]);

  return (
    <div className="mt-20 px-4 min-h-screen flex flex-col items-center">
      <h1 className="font-bold text-3xl md:text-4xl text-gray-800 text-center mb-6">Attendance</h1>
      
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {showCarpenters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {showCarpenters.map((carpenter) => (
              <ShowAttendanceList key={carpenter._id} carpenter={carpenter} setRefresh={setRefresh} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">No carpenters found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowAttendance;