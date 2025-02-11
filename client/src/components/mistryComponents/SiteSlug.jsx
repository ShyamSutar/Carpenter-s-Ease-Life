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
      // dispatch(toggle(true))
      try {
        const site = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
          { withCredentials: true }
        );
        setSite(site.data);
        // console.log(site.data.plywood)
        //   dispatch(toggle(false))
      } catch (error) {
        console.log(error);
        //   dispatch(toggle(false))
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
    <div className="mt-24">
      <div className="border-2 p-4">
        <h1>Site Details</h1>
        <h3>Site Name: {site.siteName}</h3>
        <h3>Location: {site.location}</h3>
        <h3>Plywood Dealer: -</h3>
      </div>

      <div className="mt-6">
        <button
          onClick={handleAddPlywood}
          className="mx-2 px-4 py-2 bg-myRed rounded-md text-white"
        >
          Add Plywood
        </button>
        <button className="mx-2 px-4 py-2 bg-myRed rounded-md text-white">
          Add Hardware
        </button>
        <button className="mx-2 px-4 py-2 bg-myRed rounded-md text-white">
          Add Client
        </button>
      </div>

      {/* Plywood List */}
      <div>
        {site?.plywood?.map((item) => (
          <div key={item.plywood._id} className="mt-6">
            <h1 className="font-bold text-lg">{item.plywood.username}</h1>
            <SiteSlugSlip data={item.plywoodDetails} />
          </div>
        ))}
      </div>

      {/* Carpenter's Profit Calculation */}
      <div className="mt-6 border-t-2 pt-4">
        <h2 className="text-xl font-bold text-right pr-4">
          Total of All Grand Totals: ₹{totalGrandTotal}
        </h2>

        <div className="flex items-center justify-end pr-4 mt-2">
          <label className="font-semibold mr-2">Profit %:</label>
          <input
            type="number"
            value={profitPercentage}
            onChange={(e) => setProfitPercentage(Number(e.target.value))}
            className="border border-gray-400 px-2 py-1 w-16 rounded-md text-center"
          />
        </div>

        <h2 className="text-lg font-semibold text-right pr-4 mt-2">
          Carpenter&apos;s Profit: ₹{carpenterProfit.toFixed(2)}
        </h2>
      </div>

      <div
        className={` ${
          !showPlywoodModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0`}
      >
        <AddPlywoodModel setShowPlywoodModel={setShowPlywoodModel} site={site} />
      </div>
    </div>
  );
};

export default SiteSlug;
