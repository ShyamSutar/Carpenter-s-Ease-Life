import { useState } from "react";
import ShowSiteList from "./ShowSiteList";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import * as Yup from "yup";

const ShowSite = () => {
  const [siteName, setSiteName] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    siteName: Yup.string()
      .required("Name is required"),
    siteLocation: Yup.string().required("Location is required"),
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { siteName, siteLocation },
        { abortEarly: false }
      );
      dispatch(toggle(true));
      const site = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addSite`,
        { siteName, location: siteLocation, profitPercentage: profitPercentage || 35 },
        { withCredentials: true }
      );
      toast.success(site.data.message);
      setSiteName("");
      setSiteLocation("");
      setRefresh((prev) => !prev);
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        const errorMessage =
          err.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    } finally {
      dispatch(toggle(false));
    }
  };

  return (
    <div className="mt-24 w-full min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ED2A4F] text-center mb-6">
          Manage Sites
        </h1>
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4"
        >
          <input
            type="text"
            className="border-2 border-[#ED2A4F] focus:ring-[#ED2A4F] focus:border-[#ED2A4F] rounded-lg p-3 w-full text-gray-700"
            placeholder="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            
          />
          {errors.siteName && (
            <div className="-mt-2 flex items-center gap-2 bg-red-100 text-red-600 text-sm rounded-md px-3 py-2 border border-red-300 dark:bg-red-400/10 dark:text-red-400">
              <span>{errors.siteName}</span>
            </div>
          )}
          <input
            type="text"
            className="border-2 border-[#ED2A4F] focus:ring-[#ED2A4F] focus:border-[#ED2A4F] rounded-lg p-3 w-full text-gray-700"
            placeholder="Site Location"
            value={siteLocation}
            onChange={(e) => setSiteLocation(e.target.value)}
            required
          />
          {errors.siteLocation && (
            <div className="-mt-2 flex items-center gap-2 bg-red-100 text-red-600 text-sm rounded-md px-3 py-2 border border-red-300 dark:bg-red-400/10 dark:text-red-400">
              <span>{errors.siteLocation}</span>
            </div>
          )}
          <input
            type="number"
            className="border-2 border-[#ED2A4F] focus:ring-[#ED2A4F] focus:border-[#ED2A4F] rounded-lg p-3 w-full text-gray-700"
            placeholder="Mistry Profit Percentage"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(e.target.value)}
            
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
        <ShowSiteList refresh={refresh} />
      </div>
    </div>
  );
};

export default ShowSite;
