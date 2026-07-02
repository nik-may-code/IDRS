// src/pages/UploadDocuments.jsx
import React from 'react';
import UploadDocumentForm from '../components/documents/UploadDocumentForm'; // Assuming this path is correct for your project structure
import { useNavigate } from 'react-router-dom';

const UploadDocuments = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    alert('Document uploaded successfully!');
    navigate('/documents'); // go back to documents page after successful upload
  };

  return (
    // Removed 'flex items-center justify-center'. 
    // This allows the form to position itself based on the parent layout (which would provide the sidebar/header).
    // The 'p-8' provides general padding around the content.
    <div className="p-8 min-h-screen bg-gray-100">
      {/* The main "Upload Document" heading is intentionally absent here, 
          as it should only be present inside the UploadDocumentForm component as per our previous discussion and screenshot. */}
      <UploadDocumentForm onSuccess={handleSuccess} />
    </div>
  );
};

export default UploadDocuments;