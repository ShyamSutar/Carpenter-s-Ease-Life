import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggle } from "../../store/hiddenSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for Profile Settings validation
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

// Zod schema for Password Update validation
const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Current password must be at least 6 characters long"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
  confirmNewPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters long"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  // React Hook Form for Profile Settings
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  // React Hook Form for Password Update
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`,
          { withCredentials: true }
        );

        const { name, email, phone, role } = res.data;
        setUser({ name: name || "", email: email || "", phone: phone || "", role: role || "" });

        // Set default values for the form
        setProfileValue("name", name || "");
        setProfileValue("phone", phone || "");
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      } finally {
        dispatch(toggle(false));
      }
    })();
  }, []);

  const handleSave = async (data) => {
    dispatch(toggle(true));
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/updateUser`,
        data,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(toggle(false));
    }
  };

  const handleChangePassword = async (data) => {
    dispatch(toggle(true));
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/changePassword`,
        { oldPassword: data.oldPassword, newPassword: data.newPassword },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        resetPasswordForm();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(toggle(false));
    }
  };

  const handleDelete = async () => {
    dispatch(toggle(true));
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/deleteUser`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      dispatch(toggle(false));
      setShowDeleteModal(false);
      window.location.href = "/";
    }
  };

  const DeleteConfirmationModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Delete Account
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete your account? This action cannot be
            undone. All of your data will be permanently removed.
          </p>
          <div className="mt-4 flex gap-2 justify-end">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
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
          <form onSubmit={handleProfileSubmit(handleSave)}>
            {Object.entries(user).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  disabled={key === "role" || key === "email"}
                  {...(key === "name" || key === "phone" ? profileRegister(key) : {})}
                  className={`w-full px-3 py-2 rounded-md border ${
                    key === "role" || key === "email"
                      ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                      : profileErrors[key]
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-myRed focus:ring-myRed"
                  } outline-none transition-colors`}
                />
                {profileErrors[key] && (
                  <p className="text-red-500 text-sm mt-1">{profileErrors[key]?.message}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-myRed text-white rounded-md hover:bg-red-600 transition-colors font-medium"
            >
              Save Changes
            </button>
          </form>
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
        <div className="px-6 pb-6">
          <form onSubmit={handlePasswordSubmit(handleChangePassword)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                {...passwordRegister("oldPassword")}
                className={`w-full px-3 py-2 rounded-md border ${
                  passwordErrors.oldPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-myRed focus:ring-myRed"
                } outline-none transition-colors`}
              />
              {passwordErrors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.oldPassword.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                {...passwordRegister("newPassword")}
                className={`w-full px-3 py-2 rounded-md border ${
                  passwordErrors.newPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-myRed focus:ring-myRed"
                } outline-none transition-colors`}
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                {...passwordRegister("confirmNewPassword")}
                className={`w-full px-3 py-2 rounded-md border ${
                  passwordErrors.confirmNewPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-myRed focus:ring-myRed"
                } outline-none transition-colors`}
              />
              {passwordErrors.confirmNewPassword && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmNewPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium"
            >
              Update Password
            </button>
          </form>
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
