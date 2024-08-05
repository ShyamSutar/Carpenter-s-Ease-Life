import axios from "axios";
import { useEffect, useState } from "react";
import NotificationList from "./NotificationList";
import {toast} from "react-toastify"

const Notification = () => {
  
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const notifications = await axios.get(
          "http://localhost:5000/api/v1/notification/showNotification",
          { withCredentials: true }
        );
        
        setNotifications(notifications.data);
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        toast.error(errorMessage);
      }
    })();
  }, [refresh]);



  return (
    <div className="mt-28 ml-4 min-h-screen">
      <h1 className=" font-bold text-2xl">Notifications</h1>
      <div>
        {notifications.length > 0 ? (notifications.map((notification)=><NotificationList key={notification._id} setRefresh={setRefresh} notification={notification}/>))
        :
        (<div className="mt-2 ml-3">No Notifications...</div>)}
      </div>
    </div>
  );
};


export default Notification;
