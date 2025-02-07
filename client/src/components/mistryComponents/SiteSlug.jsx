import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPlywoodModel from "./AddPlywoodModel";

const SiteSlug = () => {
  const id = useParams().id;

  const [site, setSite] = useState("");
  const [showPlywoodModel, setShowPlywoodModel] = useState(false);

  useEffect(() => {
    (async () => {
      // dispatch(toggle(true))
      try {
        const site = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
          { withCredentials: true }
        );
        setSite(site.data);
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


  return (
    <div className="mt-24">
      <div className="border-2 p-4">
        <h1>Site Details</h1>
        <h3>Site Name: {site.siteName}</h3>
        <h3>Location: {site.location}</h3>
        <h3>Plywood Dealter: -</h3>
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

      <div
        className={` ${
          !showPlywoodModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0`}
      >
        <AddPlywoodModel setShowPlywoodModel={setShowPlywoodModel}/>
      </div>
    </div>
  );
};

export default SiteSlug;
