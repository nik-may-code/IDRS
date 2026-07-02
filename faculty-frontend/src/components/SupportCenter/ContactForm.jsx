import React, { useState } from 'react';
import supportImage from '../../assets/SupportFormIMG.png';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, issue }),
      });

      if (!res.ok) throw new Error('Failed to submit ticket');

      setSubmitMessage('Your ticket has been submitted successfully!');
      setEmail('');
      setSubject('');
      setIssue('');
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setSubmitMessage(`Failed to submit ticket: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white p-6 rounded-lg shadow-sm max-w-4xl w-full h-[450px]">
      <form onSubmit={handleSubmit} className="flex-1 pr-6 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Submit a Ticket</h2>
          {submitMessage && (
            <p className={`mb-4 text-sm ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {submitMessage}
            </p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Subject of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Issue */}
          <div className="mb-4">
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
            <textarea
              id="issue"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              placeholder="Describe your issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200 text-sm self-start"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </form>

      {/* Right: Image */}
      <div className="w-full md:w-1/2 h-full">
        <img
          src={supportImage}
          alt="Support Illustration"
          className="w-100 h-100 object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default ContactForm;
