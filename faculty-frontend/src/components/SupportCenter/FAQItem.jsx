import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Interface FAQItemProps is removed as it's TypeScript specific.
// We'll rely on prop destructuring in the component.

const FAQItem = ({ question, answer }) => { // React.FC<FAQItemProps> is removed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-white text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;