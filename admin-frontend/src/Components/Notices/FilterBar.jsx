import { Search } from "lucide-react";

const FilterBar = ({ search, setSearch, audienceFilter, setAudienceFilter, dateFilter, setDateFilter }) => {

  return (
    <div className="flex flex-col items-start justify-between space-y-2 md:space-y-0">
      <div className="relative w-full ">
        <span className="absolute inset-y-0 flex items-center pl-3 text-zinc-500">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notices"
          className="pl-10 pr-4 py-2 bg-zinc-200 rounded-lg w-full focus:outline-none"
        />
      </div>
      <div className="flex space-x-2 mt-4">
        <select value={audienceFilter} onChange={(e) => setAudienceFilter(e.target.value)} className="bg-zinc-200 px-3 py-2 rounded-xl focus:outline-none text-sm">
          <option value="">All</option>
          <option value="Students">Students</option>
          <option value="Faculty">Faculty</option>
          <option value="HOD">HOD</option>
        </select>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="bg-zinc-200 px-3 py-2 rounded-xl focus:outline-none text-sm">
          <option value="">Date Range</option>
          <option value="week">Last 7 Days</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
