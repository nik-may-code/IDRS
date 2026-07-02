import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const UserForm = ({ onSubmit, roleOptions }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  const departmentOptions = ['ICE', 'CSE', 'IT', 'EEE', 'CSS', 'CSN', 'CSO'];

  const validateField = (name, value) => {
    if (name === 'name') {
      if (!value) return 'Name is required';
      if (value.length > 50) return 'Name must be 50 characters or less';
    } else if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
    } else if (name === 'mobile') {
      if (!value) return 'Mobile number is required';
      if (!/^\+?\d{10}$/.test(value.replace(/\D/g, '')))
        return 'Mobile number must be 10 digits';
    } else if (name === 'role') {
      if (!value) return 'Role is required';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validateField(field, formData[field]);
      if (error) acc[field] = error;
      return acc;
    }, {});
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(formData, () =>
      setFormData({ name: '', email: '', mobile: '', department: '', role: '' })
    );
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email', required: true },
    {  name: 'mobile', label: 'Mobile Number', type: 'text', placeholder: 'Enter mobile number', required: true,  },
    { name: 'department', label: 'Department', type: 'select', options: departmentOptions, placeholder: 'Select Department',  required: false, },
    { name: 'role', label: 'Role',  type: 'select', options: roleOptions, placeholder: 'Select Role', required: true, },
  ];

  return (
    <section className="bg-white p-6 rounded-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <div className="relative">
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                  className={`appearance-none block w-full px-3 py-2.5 border ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-200'
                  } rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm hover:bg-gray-50 transition-all duration-200`}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
                placeholder={field.placeholder}
                className={`block w-full px-3 py-2.5 border ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-200'
                } rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm hover:bg-gray-50 transition-all duration-200`}
              />
            )}
            {errors[field.name] && (
              <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
            )}
          </div>
        ))}
        <div>
          <button
            type="submit"
            className="w-full sm:w-auto py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
          >
            Add User
          </button>
        </div>
      </form>
    </section>
  );
};
export default UserForm;