import React from 'react';

const SecurityRow = ({ setting, onEdit, onDelete, isLast }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 ${isLast ? 'rounded-bl-lg' : ''}`}>{setting.id}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900`}>{setting.setting}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-sm text-gray-600`}>{setting.status}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-right text-sm font-medium ${isLast ? 'rounded-br-lg' : ''}`}>
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(setting)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Edit</button>
          <button onClick={() => onDelete(setting.id)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Delete</button>
        </div>
      </td>
    </tr>
  );
};

const SecuritySection = () => {
  const securitySettings = [
    { id: 1, setting: 'Firewall', status: 'Enabled' },
    { id: 2, setting: 'Two-Factor Auth', status: 'Disabled' },
    { id: 3, setting: 'Encryption', status: 'Enabled' },
  ];

  const handleEdit = (setting) => {
    console.log(`Edit setting with id: ${setting.id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete setting with id: ${id}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Security</h2>
        <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm p-3 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Setting Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {securitySettings.map((setting, index) => (
                <SecurityRow
                  key={setting.id}
                  setting={setting}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isLast={index === securitySettings.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;