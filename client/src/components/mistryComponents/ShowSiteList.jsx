import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowSiteList = ({refresh}) => {
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
  }, [refresh]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Site List</h2>
      {/* Flexbox container with wrapping */}
      <div className="flex flex-wrap gap-4 justify-center">
        {sites.map((site) => (
          <div
            key={site._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            style={{ flex: "1 1 380px", maxWidth: "400px" }} // Min width 280px, flex adjusts width
            onClick={() => navigate(`/mistry/siteSlug/${site._id}`)}
          >
            <h3 className="text-lg font-semibold">{site.siteName}</h3>
            <p className="text-gray-600">📍 {site.location}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Plywood Dealer:</strong> {site.plywoodDealer || "-"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Hardware Dealer:</strong> {site.hardwareDealer || "-"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Client:</strong> {"-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSiteList;
