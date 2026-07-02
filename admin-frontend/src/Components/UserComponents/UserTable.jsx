import React from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import Pagination from './Pagination';

const UserTable = ({
  users,
  currentPage,
  usersPerPage,
  paginate,
  searchTerm,
  setSearchTerm,
  filters,
  handleFilterChange,
  handleUserAction,
  roleOptions,
  statusOptions,
  departmentOptions,
}) => {
  const totalPages = Math.ceil(users.length / usersPerPage);

  const rolePillStyle = (role) => {
    const styles = {
      admin: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      faculty: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      student: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      alumni: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
      staff: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    };
    return `${
      styles[role?.toLowerCase()] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    } transition-colors duration-150`;
  };

  const statusPillStyle = (status) =>
    status?.toLowerCase() === 'active'
      ? 'bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-150'
      : 'bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-150';

  const renderFilterSelect = ({ key, options, label }) => (
    <div key={key} className="relative">
      <select
        value={filters[key]}
        onChange={(e) => handleFilterChange(key, e.target.value)}
        className="appearance-none w-full sm:w-40 bg-white border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm hover:bg-gray-50 transition-all duration-200"
      >
        <option value="All">{label} (All)</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );

  return (
    <section className="mb-8 bg-white p-6 rounded-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-neutral-900 mb-5">All Users</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="relative w-full md:flex-grow md:max-w-sm">
          <input
            type="text"
            placeholder="Search users by name, email, ID, mobile, role, or department"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange('role', 'All');
              handleFilterChange('status', 'All');
              handleFilterChange('department', 'All');
              paginate(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm hover:bg-gray-50 transition-all duration-200"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-wrap justify-start md:justify-end gap-3 w-full md:w-auto">
          {[
            { key: 'role', options: roleOptions, label: 'Role' },
            { key: 'status', options: statusOptions, label: 'Status' },
            { key: 'department', options: departmentOptions, label: 'Department' },
          ].map(renderFilterSelect)}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['User ID', 'Name', 'Email', 'Role', 'Department', 'Status', 'Actions'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.length > 0 ? (
              users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{user.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{user.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${rolePillStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{user.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${statusPillStyle(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium space-x-2">
                    <button
                      onClick={() => handleUserAction(user.id, 'Edit')}
                      className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-150"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleUserAction(user.id, 'Reset Password')}
                      className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-150"
                    >
                      Reset Password
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleUserAction(user.id, user.status === 'Active' ? 'Deactivate' : 'Activate')}
                      className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-150"
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-10 text-center text-gray-600">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        totalUsers={users.length}
        usersPerPage={usersPerPage}
      />
    </section>
  );
};
export default UserTable;