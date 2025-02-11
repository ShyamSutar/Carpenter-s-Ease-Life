import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlywoodSlugSlip from "./PlywoodSlugSlip";

const PlywoodSlug = () => {
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
            try {
                const siteResponse = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
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
                    `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchPlywoodDetails/${id}`,
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
                `${import.meta.env.VITE_BASE_URL}/api/v1/site/addPlywoodDetails`,
                { ...formData, siteId: id },
                { withCredentials: true }
            );
            console.log("Plywood added:", response.data);
        } catch (error) {
            console.error("Error adding plywood:", error);
        } finally{
            setRefresh(prev=>!prev);
        }
    };

    return (
        <div className="mt-24 p-4">
            <h1 className="text-2xl font-bold mb-4">{site.siteName}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input type="text" name="plywoodType" placeholder="Plywood Type" value={formData.plywoodType} onChange={handleChange} className="border p-2 w-full" required />
                <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="border p-2 w-full" required />
                <input type="number" name="thickness" placeholder="Thickness (mm)" value={formData.thickness} onChange={handleChange} className="border p-2 w-full" required />
                <input type="text" name="size" placeholder="Size" value={formData.size} onChange={handleChange} className="border p-2 w-full" required />
                <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="border p-2 w-full" required />
                <input type="number" name="ratePerSheet" placeholder="Rate per Sheet" value={formData.ratePerSheet} onChange={handleChange} className="border p-2 w-full" required />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Submit</button>
            </form>

            <div><PlywoodSlugSlip data={data} id={id}/></div>
        </div>
    );
};

export default PlywoodSlug;
