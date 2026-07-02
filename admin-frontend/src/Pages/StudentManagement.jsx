//src/Pages/StudentManagement.jsx
import React, { useState, useEffect, useCallback } from "react";

import StudentManagementHeader from "../Components/StudentManagement/StudentManagementHeader";
import StudentSearchFilterBar from "../Components/StudentManagement/StudentSearchFilterBar";
import StudentSummarySection from "../Components/StudentManagement/StudentSummarySection";
import StudentInformationTable from "../Components/StudentManagement/StudentInformationTable";
import StudentVisualAnalyticsSection from "../Components/StudentManagement/StudentVisualAnalyticsSection";

import EditStudentModal from "../Components/StudentManagement/Modals/EditStudentModal";
import ViewProfileModal from "../Components/StudentManagement/Modals/ViewProfileModal";
import DeleteStudentModal from "../Components/StudentManagement/Modals/DeleteStudentModal";

const SimpleNotification = ({ message, type, onDismiss }) => {
  if (!message) return null;

  const baseClasses = "fixed top-5 right-5 p-4 rounded-md shadow-lg text-sm z-[100] transition-all duration-300 ease-in-out";
  const typeClasses = {
    success: "bg-green-100 border border-green-300 text-green-700",
    error: "bg-red-100 border border-red-300 text-red-700",
    info: "bg-blue-100 border border-blue-300 text-blue-700",
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info} transform ${message ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <span className="mr-2">{message}</span>
      <button onClick={onDismiss} className="font-bold text-lg leading-none hover:opacity-75" aria-label="Dismiss notification">×</button>
    </div>
  );
};


const StudentManagement = () => {
  // --- Page Level State for Data ---
  const [summaryData, setSummaryData] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ data: [], totalStudents: 0, currentPage: 1, totalPages: 0 });
  const [enrollmentChartData, setEnrollmentChartData] = useState(null);
  const [placementChartData, setPlacementChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- State for Search, Filters, and Pagination ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [forceRefreshToggle, setForceRefreshToggle] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewProfileModalOpen, setIsViewProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [notification, setNotification] = useState({ message: '', type: '' });

  const showUserFeedback = (message, type = "info") => {
    setNotification({ message, type });
  };

  const dismissNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const refreshTablesAndSummary = useCallback(() => {
    setForceRefreshToggle(prev => !prev);
  }, []);

  const handleOpenEditStudentModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCloseEditStudentModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleEditSuccess = (editedStudentRollNo, updatedData) => {
    showUserFeedback(`Student (Roll No: ${editedStudentRollNo}) updated successfully.`, "success");
    refreshTablesAndSummary();
  };

  const handleEditError = (errorMessage) => {
    showUserFeedback(`Error updating student: ${errorMessage}`, "error");
    console.error("Error reported from EditStudentModal (in parent):", errorMessage);
  };

  const handleOpenViewProfileModal = (student) => {
    setSelectedStudent(student);
    setIsViewProfileModalOpen(true);
  };

  const handleCloseViewProfileModal = () => {
    setIsViewProfileModalOpen(false);
    setSelectedStudent(null);
  };

  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const handleDeleteSuccess = (deletedStudentRollNo) => {
    showUserFeedback(`Student (Roll No: ${deletedStudentRollNo}) deleted successfully.`, "success");
    refreshTablesAndSummary();
  };

  const handleDeleteError = (errorMessage) => {
    showUserFeedback(`Error deleting student: ${errorMessage}`, "error");
    console.error("Error reported from DeleteStudentModal (in parent):", errorMessage);
  };

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleFilterValueChange = (filterName, value) => {
    setActiveFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
        delete newFilters[filterName];
      } else {
        newFilters[filterName] = value;
      }
      return newFilters;
    });
  };

  useEffect(() => {
    // console.log("Search term or filters changed:", searchTerm, activeFilters);
  }, [searchTerm, activeFilters]);

  return (
    <div className="p-4 md:p-6 bg-neutral-100 min-h-screen">
      <SimpleNotification
        message={notification.message}
        type={notification.type}
        onDismiss={dismissNotification}
      />

      <StudentManagementHeader />

      <StudentSearchFilterBar
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange} // Removed the JSX comment from this line
        activeFilters={activeFilters}
        onFilterValueChange={handleFilterValueChange}
      />


      <StudentSummarySection
        activeFilters={activeFilters}
        key={`summary-${forceRefreshToggle}`}
      />

      <StudentInformationTable
        searchTerm={searchTerm}
        filters={activeFilters}
        onEditStudent={handleOpenEditStudentModal}
        onViewProfile={handleOpenViewProfileModal}
        onDeleteStudent={handleOpenDeleteModal}
        forceRefreshToggle={forceRefreshToggle}
      />

      <StudentVisualAnalyticsSection
        activeFilters={activeFilters}
        key={`analytics-${forceRefreshToggle}`}
      />

      {isEditModalOpen && selectedStudent && (
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditStudentModal}
          student={selectedStudent}
          onEditSuccess={handleEditSuccess}
          onEditError={handleEditError}
        />
      )}
      {isViewProfileModalOpen && selectedStudent && (
        <ViewProfileModal
          isOpen={isViewProfileModalOpen}
          onClose={handleCloseViewProfileModal}
          student={selectedStudent}
        />
      )}
      {isDeleteModalOpen && studentToDelete && (
        <DeleteStudentModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          student={studentToDelete}
          onDeleteSuccess={handleDeleteSuccess}
          onDeleteError={handleDeleteError}
        />
      )}
    </div>
  );
};

export default StudentManagement;