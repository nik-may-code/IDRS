import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const userName = localStorage.getItem("user_name") || "Alumni User";

  // Fetch documents for the alumni module
  const fetchDocuments = async () => {
    try {
      // Assuming Alumni frontend also has a proxy or can hit port 5000 directly. 
      // We will proxy /api/documents to port 5000 in vite.config.js
      const response = await axios.get("/api/documents/all?moduleName=alumni");
      setDocuments(response.data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !docName) {
      setStatus("Please provide a name and select a file.");
      return;
    }

    setIsUploading(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("moduleName", "alumni");
      formData.append("documentName", docName);
      formData.append("uploadedBy", userName);
      formData.append("date", new Date().toISOString());

      await axios.post("/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("Document uploaded successfully!");
      setFile(null);
      setDocName("");
      fetchDocuments(); // Refresh the list
    } catch (error) {
      console.error("Upload error", error);
      setStatus(error.response?.data?.error || "Failed to upload document.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      await axios.delete(`/api/documents/${id}?moduleName=alumni`);
      fetchDocuments();
    } catch (error) {
      console.error("Delete error", error);
      setStatus("Failed to delete document.");
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Alumni Document Hub</h1>

        {status && (
          <div className={`p-4 mb-6 rounded ${status.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {status}
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 relative">
          {isUploading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <p className="font-semibold text-blue-600">Uploading to Central Microservice...</p>
            </div>
          )}
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload New Document</h2>
          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
              <input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g., Degree Certificate"
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-2 border rounded bg-gray-50 text-gray-700"
              />
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Upload
            </button>
          </form>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Available Documents</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Uploaded By</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">
                    No documents found.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{doc.documentName || doc.name}</td>
                    <td className="px-6 py-4 text-gray-600">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(doc.date || doc.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <a
                        href={doc.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </a>
                      {doc.uploadedBy === userName && (
                        <button
                          onClick={() => handleDelete(doc._id)}
                          className="text-red-500 hover:text-red-700 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
