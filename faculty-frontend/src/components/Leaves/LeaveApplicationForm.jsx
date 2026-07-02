
import React, { useState } from 'react';
// 1. REMOVE the direct axios import
// import axios from 'axios'; 
// 2. IMPORT your shared api instance
import api from '../../services/api';
import { storage } from '../../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// 3. REMOVE facultyId from props, it's not needed for the API call.
// The backend gets the ID from the auth token.
const LeaveApplicationForm = ({ onNewLeave }) => {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contact, setContact] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    // ... (no changes here)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName('No file chosen');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The check for facultyId is no longer needed here as it's handled by the auth token
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after start date.");
      return;
    }

    setLoading(true);
    let fileURL = '';

    try {
      if (file) {
        const fileRef = ref(storage, `leave-forms/${uuidv4()}-${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(snapshot.ref);
      }
      
      // 4. The payload no longer needs facultyId
      const payload = {
        leaveType,
        reason,
        startDate,
        endDate,
        contact,
        applicationFormUrl: fileURL || '',
      };

      // 5. USE your api instance. The endpoint is '/leaves'.
      // The base URL ('/api') and Authorization header are added automatically!
      const response = await api.post('/leaves', payload);

      onNewLeave(response.data);
      alert('Leave request submitted successfully!');

      // Reset form (no changes here)
      setLeaveType('');
      setReason('');
      setStartDate('');
      setEndDate('');
      setContact('');
      setFile(null);
      setFileName('No file chosen');
      e.target.reset();
    } catch (error) {
      // The error message from the backend will be more specific now
      console.error('Error submitting leave:', error);
      alert(error.response?.data?.message || 'An error occurred while submitting your request.');
    } finally {
      setLoading(false);
    }
  };

  // ... (No changes to the JSX return part)
 
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="leaveType" className="text-lg block font-normal mb-3">Leave Type</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="px-2 text-l py-2 mt-2 block w-1/4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leaves">Earned Leaves</option>
            <option value="Maternity Leaves">Maternity Leaves</option>
          </select>
        </div>

        <div>
          <label htmlFor="reason" className="text-lg block font-normal mb-3">Reason for Leave</label>
          <textarea
            id="reason"
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="text-xl mt-2 block w-1/2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="startDate" className="text-lg block font-normal mb-3">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="px-3 py-1 mt-2 block w-2/3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="text-lg block font-normal mb-3">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="px-3 py-1 mt-2 block w-2/3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact" className="text-lg block font-normal mb-3">Alternate Contact</label>
          <input
            type="text"
            id="contact"
            placeholder="Type address or contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="px-3 py-2 mt-2 block w-1/4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-lg block font-normal mb-3">Application form</label>

          <div className="inline-flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1.5">
            <label
              htmlFor="applicationForm"
              className="cursor-pointer bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Choose file
            </label>

            <input
              id="applicationForm"
              name="applicationForm"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={handleFileChange}
             />

             <span className="text-sm text-gray-600 ml-4 truncate">{fileName || "No file chosen"}</span>
          </div>
        </div>


        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center px-4 py-3 text-l border border-transparent border-gray-300 rounded-xl text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;