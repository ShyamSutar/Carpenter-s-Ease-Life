import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendanceCalendar from "./AttendanceCalendar";
import moment from "moment";

const Attendance = () => {
  const id = useParams().id;

  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState();
  const [inputs, setInputs] = useState({
    start: "",
    end: "",
    status: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/attendance/findCarpenterById/${id}`,
          { withCredentials: true }
        );
        setData(response.data.carpenter[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(
          `http://localhost:5000/api/v1/calendar/getEvents/${id}`,
          { withCredentials: true }
        );

        if (Array.isArray(response.data)) {
            const formattedEvents = response.data.map((record) => ({
              title: record.title,
              start: new Date(record.start),
              end: new Date(record.end),
              date: record.date
            }));
            setEvents(formattedEvents);
          } else {
            console.error('Unexpected response format:', response.data);
          }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const components = {
    event: (props) => {
      return (
        <div onClick={() => console.log("clicked")}>{props.event.title}</div>
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
      )

    if (inputs.status == "A") {
        console.log(new Date(`${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T00:00:00`));
      startParsed = new Date(`${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T00:00:00`);
      endParsed = new Date(`${moment(slot, "DD/MM/YYYY").format("YYYY-MM-DD")}T00:00:00`);
    }

    const response = await axios.post(
      "http://localhost:5000/api/v1/calendar/postEvent",
      {
        carpenter: id,
        start: startParsed,
        end: endParsed,
        date: slot,
        title: inputs.status,
      },
      { withCredentials: true }
    );

    setInputs({
      start: "",
      end: "",
      status: "",
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
      <div className="mt-24 min-h-screen relative">
        <AttendanceCalendar
          events={events}
          components={components}
          handleSelectSlot={handleSelectSlot}
        />

        <div
          className={` ${
            !show ? "hidden" : ""
          } h-lvh w-full flex justify-center z-50 absolute top-0 left-0`}
        >
          <div className="bg-slate-200 rounded shadow-sm mb-8 w-[95%]">
            <h3>Date: {slot}</h3>
            {/* <input type="time" name="start" placeholder="start" onChange={handleOnChange} value={inputs.start}/> */}

            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="time"
                name="start"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleOnChange}
                value={inputs.start}
                required
              />
            </div>

            <label
              htmlFor="time2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="time2"
                name="end"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleOnChange}
                value={inputs.end}
                required
              />
            </div>

            <select
              name="status"
              id=""
              onChange={handleOnChange}
              value={inputs.status}
            >
              <option value="">select</option>
              <option value="P">P</option>
              <option value="H">H</option>
              <option value="A">A</option>
              <option value="O">O</option>
            </select>
            <button onClick={handleApply}>Apply</button>
            <button onClick={() => setShow(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
