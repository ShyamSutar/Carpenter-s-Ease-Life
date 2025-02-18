import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlywoodSlip from "./PlywoodSlip";
import HardwareSlip from "./HardwareSlip";
import PaymentModel from "./PaymentModel";
import { toast } from "react-toastify";
import { toggle } from "../../store/hiddenSlice";
import { FiInfo, FiBox, FiTool, FiDollarSign, FiCalendar, FiUser, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

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
<div className="mt-24 max-w-7xl pr-2 md:p-6 mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <FiInfo className="w-8 h-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-800">Site Overview</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem icon={<FiUser />} label="Site Name" value={site?.siteName} />
          <DetailItem icon={<FiMapPin />} label="Location" value={site?.location} />
          <DetailItem icon={<FiUser />} label="Mistry" value={site?.mistry?.username} />
          <DetailItem icon={<FiMail />} label="Email" value={site?.mistry?.email} />
          <DetailItem icon={<FiPhone />} label="Contact" value={site?.mistry?.phone} />
          <DetailItem icon={<FiCalendar />} label="Created At" 
            value={new Date(site?.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </div>
      </div>

      {/* Materials Section */}
      <div>
        {/* Plywood Details */}
        <div className="bg-white rounded-2xl py-4 md:p-6 shadow-lg border border-gray-100 mt-8 mb-3">
          <div className="flex items-center gap-3 mb-6">
            <FiBox className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Plywood Records</h3>
          </div>
          <div className="space-y-4">
            {site?.plywood?.map((ply) => (
              <div key={ply._id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FiUser className="text-gray-500" />
                  <h4 className="font-medium text-gray-800">{ply?.plywood?.username}</h4>
                </div>
                <p className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FiMail className="shrink-0" /> {ply?.plywood?.email}
                </p>
                <PlywoodSlip ply={ply} id={id} setRefresh={setRefresh} />
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Details */}
        <div className="bg-white rounded-2xl py-4 md:p-6 shadow-lg border border-gray-100 mt-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FiTool className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">Hardware Records</h3>
          </div>
          <div className="space-y-4">
            {site?.hardware?.map((hardware) => (
              <div key={hardware._id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FiUser className="text-gray-500" />
                  <h4 className="font-medium text-gray-800">{hardware?.hardware?.username}</h4>
                </div>
                <p className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FiMail className="shrink-0" /> {hardware?.hardware?.email}
                </p>
                <HardwareSlip hd={hardware} id={id} setRefresh={setRefresh} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 md:p-8 shadow-lg border border-red-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FiDollarSign className="w-6 h-6 text-red-600" />
          Financial Overview
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard 
            label="Total Project Value" 
            value={`₹${totalGrandTotalPlywood + totalGrandTotalHardware}`}
            icon={<FiBox className="w-5 h-5" />}
          />
          <SummaryCard 
            label={`Mistry Pay (${site?.profitPercentage}%)`}
            value={`₹${Math.round(carpenterProfit || 0)}`}
            icon={<FiDollarSign className="w-5 h-5" />}
          />
          <SummaryCard 
            label="Remaining Balance"
            value={`₹${Math.round(carpenterProfit - amountPaid) || 0}`}
            icon={<FiTool className="w-5 h-5" />}
            highlight
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <PaymentTable payments={site?.paid} />
          <button
            onClick={handleMistryPayment}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
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

 // Updated reusable components
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <div className="p-2 bg-white rounded-md shadow-sm border border-gray-200">
      {icon}
    </div>
    <div>
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-gray-900 font-medium mt-1">{value || '-'}</p>
    </div>
  </div>
);

const SummaryCard = ({ label, value, icon, highlight }) => (
  <div className={`p-5 rounded-xl ${highlight ? 'bg-red-600 text-white' : 'bg-white'} shadow-sm border ${highlight ? 'border-red-700' : 'border-gray-200'}`}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium mb-1">{label}</div>
        <div className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-gray-800'}`}>{value}</div>
      </div>
      <div className={`p-3 rounded-lg ${highlight ? 'bg-red-700' : 'bg-gray-100'}`}>
        {React.cloneElement(icon, { className: `w-5 h-5 ${highlight ? 'text-white' : 'text-gray-600'}` })}
      </div>
    </div>
  </div>
);

const PaymentTable = ({ payments }) => (
  <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-5 py-3 text-left text-sm font-medium text-gray-600">Payment Date</th>
          <th className="px-5 py-3 text-right text-sm font-medium text-gray-600">Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {payments?.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-3 text-sm text-gray-600">
                {new Date(payment.paidDate).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-5 py-3 text-right text-sm font-medium text-gray-900">
                ₹{payment.amount}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="px-5 py-4 text-center text-gray-500">
              No payment history found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
