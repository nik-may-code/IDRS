import React from 'react';
import ContactImg from '../../assets/ContactSupport.jpeg';

const ContactSupport = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow p-6">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-sm font-medium text-gray-500 uppercase">Contact Support</h2>
        <h3 className="mt-2 text-lg font-semibold text-neutral-900">
          Need help? Contact our support team
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Submit a support ticket for personalized assistance.
        </p>
        <button
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-neutral-900 focus:outline-none"
          onClick={() => setActiveTab('contact')}
        >
          Contact Support
        </button>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center mt-6 md:mt-0 md:ml-6 w-full md:w-1/2">
        <img
          src={ContactImg}
          alt="Support Representative"
          className="object-cover w-full h-full max-h-52 md:max-h-60 rounded"
        />
      </div>
    </div>
  );
};

export default ContactSupport;
