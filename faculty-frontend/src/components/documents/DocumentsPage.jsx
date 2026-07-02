import React, { useEffect, useState } from 'react';
import DocumentFilter from './DocumentFilter';
import DocumentTable from './DocumentTable';
import axios from 'axios';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('/api/documents');
        setDocuments(res.data);
        setFilteredDocuments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocuments();
  }, []);

  const handleSearch = (filters) => {
    const query = filters.query?.toLowerCase() || '';
    const result = documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query) ||
        doc.date.toLowerCase().includes(query)
    );
    setFilteredDocuments(result);
  };

  const handlePrint = () => {
    const content = document.getElementById('print-section')?.innerHTML;
    const original = document.body.innerHTML;
    if (content) {
      document.body.innerHTML = content;
      window.print();
      document.body.innerHTML = original;
      window.location.reload();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Documents</h2>
      <DocumentFilter onSearch={handleSearch} onPrint={handlePrint} />
      <div id="print-section">
        <DocumentTable documents={filteredDocuments} />
      </div>
    </div>
  );
};

export default DocumentsPage;
