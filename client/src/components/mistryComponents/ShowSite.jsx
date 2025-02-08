import { useState } from "react";
import ShowSiteList from "./ShowSiteList";
import axios from "axios";
import { toast } from "react-toastify";

const ShowSite = () => {
  const [siteName, setSiteName] = useState("");
  const [siteLocation, setSiteLocation] = useState("");

  const handleOnSubmit = async(e) => {
    e.preventDefault();

    try {
      const site = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addSite`,
        {siteName, location: siteLocation},
        { withCredentials: true }
      );
      toast.success(site.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  }

  return (
    <div className="mt-24">
      <h1>Sites</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          className="border-b m-2"
          placeholder="site name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <input
          type="text"
          className="border-b m-2"
          placeholder="site location"
          value={siteLocation}
          onChange={(e) => setSiteLocation(e.target.value)}
        />
        <button className="bg-red-400">Create site</button>
      </form>

      <ShowSiteList />
    </div>
  );
};

export default ShowSite;
