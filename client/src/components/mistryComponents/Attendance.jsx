import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AttendanceCalendar from "./AttendanceCalendar";

const Attendance = () => {
    const id = useParams().id;

    const [data, setData] = useState(null)

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

  return (
    <div className="mt-24 min-h-screen">
        <AttendanceCalendar />
    </div>
  )
}

export default Attendance