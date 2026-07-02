import { Search } from "lucide-react";

const FilterBar = ({ search, setSearch, audienceFilter, setAudienceFilter, dateFilter, setDateFilter }) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 w-full">
      <div className="relative w-full md:flex-grow">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by notice title..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <select 
        value={audienceFilter} 
        onChange={(e) => setAudienceFilter(e.target.value)} 
        className="w-full md:w-auto md:min-w-[160px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="">All Recipients</option>
        <option value="All">All</option>
        <option value="Students">Students</option>
        <option value="Faculty">Faculty</option>
        <option value="HOD">HOD</option>
      </select>

      <select 
        value={dateFilter} 
        onChange={(e) => setDateFilter(e.target.value)} 
        className="w-full md:w-auto md:min-w-[160px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="">Any Time</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
      
    </div>
  );
};

export default FilterBar;