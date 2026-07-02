import React, { useState } from 'react';

const NoticeForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [file, setFile] = useState(null);

  const handleCheckbox = (role) => {
    setRecipients((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Notice Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notice title"
          className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notice Content</label>
        <textarea
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
          className="w-full border border-zinc-300 rounded-md px-4 py-2 focus:outline-none"
        />
      </div>

      <div className="flex items-start space-x-4">
        <div className="space-y-2">
          {['Students', 'Faculty', 'HOD'].map((role) => (
            <label key={role} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={role}
                checked={recipients.includes(role)}
                onChange={() => handleCheckbox(role)}
                className="checked:accent-neutral-800"
              />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Attachments</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file:mr-4 file:py-2 file:px-4 file:border file:border-zinc-300 file:text-sm file:rounded-md file:cursor-pointer"
        />
      </div>

      <div className="flex space-x-3 mt-4">
        <button className="bg-neutral-800 text-white font-semibold px-4 py-2 rounded-3xl cursor-pointer">Send Notice</button>
        <button className="bg-gray-200 text-black font-semibold px-4 py-2 rounded-3xl cursor-pointer">Save Draft</button>
        <button className="text-black font-semibold px-4 py-2 cursor-pointer hover:underline">Cancel</button>
      </div>
    </div>
  );
};

export default NoticeForm;
