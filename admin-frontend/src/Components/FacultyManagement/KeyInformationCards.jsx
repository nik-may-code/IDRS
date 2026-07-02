import React from 'react';

const KeyInformationCards = ({ keyInfoData }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Key Information</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {keyInfoData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm text-gray-500 mb-1">{item.title}</h3>
            <p className="text-2xl font-bold text-neutral-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyInformationCards;