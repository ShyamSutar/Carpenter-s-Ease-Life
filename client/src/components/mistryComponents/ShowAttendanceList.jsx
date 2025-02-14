import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import an icon for redirection
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillCreditCard } from "react-icons/ai";
import { PhoneIcon, EnvelopeIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateShowAttendance from "./UpdateShowAttendance";
import DeleteShowAttendance from "./DeleteShowAttendance";
import PayAttendanceList from "./PayAttendanceList";

const CarpenterCard = ({ carpenter, setRefresh }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const user = useSelector((state) => state?.auth?.userData?._id);


  // Get first letter for avatar
  const firstLetter = carpenter.carpenter.username.charAt(0).toUpperCase();

  // Format date (YYYY-MM-DD)
  const sinceDate = new Date(carpenter.carpenter.createdAt).toISOString().split("T")[0];

  return (
    <div className="w-80" >
      <div className="relative w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-[#ED2A4F] flex flex-col items-center transition-all hover:shadow-lg hover:scale-105 overflow-hidden">
      <Link 
          to={`/mistry/attendance/${carpenter.carpenter._id}`}
          className="absolute top-3 right-3 text-myRed hover:text-red-400 transition text-xl"
        >
          <FaArrowRight />
        </Link>
        {/* Avatar */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#ED2A4F] text-white text-2xl font-bold mb-3 shadow-md">
          {firstLetter}
        </div>

        {/* Carpenter Details */}
        <h3 className="font-bold text-lg text-[#ED2A4F]">{carpenter.carpenter.username}</h3>

        <div className="flex flex-col items-start mt-2 text-gray-700 text-sm w-full px-4">
          <p className="flex items-center">
            <EnvelopeIcon className="w-4 h-4 mr-2 text-[#ED2A4F]" />
            {carpenter.carpenter.email}
          </p>
          <p className="flex items-center mt-1">
            <PhoneIcon className="w-4 h-4 mr-2 text-[#ED2A4F]" />
            {carpenter.carpenter.phone || "N/A"}
          </p>
          <p className="flex items-center mt-1">
            <CalendarIcon className="w-4 h-4 mr-2 text-[#ED2A4F]" />
            Since: {sinceDate}
          </p>
        </div>

        {/* Pay Details */}
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-gray-900">Pay: ₹{carpenter?.carpenter?.pay[user] || 600}</h3>
          <h3 className="font-bold text-gray-900">Total: ₹{carpenter?.carpenter?.totalAmount[user] || 0}</h3>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-4">
          <button
            className="text-green-500 text-xl transition hover:scale-110 hover:text-green-600"
            onClick={(e) => {
              e.preventDefault();
              setShow(true);
            }}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 text-2xl transition hover:scale-110 hover:text-red-600"
            onClick={(e) => {
              e.preventDefault();
              setShow2(true);
            }}
          >
            <MdDelete />
          </button>
          <button
            className="text-gray-500 text-2xl transition hover:scale-110 hover:text-gray-600"
            onClick={(e) => {
              e.preventDefault();
              setShow3(true);
            }}
          >
            <AiFillCreditCard />
          </button>
        </div>

        {/* Modals */}
        {show && <UpdateShowAttendance setShow={setShow} carpenter={carpenter} setRefresh={setRefresh} />}
        {show2 && <DeleteShowAttendance setShow2={setShow2} carpenter={carpenter} setRefresh={setRefresh} />}
        {show3 && <PayAttendanceList setShow3={setShow3} carpenter={carpenter} setRefresh={setRefresh} />}
      </div>
    </div>
  );
};

export default CarpenterCard;
