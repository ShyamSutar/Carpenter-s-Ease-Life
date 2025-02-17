import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const ShowSiteList = ({ refresh }) => {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      try {
        dispatch(toggle(true));
        const showCarpenters = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSites`,
          { withCredentials: true }
        );
        setSites(showCarpenters.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(toggle(false));
      }
    })();
  }, [refresh]);

  return (
    <>
    {sites.length ? (
      <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Site List</h2>
      {/* Flexbox container with wrapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sites.map((site) => (
          <div
            key={site._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 cursor-pointer"
            onClick={() => navigate(`/mistry/siteSlug/${site._id}`)}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{site.siteName}</h3>
            <p className="text-sm text-gray-600 flex items-center space-x-2">
              <span>📍</span>
              <span>{site.location}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Created:</strong> {new Date(site?.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
    )
    :
    (<div>No sites Available</div>)
  }
  </>
  );
};

export default ShowSiteList;
