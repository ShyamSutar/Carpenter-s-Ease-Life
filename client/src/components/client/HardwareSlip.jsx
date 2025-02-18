import React, { useState } from "react";
import PaymentModel from "./PaymentModel";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import { FiTool, FiDollarSign, FiCalendar, FiArrowRight } from "react-icons/fi";

const HardwareSlip = ({hd, id, setRefresh}) => {

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [currentId, setCurrentId] = useState('');
  
  const totalAmount = hd?.hardwareDetails?.reduce(
    (acc, item) => acc + item.quantity * item.ratePerUnit,
    0
  );

  const amountPaid = hd.paid.reduce((acc, paid) => acc + Number(paid.amount), 0);

  const handleHardwarePayment = (id) => {
    setIsModalOpen(true);
    setCurrentId(id)
  }

  

  const handlePayment = async() => {
    dispatch(toggle(true))
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/paymentHardware`,
          {id, amount: paymentAmount, hardwareId: currentId},
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

    setIsModalOpen(false); // Close modal after payment
  };

  const totalPaid = hd?.paid?.reduce((acc, payment) => acc + Number(payment.amount), 0);

    // Helper function to format numbers with commas
    const formatNumber = (num) =>
      Number(num).toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <FiTool className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Hardware Details</h3>
      </div>

      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Item Name', 'Brand', 'Size', 'Qty', 'Unit', 'Rate/Unit', 'Total'].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hd?.hardwareDetails?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.itemName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.brand}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">{formatNumber(item.quantity)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 uppercase">{item.unit}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">
                    ₹{formatNumber(item.ratePerUnit)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    ₹{formatNumber(item.quantity * item.ratePerUnit)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td colSpan="7" className="px-4 py-3 text-sm text-gray-900 text-right">
                  Grand Total
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  ₹{formatNumber(totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => handleHardwarePayment(hd.hardware._id)}
        className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
      >
        <div className="flex items-center gap-2">
          <FiDollarSign className="w-4 h-4" />
          <span>Pay {hd?.hardware?.username}</span>
          <FiArrowRight className="w-4 h-4" />
        </div>
      </button>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-xl py-4 px-2 md:p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiCalendar className="w-5 h-5 text-green-600" />
          Payment History
        </h3>
        <PaymentTable payments={hd?.paid} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <SummaryCard 
            label="Total Paid" 
            value={`₹${totalPaid}`}
            icon={<FiDollarSign className="w-5 h-5 text-green-600" />}
          />
          <SummaryCard 
            label="Remaining Balance"
            value={`₹${formatNumber(totalAmount - totalPaid)}`}
            icon={<FiDollarSign className="w-5 h-5 text-red-600" />}
            highlight
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PaymentModel
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          setIsModalOpen={setIsModalOpen}
          handlePayment={handlePayment}
          maxAmount={totalAmount - amountPaid}
        />
      )}
    </div>
  )
}

export default HardwareSlip

const PaymentTable = ({ payments }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {payments?.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(payment.paidDate).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                ₹{payment.amount}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="px-4 py-4 text-center text-gray-500">
              No payment records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const SummaryCard = ({ label, value, icon, highlight = false }) => (
  <div className={`p-4 rounded-lg ${highlight ? 'bg-red-50 border border-red-200' : 'bg-white border border-gray-200'}`}>
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <div className={`text-xl font-semibold ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
          {value}
        </div>
      </div>
      <div className={`p-2 rounded-lg ${highlight ? 'bg-red-100' : 'bg-gray-100'}`}>
        {React.cloneElement(icon, { className: `w-5 h-5 ${highlight ? 'text-red-600' : 'text-gray-600'}` })}
      </div>
    </div>
  </div>
);
