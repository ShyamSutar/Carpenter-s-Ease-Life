import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ShowAttendanceList = ({ carpenter, setShow }) => {
  return (
    <>
      <div className="w-64 sm:w-80 bg-slate-100 rounded-md shadow-md p-4 py-6 hover:scale-105 transition-all">
          <div className="relative">
        <Link to={`/mistry/attendance/${carpenter.carpenter._id}`}>
            <h3 className="font-semibold">Name: {carpenter.carpenter.username}</h3>
            <h3 className="font-semibold">Email: {carpenter.carpenter.email}</h3>
            <h3 className="font-semibold">Since: {new Date(carpenter.carpenter.createdAt).toISOString().split('T')[0]}</h3>
            <h3 className="font-semibold">Pay: ₹600</h3>
            <h3 className="font-bold">Total: ₹42000</h3>
        </Link>
            <div className="absolute -top-3 right-0 text-xl">
              <div className="text-green-500" onClick={()=>setShow(true)}><FaEdit/></div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ShowAttendanceList;
