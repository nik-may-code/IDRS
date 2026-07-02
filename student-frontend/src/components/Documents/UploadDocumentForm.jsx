import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

const categories = [
  "Journal",
  "Mini Project Report",
  "Presentation",
  "Notes",
  "Report",
  "Data",
  "Documentation",
];

const MAX_FILE_SIZE_MB = 10;

const UploadDocumentForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "PDF",
    category: "",
    uploadedBy: "",
    date: "",
    documentFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documentFile") {
      const file = files[0];
      if (file && file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
        alert(`File exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        return;
      }
      setFormData({ ...formData, documentFile: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.documentFile) {
      alert("Please select a document file to upload.");
      return;
    }
    if (!formData.category) {
      alert("Please select a category.");
      return;
    }

    onSubmit(formData); // Pass raw form data to parent
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-4">
        <button
          onClick={() => navigate("/logs")}
          type="button"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Listing</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-100 shadow-md rounded-2xl px-8 py-10 space-y-8 bg-white"
      >
        {/* Form fields same as you already wrote */}
        {/* Document Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-gray-700 focus:outline-none transition"
            placeholder="e.g. Advanced Algorithms Notes"
          />
        </div>

        {/* File Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-gray-700 focus:outline-none transition"
          >
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="PPTX">PPTX</option>
            <option value="TXT">TXT</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-gray-700 focus:outline-none transition"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Uploaded By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Uploaded By
          </label>
          <input
            type="text"
            name="uploadedBy"
            value={formData.uploadedBy}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-gray-700 focus:outline-none transition"
            placeholder="Your name or ID"
          />
        </div>

        {/* Upload Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-gray-700 focus:outline-none transition"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document File
          </label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="documentFile"
              className="cursor-pointer inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Choose File
            </label>
            <span className="text-sm text-gray-600">
              {formData.documentFile
                ? formData.documentFile.name
                : "No file selected"}
            </span>
          </div>
          <input
            type="file"
            id="documentFile"
            name="documentFile"
            accept=".pdf,.docx,.pptx,.txt"
            onChange={handleChange}
            required
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Upload Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocumentForm;
