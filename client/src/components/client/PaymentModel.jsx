const PaymentModel = ({
  paymentAmount,
  setPaymentAmount,
  setIsModalOpen,
  handlePayment,
  maxAmount,
}) => {

    const handleClose = () => {
        setIsModalOpen(false)
        setPaymentAmount("")
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Enter Payment Amount</h3>
        {/* <h4 className="text-sm font-semibold text-red-500 mb-4">Amount less than equal to {maxAmount}</h4> */}
        <div className="mb-4">
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Amount to pay"
            value={paymentAmount}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === "" || Number(newValue) <= maxAmount) {
                setPaymentAmount(newValue);
              }
            }}
            max= {maxAmount}
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Pay {paymentAmount && `₹${paymentAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModel;
