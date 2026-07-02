import React, { useEffect, useState } from 'react';
import DocumentFilter from '../components/documents/DocumentFilter';
import DocumentTable from '../components/documents/DocumentTable';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const navigate = useNavigate();

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      const res = await api.get('/documents/all');
      console.log('📦 Fetched from backend:', res.data);
      setDocuments(res.data);
      setFilteredDocs(res.data);
    } catch (err) {
      console.error('❌ Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Format date for display
  const formatDateForDisplay = (isoDateString) => {
    if (!isoDateString) return '';
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Normalize string for searching
  const normalizeString = (str) => {
    if (typeof str !== 'string') return '';
    return str.toLowerCase().replace(/[\s-]/g, '');
  };

  // For comparing only date portion of ISO strings
  const getComparableDateString = (dateInput) => {
    if (!dateInput) return '';
    if (dateInput.includes('T')) {
      return dateInput.substring(0, 10);
    }
    return dateInput;
  };

  // Search handler
  const handleSearch = (filters) => {
    console.log('🔍 Received filters:', filters);
    let result = [...documents];

    const { type, name, fromDate, toDate } = filters;

    if (type) {
      const normalizedFilterType = normalizeString(type);
      result = result.filter(doc => {
        const normalizedDocType = normalizeString(doc.documentType);
        return normalizedDocType.includes(normalizedFilterType);
      });
    }

    if (name) {
      const normalizedFilterName = normalizeString(name);
      result = result.filter(doc => {
        const normalizedDocName = normalizeString(doc.documentName);
        return normalizedDocName.includes(normalizedFilterName);
      });
    }

    if (fromDate) {
      const filterFromDate = getComparableDateString(fromDate);
      result = result.filter(doc => {
        const docDate = getComparableDateString(doc.date);
        return docDate >= filterFromDate;
      });
    }

    if (toDate) {
      const filterToDate = getComparableDateString(toDate);
      result = result.filter(doc => {
        const docDate = getComparableDateString(doc.date);
        return docDate <= filterToDate;
      });
    }

    console.log('✅ Filtered documents:', result);
    setFilteredDocs(result);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await api.delete('/documents/' + id)
      setDocuments(prev => prev.filter(doc => doc._id !== id));
      setFilteredDocs(prev => prev.filter(doc => doc._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete document:', err);
      alert('Failed to delete document. Please try again.');
    }
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Documents</h1>
            <p className="text-gray-500">Search for Documents Uploaded By You...</p>
          </div>
          <button
            onClick={() => navigate('/documents/upload')}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
          >
            <span className="text-xl mr-1">+</span> Upload Document
          </button>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <DocumentFilter onSearch={handleSearch} onPrint={handlePrint} />
        </div>

        {/* Document Table */}
        <DocumentTable
          documents={filteredDocs}
          formatDateForDisplay={formatDateForDisplay}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Documents;
