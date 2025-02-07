import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import AddPlywoodModelList from "../plywoodComponents/AddPlywoodModelList";

const AddPlywoodModel = ({ setShowPlywoodModel }) => {
  const [search, setSearch] = useState("");
  const [plywood, setPlywood] = useState([]);

  const handleOnClose = () => {
    setShowPlywoodModel(false);

    setSearch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/plywoodSearch`,
        { username: search },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setPlywood(res.data);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const sendNotification = async (plywood) => {
    // try {
    //   const res = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}/api/v1/notification/notificationRequest`,
    //     { mistryId: mistry._id },
    //     { withCredentials: true }
    //   );
    //   if(res.status === 200){
    //     toast.success(res.data.message);
    //   }else{
    //     toast.error(res.data.message)
    //   }
    // } catch (error) {
    //   const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    //   toast.error(errorMessage);
    // }
  };

  return (
    <div className="bg-slate-200 rounded shadow-sm mb-8 w-[95%] p-2 flex flex-col gap-4">
      <div className="">
        <div className="w-full flex justify-center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-[70vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search Plywood Dealer"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 transition-all px-6 py-2 rounded text-white mt-2 w-full"
            >
              search
            </button>
          </form>
        </div>
      </div>

      <div>
        {plywood &&
          plywood.map((plywood) => (
            <AddPlywoodModelList
              key={plywood._id}
              plywood={plywood}
              sendNotification={sendNotification}
            />
          ))}
      </div>

      <div className="flex gap-4">
        <button className="py-2 px-6 bg-green-500 rounded text-white font-semibold hover:scale-105 transition-all">
          Apply
        </button>
        <button
          className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
          onClick={handleOnClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddPlywoodModel;
