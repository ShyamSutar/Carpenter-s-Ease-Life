import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PlywoodSlip from "./PlywoodSlip";
import HardwareSlip from "./HardwareSlip";

const ClientSlug = () => {
  const id = useParams().id;

  const [site, setSite] = useState()
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const site = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
          { withCredentials: true }
        );
        setSite(site.data);
        console.log(site.data.plywood)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, refresh]);

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

  const totalAmount = totalGrandTotalPlywood + totalGrandTotalHardware;

  return (
    <div className="mt-24 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{site?.siteName}</h2>

      {/* Plywood Details */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold border-b pb-2 mb-4">
          Plywood Details
        </h3>
        {site?.plywood?.map((ply) => (
          <div
            key={ply._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-blue-600">
              {ply?.plywood?.username}
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              📧 {ply?.plywood?.email} | 📞 {ply?.plywood?.phone}
            </p>
            <PlywoodSlip ply={ply} id={id} setRefresh={setRefresh}/>
          </div>
        ))}
      </div>

      {/* Hardware Details */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold border-b pb-2 mb-4">
          Hardware Details
        </h3>
        {site?.hardware?.map((hardware) => (
          <div
            key={hardware._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-blue-600">
              {hardware?.hardware?.username}
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              📧 {hardware?.hardware?.email} | 📞 {hardware?.hardware?.phone}
            </p>
            <HardwareSlip hd={hardware} />
          </div>
        ))}
      </div>


    </div>
  );
};

export default ClientSlug;
