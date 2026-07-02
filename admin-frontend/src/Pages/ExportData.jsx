  import React, { useState } from 'react';
  // import DataTypeSelector from '../Components/ExportData/DataTypeSelector';
  import Filters from '../Components/ExportData/Filters';
  import OutputFormatSelector from '../Components/ExportData/OutputFormatSelector';
  import ExportButton from '../Components/ExportData/ExportButton';
  import ExportHistory from '../Components/ExportData/ExportHistory';


const OUTPUT_FORMATS = ['CSV', 'Excel', 'PDF'];
const ROLE_OPTIONS = ['Admin', 'Faculty', 'Student', 'Alumni', 'Staff'];
const STATUS_OPTIONS = ['Active', 'Inactive'];

const initialExportHistory = [
  {
    id: 1,
    filters: 'Name: Alex, Role: Admin',
    format: 'CSV',
    status: 'Completed',
    timestamp: new Date().toISOString(),
    downloadLink: '#',
  },
  {
    id: 2,
    filters: 'Status: Active',
    format: 'PDF',
    status: 'Completed',
    timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    downloadLink: '#',
  },
];

const ExportData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOutputFormat, setSelectedOutputFormat] = useState('');
  const [exportHistory, setExportHistory] = useState(initialExportHistory);

  const allFieldsSelected =
    selectedRole && selectedRole !== 'Select Role' &&
    selectedStatus && selectedStatus !== 'Select Status' &&
    selectedOutputFormat;

  const handleExport = () => {
    if (!allFieldsSelected) {
      alert('Please select Role, Status, and Output Format before exporting.');
      return;
    }

    const filterSummary = [
      ...(searchTerm ? [`Search: ${searchTerm}`] : []),
      `Role: ${selectedRole}`,
      `Status: ${selectedStatus}`,
    ].join(', ');

    const newExportEntry = {
      id: exportHistory.length > 0 ? Math.max(...exportHistory.map(item => item.id)) + 1 : 1,
      filters: filterSummary,
      format: selectedOutputFormat,
      status: 'Processing',
      timestamp: new Date().toISOString(),
      downloadLink: '#',
    };

    setExportHistory(prev => [newExportEntry, ...prev]);

    setTimeout(() => {
      setExportHistory(prev =>
        prev.map(item =>
          item.id === newExportEntry.id
            ? {
                ...item,
                status: 'Completed',
                downloadLink: `/downloads/export-${newExportEntry.id}.${selectedOutputFormat.toLowerCase()}`
              }
            : item
        )
      );
    }, 2000);
  };

  const handleDownloadHistory = (downloadLink) => {
    if (downloadLink && downloadLink !== '#') {
      alert(`Downloading from: ${downloadLink}`);
    } else {
      alert('Download link not available yet or invalid.');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Export Data</h1>
          <p className="text-sm text-gray-500 mt-1">
            Apply filters and choose output formats for export.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg mb-10">
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            roleOptions={ROLE_OPTIONS}
            statusOptions={STATUS_OPTIONS}
          />
          <OutputFormatSelector
            outputFormats={OUTPUT_FORMATS}
            selectedOutputFormat={selectedOutputFormat}
            setSelectedOutputFormat={setSelectedOutputFormat}
          />
          <ExportButton onExport={handleExport} isEnabled={allFieldsSelected} />
        </div>

        <ExportHistory
          exportHistory={exportHistory}
          onDownload={handleDownloadHistory}
        />
      </div>
    </div>
  );
};

export default ExportData;
