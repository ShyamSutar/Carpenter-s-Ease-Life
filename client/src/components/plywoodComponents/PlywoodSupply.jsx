import { useEffect, useState } from "react";
import { PlywoodSupplyCard } from "./PlywoodSupplyCard";
import { toast } from "react-toastify";
import axios from "axios";

const PlywoodSupply = () => {

      const [sites, setSites] = useState([])

      useEffect(()=>{
        (async()=>{
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSitesPlywood`,
              { withCredentials: true }
            );
      
            if(res.status === 200){
              setSites(res.data);
            }else{
              toast.error(res.data.message)
            }

          } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
          }
        })();
      }, [])
      
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#ED2A4F]">Mistries Connected to You</h2>
      <PlywoodSupplyCard sites={sites} />
    </div>
  )
}

export default PlywoodSupply