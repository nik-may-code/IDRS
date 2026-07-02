import React from 'react';

const ExportButton = ({ onExport, isDisabled }) => {
  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={onExport}
        disabled={isDisabled}
        className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 
          ${isDisabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-neutral-800'}`}
      >
        Export
      </button>
    </div>
  );
};

export default ExportButton;
