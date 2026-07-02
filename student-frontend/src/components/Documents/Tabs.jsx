import React from 'react';

const Tabs = ({ activeTab, onChange }) => (
  <div className="flex space-x-6 border-b border-gray-300 mb-4 select-none">
    <button
      onClick={() => onChange('all')}
      className={`pb-2 text-sm font-medium border-b-2 transition
        ${activeTab === 'all' ? 'border-gray-700 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
      type="button"
    >
      All Documents
    </button>
    <button
      onClick={() => onChange('mine')}
      className={`pb-2 text-sm font-medium border-b-2 transition
        ${activeTab === 'mine' ? 'border-gray-700 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
      type="button"
    >
      My Documents
    </button>
  </div>
);

export default Tabs;
