import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlywoodSlip from "./PlywoodSlip";
import HardwareSlip from "./HardwareSlip";
import PaymentModel from "./PaymentModel";
import { toast } from "react-toastify";
import { toggle } from "../../store/hiddenSlice";

const ClientSlug = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const [site, setSite] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    (async () => {
      dispatch(toggle(true))
      try {
        const site = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
          { withCredentials: true }
        );
        setSite(site.data);
      } catch (error) {
        console.log(error);
      } finally{
        dispatch(toggle(false))
      }
    })();
  }, [id, refresh]);

  const handleMistryPayment = () => {
    setIsModalOpen(true);
  };

  const handlePayment = async() => {
    // Here, you can handle the payment logic
    try {
      dispatch(toggle(true))
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/paymentMistry`,
        {id, amount: paymentAmount},
        { withCredentials: true }
      );

      if(res.status === 200){
        toast.success(res.data.message);
        setRefresh(prev=>!prev)
      }else{
        toast.error(res.data.message)
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
    } finally{
      dispatch(toggle(false))
    }

    setPaymentAmount("");
    setIsModalOpen(false); // Close modal after payment
  };

  const totalGrandTotalPlywood = site?.plywood?.reduce((total, item) => {
    return (
      total +
      item.plywoodDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerSheet,
        0
      )
    );
  }, 0);

  const totalGrandTotalHardware = site?.hardware?.reduce((total, item) => {
    return (
      total +
      item.hardwareDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerUnit,
        0
      )
    );
  }, 0);

  const totalAmount = totalGrandTotalPlywood + totalGrandTotalHardware;
  const carpenterProfit = (totalAmount * site?.profitPercentage) / 100;

  const amountPaid = site?.paid.reduce((acc, paid) => acc + Number(paid.amount), 0);

  return (
    <div className="mt-24 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="border-2 border-[#ED2A4F] p-6 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-bold text-[#ED2A4F]">Site Details</h1>
        <h3 className="text-lg font-semibold mt-2">
          Site Name: {site?.siteName}
        </h3>
        <h3 className="text-lg font-semibold">Location: {site?.location}</h3>
        <h3 className="text-lg font-semibold">
          Mistry: {site?.mistry?.username}
        </h3>
        <h3 className="text-lg font-semibold">
          Mistry Email: {site?.mistry?.email}
        </h3>
        <h3 className="text-lg font-semibold">
          Mistry Contact: {site?.mistry?.phone}
        </h3>
      </div>

      {/* Plywood Details */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold border-b pb-2 mb-4">
          Plywood Details
        </h3>
        {site?.plywood?.map((ply) => (
          <div
            key={ply._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-blue-600">
              {ply?.plywood?.username}
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              📧 {ply?.plywood?.email} | 📞 {ply?.plywood?.phone}
            </p>
            <PlywoodSlip ply={ply} id={id} setRefresh={setRefresh} />
          </div>
        ))}
      </div>

      {/* Hardware Details */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold border-b pb-2 mb-4">
          Hardware Details
        </h3>
        {site?.hardware?.map((hardware) => (
          <div
            key={hardware._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-blue-600">
              {hardware?.hardware?.username}
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              📧 {hardware?.hardware?.email} | 📞 {hardware?.hardware?.phone}
            </p>
            <HardwareSlip hd={hardware} id={id} setRefresh={setRefresh} />
          </div>
        ))}
      </div>

      {/* Carpenter's Profit Calculation */}
      <div className="mt-6 border-t-2 pt-4">
        <h2 className="text-xl font-bold text-right pr-4 text-[#ED2A4F]">
          Total of All Grand Totals: ₹{totalAmount}
        </h2>

        <div className="flex items-center justify-end pr-4 mt-2">
          <label className="font-semibold mr-2">
            Profit : {site?.profitPercentage}
          </label>
        </div>

        <h2 className="text-lg font-semibold text-right pr-4 mt-2 text-[#ED2A4F]">
          Carpenter&apos;s Profit: ₹{Math.round(carpenterProfit)}
        </h2>
        <div className="text-right font-bold text-lg mt-3">
          Amount Paid: <span className="text-green-600">₹{amountPaid}</span>
        </div>
        <div className="text-right font-bold text-lg mt-3">
          Amount Remaing:{" "}
          <span className="text-green-600">₹{Math.round(carpenterProfit - amountPaid)}</span>
        </div>
        <div className="text-right pr-4 mt-2">
          <button
            className=" bg-gray-200 px-4 py-2 rounded"
            onClick={handleMistryPayment}
          >
            Pay {site?.mistry?.username}
          </button>
        </div>

        

      </div>
      {/* Modal */}
      {isModalOpen && (
        <PaymentModel
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          setIsModalOpen={setIsModalOpen}
          handlePayment={handlePayment}
          maxAmount={carpenterProfit - amountPaid}
        />
      )}
    </div>
  );
};

export default ClientSlug;
