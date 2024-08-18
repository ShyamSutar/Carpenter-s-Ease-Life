    import axios from "axios"
    import { useEffect, useState } from "react"
    import { useParams } from "react-router-dom"
    import AttendanceCalendar from "./AttendanceCalendar";

    const Attendance = () => {
        const id = useParams().id;

        const [data, setData] = useState(null)
        const [show, setShow] = useState(false)

        useEffect(()=>{
            (async()=>{
                try {
                    const response = await axios.get(`http://localhost:5000/api/v1/attendance/findCarpenterById/${id}`, {withCredentials:true})
                    setData(response.data.carpenter[0]);
                } catch (error) {
                    console.log(error);
                }
            })()
        },[id])

        const [events, setEvents] = useState([
            {
                title: "Half Day",
                start: new Date(),
                end: new Date(),
            }
        ]);
        const userId = '12345'; // Replace with dynamic userId if needed

    //   useEffect(() => {
    //     const fetchAttendance = async () => {
    //       try {
    //         const response = await axios.get(`http://localhost:6000/api/attendance/${userId}`);
    //         console.log('API Response:', response.data);

    //         if (Array.isArray(response.data)) {
    //           const formattedEvents = response.data.map((record) => ({
    //             title: record.status,
    //             start: new Date(record.date),
    //             end: new Date(record.date),
    //           }));
    //           setEvents(formattedEvents);
    //         } else {
    //           console.error('Unexpected response format:', response.data);
    //         }
    //       } catch (error) {
    //         console.error('Error fetching attendance:', error);
    //       }
    //     };

    //     fetchAttendance();
    //   }, [userId]);

    const components = {
        event: (props)=>{
            return <div onClick={()=>console.log("clicked")}>
                {props.event.title}
                
            </div>;
        }
    }

    const handleSelectSlot = (slot) => {
        console.log(new Date(slot.slots).toLocaleDateString());
        setShow(true)
    }

    return (
        <>
            <div className="mt-24 min-h-screen relative">
                <AttendanceCalendar events={events} components={components} handleSelectSlot={handleSelectSlot}/>

            <div className={` ${!show?'hidden':''} h-lvh w-full flex justify-center z-50 absolute top-0 left-0`}>
                <div className="bg-slate-200 rounded shadow-sm mb-8 w-[95%]">
                    <button onClick={()=>setShow(false)}>Close</button>
                </div>
            </div>
            </div>
        </>
    )
    }

    export default Attendance