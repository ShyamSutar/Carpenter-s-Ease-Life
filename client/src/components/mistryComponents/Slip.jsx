import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SlipList from "./SlipList";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const Slip = () => {

    const [slips, setSlips] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
          try {
            dispatch(toggle(true))
            const slips = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/v1/slip/showSlipMistry`,
              { withCredentials: true }
            );
            setSlips(slips.data);
            dispatch(toggle(false))
          } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
            dispatch(toggle(false))
          }
        })();
      }, []);

  return (
    <div className="mt-28 ml-4 min-h-screen">
      <h1 className=" font-bold text-2xl">Salary Slips</h1>
      <div>
        {slips.length > 0 ? (slips.map((slip)=><SlipList key={slip._id} slip={slip}/>))
        :
        (<div className="mt-2 ml-3">No Slips...</div>)}
      </div>
    </div>
  )
}

export default Slip