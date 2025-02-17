import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const NotificationHardwareList = ({ setRefresh, notification }) => {

  const dispatch = useDispatch();

  const handleApprove = async (mistryId) => {
    try {
      dispatch(toggle(true))
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/approveNotificationHardware/${mistryId}/${notification.site}`,
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
    } finally{
      dispatch(toggle(false))
    }
  };

  const handleReject = async (mistryId) => {
    try {
      dispatch(toggle(true))
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/rejectNotificationHardware/${mistryId}/${notification.site}`,
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
    } finally{
      dispatch(toggle(false))
    }
  };

  return (
    <>
      <div className="mt-4 mr-2 rounded-md border bg-slate-100 shadow-md">
        <div className="w-full p-4">
          <h2 className="font-semibold">
            Name: {notification.mistry.username}
          </h2>
          <h2 className="font-semibold">
            Email: {notification.mistry.email}
          </h2>
          <h2 className="font-semibold">
            Message: {`Request for ${notification.site}`}
          </h2>
        </div>

        <div className="flex gap-2 m-4">
          <button
            className="bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-2 rounded-md"
            onClick={() => handleApprove(notification.mistry._id)}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition-all text-white px-6 py-2 rounded-md "
            onClick={() => handleReject(notification.mistry._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationHardwareList;