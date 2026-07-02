import React, { useState } from 'react';
import UserRole from '../Components/SystemSettings/UserRole';
import Department from '../Components/SystemSettings/Department';
import DocumentType from '../Components/SystemSettings/DocumentType';
import Infrastructure from '../Components/SystemSettings/Infrastructure';
import Security from '../Components/SystemSettings/Security';
import General from '../Components/SystemSettings/General';

const SystemSettings = () => {
  const [activePrimaryTab, setActivePrimaryTab] = useState('user-role');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('infrastructure');

  const renderPrimaryContent = () => {
    switch (activePrimaryTab) {
      case 'user-role':
        return <UserRole />;
      case 'department':
        return <Department />;
      case 'document-type':
        return <DocumentType />;
      default:
        return null;
    }
  };

  const renderSecondaryContent = () => {
    switch (activeSecondaryTab) {
      case 'infrastructure':
        return <Infrastructure />;
      case 'security':
        return <Security />;
      case 'general':
        return <General />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">System & Settings</h1>

      <div className="flex space-x-16 mb-8 px-4">
        {['user-role', 'department', 'document-type'].map(tab => (
          <span
            key={tab}
            onClick={() => {
              setActivePrimaryTab(tab);
              setActiveSecondaryTab('infrastructure');
            }}
            className={`text-gray-600 font-medium cursor-pointer hover:text-gray-800 hover:border-gray-400 transition-colors duration-200 pb-2 border-b-2 ${
              activePrimaryTab === tab ? 'border-gray-400 text-gray-800' : 'border-transparent'
            }`}
          >
            {tab === 'user-role' ? 'User & Role' : tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
          </span>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        {renderPrimaryContent()}
      </div>

      <div className="flex space-x-16 mb-8 px-4 border-t border-gray-300 pt-6">
        {['infrastructure', 'security', 'general'].map(tab => (
          <span
            key={tab}
            onClick={() => setActiveSecondaryTab(tab)}
            className={`text-gray-600 font-medium cursor-pointer hover:text-gray-800 hover:border-gray-400 transition-colors duration-200 pb-2 border-b-2 ${
              activeSecondaryTab === tab ? 'border-gray-400 text-gray-800' : 'border-transparent'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        {renderSecondaryContent()}
      </div>
    </div>
  );
};

export default SystemSettings;