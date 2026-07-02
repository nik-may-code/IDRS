import React, { useState } from "react";
import { useAlert } from "../components/AlertContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import UploadDocumentForm from "../components/Documents/UploadDocumentForm";

const UploadDocument = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (!formData.documentFile) {
        showAlert("Please select a document file.", "error");
        return;
      }

      setIsUploading(true);

      const data = new FormData();
      data.append("file", formData.documentFile);
      data.append("moduleName", "student");
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("category", formData.category);
      data.append("uploadedBy", formData.uploadedBy || localStorage.getItem("user") || "Student");
      data.append("date", formData.date || new Date().toISOString());

      // Send to central Document Microservice (Admin backend on port 5000, proxied via /api/documents)
      const response = await axios.post("/api/documents/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Document uploaded to Central Microservice:", response.data);
      showAlert("Document uploaded successfully", "success");
      navigate("/logs");
    } catch (error) {
      console.error("Upload error:", error);
      showAlert(error.response?.data?.error || "Document upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="relative">
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
            <p className="text-lg font-semibold text-blue-600">Uploading to Document Microservice...</p>
          </div>
        )}
        <UploadDocumentForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default UploadDocument;
