import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import HardwareSupplyCard from "./HardwareSupplyCard";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const HardwareSupply = () => {

      const dispatch = useDispatch();
      const [sites, setSites] = useState([])

      useEffect(()=>{
        (async()=>{
          dispatch(toggle(true))
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSitesHardware`,
              { withCredentials: true }
            );
      
            if(res.status === 200){
              setSites(res.data);
              console.log(res.data)
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#ED2A4F]">Mistries Connected to You</h2>
      <HardwareSupplyCard sites={sites} />
    </div>
  )
}

export default HardwareSupply