// src/components/documents/UploadDocumentForm.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const UploadDocumentForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const facultyId = user?.faculty_id;

  const [formData, setFormData] = useState({
  documentType: '',
  documentName: '',
  type: 'National',
  volume: '',      // <-- changed
  issue: '',       // <-- changed
  pages: '',       // <-- changed
  publication: '',
  date: '',
  remarks: '',
  visibility: 'Admin Only',
  file: null,
});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.file) {
    alert('Please select a file to upload.');
    return;
  }

  try {

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append('faculty_id', facultyId);
      await api.post('/documents/upload', data, {
        headers: { 'x-faculty-id': facultyId, 'Content-Type': 'multipart/form-data' },
      });
      // Reset form fields after successful submission
      setFormData({
        documentType: '',
        documentName: '',
        type: 'National',
        volume: '',    // <-- changed
        issue: '',     // <-- changed
        pages: '',     // <-- changed
        publication: '',
        date: '',
        remarks: '',
        visibility: 'Admin Only',
        file: null,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        // If no onSuccess callback, navigate to documents listing
        navigate('/documents');
      }
    } catch (err) {
      alert('Upload failed. Check console.');
      console.error('Upload error:', err);
    }
  };


  return (
    // Changed max-w-3xl to max-w-4xl for a wider form container
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Document</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Type Field */}
        <div>
          <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
          <div className="relative">
            <select
              id="documentType"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8"
            >
              <option value="">Select Type</option>
              <option value="Research Papers">Research Papers</option>
              <option value="Reports">Reports</option>
              <option value="Course Materials">Course Materials</option>
              <option value="Journal">Journal</option>
              <option value="Conference">Conference</option>
              <option value="Book Chapter">Book Chapter</option>
              <option value="Patent">Patent</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>
        </div>

        {/* Document Name Field */}
        <div>
          <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
          <input
            type="text"
            id="documentName"
            name="documentName"
            placeholder="Enter Document Name"
            value={formData.documentName}
            onChange={handleChange}
            required
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Type (National/International) Field */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="relative">
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8"
            >
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>
        </div>

        {/* Volume, Issues and Pages Field */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div>
    <label htmlFor="volume" className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
    <input
      type="text"
      id="volume"
      name="volume"
      value={formData.volume || ''}
      onChange={handleChange}
      placeholder="Vol 2"
      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  <div>
    <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
    <input
      type="text"
      id="issue"
      name="issue"
      value={formData.issue || ''}
      onChange={handleChange}
      placeholder="Issue 1"
      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  <div>
    <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
    <input
      type="text"
      id="pages"
      name="pages"
      value={formData.pages || ''}
      onChange={handleChange}
      placeholder="pp. 10–20"
      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
</div>


        {/* Name of the Publication Field */}
        <div>
          <label htmlFor="publication" className="block text-sm font-medium text-gray-700 mb-1">Name of the Publication</label>
          <input
            type="text"
            id="publication"
            name="publication"
            placeholder="Publication name"
            value={formData.publication}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Date Field */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="DD/MM/YYYY"
            value={formData.date}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Achievements / Remarks Field */}
        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">Achievements/Remarks</label>
          <input
            type="text"
            id="remarks"
            name="remarks"
            placeholder="Any special mention or remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Document Visible To Field */}
        <div>
          <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">Document Visible To</label>
          <div className="relative">
            <select
              id="visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8"
            >
              <option value="Admin Only">Admin Only</option>
              <option value="Faculty">Faculty</option>
              <option value="Faculty and Students">Faculty and Students</option>

              <option value="Faculty and Admin">Faculty and Admin</option>             
               <option value="Students">Students</option>
              <option value="Admin and Students">Admin and Students</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>
        </div>

        {/* Upload Paper / Document Section */}
        <div className="flex justify-center py-6">
          <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-8 rounded-lg text-center w-full max-w-lg">
            <p className="mb-4 font-medium text-gray-700">Upload Paper/Document</p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-700 text-white px-6 py-2 rounded-md inline-flex items-center justify-center text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Browse Files
              <input
                id="file-upload"
                type="file"
                name="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.xls,.xlsx"
                onChange={handleChange}
                className="sr-only"
                required
              />
            </label>
            {formData.file && (
              <p className="text-sm text-gray-600 mt-3">Selected: {formData.file.name}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate('/documents')}
            className="px-6 py-2 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back to Listing
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            {/* Submit Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocumentForm;