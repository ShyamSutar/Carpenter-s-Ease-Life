import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddPlywoodModel from "./AddPlywoodModel";
import SiteSlugSlip from "./SiteSlugSlip";
import { toast } from "react-toastify";
import AddHardwareModel from "./AddHardwareModel";
import SiteSlugSlipHardware from "./SiteSlugSlipHardware";

const SiteSlug = () => {
  const id = useParams().id;

  const navigate = useNavigate();

  const [site, setSite] = useState("");
  const [showPlywoodModel, setShowPlywoodModel] = useState(false);
  const [showHardwareModel, setShowHardwareModel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profitPercentage, setProfitPercentage] = useState(35);

  const [editModalDetails, setEditModalDetails] = useState({
    siteName: "",
    location: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const site = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
          { withCredentials: true }
        );
        setSite(site.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleAddPlywood = () => {
    setShowPlywoodModel(true);
  };

  const handleAddHardware = () => {
    setShowHardwareModel(true);
  }

  const totalGrandTotalPlywood = site?.plywood?.reduce((total, item) => {
    return (
      total +
      item.plywoodDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerSheet,
        0
      )
    );
  }, 0);

  const totalGrandTotalHardware = site?.hardware?.reduce((total, item) => {
    return (
      total +
      item.hardwareDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerUnit,
        0
      )
    );
  }, 0);

  const carpenterProfit = ((totalGrandTotalPlywood + totalGrandTotalHardware) * profitPercentage) / 100;

  const handleDelete = async () => {
    try {
      const site = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/deletePlywood/${id}`,
        { withCredentials: true }
      );
      toast.success(site.data.message);
      navigate("/mistry/site");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const handleEditSubmit = async(e) => {
    e.preventDefault();

    try {
      const site = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/editPlywood/${id}`,
        {siteName: editModalDetails.siteName, location: editModalDetails.location},
        { withCredentials: true }
      );
      toast.success(site.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally{
      setShowEditModal(false)
    }
  }

  return (
    <div className="mt-24 p-6 bg-gray-100 min-h-screen">
      <div className="border-2 border-[#ED2A4F] p-6 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-bold text-[#ED2A4F]">Site Details</h1>
        <h3 className="text-lg font-semibold mt-2">
          Site Name: {site.siteName}
        </h3>
        <h3 className="text-lg font-semibold">Location: {site.location}</h3>
        <h3 className="text-lg font-semibold">Plywood Dealer: -</h3>
        <h3 className="text-lg font-semibold">Plywood Dealer Email: -</h3>
        <h3 className="text-lg font-semibold">Plywood Dealer Phone: -</h3>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
        <button
          onClick={handleAddPlywood}
          className="w-full sm:w-auto px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition"
        >
          Add Plywood
        </button>
        <button
          onClick={handleAddHardware} 
          className="w-full sm:w-auto px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition"
        >
          Add Hardware
        </button>
        <button className="w-full sm:w-auto px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition">
          Add Client
        </button>
        <button
          className="w-full sm:w-auto px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition"
          onClick={() => setShowDeleteModal(true)}
        >
          Remove
        </button>
        <button className="w-full sm:w-auto px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition"
        onClick={() => setShowEditModal(true)} >
          Edit
        </button>
      </div>

      {/* Plywood List */}
      <div>
        {site?.plywood?.map((item) => (
          <div
            key={item.plywood._id}
            className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h1 className="font-bold text-lg text-[#ED2A4F]">
              {item.plywood.username}
            </h1>
            <SiteSlugSlip data={item.plywoodDetails} />
          </div>
        ))}
      </div>

      {/* Hardware List */}
      <div>
        {site?.hardware?.map((item) => (
          <div
            key={item.hardware._id}
            className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >{console.log(item)}
            <h1 className="font-bold text-lg text-[#ED2A4F]">
              {item.hardware.username}
            </h1>
            <SiteSlugSlipHardware data={item.hardwareDetails} />
          </div>
        ))}
      </div>

      {/* Carpenter's Profit Calculation */}
      <div className="mt-6 border-t-2 pt-4">
        <h2 className="text-xl font-bold text-right pr-4 text-[#ED2A4F]">
          Total of All Grand Totals: ₹{totalGrandTotalPlywood + totalGrandTotalHardware}
        </h2>

        <div className="flex items-center justify-end pr-4 mt-2">
          <label className="font-semibold mr-2">Profit %:</label>
          <input
            type="number"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(Number(e.target.value))}
            className="border border-gray-400 px-2 py-1 w-16 rounded-md text-center focus:ring-2 focus:ring-[#ED2A4F]"
          />
        </div>

        <h2 className="text-lg font-semibold text-right pr-4 mt-2 text-[#ED2A4F]">
          Carpenter&apos;s Profit: ₹{carpenterProfit.toFixed(2)}
        </h2>
      </div>

      <div
        className={` ${
          !showPlywoodModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0 bg-gray-900 bg-opacity-50`}
      >
        <AddPlywoodModel
          setShowPlywoodModel={setShowPlywoodModel}
          site={site}
        />
      </div>

      <div
        className={` ${
          !showHardwareModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0 bg-gray-900 bg-opacity-50`}
      >
        <AddHardwareModel
          setShowHardwareModel={setShowHardwareModel}
          site={site}
        />
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold">
              Are you sure you want to delete?
            </h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      <h2 className="text-lg font-semibold mb-4">Edit Site Details</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={editModalDetails.siteName}
            onChange={(e) => setEditModalDetails({...editModalDetails, [e.target.name]: e.target.value})}
            className="mt-1 w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={editModalDetails.location}
            onChange={(e) => setEditModalDetails({...editModalDetails, [e.target.name]: e.target.value})}
            className="mt-1 w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default SiteSlug;
