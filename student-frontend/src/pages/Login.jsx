import React, { useState } from "react";
import { useAlert } from "../components/AlertContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // Basic frontend validation
    if (!email || !password) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token); // ✅ Save token
        localStorage.setItem("user", data.user.name); // Save user info
        localStorage.setItem("email", data.user.email);
        showAlert("Logged in successfully", "success");
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
        showAlert(data.message || "Login failed: Invalid credentials", "error");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password");
        showAlert(
          err.response.data.message || "Login failed: Invalid credentials",
          "error"
        );
      } else {
        setError("Network or server error. Please try again later.");
        showAlert("Network error. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9fbfc] text-gray-800 relative px-4">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full border-b border-gray-300 bg-white p-4 text-sm font-semibold flex justify-between items-center">
        <span>IDRS Student Portal</span>
        <a href="http://localhost:3000" className="text-gray-500 hover:text-blue-600 transition-colors font-normal text-xs flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portal Selection
        </a>
      </div>

      {/* Form Content */}
      <div className="mt-24 w-full max-w-md text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-8">
          Welcome to IDRS Student Portal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="email"
            name="email"
            placeholder="Enter institutional email"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <div className="text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-3 rounded-full transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          Your data is protected by our security measures.
        </p>

        <div className="mt-12 text-xs text-gray-500 text-center space-y-2">
          <p>© 2024 Institute Data Retrieval System</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
