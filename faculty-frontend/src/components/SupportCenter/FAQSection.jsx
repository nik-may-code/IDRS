import React from 'react'; // useState is not used in this component, so it can be removed from imports if not needed elsewhere
import { ChevronDown } from 'lucide-react'; // ChevronDown is not directly used in this component, consider if it's needed or remove
import FAQItem from './FAQItem';

const FAQSection = () => { // React.FC removed
  const faqs = [
    {
      id: 1,
      question: "How do I reset a user's password?",
      answer: "To reset a user's password, go to the User Management section, find the user, click on the Actions button, and select 'Reset Password'. You can either set a temporary password or send a password reset link to the user's email."
    },
    {
      id: 2,
      question: "What are the different user roles and permissions?",
      answer: "Our system has several user roles including Admin, Manager, Editor, and Viewer. Each role has different permission levels. Admins have full access, Managers can manage content and users but can't change system settings, Editors can create and edit content, and Viewers can only view content without making changes."
    },
    {
      id: 3,
      question: "How can I export user data?",
      answer: "To export user data, navigate to the Reports section, select 'User Data Export', choose the data fields you want to include, select the format (CSV, Excel, or PDF), and click 'Generate Report'. You can then download the exported file or have it sent to your email."
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq) => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;