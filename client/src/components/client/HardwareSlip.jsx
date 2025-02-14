import { useState } from "react";
import PaymentModel from "./PaymentModel";

const HardwareSlip = ({hd}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  
  const totalAmount = hd?.hardwareDetails?.reduce(
    (acc, item) => acc + item.quantity * item.ratePerUnit,
    0
  );

  const handlePayment = () => {
    // Here, you can handle the payment logic
    console.log("Paying amount: ₹", paymentAmount);
    setIsModalOpen(false); // Close modal after payment
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Sr No</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Rate Per Sheet</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {hd?.hardwareDetails?.map((item, index) => (
            <tr key={index} className="text-center border hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.itemName}</td>
              <td className="border px-4 py-2">{item.brand}</td>
              <td className="border px-4 py-2">{item.size}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.unit}</td>
              <td className="border px-4 py-2">{item.ratePerUnit}</td>
              <td className="border px-4 py-2">
                {item.quantity * item.ratePerUnit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-bold text-lg mt-3">
        Total Amount:{" "}
        <span className="text-green-600">
          ₹{totalAmount}
        </span>
      </div>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Pay {hd?.hardware?.username}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PaymentModel paymentAmount={paymentAmount} setPaymentAmount={setPaymentAmount} setIsModalOpen={setIsModalOpen} handlePayment={handlePayment}/>
      )}
    </div>
  )
}

export default HardwareSlip