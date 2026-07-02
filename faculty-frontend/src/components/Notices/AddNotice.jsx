// src/components/Notices/AddNotice.jsx
import React, { useState } from 'react';


const AddNotice = ({ onBack, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('All'); 
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const newNoticeData = {
      title,
      content,
      visibility: visibility === 'Admin Only' ? 'HOD' : visibility, 
      file,
    };

    try {
      await onSubmit(newNoticeData);
    } catch (apiError) {
      console.error('Failed to create notice:', apiError);
      setError('Failed to create notice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-10 max-w-4xl mx-auto rounded-lg shadow">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        Add New Notice
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="notice-title" className="block text-md font-medium text-gray-700 mb-2">
            Notice Title
          </label>
          <input
            type="text"
            id="notice-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="notice-content" className="block text-md font-medium text-gray-700 mb-2">
            Notice Content
          </label>
          <textarea
            id="notice-content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter notice details here."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="notice-visibility" className="block text-md font-medium text-gray-700 mb-2">
            Notice Visible To
          </label>
          <select
            id="notice-visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
            disabled={isSubmitting}
          >
            <option>All</option>
            <option>Students</option>
            <option>Faculty</option>
            <option>HOD</option> 
          </select>
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-2">
            Attach File (PDF/DOC)
          </label>
          <div className="w-full border border-gray-300 rounded-lg h-[54px] flex items-center px-4">
            <label className={`bg-gray-100 text-sm font-medium text-gray-800 py-2 px-5 rounded-md transition-colors ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-200'}`}>
              Choose file
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </label>
            <span className="ml-4 text-gray-500 text-sm">
              {file ? file.name : 'No file chosen'}
            </span>
          </div>
        </div>


        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between items-center pt-8">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#f3f4f6] hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            Back to Homepage
          </button>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-10 rounded-lg transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotice;