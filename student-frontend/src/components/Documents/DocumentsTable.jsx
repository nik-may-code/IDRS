import React from "react";
import { Trash2 } from "lucide-react";

const DocumentsTable = ({ documents, onDelete, sortConfig, onSort }) => (
  <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
    <table className="w-full text-sm text-gray-700 border-collapse">
      <thead className="bg-gray-100 select-none">
        <tr>
          {["name", "type", "category", "uploadedBy", "date"].map((key) => (
            <th
              key={key}
              onClick={() => onSort(key)}
              className="text-left px-4 py-3 border-b border-gray-300 cursor-pointer user-select-none"
              title="Click to sort"
              style={{ userSelect: "none" }}
              scope="col"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSort(key);
                }
              }}
            >
              <div className="flex items-center gap-1">
                {key === "name" && "Document Name"}
                {key === "type" && "Type"}
                {key === "category" && "Category"}
                {key === "uploadedBy" && "Uploaded By"}
                {key === "date" && "Date"}
                <span className="text-xs" aria-live="polite" aria-atomic="true">
                  {sortConfig.key === key
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </span>
              </div>
            </th>
          ))}
          <th className="text-left px-4 py-3 border-b border-gray-300 select-none">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {documents.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500 italic">
              No documents found.
            </td>
          </tr>
        ) : (
          documents.map((doc, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border-b border-gray-200">{doc.name}</td>
              <td className="px-4 py-3 border-b border-gray-200">{doc.type}</td>
              <td className="px-4 py-3 border-b border-gray-200">
                {doc.category}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">
                {doc.uploadedBy}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">{doc.date}</td>
              <td className="px-4 py-3 border-b border-gray-200 text-gray-700 font-medium flex gap-4 items-center select-none">
                <a
                  href={doc.filePath || doc.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:underline text-blue-600"
                  aria-label={`Download ${doc.name}`}
                  download
                >
                  Download
                </a>
                {doc.uploadedBy === localStorage.getItem("user") && (
                  <Trash2
                    className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                    onClick={() => onDelete(doc._id, doc.name)}
                    title="Delete"
                    role="button"
                    tabIndex={0}
                    aria-label={`Delete ${doc.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onDelete(doc._id, doc.name);
                      }
                    }}
                  />
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DocumentsTable;
