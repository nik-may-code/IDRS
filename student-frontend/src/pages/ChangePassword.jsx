import React, { useState } from "react";
import { useAlert } from "../components/AlertContext";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Layout from "../components/Layout";

const ChangePassword = () => {
  const { showAlert } = useAlert();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const email = localStorage.getItem("student_email");
      const res = await axios.post("/api/auth/changepassword", {
        email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      if (res.data.success) {
        setSuccess("Password changed successfully!");
        showAlert("Password changed successfully", "success");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setError(res.data.message || "Failed to change password.");
        showAlert(res.data.message || "Password change failed", "error");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Please try again later."
      );
      showAlert(
        err.response?.data?.message || "Password change failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-md w-full max-w-xl mt-10"
        >
          <h1 className="text-3xl font-bold mb-8 text-zinc-900">
            Change Password
          </h1>

          {/* Current Password */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={show.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter  your current password"
                className="w-full px-4 py-3 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                onClick={() => toggleShow("current")}
                tabIndex={-1}
              >
                {show.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-zinc-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter  your new password"
                className="w-full px-4 py-3 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                onClick={() => toggleShow("new")}
                tabIndex={-1}
              >
                {show.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm  your new password"
                className="w-full px-4 py-3 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                onClick={() => toggleShow("confirm")}
                tabIndex={-1}
              >
                {show.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 mb-4 font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-600 mb-4 font-medium">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 text-white font-semibold py-3 rounded-full transition hover:opacity-90 disabled:bg-zinc-400"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
