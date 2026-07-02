import React, { useState, useMemo, useEffect } from "react";
import { useAlert } from "../components/AlertContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Stats from "../components/Documents/Stats";
import Tabs from "../components/Documents/Tabs";
import SearchBar from "../components/Documents/SearchBar";
import FilterDropdown from "../components/Documents/FilterDropdown";
import DocumentsTable from "../components/Documents/DocumentsTable";
import Pagination from "../components/Documents/Pagination";
import ConfirmDialog from "../components/Documents/ConfirmDialog";

const PAGE_SIZE = 8;

const DocumentPage = () => {
  const navigate = useNavigate();

  // Get logged-in username from localStorage (replace as needed)
  const loggedUser = localStorage.getItem("user");

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [docs, setDocs] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Fetch documents from backend on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("/api/documents/all?moduleName=student");
        setDocs(response.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };
    fetchDocuments();
  }, []);

  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
    const cats = new Set(docs.map((doc) => doc.category));
    return ["All", ...Array.from(cats).sort()];
  }, [docs]);

  // Filter, search, and sort documents based on current state
  const filteredDocuments = useMemo(() => {
    let filtered = docs;

    if (activeTab === "mine") {
      filtered = filtered.filter((doc) => doc.uploadedBy === loggedUser);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((doc) => doc.category === selectedCategory);
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === "date") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          if (typeof aVal === "string") aVal = aVal.toLowerCase();
          if (typeof bVal === "string") bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [docs, activeTab, searchTerm, selectedCategory, sortConfig, loggedUser]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDocuments.length / PAGE_SIZE);
  const paginatedDocs = filteredDocuments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const { showAlert } = useAlert();
  const confirmDelete = (docId, docName) => {
    setSelectedDoc({ id: docId, name: docName });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `/api/documents/${selectedDoc.id}?moduleName=student`
      );
      setDocs((prev) => prev.filter((doc) => doc._id !== selectedDoc.id));
      setConfirmOpen(false);
      setSelectedDoc(null);
      showAlert("Document deleted successfully", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      showAlert("Document deletion failed", "error");
    }
  };

  // Reset page to 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, selectedCategory]);

  return (
    <Layout>
      <main className="px-8 bg-gray-50 min-h-screen text-gray-800">
        <h1 className="text-2xl font-semibold mb-6 select-none">Overview</h1>

        <Stats documents={docs} />

        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="flex justify-between items-center mb-4 select-none">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <div className="flex flex-1/3 justify-evenly items-center">
            <FilterDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <button
              onClick={() => navigate("/upload-doc")}
              className="py-2 px-3 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
              aria-label="Upload Document"
            >
              Upload Document
            </button>
          </div>
        </div>

        <DocumentsTable
          documents={paginatedDocs}
          onDelete={confirmDelete}
          sortConfig={sortConfig}
          onSort={requestSort}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete "${selectedDoc?.name}"? This action cannot be undone.`}
        />
      </main>
    </Layout>
  );
};

export default DocumentPage;
