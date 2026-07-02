import React from 'react';

const AlumniCard = ({ alumni }) => {
  return (
    <div className="mb-10">
      {/* Alumni Name */}
      <div className="text-xl font-semibold text-black mb-4">{alumni.name}</div>

      {/* Personal Details Table */}
      <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead>
            <tr className="border-zinc-300 border-b">
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Student ID</th>
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Graduation Year</th>
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Program</th>
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Email ID</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-zinc-300 border-t">
              <td className="px-6 py-4 text-gray-600">{alumni.studentId}</td>
              <td className="px-6 py-4 text-gray-600">{alumni.graduationYear}</td>
              <td className="px-6 py-4 text-gray-600">{alumni.program}</td>
              <td className="px-6 py-4 text-gray-600">
                <a href={`mailto:${alumni.email}`} className="hover:underline">{alumni.email}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Company Details Table */}
      <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead>
            <tr className="border-zinc-300 border-b">
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Company</th>
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Role</th>
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Placement Data</th>
              <th className="w-1/4 px-6 py-3 text-left font-medium text-gray-800">Feedback Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-zinc-300 border-t">
              <td className="px-6 py-4 text-gray-600">{alumni.company}</td>
              <td className="px-6 py-4 text-gray-600">{alumni.role}</td>
              <td className="px-6 py-4 text-gray-600">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                  alumni.placementData === 'Placed'
                    ? 'bg-gray-100 text-black-800'
                    : 'bg-gray-100 text-black-800'
                }`}>
                  {alumni.placementData}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                  alumni.feedbackStatus === 'Submitted'
                    ? 'bg-gray-100 text-black-800'
                    : alumni.feedbackStatus === 'Pending'
                      ? 'bg-gray-100 text-black-800'
                      : 'bg-gray-100 text-black-800'
                }`}>
                  {alumni.feedbackStatus}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniCard;