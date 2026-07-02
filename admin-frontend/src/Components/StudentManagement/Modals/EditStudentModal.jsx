//src/Components/StudentManagement/Modals/EditStudentModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, User, Book, Hash, Mail, UserCheck, Activity } from 'lucide-react';
import { editStudent as apiEditStudent } from '../../../api/StudentManagementApi';

const InputField = ({ label, name, value, onChange, type = "text", placeholder, icon, required = false, children }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-neutral-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative rounded-md shadow-sm">
      {icon && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>}
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border border-neutral-300 rounded-md placeholder-neutral-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white`}
          required={required}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border border-neutral-300 rounded-md placeholder-neutral-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white`}
          required={required}
        />
      )}
    </div>
  </div>
);

const initialFormData = {
  name: '',
  branch: '', 
  rollNo: '', 
  batch: '',
  email: '',
  counselor: '',
  status: 'Active',
};

const EditStudentModal = ({ isOpen, onClose, student, onEditSuccess, onEditError }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && student) {
      setFormData({
        name: student.name || '',
        branch: student.branch || '', 
        rollNo: student.rollNo || '',
        batch: student.batch || '',
        email: student.email || '',
        counselor: student.counselor || '',
        status: student.status || 'Active',
      });
      setError('');
    } else if (!isOpen) {
      setFormData(initialFormData);
      setError('');
    }
  }, [isOpen, student]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!student || !student.rollNo) { 
      setError("Error: Student Roll No. is missing. Cannot submit.");
      if (onEditError) onEditError("Error: Student Roll No. is missing.");
      return;
    }
    if (!formData.name || !formData.email || !formData.branch || !formData.batch || !formData.rollNo) {
      setError("Please fill in all required fields (Name, Roll No., Email, Branch, Batch).");
      if (onEditError) onEditError("Please fill in all required fields (Name, Roll No., Email, Branch, Batch).");
      return;
    }

    setIsSubmitting(true);

    try {
      const { _id, ...dataToUpdate } = formData; 
      
      await apiEditStudent(student.rollNo, formData);

      onClose();

      if (onEditSuccess) {
        onEditSuccess(student.rollNo, formData);
      }

    } catch (err) {
      const errorMessage = err.message || "Failed to update student. Please try again.";
      setError(errorMessage);
      if (onEditError) {
        onEditError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleModalClose}
    >
      <div
        className="bg-neutral-50 p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">
            Edit Student: <span className="font-bold">{student?.name || 'Loading...'}</span>
          </h2>
          <button
            onClick={handleModalClose}
            disabled={isSubmitting}
            className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close edit modal"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4 text-sm">
                 <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3"><p>{error}</p></div>
                </div>
            </div>
        )}

        {student ? (
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                icon={<User size={16} className="text-neutral-400" />}
              />
              <InputField 
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                icon={<Book size={16} className="text-neutral-400" />}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField 
                label="Roll No."
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
                icon={<Hash size={16} className="text-neutral-400" />}
              />
              <InputField
                label="Batch (Year)"
                name="batch"
                type="number"
                value={formData.batch}
                onChange={handleChange}
                required
                placeholder="e.g., 2023"
                icon={<Hash size={16} className="text-neutral-400" />}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                icon={<Mail size={16} className="text-neutral-400" />}
              />
              <InputField
                label="Counselor"
                name="counselor"
                value={formData.counselor}
                onChange={handleChange}
                icon={<UserCheck size={16} className="text-neutral-400" />}
              />
            </div>
             <InputField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                type="select"
                icon={<Activity size={16} className="text-neutral-400" />}
              >
                <option value="Active">Active</option>
                <option value="Graduated">Graduated</option>
              </InputField>
          </form>
        ) : (
          <div className="flex-grow flex items-center justify-center text-neutral-500">
            Loading student data...
          </div>
        )}

        <div className="mt-auto pt-6 flex justify-end gap-3 border-t border-neutral-300">
          <button
            type="button"
            onClick={handleModalClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!student || isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;