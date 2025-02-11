import { useState } from "react";
import ShowSiteList from "./ShowSiteList";
import axios from "axios";
import { toast } from "react-toastify";

const ShowSite = () => {
  const [siteName, setSiteName] = useState("");
  const [siteLocation, setSiteLocation] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const site = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addSite`,
        { siteName, location: siteLocation },
        { withCredentials: true }
      );
      toast.success(site.message);
      setSiteName("");
      setSiteLocation("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-24 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#ED2A4F] text-center mb-6">Manage Sites</h1>
      <form onSubmit={handleOnSubmit} className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 ">
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
        <button
          type="submit"
          className="bg-[#ED2A4F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all w-full"
        >
          Create Site
        </button>
      </form>

      <div className="mt-8">
        <ShowSiteList />
      </div>
    </div>
  );
};

export default ShowSite;
