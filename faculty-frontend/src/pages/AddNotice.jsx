import React, { useState } from 'react';

const AddNotice = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    audience: 'All Students',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setStatus('Please fill in all required fields.');
      return;
    }
    
    // In a real implementation, this would be an API call
    console.log('Submitting notice:', formData);
    setStatus('Notice added successfully!');
    setFormData({ title: '', content: '', audience: 'All Students' });
    
    setTimeout(() => setStatus(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Notice</h1>
      
      {status && (
        <div className={`p-4 mb-6 rounded ${status.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Notice Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Mid-Term Exam Schedule"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="audience">
            Target Audience
          </label>
          <select
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Students">All Students</option>
            <option value="First Year">First Year Students</option>
            <option value="Second Year">Second Year Students</option>
            <option value="Third Year">Third Year Students</option>
            <option value="Final Year">Final Year Students</option>
            <option value="Faculty Only">Faculty Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">
            Notice Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the full details of the notice..."
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={() => setFormData({ title: '', content: '', audience: 'All Students' })}
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Publish Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotice;
