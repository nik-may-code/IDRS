import React, { useState } from 'react';

const InfrastructureRow = ({ infra, onEdit, onDelete, isLast }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 ${isLast ? 'rounded-bl-lg' : ''}`}>{infra.id}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900`}>{infra.name}</td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{infra.status}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-right text-sm font-medium ${isLast ? 'rounded-br-lg' : ''}`}>
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(infra)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Edit</button>
          <button onClick={() => onDelete(infra.id)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Delete</button>
        </div>
      </td>
    </tr>
  );
};

const EditInfrastructureModal = ({ infra, onClose, onSave }) => {
  const [name, setName] = useState(infra.name);
  const [status, setStatus] = useState(infra.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !status) {
      alert('Please fill in all fields.');
      return;
    }
    onSave({ ...infra, name, status });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Edit Infrastructure Item</h3>
          <button onClick={onClose} className="modal-close-button">×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="form-modal">
            <div className="form-group">
              <label htmlFor="editInfraName">Resource Name:</label>
              <input type="text" id="editInfraName" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="editInfraStatus">Status:</label>
              <select id="editInfraStatus" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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

export default function Infrastructure() {
  const [infrastructureItems, setInfrastructureItems] = useState([
    { id: 1, name: 'Server A', status: 'Active' },
    { id: 2, name: 'Server B', status: 'Inactive' },
    { id: 3, name: 'Server C', status: 'Active' },
  ]);

  const [isEditInfrastructureModalOpen, setIsEditInfrastructureModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEditInfrastructure = (updatedInfra) => {
    setInfrastructureItems(prevInfras =>
      prevInfras.map(infra => (infra.id === updatedInfra.id ? updatedInfra : infra))
    );
    setIsEditInfrastructureModalOpen(false);
    setSelectedInfrastructure(null);
  };

  const handleDeleteInfrastructure = (infraId) => {
    setInfrastructureItems(prevInfras => prevInfras.filter(infra => infra.id !== infraId));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const openEditInfrastructureModal = (infra) => {
    setSelectedInfrastructure(infra);
    setIsEditInfrastructureModalOpen(true);
  };

  const openDeleteConfirmation = (id) => {
    setItemToDelete({ type: 'infrastructure item', id });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete.type === 'infrastructure item') {
      handleDeleteInfrastructure(itemToDelete.id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Infrastructure</h2>
        <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm p-3 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Resource Name</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {infrastructureItems.map((item, index) => (
                <InfrastructureRow
                  key={item.id}
                  infra={item}
                  onEdit={openEditInfrastructureModal}
                  onDelete={openDeleteConfirmation}
                  isLast={index === infrastructureItems.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditInfrastructureModalOpen && selectedInfrastructure && (
        <EditInfrastructureModal infra={selectedInfrastructure} onClose={() => setIsEditInfrastructureModalOpen(false)} onSave={handleEditInfrastructure} />
      )}
      {isDeleteModalOpen && itemToDelete && (
        <DeleteConfirmationModal itemType={itemToDelete.type} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
}