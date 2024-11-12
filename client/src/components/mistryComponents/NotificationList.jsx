import axios from "axios";
import { toast } from "react-toastify";

const NotificationList = ({ setRefresh, notification }) => {
  const handleApprove = async (carpenterId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/approveNotification/${carpenterId}`,
        {},
        { withCredentials: true }
      );
      if(res.status === 200){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message);
      }
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (carpenterId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/rejectNotification/${carpenterId}`,
        { withCredentials: true }
      );
      if(res.status === 200){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message);
      }
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-4 mr-2 rounded-md border bg-slate-100 shadow-md">
        <div className="w-full p-4">
          <h2 className="font-semibold">
            Name: {notification.carpenter.username}
          </h2>
          <h2 className="font-semibold">
            Email: {notification.carpenter.email}
          </h2>
          <h2 className="font-semibold">
            Message: Request to add as your employee
          </h2>
        </div>

        <div className="flex gap-2 m-4">
          <button
            className="bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-2 rounded-md"
            onClick={() => handleApprove(notification.carpenter._id)}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition-all text-white px-6 py-2 rounded-md "
            onClick={() => handleReject(notification.carpenter._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationList;