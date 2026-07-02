import React, { useState } from 'react';

const DepartmentRow = ({ department, onEdit, onDelete, isLast }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 ${isLast ? 'rounded-bl-lg' : ''}`}>{department.id}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900`}>{department.name}</td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{department.head}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-right text-sm font-medium ${isLast ? 'rounded-br-lg' : ''}`}>
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(department)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Edit</button>
          <button onClick={() => onDelete(department.id)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Delete</button>
        </div>
      </td>
    </tr>
  );
};

const EditDepartmentModal = ({ department, onClose, onSave }) => {
  const [name, setName] = useState(department.name);
  const [head, setHead] = useState(department.head);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !head) {
      alert('Please fill in all fields.');
      return;
    }
    onSave({ ...department, name, head });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Edit Department</h3>
          <button onClick={onClose} className="modal-close-button">×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="form-modal">
            <div className="form-group">
              <label htmlFor="editDepartmentName">Department Name:</label>
              <input type="text" id="editDepartmentName" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="editDepartmentHead">Head:</label>
              <input type="text" id="editDepartmentHead" value={head} onChange={(e) => setHead(e.target.value)} required />
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

const Department = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Engineering', head: 'John Doe' },
    { id: 2, name: 'Marketing', head: 'Jane Smith' },
    { id: 3, name: 'Sales', head: 'Mike Johnson' },
  ]);

  const [isEditDepartmentModalOpen, setIsEditDepartmentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEditDepartment = (updatedDepartment) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) => (dept.id === updatedDepartment.id ? updatedDepartment : dept))
    );
    setIsEditDepartmentModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = (deptId) => {
    setDepartments((prevDepartments) => prevDepartments.filter((dept) => dept.id !== deptId));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const openEditDepartmentModal = (department) => {
    setSelectedDepartment(department);
    setIsEditDepartmentModalOpen(true);
  };

  const openDeleteConfirmation = (id) => {
    setItemToDelete({ type: 'department', id });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete.type === 'department') {
      handleDeleteDepartment(itemToDelete.id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Departments</h2>
        <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm p-3 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Department Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Head</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {departments.map((dept, index) => (
                <DepartmentRow
                  key={dept.id}
                  department={dept}
                  onEdit={openEditDepartmentModal}
                  onDelete={openDeleteConfirmation}
                  isLast={index === departments.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditDepartmentModalOpen && selectedDepartment && (
        <EditDepartmentModal department={selectedDepartment} onClose={() => setIsEditDepartmentModalOpen(false)} onSave={handleEditDepartment} />
      )}
      {isDeleteModalOpen && itemToDelete && (
        <DeleteConfirmationModal itemType={itemToDelete.type} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

export default Department;