import { Search, Filter, ChevronDown } from 'lucide-react';

const SearchFilter = ({ searchTerm, setSearchTerm, filterOpen, setFilterOpen }) => (
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
      {['Graduation Year', 'Program', 'Company'].map((label, i) => (
        <button
          key={label}
          onClick={() => i === 0 && setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Filter size={16} />
          {label}
          <ChevronDown
            size={16}
            className={`transform transition-transform ${i === 0 && filterOpen ? 'rotate-180' : ''}`}
          />
        </button>
      ))}
    </div>
  </div>
);

export default SearchFilter;
