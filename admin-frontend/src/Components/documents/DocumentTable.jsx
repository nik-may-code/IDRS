import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 5;

const DocumentTable = ({ documents, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 if documents change and current page is out of range
  useEffect(() => {
    const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > totalPages) setCurrentPage(1);
  }, [documents, currentPage]);

  const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE) || 1;
  const paginatedDocs = documents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      if (onDelete) onDelete(id);
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'prev' ? Math.max(prev - 1, 1) : Math.min(prev + 1, totalPages)
    );
  };

  return (
    <div id="print-section" className="print:m-0 print:p-0">
      {/* ...existing UI code... */}
      <div className="hidden print:block text-center mb-4 print:mb-2">
        <h1 className="text-lg font-bold uppercase">
          KAKATIYA INSTITUTE OF TECHNOLOGY & SCIENCE
        </h1>
        <hr className="border-t-2 border-black mt-1 mb-4 print:mb-2" />
      </div>

      <div className="overflow-x-auto print:overflow-visible border border-black print:m-0 print:p-0">
        <table className="w-full print:table-fixed divide-y divide-gray-200 table-auto print:break-inside-avoid">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Type</th>
              <th className="hidden print:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="hidden print:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume / Issue / Pages</th>
              <th className="hidden print:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publication</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Achievements / Remarks</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase print:hidden">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm print:break-inside-avoid">
            {paginatedDocs.length > 0 ? (
              paginatedDocs.map((doc, index) => {
                const volumeDetails = [
                  doc.volume ? `Vol. ${doc.volume}` : null,
                  doc.issue ? `Issue ${doc.issue}` : null,
                  doc.pages ? `pp. ${doc.pages}` : null,
                ]
                  .filter(Boolean)
                  .join(', ');

                return (
                  <tr key={doc._id} className="print:break-inside-avoid">
                    <td className="px-3 py-2">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td className="px-3 py-2">{doc.documentName?.trim() || '-'}</td>
                    <td className="px-3 py-2">{doc.date ? new Date(doc.date).toLocaleDateString('en-GB') : '-'}</td>
                    <td className="px-3 py-2">{doc.documentType?.trim() || '-'}</td>
                    <td className="hidden print:table-cell px-3 py-2">
                      {(doc.type && doc.type.trim() !== '') ? doc.type : 'National'}
                    </td>
<td className="hidden print:table-cell px-3 py-2">
  {[
    doc.volume ? `Vol. ${doc.volume}` : null,
    doc.issue ? `Issue ${doc.issue}` : null,
    doc.pages ? `pp. ${doc.pages}` : null,
  ].filter(Boolean).join(', ') || '-'}
</td>
                    <td className="hidden print:table-cell px-3 py-2">{doc.publication?.trim() || '-'}</td>
                    <td className="px-3 py-2">{doc.remarks?.trim() || '-'}</td>
                    <td className="px-3 py-2 print:hidden">
<a
  href={doc.filePath}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-900 underline mr-4"
>
  Download
</a>

                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-600 hover:text-red-900 underline"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500 print:break-inside-avoid">
                  No documents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4 print:hidden">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;