import React, { useState } from 'react';
import QuickAccess from '../components/SupportCenter/QuickAccess';
import ContactSupport from '../components/SupportCenter/ContactSupport';
import TabsNavigation from '../components/SupportCenter/TabsNavigation';

function SupportCenter() {
  const [activeTab, setActiveTab] = useState('knowledge');

  return (

    <div className="min-h-screen bg-white-50">

      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-rows-2 gap-5 mt-8">

        <QuickAccess setActiveTab={setActiveTab} />

        <ContactSupport setActiveTab={setActiveTab} />

        </div>

        <div className="mt-12">

        <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        </div>
      </div>
    </div>
);

}



export default SupportCenter;