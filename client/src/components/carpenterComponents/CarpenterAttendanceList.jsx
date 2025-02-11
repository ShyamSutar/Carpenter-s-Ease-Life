import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CalendarIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const CarpenterAttendanceList = ({ mistry }) => {
  const user = mistry.mistry._id;
  const firstLetter = mistry.mistry.username.charAt(0).toUpperCase();
  const sinceDate = new Date(mistry.mistry.createdAt).toISOString().split("T")[0];

  return (
    <div className="w-80">
      <div className="relative w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-[#ED2A4F] flex flex-col items-center transition-all hover:shadow-lg hover:scale-105 overflow-hidden">
        {/* Navigation Icon */}
        <Link
          to={`/carpenter/attendance/${mistry.mistry._id}`}
          className="absolute top-3 right-3 text-[#ED2A4F] hover:text-red-400 transition text-xl"
        >
          <FaArrowRight />
        </Link>

        {/* Avatar */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#ED2A4F] text-white text-2xl font-bold mb-3 shadow-md">
          {firstLetter}
        </div>

        {/* Carpenter Details */}
        <h3 className="font-bold text-lg text-[#ED2A4F]">{mistry.mistry.username}</h3>

        <div className="flex flex-col items-start mt-2 text-gray-700 text-sm w-full px-4">
          <p className="flex items-center">
            <EnvelopeIcon className="w-4 h-4 mr-2 text-[#ED2A4F]" /> {mistry.mistry.email}
          </p>
          <p className="flex items-center mt-1">
            <PhoneIcon className="w-4 h-4 mr-2 text-[#ED2A4F]" /> {mistry.mistry.phone || "N/A"}
          </p>
          <p className="flex items-center mt-1">
            <CalendarIcon className="w-4 h-4 mr-2 text-[#ED2A4F]" /> Since: {sinceDate}
          </p>
        </div>

        {/* Pay Details */}
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-gray-900">Pay: ₹{mistry?.carpenter?.pay[user] || 600}</h3>
          <h3 className="font-bold text-gray-900">Total: ₹{mistry?.carpenter?.totalAmount[user] || 0}</h3>
        </div>
      </div>
    </div>
  );
};

export default CarpenterAttendanceList;
