import axios from "axios";
import { useState } from "react";
import CarpenterSearchList from "./CarpenterSearchList";
import { toast } from "react-toastify";

const CarpenterSearch = () => {

  const [search, setSearch] = useState("");
  const [mistries, setMistries] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/mistrySearch`,
        { username: search },
        { withCredentials: true }
      );

      if(res.status === 200){
        setMistries(res.data);
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message)
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  const sendNotification = async (mistry) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/notificationRequest`,
        { mistryId: mistry._id },
        { withCredentials: true }
      );

      if(res.status === 200){
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message)
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-[93vh] mt-28">
    <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit}>
            <input type="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-[70vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <button type="submit" className="bg-red-500 hover:bg-red-600 transition-all px-6 py-2 rounded text-white mt-2 w-full">search</button>
        </form>
    </div>

    <div>
        {mistries && mistries.map((mistry)=>(<CarpenterSearchList key={mistry._id} mistry={mistry} sendNotification={sendNotification}/>))}
    </div>
</div>
  )
}

export default CarpenterSearch