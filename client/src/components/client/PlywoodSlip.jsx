import { useState } from 'react';
import PaymentModel from './PaymentModel';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";

const PlywoodSlip = ({ ply, id, setRefresh }) => {

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [currentId, setCurrentId] = useState('');
  

  const totalAmount = ply?.plywoodDetails?.reduce(
    (acc, item) => acc + item.quantity * item.ratePerSheet,
    0
  );
  
  const amountPaid = ply.paid.reduce((acc, paid) => acc + Number(paid.amount), 0);
  
  const handlePlywoodPayment = (id) => {
    setIsModalOpen(true);
    setCurrentId(id)
  }


  const handlePayment = async() => {
    dispatch(toggle(true))
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/paymentPlywood`,
        {id, amount: paymentAmount, plywoodId: currentId},
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

  const totalPaid = ply?.paid?.reduce((acc, payment) => acc + Number(payment.amount), 0);

  return (
    <div className="border-t pt-2 mt-2">
      <h5 className="text-md font-semibold mb-2 text-gray-700">
        Plywood Supplied:
      </h5>
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Sr No</th>
            <th className="border px-4 py-2">Plywood Type</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Thickness</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Rate Per Sheet</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {ply?.plywoodDetails?.map((item, index) => (
            <tr
              key={index}
              className="text-center border bg-gray-100 hover:bg-gray-50"
            >
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.plywoodType}</td>
              <td className="border px-4 py-2">{item.brand}</td>
              <td className="border px-4 py-2">{item.thickness}</td>
              <td className="border px-4 py-2">{item.size}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.ratePerSheet}</td>
              <td className="border px-4 py-2">
                {item.quantity * item.ratePerSheet}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-300 font-semibold">
            <td colSpan="7" className="border px-4 py-2 text-right">
              Grand Total:
            </td>
            <td className="border px-4 py-2 text-center">
              ₹{totalAmount}
            </td>
          </tr>
        </tbody>
      </table>

      
      <div>
        <button
          onClick={()=>handlePlywoodPayment(ply.plywood._id)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Pay {ply?.plywood?.username}
        </button>
      </div>

            {/* Payment Slip Section */}
            <div className="mt-6 p-6 border-2 border-gray-300 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-[#ED2A4F]">Payment Slip</h2>
        <div className="mt-4">
          {ply?.paid?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Amount Paid
                  </th>
                </tr>
              </thead>
              <tbody>
                {ply?.paid?.map((payment) => (
                  <tr key={payment._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(payment.paidDate).toLocaleString("en-US", {
                        weekday: "short", // Full name of the day
                        year: "numeric",
                        month: "short", // Full month name
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true, // 12-hour clock
                      })}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₹{payment.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center">No payments made yet.</p>
          )}
        </div>
        <h2 className="mt-4 text-lg font-bold text-right text-[#ED2A4F]">
          Total Paid: ₹{totalPaid}
        </h2>
        <h2 className="text-lg font-bold text-right text-[#ED2A4F]">
            Remaining Balance: ₹
            {(ply?.plywoodDetails?.reduce((total, item) => total + item.quantity * item.ratePerSheet, 0) || 0)-totalPaid}
        </h2>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PaymentModel paymentAmount={paymentAmount} setPaymentAmount={setPaymentAmount} setIsModalOpen={setIsModalOpen} handlePayment={handlePayment} maxAmount={totalAmount-amountPaid}/>
      )}
    </div>
  );
};

export default PlywoodSlip;
