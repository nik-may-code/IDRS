import React from 'react';
import { FiSearch } from 'react-icons/fi';

const FacultyListSection = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  activeTab,
  setActiveTab,
  filteredFacultyList,
}) => {
  return (
    <section className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="relative w-full sm:w-auto flex-grow sm:max-w-xs">
          <input
            type="text"
            placeholder="Search datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-neutral-900 hover:bg-gray-700 text-white px-6 py-2 rounded-md text-sm"
        >
          Search
        </button>
      </div>

      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
          {['Department', 'Role', 'Status'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Faculty Name', 'Department', 'Role', 'Email ID', 'Status', 'Leaves Taken', 'Salary', 'Last Activity', 'Actions'].map(header => (
                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFacultyList.length > 0 ? filteredFacultyList.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900">{faculty.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.department}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.role}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.emailId}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${faculty.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {faculty.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.leavesTaken}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.salary}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.lastActivity}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-4">No faculty members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FacultyListSection;