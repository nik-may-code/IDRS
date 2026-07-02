import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I reset a user’s password?",
    answer: "Go to User Management > Select the user > Click on 'Reset Password'."
  },
  {
    question: "What are the different user roles and permissions?",
    answer: "Roles include Admin, Faculty, Student, and Alumni. Each role has specific access defined under System Settings > Roles."
  },
  {
    question: "How can I export user data?",
    answer: "Navigate to Export Data > Select category > Choose format > Click Export."
  }
];

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState("Knowledge Base/FAQs");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Knowledge Base/FAQs':
        return (
          <div>
            <h3 className="text-base font-medium mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-md">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-left"
                  >
                    {faq.question}
                    {openFAQ === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'Contact Support':
        return <p className="text-sm text-gray-600">Please use the 'Contact Support' button above to submit a support request.</p>;
      case 'My Tickets':
        return <p className="text-sm text-gray-600">You have no active tickets at the moment.</p>;
      case 'Announcements':
        return <p className="text-sm text-gray-600">No new announcements.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="px-12 py-10 bg-white min-h-screen text-gray-900">
      <h1 className="text-3xl font-semibold mb-10">Support Center</h1>

      {/* Quick Access */}
      <div className="grid grid-cols-1 gap-6 mb-12">
        <div className="flex gap-4">
          <div className="flex-1 items-center">
            <p className="text-xs text-gray-500">Knowledge Base</p>
            <h2 className="text-lg font-semibold mt-1">Explore our comprehensive knowledge base</h2>
            <p className="text-sm text-gray-600 mt-2">Find answers to common questions and troubleshooting tips.</p>
            <button className="mt-4 px-4 py-2 text-sm text-white bg-gray-800 rounded hover:bg-gray-700">Go to Knowledge Base</button>
          </div>
          <div className="w-96 h-64 bg-gray-200 rounded flex items-center justify-center">
            <img className="rounded" src="https://images.unsplash.com/photo-1516910817563-4df1c1b69058?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 items-center">
            <p className="text-xs text-gray-500">Contact Support</p>
            <h2 className="text-lg font-semibold mt-1">Need help? Contact our support team</h2>
            <p className="text-sm text-gray-600 mt-2">Submit a support ticket for personalized assistance.</p>
            <button className="mt-4 px-4 py-2 text-sm text-white bg-gray-800 rounded hover:bg-gray-700">Contact Support</button>
          </div>
          <div className="w-96 h-64 bg-gray-200 rounded flex items-center justify-center">
            <img className="rounded" src="https://images.unsplash.com/photo-1549082984-1323b94df9a6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Support Agent" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-10 text-sm font-medium text-gray-600">
          {['Knowledge Base/FAQs', 'Contact Support', 'My Tickets', 'Announcements'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${activeTab === tab ? 'border-b-2 border-gray-800 text-gray-900' : 'hover:text-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search  for  articles  or  FAQs"
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SupportCenter;