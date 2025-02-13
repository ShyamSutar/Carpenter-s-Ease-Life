import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import AddHardwareModelList from "./AddHardwareModelList";

const AddHardwareModel = ({ setShowHardwareModel, site }) => {
  const [search, setSearch] = useState("");
  const [hardware, setHardware] = useState([]);

  const handleOnClose = () => {
    setShowHardwareModel(false);
    setHardware([]);
    setSearch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/hardwareSearch`,
        { username: search },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setHardware(res.data);
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

  const sendNotification = async (hardware) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/notificationRequestHardware`,
        { hardwareId: hardware._id, site: site.siteName },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[95%] max-w-lg mx-auto border-t-4 border-[#ED2A4F]">
      <h2 className="text-xl font-bold text-[#ED2A4F] text-center mb-4">Search Hardware Dealer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Enter dealer's name"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#ED2A4F] text-white rounded-lg font-semibold hover:bg-[#c81e3c] transition-all"
        >
          Search
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {hardware.map((hw) => (
          <AddHardwareModelList key={hw._id} hardware={hw} sendNotification={sendNotification} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button className="py-2 px-6 bg-green-500 text-white font-semibold rounded-lg hover:scale-105 transition-all">
          Apply
        </button>
        <button
          className="py-2 px-6 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all"
          onClick={handleOnClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddHardwareModel;
