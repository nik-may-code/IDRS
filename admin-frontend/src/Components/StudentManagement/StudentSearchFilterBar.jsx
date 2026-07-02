// src/Components/StudentManagement/StudentSearchFilterBar.jsx
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { fetchDistinctFilterOptions } from '../../api/StudentManagementApi'; 

const StudentSearchFilterBar = ({ searchTerm, onSearchTermChange, activeFilters, onFilterValueChange }) => {
    const [filterOptionsData, setFilterOptionsData] = useState({
        Branch: [],
        Batch: [],
        Status: [],
        Counselor: [],
    });
    const [loadingFilters, setLoadingFilters] = useState(true);

    useEffect(() => {
        const loadFilterOptions = async () => {
            setLoadingFilters(true);
            try {
                const data = await fetchDistinctFilterOptions();
                const sortedBatches = data.Batch 
                    ? [...data.Batch].sort((a, b) => {
                        const numA = parseInt(a, 10);
                        const numB = parseInt(b, 10);
                        if (!isNaN(numA) && !isNaN(numB)) {
                            return numB - numA; 
                        }
                        return String(b).localeCompare(String(a)); 
                      })
                    : [];

                setFilterOptionsData({
                    Branch: data.Branch || [],
                    Batch: sortedBatches,
                    Status: data.Status || ['Active', 'Graduated'], 
                    Counselor: data.Counselor || [],
                });
            } catch (error) {
                console.error("Failed to fetch filter options from backend:", error); 
                setFilterOptionsData({
                    Branch: [],
                    Batch: [],
                    Status: ['Active', 'Graduated'], 
                    Counselor: [],
                });
            } finally {
                setLoadingFilters(false);
            }
        };

        loadFilterOptions();
    }, []);

    const handleSelectChange = (filterName, value) => {
        onFilterValueChange(filterName, value);
    };

    return (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
            <div className="flex flex-wrap items-center gap-6">
                <div className="relative flex-grow" style={{ minWidth: '250px', maxWidth: '500px' }}>
                    <input
                        type="text"
                        placeholder="Search by Name, Roll No, Branch..."
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>

                {Object.entries(filterOptionsData).map(([filterName, options]) => (
                    (options.length > 0 || loadingFilters || filterName === 'Status') && 
                    <div key={filterName} className="relative min-w-[160px]">
                        <label htmlFor={filterName.toLowerCase().replace(/\s+/g, '-')} className="sr-only">
                            {filterName}
                        </label>
                        <select
                            id={filterName.toLowerCase().replace(/\s+/g, '-')}
                            name={filterName}
                            value={activeFilters[filterName] || ''}
                            onChange={(e) => handleSelectChange(filterName, e.target.value)}
                            disabled={loadingFilters && options.length === 0 && filterName !== 'Status'}
                            className="appearance-none w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2.5 px-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="">All {filterName}s</option>
                            {loadingFilters && options.length === 0 && filterName !== 'Status' && <option value="" disabled>Loading...</option>}
                            {!loadingFilters && options.length === 0 && filterName !== 'Status' && <option value="" disabled>No {filterName} available</option>}
                            
                            {options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentSearchFilterBar;