// src/Components/StudentManagement/StudentManagementHeader.jsx
import React from 'react';
import { PlusCircle } from 'lucide-react';

const StudentManagementHeader = ({ onAddStudent }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Student Management</h1>
      <button
        onClick={onAddStudent}
        className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
      >
        <PlusCircle size={18} className="mr-2" /> Add Student
      </button>
    </div>
  );
};

export default StudentManagementHeader;