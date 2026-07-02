import React from 'react';
import FAQSection from './FAQSection';
import TicketsSection from './MyTicketsSection';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar';

const TabsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'knowledge', label: 'Knowledge Base/FAQs' },
    { id: 'contact', label: 'Contact Support' },
    { id: 'tickets', label: 'My Tickets' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'knowledge':
        return <div><FAQSection /> <SearchBar /></div>;
      case 'contact':
        return <ContactForm />;
      case 'tickets':
        return <TicketsSection />;
      default:
        return <div><FAQSection /> <SearchBar /></div>;
    }
  };

  return (
    <>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id 
                  ? 'border-black-500 text-black-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderContent()}
      </div>
    </>
  );
};

export default TabsNavigation;