import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DiscussionForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !details.trim()) {
      setError("Title and details are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const author = localStorage.getItem("user_name") || localStorage.getItem("user") || "Student User";
      await axios.post("http://localhost:5003/api/discussions/", { title, details, tags, author });
      navigate("/discussionpage");
    } catch (err) {
      console.error("Failed to post discussion:", err);
      setError("Failed to post discussion. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Start a New Discussion</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discussion Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter discussion title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
              <select
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="">Add relevant tags...</option>
                <option value="Tech">Tech</option>
                <option value="Alumni">Alumni</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Startup">Startup</option>
                <option value="Student Life">Student Life</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discussion Details <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Share your thoughts, questions, or ideas..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg h-32"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Link to="/discussionpage">
                <button
                  type="button"
                  className="p-2 px-6 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-200 hover:bg-blue-300 p-2 px-6 rounded-full disabled:opacity-50 transition-colors"
              >
                {submitting ? "Posting..." : "Post Discussion"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DiscussionForm;
