import React, { useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    role: "Carpenter",
    address: "123 Street, City",
  });
  
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Profile updated");
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    console.log("Password changed");
  };

  const DeleteConfirmationModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h3 className="text-xl font-semibold text-gray-900">Delete Account</h3>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete your account? This action cannot be undone.
            All of your data will be permanently removed.
          </p>
          <div className="mt-4 flex gap-2 justify-end">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Account deleted");
                setShowDeleteModal(false);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-24 max-w-3xl mx-auto p-6 space-y-8">
      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and account preferences
          </p>
        </div>
        <div className="px-6 pb-6">
          {Object.entries(user).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                disabled={key === "role"}
                className={`w-full px-3 py-2 rounded-md border ${
                  key === "role"
                    ? "bg-gray-50 text-gray-500"
                    : "border-gray-300 focus:border-myRed focus:ring-1 focus:ring-myRed"
                } outline-none transition-colors`}
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="w-full mt-4 px-4 py-2 bg-myRed text-white rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Password Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your password to keep your account secure
          </p>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
          <p className="mt-1 text-sm text-gray-500">
            Permanently delete your account and all associated data
          </p>
        </div>
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  );
};

export default Settings;