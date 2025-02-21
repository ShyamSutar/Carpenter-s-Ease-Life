import { useEffect, useState } from "react";
import { PlywoodSupplyCard } from "./PlywoodSupplyCard";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const PlywoodSupply = () => {

      const dispatch = useDispatch();
      const [sites, setSites] = useState([])

      useEffect(()=>{
        (async()=>{
          dispatch(toggle(true))
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
          } finally{
            dispatch(toggle(false))
          }
        })();
      }, [])
      
  return (
    <div className="mt-24 min-h-screen p-2 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Mistries Connected to You</h2>
      <PlywoodSupplyCard sites={sites} />
    </div>
  )
}

export default PlywoodSupply