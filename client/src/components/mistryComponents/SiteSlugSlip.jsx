const SiteSlugSlip = ({ data }) => {
  // Helper function to format numbers with commas
  const formatNumber = (num) => 
    Number(num).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Brand</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Thickness</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Size</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Rate/Sheet</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.plywoodType}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.brand}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.thickness}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.size}</td>
                <td className="px-4 py-3 text-sm text-gray-600 text-right">{formatNumber(item.quantity)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 text-right">₹{formatNumber(item.ratePerSheet)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium text-right">
                  ₹{formatNumber(item.quantity * item.ratePerSheet)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan="7" className="px-4 py-3 text-sm text-gray-900 text-right">
                Grand Total
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right">
                ₹{formatNumber(data?.reduce(
                  (acc, item) => acc + item.quantity * item.ratePerSheet, 0
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiteSlugSlip;