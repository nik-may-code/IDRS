import React from 'react';
import NoticeForm from '../Components/Notices/NoticeForm';
import NoticeHistory from '../Components/Notices/NoticeHistory';

const Notices = () => {
  return (
    <div className="p-4 w-full min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Send Notices</h2>
      <NoticeForm />
      <h3 className="text-xl font-bold mt-12 mb-4">Notice History</h3>
      <NoticeHistory />
    </div>
  );
};

export default Notices;
