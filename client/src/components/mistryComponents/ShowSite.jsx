import { useState } from "react";
import ShowSiteList from "./ShowSiteList";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const ShowSite = () => {
  const [siteName, setSiteName] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(toggle(true))
      const site = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addSite`,
        { siteName, location: siteLocation, profitPercentage },
        { withCredentials: true }
      );
      toast.success(site.data.message);
      setSiteName("");
      setSiteLocation("");
      setRefresh(prev=>!prev)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally{
      dispatch(toggle(false))
    }
  };

  return (
    <div className="mt-24 w-full p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#ED2A4F] text-center mb-6">
          Manage Sites
        </h1>
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 "
        >
          <input
            type="text"
            className="border-2 border-[#ED2A4F] focus:ring-[#ED2A4F] focus:border-[#ED2A4F] rounded-lg p-3 w-full text-gray-700"
            placeholder="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />
          <input
            type="text"
            className="border-2 border-[#ED2A4F] focus:ring-[#ED2A4F] focus:border-[#ED2A4F] rounded-lg p-3 w-full text-gray-700"
            placeholder="Site Location"
            value={siteLocation}
            onChange={(e) => setSiteLocation(e.target.value)}
            required
          />
          <input
            type="number"
            className="border-2 border-[#ED2A4F] focus:ring-[#ED2A4F] focus:border-[#ED2A4F] rounded-lg p-3 w-full text-gray-700"
            placeholder="Mistry Profit Percentage"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#ED2A4F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all w-full"
          >
            Create Site
          </button>
        </form>
      </div>

      <div className="mt-8">
        <ShowSiteList refresh={refresh}/>
      </div>
    </div>
  );
};

export default ShowSite;
