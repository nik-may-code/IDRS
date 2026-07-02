// src/components/SearchBar.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex gap-3 mb-8 items-center">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search datasets..."
          className="w-full bg-white border border-neutral-800 text-neutral-200 placeholder-neutral-500 px-4 py-3 rounded-md focus:ring-2 outline-none pr-10"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
      </div>
      <button className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium px-6 py-4 rounded-md text-sm">
        Search
      </button>
    </div>
  );
};

export default SearchBar;