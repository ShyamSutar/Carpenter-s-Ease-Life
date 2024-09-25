import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillCreditCard } from "react-icons/ai";
import UpdateShowAttendance from "./UpdateShowAttendance";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteShowAttendance from "./DeleteShowAttendance";
import PayAttendanceList from "./PayAttendanceList";

const ShowAttendanceList = ({ carpenter, setRefresh }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const user = useSelector(state => state?.auth?.userData?._id)

  return (
    <>
      <div className={`relative w-64 sm:w-80 bg-slate-100 rounded-md shadow-md p-4 py-6 ${!show3?"hover:scale-105": ""}  transition-all`}>
          <div className="relative">
        <Link to={`/mistry/attendance/${carpenter.carpenter._id}`}>
            <h3 className="font-semibold">Name: {carpenter.carpenter.username}</h3>
            <h3 className="font-semibold">Email: {carpenter.carpenter.email}</h3>
            <h3 className="font-semibold">Since: {new Date(carpenter.carpenter.createdAt).toISOString().split('T')[0]}</h3>
            <h3 className="font-semibold">Pay: ₹{carpenter?.carpenter?.pay[user] || 600}</h3>
            <h3 className="font-bold">Total: ₹{carpenter?.carpenter?.totalAmount[user] || 0}</h3>
        </Link>
            <div className="absolute -top-3 right-0 text-xl">
              <div className="text-green-500" onClick={()=>setShow(true)}><FaEdit/></div>
            </div>

            <div className="absolute top-1/2 right-0 text-2xl">
              <div className="text-red-500" onClick={()=>setShow2(true)}><MdDelete/></div>
            </div>

            <div className="absolute bottom-0 right-0 text-2xl">
              <div className="text-gray-500" onClick={()=>setShow3(true)}><AiFillCreditCard/></div>
            </div>
          </div>


        <div className={`${!show ? 'hidden' : ''} w-full flex justify-center z-50 absolute top-0 left-0`}>
            <UpdateShowAttendance  setShow={setShow} carpenter={carpenter} setRefresh={setRefresh}/>
        </div>

        <div className={`${!show2 ? 'hidden' : ''} w-full flex justify-center z-50 absolute top-0 left-0`}>
            <DeleteShowAttendance  setShow2={setShow2} carpenter={carpenter} setRefresh={setRefresh}/>
        </div>

        <div className={`${!show3 ? 'hidden' : ''} w-full flex justify-center z-50 absolute top-0 left-0`}>
            <PayAttendanceList  setShow3={setShow3} carpenter={carpenter} setRefresh={setRefresh}/>
        </div>

      </div>
    </>
  );
};

export default ShowAttendanceList;
