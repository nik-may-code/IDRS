//src/Components/StudentManagement/Modals/DeleteStudentModal.jsx
import React, { useState, useEffect } from 'react';
import { deleteStudent } from '../../../api/StudentManagementApi';

const DeleteStudentModal = ({
  isOpen,
  onClose,
  student,
  onDeleteSuccess,
  onDeleteError
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setError('');
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (!student || !student.rollNo) {
      setError('Invalid student data - Roll No. not found.');
      if (onDeleteError) {
        onDeleteError('Invalid student data - Roll No. not found.');
      }
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      await deleteStudent(student.rollNo);
      onClose();
      if (onDeleteSuccess) {
        onDeleteSuccess(student.rollNo);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete student. Please try again.';
      setError(errorMessage);
      if (onDeleteError) {
        onDeleteError(errorMessage);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleModalClose = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={handleModalClose}
    >
      <div
        className="bg-neutral-50 p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300 pb-4 mb-6">
          <h3 className="text-xl font-semibold text-neutral-800">
            Delete Student
          </h3>
          <button
            onClick={handleModalClose}
            disabled={isDeleting}
            className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
            aria-label="Close delete modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-grow">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                Are you sure you want to delete this student?
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {student && (
            <div className="bg-gray-50 rounded-md p-3 mb-4 text-sm">
              <p className="font-medium text-gray-900">
                {student.name || 'N/A'}
              </p>
              <p className="text-gray-500">
                Roll No: {student.rollNo || 'N/A'}
              </p>
              {student.email && (
                <p className="text-gray-500">
                  Email: {student.email}
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4 text-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 flex justify-end gap-3 border-t border-neutral-300">
          <button
            type="button"
            onClick={handleModalClose}
            disabled={isDeleting}
            className="px-6 py-2.5 text-sm font-medium text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting || !student || !student.rollNo}
            className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentModal;
