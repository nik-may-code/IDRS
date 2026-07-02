// src/components/profile/ProfileEdit.jsx
import React, { useState } from 'react';

const InputField = ({ label, name, value, onChange, type = 'text', required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    facultyId: user.faculty_id || '',
    mobile: user.mobile || '',
    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (photo) {
      data.append('photo', photo);
    }
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField label="Your name" name="name" value={formData.name} onChange={handleChange} required />
      <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" required />
      <InputField label="Faculty ID" name="facultyId" value={formData.facultyId} onChange={handleChange} />
      <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
      <InputField label="Date Of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Profile Photo
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handlePhotoChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-8 py-2 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;