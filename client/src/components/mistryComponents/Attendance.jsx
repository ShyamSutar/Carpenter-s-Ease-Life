import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceCalendar from "./AttendanceCalendar";
import moment from "moment";
import MistryModal from "./MistryModal";
import CarpenterSlip from "./CarpenterSlip";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const Attendance = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.userData?._id);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState(null);
  const [events, setEvents] = useState([]);
  const [inputs, setInputs] = useState({
    start: "",
    end: "",
    status: "",
    advance: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(toggle(true));
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/findCarpenterById/${id}`,
          { withCredentials: true }
        );
        setData(response.data.carpenter[0]);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(toggle(false));
      }
    };
    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        dispatch(toggle(true));
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/getEvents/${id}`,
          { withCredentials: true }
        );
        if (Array.isArray(response.data)) {
          setEvents(
            response.data.map((record) => ({
              _id: record._id,
              title: record.title,
              start: new Date(record.start),
              end: new Date(record.end),
              date: record.date,
              advance: record.advance,
            }))
          );
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(toggle(false));
      }
    };
    fetchEvents();
  }, [refresh, id, dispatch]);

  const handleUpdate = (props) => {
    setShow(true);
    setSlot(props.event.date);
    setIsUpdate(true);
    setInputs({
      id: props.event._id,
      start: moment(props.event.start).format("HH:mm"),
      end: moment(props.event.end).format("HH:mm"),
      status: props.event.title,
      advance: props.event.advance,
    });
  };

  const handleClose = () => {
    setShow(false);
    setInputs({ start: "", end: "", status: "", advance: "" });
    setIsUpdate(false);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      dispatch(toggle(true));
      const requestData = {
        carpenter: id,
        start: moment(`${slot} ${inputs.start}`, "DD/MM/YYYY HH:mm").toDate(),
        end: moment(`${slot} ${inputs.end}`, "DD/MM/YYYY HH:mm").toDate(),
        date: slot,
        title: inputs.status,
        advance: inputs.advance,
      };
      if (isUpdate) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/updateEvent/${inputs.id}`,
          requestData,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/postEvent`,
          requestData,
          { withCredentials: true }
        );
      }
      setRefresh((prev) => !prev);
      setShow(false);
      setInputs({ start: "", end: "", status: "", advance: "" });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggle(false));
    }
  };

  return (
    <div className="mt-24 p-6 max-w-5xl mx-auto space-y-6 bg-white shadow-md rounded-lg">

      {/* Header Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
          Carpenter Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailItem label="Name" value={data?.carpenter?.username} />
          <DetailItem label="Email" value={data?.carpenter?.email} />
          <DetailItem label="Phone" value={data?.carpenter?.phone} />
          <DetailItem label="Pay" value={data?.carpenter?.pay[user] || 600} />
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

      <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
        <AttendanceCalendar
          events={events}
          components={{ event: (props) => (
            <div
              onClick={() => handleUpdate(props)}
              className="p-2 cursor-pointer rounded-md text-center shadow-md text-xs sm:text-sm"
            >
              <p className="font-semibold">{props.event.title}</p>
              <p className="text-[10px] sm:text-sm">{props.event.advance}</p>
            </div>
          )}}
          handleSelectSlot={(slot) => {
            const slotDate = new Date(slot.slots).toLocaleDateString("en-GB");
            if (!events.some((event) => slotDate === event.date)) {
              setSlot(slotDate);
              setShow(true);
            }
          }}
        />
      </div>
      {show && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <MistryModal
            slot={slot}
            inputs={inputs}
            handleOnChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
            handleApply={handleApply}
            handleClose={handleClose}
          />
        </div>
      )}
      <CarpenterSlip events={events} data={data} id={id} refresh={refresh} />
    </div>
  );
};

export default Attendance;

  // reusable componnent
  const DetailItem = ({ label, value }) => (
    <div className="space-y-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );