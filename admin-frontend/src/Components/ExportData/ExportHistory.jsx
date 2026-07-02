import React from 'react';
import { FiDownload } from 'react-icons/fi';
import StatusPill from './StatusPill';

const ExportHistory = ({ exportHistory, onDownload }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">Export History</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {['Filters', 'Format', 'Status', 'Actions'].map(header => (
                  <th
                    key={header}
                    className="px-5 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exportHistory.length > 0 ? (
                exportHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 truncate max-w-xs" title={item.filters}>
                      {item.filters}
                    </td>
                    <td className="px-5 py-3">{item.format}</td>
                    <td className="px-5 py-3">
                      <StatusPill status={item.status} />
                    </td>
                    <td className="px-5 py-3">
                      {item.status === 'Completed' ? (
                        <button
                          onClick={() => onDownload(item.downloadLink)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                        >
                          <FiDownload className="mr-1.5 h-4 w-4" /> Download
                        </button>
                      ) : (
                        <span className="text-gray-400 italic">Pending...</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-5 py-10 text-center text-neutral-900">
                    No export history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ExportHistory;
