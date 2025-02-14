import { useState } from 'react';
import PaymentModel from './PaymentModel';
import axios from 'axios';
import { toast } from 'react-toastify';
const PlywoodSlip = ({ ply, id, setRefresh }) => {
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
    // Here, you can handle the payment logic
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
    }

    setPaymentAmount("");
    setIsModalOpen(false); // Close modal after payment
  };

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

      <div className="text-right font-bold text-lg mt-3">
        Amount Paid:{" "}
        <span className="text-green-600">
          ₹{amountPaid}
        </span>
      </div>
      <div className="text-right font-bold text-lg mt-3">
        Amount Remaing:{" "}
        <span className="text-green-600">
          ₹{totalAmount-amountPaid}
        </span>
      </div>
      
      <div>
        <button
          onClick={()=>handlePlywoodPayment(ply.plywood._id)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Pay {ply?.plywood?.username}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PaymentModel paymentAmount={paymentAmount} setPaymentAmount={setPaymentAmount} setIsModalOpen={setIsModalOpen} handlePayment={handlePayment} maxAmount={totalAmount-amountPaid}/>
      )}
    </div>
  );
};

export default PlywoodSlip;
