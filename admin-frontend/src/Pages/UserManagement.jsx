import React, { useState, useMemo } from 'react';
import StatsCards from '../Components/UserComponents/StatsCards';
import UserTable from '../Components/UserComponents/UserTable';
import UserForm from '../Components/UserComponents/UserForm';

// Mock Data
const mockUsers = Array.from({ length: 100 }, (_, i) => {
  const role = ['Admin', 'Faculty', 'Student', 'Alumni'][i % 4];
  const engineeringDepartments = ['CSE', 'IT', 'ECE', 'Engineering'];
  const department = engineeringDepartments[i % engineeringDepartments.length];
  return {
    id: (1001 + i).toString(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    mobile: `+91${String(1000000000 + i).padStart(10, '0')}`,
    role,
    status: i % 7 === 0 ? 'Inactive' : 'Active',
    department,
  };
});

// Static Options
const DEPARTMENT_OPTIONS = ['CSE', 'IT', 'ECE', 'Engineering'];
const ROLE_OPTIONS = ['Admin', 'Faculty', 'Student', 'Alumni', 'Staff'];
const STATUS_OPTIONS = ['Active', 'Inactive'];

const UserManagement = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ role: 'All', status: 'All', department: 'All' });
  const usersPerPage = 7;

  // Filtering
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower) ||
        user.mobile.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower);
      const roleMatch = filters.role === 'All' || user.role === filters.role;
      const statusMatch = filters.status === 'All' || user.status === filters.status;
      const departmentMatch = filters.department === 'All' || user.department === filters.department;
      return searchMatch && roleMatch && statusMatch && departmentMatch;
    });
  }, [users, searchTerm, filters]);

  // Handlers
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredUsers.length / usersPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleAddUser = (userData, resetForm) => {
    const newUser = {
      id: (Math.max(0, ...users.map((u) => parseInt(u.id))) + 1).toString(),
      ...userData,
      status: 'Active',
    };
    setUsers((prev) => [newUser, ...prev]);
    resetForm();
    alert(`User ${userData.name} added! ID: ${newUser.id}`);
  };

  const handleUserAction = (userId, action) => {
    if (action === 'Deactivate' || action === 'Activate') {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: action === 'Activate' ? 'Active' : 'Inactive' } : user
        )
      );
      alert(`User ${action}d successfully`);
    } else if (action === 'Edit') {
      alert(`Editing user ${userId}. (Implement edit logic)`);
    } else if (action === 'Reset Password') {
      alert(`Resetting password for user ${userId}. (Implement reset logic)`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900">User Management</h1>
        <p className="text-sm text-gray-600 mt-1">Manage user accounts, roles, and permissions within the ERP system.</p>
      </div>
      <StatsCards users={users} />
      <UserTable
        users={filteredUsers}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        paginate={paginate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleUserAction={handleUserAction}
        roleOptions={ROLE_OPTIONS}
        statusOptions={STATUS_OPTIONS}
        departmentOptions={DEPARTMENT_OPTIONS}
      />
      <UserForm onSubmit={handleAddUser} roleOptions={ROLE_OPTIONS} departmentOptions={DEPARTMENT_OPTIONS} />
    </div>
  );
};
export default UserManagement;