import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import AddPlywoodModelList from "../plywoodComponents/AddPlywoodModelList";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const AddPlywoodModel = ({ setShowPlywoodModel, site }) => {
  const [search, setSearch] = useState("");
  const [plywood, setPlywood] = useState([]);

  const dispatch = useDispatch();

  const handleOnClose = () => {
    setShowPlywoodModel(false);
    setPlywood([]);
    setSearch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(toggle(true))
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
    } finally{
      dispatch(toggle(false))
    }
  };

  const sendNotification = async (plywood) => {
    try {
      dispatch(toggle(true))
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/notification/notificationRequestPlywood`,
        { plywoodId: plywood._id, site: site.siteName },
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
    } finally{
      dispatch(toggle(false))
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[95%] max-w-lg mx-auto border-t-4 border-[#ED2A4F]">
      <h2 className="text-xl font-bold text-[#ED2A4F] text-center mb-4">Search Plywood Dealer</h2>
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
        {plywood.map((ply) => (
          <AddPlywoodModelList key={ply._id} plywood={ply} sendNotification={sendNotification} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
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

export default AddPlywoodModel;
