import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ClientSupplyCard from "./ClientSupplyCard";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const ClientSupply = () => {

      const [sites, setSites] = useState([])
      const dispatch = useDispatch();  

      useEffect(()=>{
        (async()=>{
          dispatch(toggle(true))
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
          } finally{
            dispatch(toggle(false))
          }
        })();
      }, [])
      
  return (
    <div className="mt-24 h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Mistries Connected to You</h2>
      <ClientSupplyCard sites={sites} />
    </div>
  )
}

export default ClientSupply