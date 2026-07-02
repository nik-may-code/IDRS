import React, { useState } from 'react';

// Import new components with updated paths
import HeaderSection from '../Components/FacultyManagement/HeaderSection';
import KeyInformationCards from '../Components/FacultyManagement/KeyInformationCards';
import FacultyListSection from '../Components/FacultyManagement/FacultyListSection';
import PendingLeaveRequestsSection from '../Components/FacultyManagement/PendingLeaveRequestsSection';
import NewFacultyJoiningSection from '../Components/FacultyManagement/NewFacultyJoiningSection';
import VisualAnalyticsSection from '../Components/FacultyManagement/VisualAnalyticsSection';

// Placeholder Data
const keyInfoData = [
  { title: 'Total Faculty', value: '150' },
  { title: 'Leaves Taken', value: '30' },
  { title: 'New Leave Requests', value: '5' },
  { title: 'New Faculty Notices', value: '10' },
  { title: 'New Faculty Joining', value: '2' },
];

const facultyListData = [
  { id: 1, name: 'Dr. Ethan Carter', department: 'Computer Science', role: 'Professor', emailId: 'ethan.carter@example.edu', status: 'Active', leavesTaken: 5, salary: '$120,000', lastActivity: '2 days ago' },
  { id: 2, name: 'Dr. Olivia Bennett', department: 'Mathematics', role: 'Associate Professor', emailId: 'olivia.bennett@example.edu', status: 'Active', leavesTaken: 3, salary: '$110,000', lastActivity: '1 week ago' },
  { id: 3, name: 'Dr. Noah Thompson', department: 'Physics', role: 'Assistant Professor', emailId: 'noah.thompson@example.edu', status: 'Active', leavesTaken: 2, salary: '$100,000', lastActivity: '3 days ago' },
];

const pendingLeaveRequestsData = [
  { id: 1, facultyName: 'Dr. Ethan Carter', department: 'Computer Science', startDate: '2024-07-15', endDate: '2024-07-20', reason: 'Medical', status: 'Pending' },
];

const newFacultyJoiningData = [
  { id: 1, facultyName: 'Dr. Jackson Lewis', department: 'Economics', role: 'Professor', joiningDate: '2024-07-01', status: 'Joined' },
];

const leavesByMonthData = [
  { name: 'Jan', leaves: 12 }, { name: 'Feb', leaves: 10 }, { name: 'Mar', leaves: 15 },
  { name: 'Apr', leaves: 8 }, { name: 'May', leaves: 11 }, { name: 'Jun', leaves: 13 },
  { name: 'Jul', leaves: 9 }, { name: 'Aug', leaves: 14 }, { name: 'Sep', leaves: 7 },
  { name: 'Oct', leaves: 10 }, { name: 'Nov', leaves: 12 }, { name: 'Dec', leaves: 16 },
];

const facultyNoticeActivityData = [
  { name: 'Jan', activity: 20 }, { name: 'Feb', activity: 25 }, { name: 'Mar', activity: 22 },
  { name: 'Apr', activity: 28 }, { name: 'May', activity: 26 }, { name: 'Jun', activity: 30 },
];

const facultyHeadcountGrowthData = [
  { year: '2020', count: 120 },
  { year: '2021', count: 130 },
  { year: '2022', count: 135 },
  { year: '2023', count: 145 },
  { year: '2024', count: 150 },
];

const FacultyManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Department');
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };



  const filteredFacultyList = facultyListData.filter(faculty => {
    const term = searchTerm.toLowerCase();
    const nameMatch = faculty.name.toLowerCase().includes(term);
    const departmentMatch = faculty.department.toLowerCase().includes(term);
    const emailMatch = faculty.emailId.toLowerCase().includes(term);
    
    let tabMatch = true; // Add actual tab-based filtering logic if needed

    return (nameMatch || departmentMatch || emailMatch) && tabMatch;
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <HeaderSection />
      <KeyInformationCards keyInfoData={keyInfoData} />
      <FacultyListSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredFacultyList={filteredFacultyList}
      />
      <PendingLeaveRequestsSection pendingLeaveRequestsData={pendingLeaveRequestsData} />
      <NewFacultyJoiningSection newFacultyJoiningData={newFacultyJoiningData} />
      <VisualAnalyticsSection
        leavesByMonthData={leavesByMonthData}
        facultyNoticeActivityData={facultyNoticeActivityData}
        facultyHeadcountGrowthData={facultyHeadcountGrowthData}
      />
    </div>
  );
};

export default FacultyManagementPage;