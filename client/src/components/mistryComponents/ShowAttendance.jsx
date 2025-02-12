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
        dispatch(toggle(false));
      } catch (error) {
        console.log(error);
        dispatch(toggle(false));
      }
    })();
  }, [refresh]);

  return (
    <div className="mt-28 ml-4 min-h-screen">
      <h1 className="font-bold mb-6 text-center text-2xl">Attendance</h1>
      
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {showCarpenters.length > 0 ? (
          showCarpenters.map((carpenter) => (
            <ShowAttendanceList key={carpenter._id} carpenter={carpenter} setRefresh={setRefresh} />
          ))
        ) : (
          <p className="text-gray-500">No carpenters found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowAttendance;
