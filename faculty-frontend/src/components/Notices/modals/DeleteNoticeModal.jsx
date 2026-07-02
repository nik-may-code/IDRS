import React from 'react';

const DeleteNoticeModal = ({ notice, onConfirm, onClose, isLoading }) => {
  if (!notice) return null;

  return (
    <div className="text-sm">
      <p>
        Are you sure you want to delete the notice titled: <br />
        <strong className="mt-2 block">{notice.title}</strong>?
      </p>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 bg-zinc-200 rounded-lg hover:bg-zinc-300 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default DeleteNoticeModal;