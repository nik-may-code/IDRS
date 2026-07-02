// src/pages/Notices.jsx
import React, { useState, useRef } from 'react';
import InstituteNotices from '../components/Notices/InstituteNotices';
import AddNotice from '../components/Notices/AddNotice';
import NoticeHistory from '../components/Notices/NoticeHistory';
import api from '../api/notice/api'; 
import { toast } from 'react-hot-toast'; 

const Notices = () => {
  const [view, setView] = useState('list');
  const historyRef = useRef(null);
  const [dataVersion, setDataVersion] = useState(0);

  const handleScrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await api.createNotice(formData); 
      
      toast.success(`Notice "${response.data.title}" created successfully!`);

      setView('list');
      setDataVersion(prev => prev + 1); 
    } catch (error) {
      console.error('Failed to submit notice:', error);
      throw error;
    }
  };

  if (view === 'form') {
    return (
      <AddNotice
        onBack={() => setView('list')}
        onSubmit={handleFormSubmit}
      />
    );
  }

  return (
    <div className="w-full min-h-screen space-y-8">
      <div className="bg-white font-sans p-6 rounded-lg shadow">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Institute Notices</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView('form')}
              className="bg-black text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-gray-800 transition-colors"
            >
              + Post Notice
            </button>
            <button
              onClick={handleScrollToHistory}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Notice History
            </button>
          </div>
        </header>
        <InstituteNotices />
      </div>

      <div ref={historyRef} className="pt-4">
        <h3 className="text-2xl font-bold mb-4">Notice History</h3>
        <NoticeHistory key={dataVersion} />
      </div>
    </div>
  );
};

export default Notices;