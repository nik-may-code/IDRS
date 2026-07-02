import React from 'react';
import Layout from '../components/Layout';

const noticesData = [
  {
    id: 1,
    title: "Academic Calendar Update",
    date: "2025-06-01",
    description: "Revised academic calendar for the upcoming semester, including exam dates and holidays.",
    image: "/images/calendar.png",
  },
  {
    id: 2,
    title: "Campus Event: Career Fair",
    date: "2025-06-02",
    description: "Annual career fair for internships and job opportunities.",
    image: "/images/career-fair.png",
  },
  {
    id: 3,
    title: "Library Resources Enhancement",
    date: "2025-06-03",
    description: "New resources and databases available through the library portal.",
    image: "/images/library.png",
  },
];

const Notices = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Institute Notices</h1>
        {noticesData.map(({ id, title, date, description, image }) => (
          <div
            key={id}
            className="flex flex-col md:flex-row items-center md:items-start mb-8 p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <img
              src={image}
              alt={title}
              className="w-24 h-24 object-cover mb-4 md:mb-0 md:mr-6 rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
              <p className="text-gray-500 text-sm mb-2">{new Date(date).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-4">{description}</p>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Notices;