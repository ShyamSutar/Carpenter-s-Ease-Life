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
  const id = useParams().id;

  const [refresh, setRefresh] = useState(false);
  const user = useSelector(state => state?.auth?.userData?._id)
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState();
  const [inputs, setInputs] = useState({
    start: "",
    end: "",
    status: "",
    advance: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(toggle(true))
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/findCarpenterById/${id}`,
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

  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        dispatch(toggle(true))
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/getEvents/${id}`,
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
          dispatch(toggle(false))
        } else {
          console.error("Unexpected response format:", response.data);
          dispatch(toggle(false))
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [refresh, id]);

  const handleUpdate = async (props) => {
    setShow(true);
    setSlot(props.event.date);
    setIsUpdate(true)
    const time12HourStart = new Date(props.event.start).toLocaleTimeString();
    const time12HourEnd = new Date(props.event.end).toLocaleTimeString();
    setInputs({
      id: props.event._id,
      start: moment(time12HourStart, "hh:mm:ss A").format("HH:mm"),
      end: moment(time12HourEnd, "hh:mm:ss A").format("HH:mm"),
      status: props.event.title,
      advance: props.event.advance,
    });
  };

  const handleClose = () => {
    setShow(false);
    setInputs({
      start: "",
      end: "",
      status: "",
      advance: "",
    });

    setIsUpdate(false);
  };

  const components = {
    event: (props) => {
      return (
        <div onClick={() => handleUpdate(props)}>
          <div>{props.event.title}</div>
          <div>{props.event.advance}</div>
        </div>
      );
    },
  };

  const handleSelectSlot = (slot) => {
    const slotDate = new Date(slot.slots).toLocaleDateString("en-GB");

    const isDateMatched = events.some((event) => slotDate === event.date);
    if (!isDateMatched) {
      setSlot(new Date(slot.slots).toLocaleDateString("en-GB"));
      setShow(true);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    let startParsed = new Date(
      `${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T${inputs.start}`
    );

    let endParsed = new Date(
      `${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T${inputs.end}`
    );

    if (inputs.status == "A") {
      startParsed = new Date(
        `${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T00:00:00`
      );
      endParsed = new Date(
        `${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T00:00:00`
      );
    }

    if(!isUpdate){
      dispatch(toggle(true))
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/postEvent`,
        {
          carpenter: id,
          start: startParsed,
          end: endParsed,
          date: slot,
          title: inputs.status,
          advance: inputs.advance,
        },
        { withCredentials: true }
      );
    }else{
      console.log(inputs.id);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/calendar/updateEvent/${inputs.id}`,
        {
          carpenter: id,
          start: startParsed,
          end: endParsed,
          date: slot,
          title: inputs.status,
          advance: inputs.advance,
        },
        { withCredentials: true }
      );

      setIsUpdate(false)
      dispatch(toggle(false))
    }

    setInputs({
      start: "",
      end: "",
      status: "",
      advance: "",
    });

    setRefresh(true);
    setShow(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <>
      <div className="mt-24 p-4 bg-slate-200 rounded mr-4">
        <h1 className="text-xl ">
          <b>Name:</b> {data?.carpenter?.username}
        </h1>
        <h1 className="text-xl ">
          <b>Email:</b> {data?.carpenter?.email}
        </h1>
        <h1 className="text-xl ">
          <b>Pay:</b> {data?.carpenter?.pay[user] || 600}
        </h1>
      </div>

      <div className="mt-4 min-h-screen relative">
        <AttendanceCalendar
          events={events}
          components={components}
          handleSelectSlot={handleSelectSlot}
        />
      </div>
      <div
        className={` ${
          !show ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0`}
      >
        <MistryModal slot={slot} handleOnChange={handleOnChange} inputs={inputs} handleApply={handleApply} handleClose={handleClose}/>
        
      </div>

      <CarpenterSlip events={events} data={data} id={id} refresh={refresh}/>
    </>
  );
};

export default Attendance;