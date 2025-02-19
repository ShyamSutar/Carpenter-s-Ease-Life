import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarpenterSlip from "../mistryComponents/CarpenterSlip";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const CarpenterAttendanceSlug = () => {
  const id = useParams().id;
  const [data, setData] = useState(null);
  const [events, setEvents] = useState([]);
  const [refresh] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(toggle(true))
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/findCarpenterById2/${id}`,
          { withCredentials: true }
        );
        setData(response.data.carpenter[0]);
        dispatch(toggle(false))
      } catch (error) {
        console.log(error);
        dispatch(toggle(false))
      }
    })();
  }, [id]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/getEvents2/${id}`,
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
    <div className="min-h-screen p-2">
      {/* Header Section */}
      <div className="mt-24 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
          Mistry Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailItem label="Name" value={data?.Mistry?.username} />
          <DetailItem label="Email" value={data?.Mistry?.email} />
          <DetailItem label="Phone" value={data?.Mistry?.phone} />
          <DetailItem
            label="Created At"
            value={new Date(data?.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </div>
      </div>

      <div className="mt-6"><CarpenterSlip events={events} data={data} id={id} refresh={refresh}/></div>
    </div>
  );
};

export default CarpenterAttendanceSlug;

  // reusable componnent
  const DetailItem = ({ label, value }) => (
    <div className="space-y-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );