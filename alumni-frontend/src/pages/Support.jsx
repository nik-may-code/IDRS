import React, { useState } from "react";
import Layout from "../components/Layout";

const Support = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    
    // Simulate sending support request
    setStatus("Support request submitted successfully! Our team will contact you shortly.");
    setFormData({ subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Help & Support</h1>
        <p className="text-gray-600 mb-8">
          Having trouble? Send us a message and our support team will get back to you as soon as possible.
        </p>

        {status && (
          <div className={`p-4 mb-6 rounded ${status.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {status}
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded focus:ring-blue-500"
              >
                <option value="">Select a topic...</option>
                <option value="account">Account Issues</option>
                <option value="events">Events & Ticketing</option>
                <option value="jobs">Job Postings</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="5" 
                className="w-full px-4 py-2 border rounded focus:ring-blue-500" 
                placeholder="Describe your issue in detail..."
              ></textarea>
            </div>
            
            <div>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                Submit Request
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Contact Admin</h3>
            <p className="text-blue-700">Email: alumni-support@kitsw.ac.in</p>
            <p className="text-blue-700">Phone: +91 800 123 4567</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">FAQ</h3>
            <p className="text-gray-600 text-sm">
              <strong>How do I reset my password?</strong><br/>
              Go to the Settings page and enter your current password along with a new one.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
