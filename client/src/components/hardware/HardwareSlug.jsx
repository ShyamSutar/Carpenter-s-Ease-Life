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
    (async () => {
      dispatch(toggle(true))
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
    <div className="mt-24 p-4 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{site.siteName}</h1>
        <p className="text-gray-600 mt-2">Hardware Management</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              name="itemName"
              placeholder="Enter item name"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:border-[#ED2A4F]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:border-[#ED2A4F]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <input
              type="text"
              name="size"
              placeholder="e.g., 4 inch, 1 kg"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:border-[#ED2A4F]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:border-[#ED2A4F]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:border-[#ED2A4F]"
              required
            >
              <option value="">Select Unit</option>
              <option value="pieces">Pieces</option>
              <option value="kg">Kg</option>
              <option value="meter">Meter</option>
              <option value="pairs">Pairs</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rate per Unit</label>
            <input
              type="number"
              name="ratePerUnit"
              placeholder="Enter rate per unit"
              value={formData.ratePerUnit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED2A4F] focus:border-[#ED2A4F]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#ED2A4F] hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Add Hardware Details
        </button>
      </form>

      <div className="mb-8">
        <HardwareSlugSlip data={data} id={id} />
      </div>

      {/* Payment Slip Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
        
        {data?.hardware?.[0]?.paid?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.hardware?.[0]?.paid?.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(payment.paidDate).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No payments recorded yet</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-700">Total Paid</h3>
            <p className="mt-1 text-2xl font-semibold text-blue-600">
              ₹{totalPaid?.toLocaleString() || 0}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-700">Remaining Balance</h3>
            <p className="mt-1 text-2xl font-semibold text-red-600">
              ₹{(
                (data.hardware?.[0]?.hardwareDetails?.reduce(
                  (total, item) => total + item.quantity * item.ratePerUnit, 0
                ) || 0) - totalPaid
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareSlug;
