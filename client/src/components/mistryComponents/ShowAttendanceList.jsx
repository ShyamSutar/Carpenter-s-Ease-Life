import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import UpdateShowAttendance from "./UpdateShowAttendance";
import { useState } from "react";

const ShowAttendanceList = ({ carpenter, setRefresh }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="relative w-64 sm:w-80 bg-slate-100 rounded-md shadow-md p-4 py-6 hover:scale-105 transition-all">
          <div className="relative">
        <Link to={`/mistry/attendance/${carpenter.carpenter._id}`}>
            <h3 className="font-semibold">Name: {carpenter.carpenter.username}</h3>
            <h3 className="font-semibold">Email: {carpenter.carpenter.email}</h3>
            <h3 className="font-semibold">Since: {new Date(carpenter.carpenter.createdAt).toISOString().split('T')[0]}</h3>
            <h3 className="font-semibold">Pay: ₹{carpenter.carpenter.pay}</h3>
            <h3 className="font-bold">Total: ₹{carpenter?.carpenter?.totalAmount || 0}</h3>
        </Link>
            <div className="absolute -top-3 right-0 text-xl">
              <div className="text-green-500" onClick={()=>setShow(true)}><FaEdit/></div>
            </div>
          </div>


        <div className={`${!show ? 'hidden' : ''} w-full flex justify-center z-50 absolute top-0 left-0`}>
            <UpdateShowAttendance  setShow={setShow} carpenter={carpenter} setRefresh={setRefresh}/>
        </div>

      </div>
    </>
  );
};

export default ShowAttendanceList;
