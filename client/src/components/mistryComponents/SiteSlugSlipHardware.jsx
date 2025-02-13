const SiteSlugSlipHardware = ({data}) => {
    // console.log(data)
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
          {data?.map((item, index) => (
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
          <tr className="bg-gray-300 font-semibold">
            <td colSpan="7" className="border px-4 py-2 text-right">
              Grand Total:
            </td>
            <td className="border px-4 py-2 text-center">
              {data?.reduce(
                (acc, item) => acc + item.quantity * item.ratePerUnit,
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SiteSlugSlipHardware