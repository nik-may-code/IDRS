//src/Components/StudentManagement/Modals/ViewProfileModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch (e) {
        return 'Invalid Date';
    }
};

const DetailRow = ({ label, value, isRawHtml = false }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 items-start border-t border-neutral-200 first:border-t-0">
        <dt className="text-sm font-medium text-neutral-500">{label}</dt>
        <dd className="mt-1 text-sm text-neutral-700 sm:mt-0 sm:col-span-2">
            {isRawHtml ? <div dangerouslySetInnerHTML={{ __html: value }} /> : (value || 'N/A')}
        </dd>
    </div>
);

const ViewProfileModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  const statusColors = {
    'Active': 'bg-green-100 text-green-700 border border-green-300',
    'Inactive': 'bg-red-100 text-red-700 border border-red-300',
    'Graduated': 'bg-slate-100 text-slate-700 border border-slate-300',
    'On Leave': 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    'Default': 'bg-neutral-200 text-neutral-600 border border-neutral-300'
  };

  const getStatusBadgeHtml = (status) => {
    const statusText = status || 'Unknown';
    const classes = statusColors[statusText] || statusColors['Default'];
    return `<span class="px-3 py-1 text-xs font-semibold rounded-full inline-block ${classes}">${statusText}</span>`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
         onClick={onClose}
    >
      <div
        className="bg-neutral-50 p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300 pb-4 mb-6">
          <div>
            <h3 className="text-2xl font-semibold leading-7 text-neutral-800">{student.name || 'Student Profile'}</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {student.branch || 'N/A Branch'} - Batch of {student.batch || 'N/A'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-200 transition-colors"
            aria-label="Close profile modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-200">
            <dl className="divide-y-0">
                <DetailRow label="Roll No." value={student.rollNo} />
                <DetailRow label="Email Address" value={student.email} />
                <DetailRow
                    label="Status"
                    isRawHtml={true}
                    value={getStatusBadgeHtml(student.status)}
                />
                <DetailRow label="Counselor" value={student.counselor} />
                <DetailRow label="Profile Created" value={formatDate(student.createdAt)} />
                <DetailRow label="Last Updated" value={formatDate(student.updatedAt)} />
            </dl>
        </div>

        <div className="mt-auto pt-6 flex justify-end border-t border-neutral-300">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-neutral-700 text-white text-sm font-medium rounded-md hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileModal;