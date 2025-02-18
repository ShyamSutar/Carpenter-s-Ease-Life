import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddPlywoodModel from "./AddPlywoodModel";
import SiteSlugSlip from "./SiteSlugSlip";
import { toast } from "react-toastify";
import AddHardwareModel from "./AddHardwareModel";
import SiteSlugSlipHardware from "./SiteSlugSlipHardware";
import AddClientModel from "./AddClientModel";
import { useDispatch } from "react-redux";
import { toggle } from "../../store/hiddenSlice";
import { FiEdit, FiTrash2, FiPlus, FiUserPlus } from "react-icons/fi";

const SiteSlug = () => {
  const id = useParams().id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [site, setSite] = useState("");
  const [showPlywoodModel, setShowPlywoodModel] = useState(false);
  const [showHardwareModel, setShowHardwareModel] = useState(false);
  const [showClientModel, setShowClientModel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editModalDetails, setEditModalDetails] = useState({
    siteName: "",
    location: "",
  });

  useEffect(() => {
    (async () => {
      try {
        dispatch(toggle(true));
        const site = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/site/fetchSite/${id}`,
          { withCredentials: true }
        );
        setSite(site.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(toggle(false));
      }
    })();
  }, [id]);

  const handleAddPlywood = () => {
    setShowPlywoodModel(true);
  };

  const handleAddHardware = () => {
    setShowHardwareModel(true);
  };

  const handleAddClient = () => {
    setShowClientModel(true);
  };

  const totalGrandTotalPlywood = site?.plywood?.reduce((total, item) => {
    return (
      total +
      item.plywoodDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerSheet,
        0
      )
    );
  }, 0);

  const totalGrandTotalHardware = site?.hardware?.reduce((total, item) => {
    return (
      total +
      item.hardwareDetails.reduce(
        (acc, detail) => acc + detail.quantity * detail.ratePerUnit,
        0
      )
    );
  }, 0);

  const carpenterProfit =
    ((totalGrandTotalPlywood + totalGrandTotalHardware) *
      site.profitPercentage) /
    100;

  // const totalAmount = totalGrandTotalPlywood + totalGrandTotalHardware;
  const totalPaid = site?.paid?.reduce(
    (acc, payment) => acc + Number(payment.amount),
    0
  );
  const remainingBalance = Math.round(carpenterProfit - totalPaid);

  const handleDelete = async () => {
    dispatch(toggle(true));
    try {
      const site = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/deletePlywood/${id}`,
        { withCredentials: true }
      );
      toast.success(site.data.message);
      navigate("/mistry/site");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(toggle(false));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(toggle(true));
      const site = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/site/editPlywood/${id}`,
        {
          siteName: editModalDetails.siteName,
          location: editModalDetails.location,
        },
        { withCredentials: true }
      );
      toast.success(site.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setShowEditModal(false);
      dispatch(toggle(false));
    }
  };
  

  return (
    <div className="mt-24 p-6 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
          Site Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailItem label="Site Name" value={site.siteName} />
          <DetailItem label="Location" value={site.location} />
          <DetailItem
            label="Created At"
            value={new Date(site.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          <ActionButton icon={<FiPlus />} label="Plywood" onClick={handleAddPlywood} />
          <ActionButton icon={<FiPlus />} label="Hardware" onClick={handleAddHardware} />
          <ActionButton icon={<FiUserPlus />} label="Client" onClick={handleAddClient} />
          <ActionButton icon={<FiEdit />} label="Edit" onClick={() => setShowEditModal(true)} variant="blue" />
          <ActionButton icon={<FiTrash2 />} label="Delete" onClick={() => setShowDeleteModal(true)} variant="red" />
        </div>

      {/* Plywood List */}
      <div>
        {site?.plywood?.map((item) => (
          <div
            key={item.plywood._id}
            className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
              <h4 className="text-lg font-semibold text-blue-600">
                {item.plywood.username}
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                📧 {item.plywood.email} | 📞 {item.plywood.phone}
              </p>
            </div>

            <SiteSlugSlip data={item.plywoodDetails} />
          </div>
        ))}
      </div>

      {/* Hardware List */}
      <div>
        {site?.hardware?.map((item) => (
          <div
            key={item.hardware._id}
            className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
              <h4 className="text-lg font-semibold text-blue-600">
                {item.hardware.username}
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                📧 {item.hardware.email} | 📞 {item.hardware.phone}
              </p>
            </div>

            <SiteSlugSlipHardware data={item.hardwareDetails} />
          </div>
        ))}
      </div>

        {/* Payment Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mt-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">Payment Summary</h2>
          <PaymentTable payments={site.paid} />
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SummaryItem label="Total Paid" value={`₹${totalPaid}`} />
            <SummaryItem label="Remaining Balance" value={`₹${remainingBalance || 0}`} />
          </div>
        </div>

        {/* Profit Section */}
        <div className="bg-red-50 rounded-xl p-6 shadow-sm border border-red-200 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SummaryItem 
              label="Total Grand Total" 
              value={`₹${totalGrandTotalPlywood + totalGrandTotalHardware}`} 
              large
            />
            <SummaryItem 
              label={`Profit (${site.profitPercentage}%)`} 
              value={`₹${Math.round(carpenterProfit || 0)}`} 
              large
            />
          </div>
        </div>

      <div
        className={` ${
          !showPlywoodModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0 bg-gray-900 bg-opacity-50`}
      >
        <AddPlywoodModel
          setShowPlywoodModel={setShowPlywoodModel}
          site={site}
        />
      </div>

      <div
        className={` ${
          !showHardwareModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0 bg-gray-900 bg-opacity-50`}
      >
        <AddHardwareModel
          setShowHardwareModel={setShowHardwareModel}
          site={site}
        />
      </div>

      <div
        className={` ${
          !showClientModel ? "hidden" : ""
        } h-[90%] w-full flex justify-center z-50 fixed top-10 left-0 bg-gray-900 bg-opacity-50`}
      >
        <AddClientModel setShowClientModel={setShowClientModel} site={site} />
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold">
              Are you sure you want to delete?
            </h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Edit Site Details</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={editModalDetails.siteName}
                  onChange={(e) =>
                    setEditModalDetails({
                      ...editModalDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4 text-left">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editModalDetails.location}
                  onChange={(e) =>
                    setEditModalDetails({
                      ...editModalDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteSlug;

  // reusable componnent
  const DetailItem = ({ label, value }) => (
    <div className="space-y-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );

  const ActionButton = ({ icon, label, onClick, variant = 'red' }) => {
    const variants = {
      red: 'bg-red-600 hover:bg-red-700',
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
    };
    
    return (
      <button
        onClick={onClick}
        className={`${variants[variant]} text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors`}
      >
        {icon}
        <span >{label}</span>
      </button>
    );
  };

  const PaymentTable = ({ payments }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[200px]">Date</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments?.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(payment.paidDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">₹{payment.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-6 text-center text-gray-500">
                No payments recorded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
  const SummaryItem = ({ label, value, large = false }) => (
    <div className={`p-4 rounded-lg ${large ? 'bg-white shadow-sm border border-gray-200' : ''}`}>
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className={`${large ? 'text-2xl' : 'text-xl'} font-bold text-red-600`}>{value}</div>
    </div>
  );
