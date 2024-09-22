import { Link } from "react-router-dom";

const CarpenterAttendanceList = ({ mistry }) => {
  const user = mistry.mistry._id
  return (
    <>
      <div className="w-64 sm:w-80 bg-slate-100 rounded-md shadow-md p-4 py-6 hover:scale-105 transition-all">
        <Link to={`/carpenter/attendance/${mistry.mistry._id}`}>
          <div>
            <h3 className="font-semibold">Name: {mistry.mistry.username}</h3>
            <h3 className="font-semibold">Email: {mistry.mistry.email}</h3>
            <h3 className="font-semibold">Since: {new Date(mistry.mistry.createdAt).toISOString().split('T')[0]}</h3>
            <h3 className="font-semibold">Pay: ₹{mistry?.carpenter?.pay[user] || 600}</h3>
            <h3 className="font-bold">Total: ₹{mistry?.carpenter?.totalAmount[user] || 0}</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CarpenterAttendanceList;
