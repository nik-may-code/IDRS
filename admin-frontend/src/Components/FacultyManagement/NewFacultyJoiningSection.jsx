import React from 'react';

const NewFacultyJoiningSection = ({ newFacultyJoiningData }) => {
  return (
    <section className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">New Faculty Joining</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Faculty Name', 'Department', 'Role', 'Joining Date', 'Status', 'Actions'].map(header => (
                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newFacultyJoiningData.length > 0 ? newFacultyJoiningData.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900">{faculty.facultyName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.department}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.role}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{faculty.joiningDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {faculty.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="text-center text-gray-500 py-4">No new faculty joinings.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default NewFacultyJoiningSection;