import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlywoodSlugSlip from "./PlywoodSlugSlip";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const PlywoodSlug = () => {
    
  const dispatch = useDispatch();
  const { id } = useParams();
  const [site, setSite] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    plywoodType: "",
    brand: "",
    thickness: "",
    size: "",
    quantity: "",
    ratePerSheet: "",
  });

  useEffect(() => {
    (async () => {
      dispatch(toggle(true))
      try {
        const siteResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
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
      try {
        dispatch(toggle(true))
        const siteResponse = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/site/fetchPlywoodDetails/${id}`,
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addPlywoodDetails`,
        { ...formData, siteId: id },
        { withCredentials: true }
      );
      console.log("Plywood added:", response.data);
    } catch (error) {
      console.error("Error adding plywood:", error);
    } finally {
      setRefresh((prev) => !prev);
      dispatch(toggle(false))
    }
  };

  const totalPaid = data?.plywood?.[0]?.paid?.reduce((acc, payment) => acc + Number(payment.amount), 0);

  return (
    <div className="mt-24 py-4 px-2 md:p-4 max-w-4xl mx-auto">
    <div className="mb-8 border-b border-gray-200 pb-4">
      <h1 className="text-3xl font-bold text-gray-800">{site.siteName}</h1>
      <p className="text-gray-600 mt-2">Plywood Management</p>
    </div>

    <form onSubmit={handleSubmit} className="bg-white px-2 py-4 md:p-6 rounded-xl shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Plywood Type</label>
          <input
            type="text"
            name="plywoodType"
            placeholder="Enter plywood type"
            value={formData.plywoodType}
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
          <label className="block text-sm font-medium text-gray-700">Thickness (mm)</label>
          <input
            type="number"
            name="thickness"
            placeholder="Enter thickness"
            value={formData.thickness}
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
            placeholder="Enter size"
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
          <label className="block text-sm font-medium text-gray-700">Rate per Sheet</label>
          <input
            type="number"
            name="ratePerSheet"
            placeholder="Enter rate per sheet"
            value={formData.ratePerSheet}
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
        Add Plywood Details
      </button>
    </form>

    <div className="mb-8">
      <PlywoodSlugSlip data={data} id={id} />
    </div>

    {/* Payment Slip Section */}
    <div className="bg-white py-4 px-2 md:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
      
      {data?.plywood?.[0]?.paid?.length > 0 ? (
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
              {data?.plywood?.[0]?.paid?.map((payment) => (
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
              (data.plywood?.[0]?.plywoodDetails?.reduce(
                (total, item) => total + item.quantity * item.ratePerSheet, 0
              ) || 0) - totalPaid
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PlywoodSlug;
