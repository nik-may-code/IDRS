import React, { useState } from 'react';

const DocumentTypeRow = ({ docType, onEdit, onDelete, isLast }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 ${isLast ? 'rounded-bl-lg' : ''}`}>{docType.id}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900`}>{docType.type}</td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{docType.format}</td>
      <td className={`px-4 py-4 whitespace-nowrap text-right text-sm font-medium ${isLast ? 'rounded-br-lg' : ''}`}>
        <div className="flex justify-end space-x-2">
          <button onClick={() => onEdit(docType)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Edit</button>
          <button onClick={() => onDelete(docType.id)} className="bg-neutral-800 hover:bg-neutral-600 text-white px-3 py-1 rounded shadow-sm hover:shadow transition-all duration-150">Delete</button>
        </div>
      </td>
    </tr>
  );
};

const EditDocumentTypeModal = ({ docType, onClose, onSave }) => {
  const [type, setType] = useState(docType.type);
  const [format, setFormat] = useState(docType.format);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !format) {
      alert('Please fill in all fields.');
      return;
    }
    onSave({ ...docType, type, format });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">Edit Document Type</h3>
          <button onClick={onClose} className="modal-close-button">×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="form-modal">
            <div className="form-group">
              <label htmlFor="editDocumentType">Document Type:</label>
              <input type="text" id="editDocumentType" value={type} onChange={(e) => setType(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="editDocumentFormat">Format:</label>
              <input type="text" id="editDocumentFormat" value={format} onChange={(e) => setFormat(e.target.value)} required />
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

export default function DocumentType() {
  const [documentTypes, setDocumentTypes] = useState([
    { id: 1, type: 'Invoice', format: 'PDF' },
    { id: 2, type: 'Report', format: 'DOCX' },
    { id: 3, type: 'Contract', format: 'PDF' },
  ]);

  const [isEditDocumentTypeModalOpen, setIsEditDocumentTypeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEditDocumentType = (updatedDocType) => {
    setDocumentTypes(prevDocTypes =>
      prevDocTypes.map(doc => (doc.id === updatedDocType.id ? updatedDocType : doc))
    );
    setIsEditDocumentTypeModalOpen(false);
    setSelectedDocumentType(null);
  };

  const handleDeleteDocumentType = (docTypeId) => {
    setDocumentTypes(prevDocTypes => prevDocTypes.filter(doc => doc.id !== docTypeId));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const openEditDocumentTypeModal = (docType) => {
    setSelectedDocumentType(docType);
    setIsEditDocumentTypeModalOpen(true);
  };

  const openDeleteConfirmation = (id) => {
    setItemToDelete({ type: 'document type', id });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete.type === 'document type') {
      handleDeleteDocumentType(itemToDelete.id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Document Types</h2>
        <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm p-3 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Document Type</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Format</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {documentTypes.map((doc, index) => (
                <DocumentTypeRow
                  key={doc.id}
                  docType={doc}
                  onEdit={openEditDocumentTypeModal}
                  onDelete={openDeleteConfirmation}
                  isLast={index === documentTypes.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditDocumentTypeModalOpen && selectedDocumentType && (
        <EditDocumentTypeModal docType={selectedDocumentType} onClose={() => setIsEditDocumentTypeModalOpen(false)} onSave={handleEditDocumentType} />
      )}
      {isDeleteModalOpen && itemToDelete && (
        <DeleteConfirmationModal itemType={itemToDelete.type} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
}