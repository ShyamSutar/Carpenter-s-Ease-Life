const HardwareSlugSlip = ({ data }) => {

    // Format numbers with commas
    const formatNumber = (num) => 
      Number(num).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    // <div className="overflow-x-auto">
    //   <table className="min-w-full bg-white border border-gray-300 shadow-md">
    //     <thead>
    //       <tr className="bg-gray-200 text-gray-700">
    //         <th className="border px-4 py-2">Sr No</th>
    //         <th className="border px-4 py-2">Item Name</th>
    //         <th className="border px-4 py-2">Brand</th>
    //         <th className="border px-4 py-2">Size</th>
    //         <th className="border px-4 py-2">Quantity</th>
    //         <th className="border px-4 py-2">Unit</th>
    //         <th className="border px-4 py-2">Rate Per Unit</th>
    //         <th className="border px-4 py-2">Total</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.hardware?.[0]?.hardwareDetails?.map((item, index) => (
    //         <tr key={index} className="text-center border hover:bg-gray-100">
    //           <td className="border px-4 py-2">{index + 1}</td>
    //           <td className="border px-4 py-2">{item.itemName}</td>
    //           <td className="border px-4 py-2">{item.brand}</td>
    //           <td className="border px-4 py-2">{item.size}</td>
    //           <td className="border px-4 py-2">{item.quantity}</td>
    //           <td className="border px-4 py-2">{item.unit}</td>
    //           <td className="border px-4 py-2">{item.ratePerUnit}</td>
    //           <td className="border px-4 py-2">
    //             {item.quantity * item.ratePerUnit}
    //           </td>
    //         </tr>
    //       ))}
    //       <tr className="bg-gray-300 font-semibold">
    //         <td colSpan="7" className="border px-4 py-2 text-right">
    //           Grand Total:
    //         </td>
    //         <td className="border px-4 py-2 text-center">
    //           {data.hardware?.[0]?.hardwareDetails?.reduce(
    //             (acc, item) => acc + item.quantity * item.ratePerUnit,
    //             0
    //           )}
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>

    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Item Name</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Brand</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Size</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Unit</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Rate/Unit</th>
              <th className="px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider text-right">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.hardware?.[0]?.hardwareDetails?.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm text-gray-900 text-center">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium text-center">{item.itemName}</td>
                <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.brand}</td>
                <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.size}</td>
                <td className="px-4 py-3 text-sm text-gray-600 text-center">{formatNumber(item.quantity)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 uppercase text-center">{item.unit}</td>
                <td className="px-4 py-3 text-sm text-gray-600 text-center">₹{formatNumber(item.ratePerUnit)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium text-right">
                  ₹{formatNumber(item.quantity * item.ratePerUnit)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan="7" className="px-4 py-3 text-sm text-gray-900 text-right">
                Grand Total
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right">
                ₹{formatNumber(data.hardware?.[0]?.hardwareDetails?.reduce(
                  (acc, item) => acc + item.quantity * item.ratePerUnit, 0
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HardwareSlugSlip;
