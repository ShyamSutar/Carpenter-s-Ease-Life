import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPlywoodModel from "./AddPlywoodModel";
import SiteSlugSlip from "./SiteSlugSlip";

const SiteSlug = () => {
  const id = useParams().id;

  const [site, setSite] = useState("");
  const [showPlywoodModel, setShowPlywoodModel] = useState(false);
  const [profitPercentage, setProfitPercentage] = useState(35);

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
  }, []);

  const handleAddPlywood = () => {
    setShowPlywoodModel(true);
  };

  const totalGrandTotal = site?.plywood?.reduce((total, item) => {
    return (
      total +
      item.plywoodDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerSheet,
        0
      )
    );
  }, 0);

  const carpenterProfit = (totalGrandTotal * profitPercentage) / 100;

  return (
    <div className="mt-24 p-6 bg-gray-100 min-h-screen">
      <div className="border-2 border-[#ED2A4F] p-6 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-bold text-[#ED2A4F]">Site Details</h1>
        <h3 className="text-lg font-semibold mt-2">Site Name: {site.siteName}</h3>
        <h3 className="text-lg font-semibold">Location: {site.location}</h3>
        <h3 className="text-lg font-semibold">Plywood Dealer: -</h3>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleAddPlywood}
          className="px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition"
        >
          Add Plywood
        </button>
        <button className="px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition">
          Add Hardware
        </button>
        <button className="px-6 py-2 bg-[#ED2A4F] text-white font-semibold rounded-lg shadow-md hover:bg-[#c92040] transition">
          Add Client
        </button>
      </div>

      {/* Plywood List */}
      <div>
        {site?.plywood?.map((item) => (
          <div key={item.plywood._id} className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="font-bold text-lg text-[#ED2A4F]">{item.plywood.username}</h1>
            <SiteSlugSlip data={item.plywoodDetails} />
          </div>
        ))}
      </div>

      {/* Carpenter's Profit Calculation */}
      <div className="mt-6 border-t-2 pt-4">
        <h2 className="text-xl font-bold text-right pr-4 text-[#ED2A4F]">
          Total of All Grand Totals: ₹{totalGrandTotal}
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
        className={` ${!showPlywoodModel ? "hidden" : ""} h-[90%] w-full flex justify-center z-50 fixed top-10 left-0 bg-gray-900 bg-opacity-50`}
      >
        <AddPlywoodModel setShowPlywoodModel={setShowPlywoodModel} site={site} />
      </div>
    </div>
  );
};

export default SiteSlug;