import React, { useState } from 'react';

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-end space-x-2">
      <button onClick={onEdit} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150 text-sm">
        Edit
      </button>
      <button onClick={onDelete} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150 text-sm">
        Delete
      </button>
    </div>
  );
};

const UserRoleRow = ({ role, onEdit, onDelete, isLast }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 ${isLast ? 'rounded-bl-lg' : ''}`}>{role.id}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900`}>{role.name}</td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{role.description}</td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{role.permissions}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-right text-sm font-medium min-w-[120px] ${isLast ? 'rounded-br-lg' : ''}`}>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
};

const EditRoleModal = ({ role, onClose, onSave }) => {
  const [roleName, setRoleName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [permissions, setPermissions] = useState(role.permissions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleName || !description || !permissions) {
      alert('Please fill in all fields.');
      return;
    }
    onSave({ id: role.id, name: roleName, description, permissions });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Edit Role</h3>
          <button onClick={onClose} className="modal-close-button">×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="form-modal">
            <div className="form-group">
              <label htmlFor="editRoleName">Role Name:</label>
              <input type="text" id="editRoleName" value={roleName} onChange={(e) => setRoleName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="editDescription">Description:</label>
              <input type="text" id="editDescription" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="editPermissions">Permissions:</label>
              <input type="text" id="editPermissions" value={permissions} onChange={(e) => setPermissions(e.target.value)} required />
            </div>
            <div className="modal-actions">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ itemType, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Confirm Deletion</h3>
          <button onClick={onClose} className="modal-close-button">×</button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this {itemType}?</p>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="button" onClick={onConfirm} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserRole = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full access to all features', permissions: 'All Permissions' },
    { id: 2, name: 'Editor', description: 'Can edit content but not settings', permissions: 'Edit Content' },
    { id: 3, name: 'Viewer', description: 'Read-only access', permissions: 'View Only' },
  ]);

  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEditRole = (updatedRole) => {
    setRoles((prevRoles) => prevRoles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
    setIsEditRoleModalOpen(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const openEditRoleModal = (role) => {
    setSelectedRole(role);
    setIsEditRoleModalOpen(true);
  };

  const openDeleteConfirmation = (id) => {
    setItemToDelete({ type: 'role', id });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete.type === 'role') {
      handleDeleteRole(itemToDelete.id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">User Roles</h2>
        <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm p-3 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Permissions</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {roles.map((role, index) => (
                <UserRoleRow
                  key={role.id}
                  role={role}
                  onEdit={() => openEditRoleModal(role)}
                  onDelete={() => openDeleteConfirmation(role.id)}
                  isLast={index === roles.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditRoleModalOpen && selectedRole && (
        <EditRoleModal role={selectedRole} onClose={() => setIsEditRoleModalOpen(false)} onSave={handleEditRole} />
      )}
      {isDeleteModalOpen && itemToDelete && (
        <DeleteConfirmationModal itemType={itemToDelete.type} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

// Add CSS styles with BLACK Save Changes button
const styles = `
  .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
  .modal-dialog { background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; width: 400px; max-width: 90%; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .modal-title { font-size: 1.25rem; font-weight: 600; color: #374151; }
  .modal-close-button { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #4b5563; }
  .modal-body { max-height: 60vh; overflow-y: auto; }
  .form-modal { display: flex; flex-direction: column; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.25rem; }
  .form-group label { font-size: 0.875rem; font-weight: 500; color: #4b5563; }
  .form-group input, .form-group select { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; font-size: 0.875rem; box-sizing: border-box; }
  .form-group input:focus, .form-group select:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2); }
  .modal-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; }
  .btn { padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.875rem; transition: background-color 0.15s ease-in-out; }
  .btn-primary { background-color: #000000; color: white; }
  .btn-primary:hover { background-color: #333333; }
  .btn-secondary { background-color: #6b7280; color: white; }
  .btn-secondary:hover { background-color: #4b5563; }
  .btn-danger { background-color: #dc2626; color: white; }
  .btn-danger:hover { background-color: #b91c1c; }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default UserRole;