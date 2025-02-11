import axios from "axios";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const PlywoodSlugSlip = ({ data, id }) => {
  const hasUpdated = useRef(false); // Track API call to prevent infinite loops

  useEffect(() => {
    if (data.plywood?.length > 0) {
      const totalAmount = data.plywood[0].plywoodDetails.reduce(
        (acc, item) => acc + item.quantity * item.ratePerSheet,
        0
      );

      if (totalAmount > 0 && !hasUpdated.current) {
        // hasUpdated.current = true; // Prevent multiple API calls

        (async () => {
          try {
            await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/v1/site/updateTotal/${id}`,
              { total: totalAmount }, // Send calculated total directly
              { withCredentials: true }
            );
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
          }
        })();
      }
    }
  }, [data.plywood, id]); // Depend on `data.plywood` instead of `total`

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Sr No</th>
            <th className="border px-4 py-2">Plywood Type</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Thickness</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Rate Per Sheet</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.plywood?.[0]?.plywoodDetails?.map((item, index) => (
            <tr key={index} className="text-center border hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.plywoodType}</td>
              <td className="border px-4 py-2">{item.brand}</td>
              <td className="border px-4 py-2">{item.thickness}</td>
              <td className="border px-4 py-2">{item.size}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.ratePerSheet}</td>
              <td className="border px-4 py-2">
                {item.quantity * item.ratePerSheet}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-300 font-semibold">
            <td colSpan="7" className="border px-4 py-2 text-right">
              Grand Total:
            </td>
            <td className="border px-4 py-2 text-center">
              {data.plywood?.[0]?.plywoodDetails?.reduce(
                (acc, item) => acc + item.quantity * item.ratePerSheet,
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlywoodSlugSlip;
