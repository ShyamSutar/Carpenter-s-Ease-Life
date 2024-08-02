import { Link } from "react-router-dom";

const ShowAttendanceList = ({ carpenter }) => {
  return (
    <>
      <div className="w-64 sm:w-80 bg-slate-100 rounded-md shadow-md p-4 py-6 hover:scale-105 transition-all">
        <Link to={`/mistry/attendance/${carpenter.carpenter._id}`}>
          <div>
            <h3 className="font-semibold">Name: {carpenter.carpenter.username}</h3>
            <h3 className="font-semibold">Email: {carpenter.carpenter.email}</h3>
            <h3 className="font-semibold">Since: {new Date(carpenter.carpenter.createdAt).toISOString().split('T')[0]}</h3>
            <h3 className="font-bold">Total: ₹42000</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ShowAttendanceList;
