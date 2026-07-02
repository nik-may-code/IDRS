import React, { useState, useContext } from 'react';
import { Plus } from 'lucide-react';
import AlumniCard from '../Components/alumni/AlumniCard';
import AddAlumniModal from '../Components/alumni/AddAlumniModal';
import AlumniSearchFilter from '../Components/alumni/AlumniSearchFilter';
import AlumniStats from '../Components/alumni/AlumniStats';
import { AlumniProvider, AlumniContext } from '../Components/alumni/AlumniProvider';

const AlumniManagementContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const { alumniData, setAlumniData } = useContext(AlumniContext);

  // Ensure alumniData is always an array
  const safeAlumniData = Array.isArray(alumniData) ? alumniData : [];

  // Filter alumni based on search term and dropdowns
 const filteredAlumni = safeAlumniData.filter(alumni => {
  const matchesSearch =
    (alumni.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (alumni.studentId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (alumni.email || '').toLowerCase().includes(searchTerm.toLowerCase());

  const matchesYear = selectedYear ? alumni.graduationYear === selectedYear : true;
  const matchesProgram = selectedProgram ? alumni.program === selectedProgram : true;
  const matchesCompany = selectedCompany ? alumni.company === selectedCompany : true;

  return matchesSearch && matchesYear && matchesProgram && matchesCompany;
});
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Alumni Management</h1>

      {/* Stats Cards */}
      <AlumniStats />

      {/* Search & Filter */}
      <AlumniSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />

      {/* Alumni List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-neutral-900">Alumni Details</h2>
        </div>

        {filteredAlumni.map((alumni, idx) => (
          <AlumniCard key={alumni._id || alumni.id || idx} alumni={alumni} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-900 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Alumni
        </button>
      </div>

      {/* Add Alumni Modal */}
      {showAddModal && (
        <AddAlumniModal
          onClose={() => setShowAddModal(false)}
          onSave={(newAlumni) => {
            setAlumniData(prev => Array.isArray(prev) ? [...prev, newAlumni] : [newAlumni]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

// Wrap the content with the provider
const AlumniManagement = () => (
  <AlumniProvider>
    <AlumniManagementContent />
  </AlumniProvider>
);

export default AlumniManagement;