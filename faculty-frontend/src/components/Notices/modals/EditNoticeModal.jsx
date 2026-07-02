// src/components/modals/EditNoticeModal.jsx

import React from 'react';

const EditNoticeModal = ({ notice, onSubmit, isLoading }) => {
  if (!notice) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-sm">
      
      <div>
        <label htmlFor="title" className="block font-medium mb-1">Title</label>
        <input
          id="title"
          name="title"
          className="w-full border px-3 py-2 rounded-md"
          defaultValue={notice.title}
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium mb-1">Content</label>
        <textarea
          id="content"
          name="content"
          rows="4"
          className="w-full border px-3 py-2 rounded-md"
          defaultValue={notice.content}
          required
        />
      </div>

      <div>
        <label htmlFor="recipients" className="block font-medium mb-1">Recipients</label>
        <select
          id="recipients"
          name="recipients"
          className="w-full border px-3 py-2 rounded-md"
          defaultValue={notice.recipients ? notice.recipients[0] : 'All'}
          required
        >
          <option>All</option>
          <option>Students</option>
          <option>Faculty</option>
          <option>HOD</option>
        </select>
      </div>

      <div>
        <label htmlFor="attachment" className="block font-medium mb-1">
          Change Attachment (Optional)
        </label>
        {notice.attachment && (
          <div className="text-xs mb-2">
            <span className="font-medium">Current File:</span>{' '}
            <a href={notice.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View Attachment
            </a>
          </div>
        )}
        <input
          type="file"
          id="attachment"
          name="attachment" 
          className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
        />
         <p className="text-gray-500 text-xs italic mt-1">
            Uploading a new file will replace the existing one.
         </p>
      </div>

      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-zinc-900 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default EditNoticeModal;