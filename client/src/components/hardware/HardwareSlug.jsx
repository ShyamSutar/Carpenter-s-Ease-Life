import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HardwareSlugSlip from "./HardwareSlugSlip";

const HardwareSlug = () => {
  const { id } = useParams();
  const [site, setSite] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "", brand: "", size: "", quantity: "", unit: "", ratePerUnit: "",
  });

  useEffect(() => {
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
      }
    })();
  }, [id, refresh]);

  useEffect(() => {
    (async () => {
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
      }
    })();
  }, [id, refresh]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/addHardwareDetails`,
        { ...formData, siteId: id },
        { withCredentials: true }
      );
      console.log("Hardware added:", response.data);
    } catch (error) {
      console.error("Error adding plywood:", error);
    } finally {
      setRefresh((prev) => !prev);
    }
  };

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

      <div><HardwareSlugSlip data={data} id={id}/></div>
    </div>
  );
};

export default HardwareSlug;
