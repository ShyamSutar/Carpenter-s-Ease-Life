import axios from "axios";
import { useEffect, useState } from "react";
import ShowAttendanceList from "./ShowAttendanceList";

const ShowAttendance = () => {
  const [showCarpenters, setShowCarpenters] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const showCarpenters = await axios.get(
          "http://localhost:5000/api/v1/attendance/showCarpenters",
          { withCredentials: true }
        );
        setShowCarpenters(showCarpenters.data.carpenters);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="mt-28 ml-4 min-h-screen">
      <h1 className="font-bold text-2xl">Attendance</h1>
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {showCarpenters &&
          showCarpenters.map((carpenter) => (
            <ShowAttendanceList key={carpenter._id} carpenter={carpenter} />
          ))}
      </div>
    </div>
  );
};

export default ShowAttendance;
