// src/Components/StudentManagement/Modals/DeleteConfirmationModal.jsx
import React from 'react';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName, // Name or ID of the item to be deleted
  itemType = "item", // e.g., "student", "record", "file" - for generic messaging
  title = "Confirm Deletion",
  message, // Optional custom message
  confirmButtonText = "Confirm Delete",
  cancelButtonText = "Cancel",
}) => {
  if (!isOpen) {
    return null;
  }

  const displayMessage = message || `Are you sure you want to delete this ${itemType}: "${itemName}"? This action cannot be undone.`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[1050] flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Optional: close on overlay click
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{displayMessage}</p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;