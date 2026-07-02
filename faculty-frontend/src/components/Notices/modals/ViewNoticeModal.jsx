import React from 'react';

const ViewNoticeModal = ({ notice }) => {
  if (!notice) return null;

  return (
    <div className="space-y-4 text-sm tracking-wide">
      <p>
        <strong>Title:</strong> {notice.title}
      </p>
      <p>
        <strong>Recipients:</strong> {notice.recipients?.join(', ') || 'N/A'}
      </p>
      <p>
        <strong>Date:</strong> {new Date(notice.date).toLocaleString()}
      </p>
      <p>
        <strong>Content:</strong>
        <span className="block mt-1 pl-2 border-l-2 border-gray-200">
          {notice.content || 'No content provided.'}
        </span>
      </p>
      {notice.attachment && (
        <p>
          <strong>Attachment:</strong>{' '}
          <a
            href={notice.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Attachment
          </a>
        </p>
      )}
    </div>
  );
};

export default ViewNoticeModal;