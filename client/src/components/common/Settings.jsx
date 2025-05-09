import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggle } from "../../store/hiddenSlice";
import * as Yup from "yup";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/getUser`,
          { withCredentials: true }
        );

        const { name, email, phone, role } = res.data;

        setUser({
          name: name || "",
          email: email || "",
          phone: phone || "",
          role: role || "",
        });
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      } finally {
        dispatch(toggle(false));
      }
    })();
  }, []);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
  });

  const handleSave = async () => {
    dispatch(toggle(true));
    try {
      await validationSchema.validate(user, { abortEarly: false });
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/updateUser`,
        { ...user },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        const errorMessage =
          err.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    } finally {
      dispatch(toggle(false));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(toggle(true));
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/changePassword`,
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
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
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
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
          <h2 className="text-xl font-semibold text-gray-900">
            Profile Settings
          </h2>
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
                disabled={key === "role" || key === "email"}
                className={`w-full px-3 py-2 rounded-md border ${
                  key === "role" || key === "email"
                    ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                    : "border-gray-300 focus:border-myRed focus:ring-1 focus:ring-myRed"
                } outline-none transition-colors`}
              />
              {errors[key] && (
                <div className="mt-2 flex items-center gap-2 bg-red-100 text-red-600 text-sm rounded-md px-3 py-2 border border-red-300 dark:bg-red-400/10 dark:text-red-400">
                  <span>{errors[key]}</span>
                </div>
              )}
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
          <h2 className="text-xl font-semibold text-gray-900">
            Password Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your password to keep your account secure
          </p>
        </div>
        <form onSubmit={handleChangePassword} className="px-6 pb-6 space-y-4">
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
              required
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
              required
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
              required
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium"
          >
            Update Password
          </button>
        </form>
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
