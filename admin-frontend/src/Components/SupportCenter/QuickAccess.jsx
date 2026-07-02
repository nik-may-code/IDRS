import React from 'react';
import kbs from '../../assets/knowledgeBookSupport.jpeg'; // Assuming you have an image for the knowledge base

const QuickAccess = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow p-6">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-sm font-medium text-gray-500 uppercase">Knowledge Base</h2>
        <h3 className="mt-2 text-lg font-semibold text-neutral-900">
          Explore our comprehensive knowledge base
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Find answers to common questions and troubleshooting tips.
        </p>
        <button
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-neutral-900 focus:outline-none"
          onClick={() => setActiveTab('knowledge')}
        >
          Go to Knowledge Base
        </button>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center mt-6 md:mt-0 md:ml-6 w-full md:w-1/2">
        <img
          src={kbs}
          alt="Knowledge Base"
          className="object-cover w-full h-full max-h-52 md:max-h-60 rounded"
        />
      </div>
    </div>
  );
};

export default QuickAccess;
