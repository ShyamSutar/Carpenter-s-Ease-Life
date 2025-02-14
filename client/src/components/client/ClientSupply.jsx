import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ClientSupplyCard from "./ClientSupplyCard";

const ClientSupply = () => {

      const [sites, setSites] = useState([])

      useEffect(()=>{
        (async()=>{
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSitesClient`,
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
      <ClientSupplyCard sites={sites} />
    </div>
  )
}

export default ClientSupply