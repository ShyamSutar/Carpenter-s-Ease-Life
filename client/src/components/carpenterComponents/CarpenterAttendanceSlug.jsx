import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CarpenterAttendanceSlug = () => {
    const id = useParams().id;

    const [data, setData] = useState(null)

    useEffect(()=>{
        (async()=>{
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/attendance/findMistryById/${id}`, {withCredentials:true})
                setData(response.data.mistry[0]);
            } catch (error) {
                console.log(error);
            }
        })()
    },[id])

  return (
    <div className="mt-16 min-h-screen">{data && data.mistry.username}</div>
  )
}

export default CarpenterAttendanceSlug