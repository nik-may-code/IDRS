
import React, { useState } from 'react';

export default function NotificationActions({ markAllAsRead, clearAll }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    clearAll();
    setShowConfirm(false);
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex gap-4 justify-end mt-6 relative z-10">
      <button
        onClick={markAllAsRead}
        className="px-4 py-2 rounded-full bg-black text-white"
      >
        Mark All as Read
      </button>
      <button
        onClick={handleClearClick}
        className="px-4 py-2 rounded-full bg-gray-200 text-black"
      >
        Clear All
      </button>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Clear All</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to clear all notifications?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelClear}
                className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-800"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

