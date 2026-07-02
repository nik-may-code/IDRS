//src/components/StudentManagement/StudentInformationTable.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchStudentInformation } from '../../api/StudentManagementApi';
import Pagination from './Pagination';
import { Eye, Edit3, Trash2 } from 'lucide-react';

const STUDENTS_PER_PAGE = 5;

const StudentInformationTable = ({ searchTerm, filters, onEditStudent, onViewProfile, onDeleteStudent, forceRefreshToggle }) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border border-green-300';
      case 'Inactive':
        return 'bg-red-100 text-red-700 border border-red-300';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'Graduated':
        return 'bg-slate-100 text-slate-700 border border-slate-300';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  const loadStudentInformation = useCallback(async (pageToLoad) => {
    setLoading(true);
    setError('');
    try {
      const allRequestFilters = { ...filters };
      if (searchTerm) {
        allRequestFilters.searchTerm = searchTerm;
      }
      const response = await fetchStudentInformation(allRequestFilters, pageToLoad, STUDENTS_PER_PAGE);

      setStudentInfo(response.students || []);
      setTotalStudents(response.totalStudents || 0);
      setTotalPages(response.totalPages || 0);
      setCurrentPage(response.currentPage || pageToLoad);

    } catch (err) {
      setError(err.message || "Could not load student data. Please try again.");
      setStudentInfo([]);
      setTotalStudents(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters]);

  useEffect(() => {
    loadStudentInformation(1);
  }, [loadStudentInformation, forceRefreshToggle]);

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage && pageNumber > 0 && pageNumber <= totalPages) {
      loadStudentInformation(pageNumber);
    }
  };

  if (loading && studentInfo.length === 0 && !error) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
        <div className="text-neutral-500">Loading student information...</div>
      </div>
    );
  }

  return (
    <section className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-neutral-800 mb-5">Student Information</h2>
      {loading && <div className="text-center py-2 text-sm text-neutral-500 animate-pulse">Updating table...</div>}

      {error && (
        <div className="my-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50">
            <tr>
              {['Student Name', 'Roll No.', 'Branch', 'Batch', 'Status', 'Counselor'].map(header => (
                <th key={header} scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
              <th scope="col" className="px-5 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {!loading && studentInfo.length > 0 ? (
              studentInfo.map((student) => (
                <tr key={student.rollNo || student._id} className="hover:bg-neutral-50 transition-colors duration-150">
                  <td className="px-5 py-4 whitespace-nowrap text-neutral-900 font-medium">{student.name}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-neutral-600">{student.rollNo}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-neutral-600">{student.branch}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-neutral-600">{student.batch}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-block text-xs leading-4 font-semibold rounded-full ${getStatusClasses(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-neutral-600">{student.counselor || 'N/A'}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onViewProfile(student)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition-colors duration-150"
                        title="View Profile"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onEditStudent(student)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-150"
                        title="Edit Student"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(student)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-150"
                        title="Delete Student"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center text-neutral-500 py-10">
                {loading ? 'Loading...' : (error ? ' ' : 'No students found matching your criteria.')}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
      {!loading && totalStudents > 0 && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={handlePageClick}
            totalRecords={totalStudents}
            recordsPerPage={STUDENTS_PER_PAGE}
          />
        </div>
      )}
      {!loading && totalStudents > 0 && totalPages <= 1 && (
         <div className="py-3 flex items-center justify-start border-t border-gray-100 mt-3">
            <p className="text-xs text-gray-600">
                1-{totalStudents} of {totalStudents}
            </p>
         </div>
      )}
    </section>
  );
};

export default StudentInformationTable;