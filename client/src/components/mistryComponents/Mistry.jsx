import axios from "axios"
import { useEffect, useState } from "react"

const Mistry = () => {

    const [notifications, setNotifications] = useState([])
    const [showCarpenters, setShowCarpenters] = useState([])
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        (async()=>{
            try {
                const notifications = await axios.get("http://localhost:5000/api/v1/notification/showNotification", {withCredentials: true});
                setNotifications(notifications.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [refresh])

    useEffect(()=>{
        (async()=>{
            try {
                const showCarpenters = await axios.get("http://localhost:5000/api/v1/attendance/showCarpenters", {withCredentials: true});
                setShowCarpenters(showCarpenters.data.carpenters);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [refresh])

    const handleApprove = async(carpenterId) => {
        try {
            await axios.post(`http://localhost:5000/api/v1/notification/approveNotification/${carpenterId}`, {},{withCredentials:true});
            setRefresh(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleReject = async(carpenterId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/notification/rejectNotification/${carpenterId}` ,{withCredentials:true});
            setRefresh(true);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="h-[93vh] mt-16">
        <h1 className="mt-28 ml-4 font-bold text-xl">Notifications</h1>
        <div>
            {notifications && notifications.map((notification, index)=>(<div key={index} className="mt-20 p-10 m-4 w-64 bg-red-200">
                <div>{notification.carpenter.username}</div>
                <button className="bg-slate-200 mr-4" onClick={()=>handleApprove(notification.carpenter._id)}>approve</button>
                <button className="bg-slate-200" onClick={()=>handleReject(notification.carpenter._id)}>reject</button>
            </div>))}
        </div>

        <h1 className="mt-28 ml-4 font-bold text-xl">Attendance section</h1>
        {showCarpenters && showCarpenters.map((carpenter, index)=>(<div key={index} className="mt-20 p-10 m-4 w-64 bg-red-200">
                <div>{carpenter.carpenter.username}</div>
            </div>))}

    </div>
  )
}

export default Mistry