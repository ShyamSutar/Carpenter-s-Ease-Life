import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowSiteList = () => {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const showCarpenters = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSites`,
          { withCredentials: true }
        );
        setSites(showCarpenters.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      {/* Ensure only the table scrolls horizontally */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] bg-white border border-gray-200 rounded-lg shadow-md w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-6 text-left whitespace-nowrap">Site Name</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Location</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Plywood Dealer</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Hardware Dealer</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Client</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr
                key={site._id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/mistry/siteSlug/${site._id}`)}
              >
                <td className="py-3 px-6 whitespace-nowrap">{site.siteName}</td>
                <td className="py-3 px-6 whitespace-nowrap">{site.location}</td>
                <td className="py-3 px-6 whitespace-nowrap">{site.plywoodDealer || "-"}</td>
                <td className="py-3 px-6 whitespace-nowrap">{site.hardwareDealer || "-"}</td>
                <td className="py-3 px-6 whitespace-nowrap">{site.client || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowSiteList;
