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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-6 text-left">Site Name</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Plywood Dealer</th>
              <th className="py-3 px-6 text-left">Hardware Dealer</th>
              <th className="py-3 px-6 text-left">Client</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr
                key={site._id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/mistry/siteSlug/${site._id}`)}
              >
                <td className="py-3 px-6">{site.siteName}</td>
                <td className="py-3 px-6">{site.location}</td>
                <td className="py-3 px-6">{site.plywoodDealer || "-"}</td>
                <td className="py-3 px-6">{site.hardwareDealer || "-"}</td>
                <td className="py-3 px-6">{site.client || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowSiteList;
