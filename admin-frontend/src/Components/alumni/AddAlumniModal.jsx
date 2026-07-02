import React, { useState, useContext } from 'react';
import { AlumniContext } from './AlumniProvider';
import { X } from 'lucide-react';

const AddAlumniModal = ({ onClose }) => {
  const { addAlumni } = useContext(AlumniContext);
  const [form, setForm] = useState({
    name: '', studentId: '', graduationYear: '', program: '',
    email: '', company: '', role: '', placementData: '', feedbackStatus: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addAlumni(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg w-full max-w-2xl p-8 relative font-inter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black transition"
        >
          <X size={22} />
        </button>
        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-black mb-6 text-center">
          Add New Alumni
        </h2>
        {/* Form */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            type="text"
            placeholder="Student ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <input
            name="graduationYear"
            value={form.graduationYear}
            onChange={handleChange}
            type="text"
            placeholder="Graduation Year"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <input
            name="program"
            value={form.program}
            onChange={handleChange}
            type="text"
            placeholder="Program"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            type="text"
            placeholder="Company"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            type="text"
            placeholder="Role"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black placeholder-gray-500 text-black"
            required
          />
          <select
            name="placementData"
            value={form.placementData}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-black"
            required
          >
            <option value="">Placement Status</option>
            <option value="Placed">Placed</option>
            <option value="Not Placed">Not Placed</option>
          </select>
          <select
            name="feedbackStatus"
            value={form.feedbackStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black text-black"
            required
          >
            <option value="">Feedback Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Pending">Pending</option>
            <option value="Not Submitted">Not Submitted</option>
          </select>
          {/* Submit Button */}
          <div className="sm:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-black text-white border border-black px-6 py-2 rounded-md transition-colors duration-300 hover:bg-gray-800 hover:text-white"
            >
              Save Alumni
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlumniModal;