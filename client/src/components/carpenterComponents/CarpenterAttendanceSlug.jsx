import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarpenterSlip from "../mistryComponents/CarpenterSlip";
import { useSelector } from "react-redux";

const CarpenterAttendanceSlug = () => {
  const id = useParams().id;
  const user = useSelector(state => state?.auth?.userData)
  const [data, setData] = useState(null);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/attendance/findCarpenterById2/${id}`,
          { withCredentials: true }
        );
        setData(response.data.carpenter[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `http://localhost:5000/api/v1/calendar/getEvents2/${id}`,
          { withCredentials: true }
        );

        if (Array.isArray(response.data)) {
          const formattedEvents = response.data.map((record) => ({
            _id: record._id,
            title: record.title,
            start: new Date(record.start),
            end: new Date(record.end),
            date: record.date,
            advance: record.advance,
          }));
          setEvents(formattedEvents);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [refresh, id]);

  return (
    <div className="min-h-screen">
      <div className="mt-24 p-4 bg-slate-200 rounded mr-4">
        <h1 className="text-xl ">
          <b>Name:</b> {data?.mistry?.username}
        </h1>
        <h1 className="text-xl ">
          <b>Email:</b> {data?.mistry?.email}
        </h1>
      </div>

      <CarpenterSlip events={events} data={data} id={id} refresh={refresh}/>
    </div>
  );
};

export default CarpenterAttendanceSlug;
