import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HardwareSlugSlip from "./HardwareSlugSlip";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const HardwareSlug = () => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const [site, setSite] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    brand: "",
    size: "",
    quantity: "",
    unit: "",
    ratePerUnit: "",
  });

  useEffect(() => {
    dispatch(toggle(true))
    (async () => {
      try {
        const siteResponse = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/site/fetchSiteHardware/${id}`,
          { withCredentials: true }
        );
        setSite(siteResponse.data);
      } catch (error) {
        console.log(error);
      } finally{
        dispatch(toggle(false))
      }
    })();
  }, [id, refresh]);

  useEffect(() => {
    (async () => {
      dispatch(toggle(true))
      try {
        const siteResponse = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/site/fetchHardwareDetails/${id}`,
          { withCredentials: true }
        );
        setData(siteResponse.data);
      } catch (error) {
        console.log(error);
      } finally{
        dispatch(toggle(false))
      }
    })();
  }, [id, refresh]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(toggle(true))
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addHardwareDetails`,
        { ...formData, siteId: id },
        { withCredentials: true }
      );
      console.log("Hardware added:", response.data);
    } catch (error) {
      console.error("Error adding hardware:", error);
    } finally {
      setRefresh((prev) => !prev);
      dispatch(toggle(false))
    }
  };

  const totalPaid = data?.hardware?.[0]?.paid?.reduce((acc, payment) => acc + Number(payment.amount), 0);

  return (
    <div className="mt-24 p-4">
      <h1 className="text-2xl font-bold mb-4">{site.siteName}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Size (e.g., 4 inch, 1 kg)"
          value={formData.size}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Unit</option>
          <option value="pieces">Pieces</option>
          <option value="kg">Kg</option>
          <option value="meter">Meter</option>
          <option value="pairs">Pairs</option>
        </select>
        <input
          type="number"
          name="ratePerUnit"
          placeholder="Rate per Unit"
          value={formData.ratePerUnit}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Submit
        </button>
      </form>

      <div>
        <HardwareSlugSlip data={data} id={id} />
      </div>

      {/* Payment Slip Section */}
      <div className="mt-6 p-6 border-2 border-gray-300 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#ED2A4F]">Payment Slip</h2>
        <div className="mt-4">
          {data?.hardware?.[0]?.paid?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Amount Paid
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.hardware?.[0]?.paid?.map((payment) => (
                  <tr key={payment._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(payment.paidDate).toLocaleString("en-US", {
                        weekday: "short", // Full name of the day
                        year: "numeric",
                        month: "short", // Full month name
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true, // 12-hour clock
                      })}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₹{payment.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center">No payments made yet.</p>
          )}
        </div>
        <h2 className="mt-4 text-lg font-bold text-right text-[#ED2A4F]">
          Total Paid: ₹{totalPaid}
        </h2>
        <h2 className="text-lg font-bold text-right text-[#ED2A4F]">
          Remaining Balance: ₹
          {(data.hardware?.[0]?.hardwareDetails?.reduce(
            (total, item) => total + item.quantity * item.ratePerUnit,
            0
          ) || 0) - totalPaid}
        </h2>
      </div>
    </div>
  );
};

export default HardwareSlug;
