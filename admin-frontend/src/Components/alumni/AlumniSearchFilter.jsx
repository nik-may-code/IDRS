import React, { useContext } from 'react';
import { AlumniContext } from './AlumniProvider';
import { Search, ChevronDown, Filter } from 'lucide-react';

const AlumniSearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  selectedProgram,
  setSelectedProgram,
  selectedCompany,
  setSelectedCompany
}) => {
  const { alumniData } = useContext(AlumniContext);

  // Ensure alumniData is always an array
  const safeAlumniData = Array.isArray(alumniData) ? alumniData : [];

  // Derive unique options from alumniData
  const graduationYears = [...new Set(safeAlumniData.map(a => a.graduationYear))].filter(Boolean);
  const programs = [...new Set(safeAlumniData.map(a => a.program))].filter(Boolean);
  const companies = [...new Set(safeAlumniData.map(a => a.company))].filter(Boolean);

  // Helper to render a dropdown
  const renderDropdown = (label, options, value, setValue) => (
    <div className="flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 relative shadow-sm">
      <Filter size={16} className="text-gray-400" />
      <div className="relative w-36">
        <select
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-black-400 transition appearance-none"
          value={value}
          onChange={e => setValue(e.target.value)}
        >
          <option value="">{label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search alumni by name, student ID, or email"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {renderDropdown('Graduation Year', graduationYears, selectedYear, setSelectedYear)}
        {renderDropdown('Program', programs, selectedProgram, setSelectedProgram)}
        {renderDropdown('Company', companies, selectedCompany, setSelectedCompany)}
      </div>
    </div>
  );
};

export default AlumniSearchFilter;