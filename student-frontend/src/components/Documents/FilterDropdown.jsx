import React, { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ categories, selectedCategory, onSelect }) => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={filterRef} className="relative select-none">
      <button
        onClick={() => setOpen(open => !open)}
        className="flex items-center gap-1 bg-white border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filter Documents by Category"
        type="button"
      >
        <Filter className="w-4 h-4" />
        <span>{selectedCategory === 'All' ? 'Filter' : selectedCategory}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 mt-1 w-48 max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-lg text-gray-700 z-10"
        >
          {categories.map((cat) => (
            <li
              key={cat}
              role="option"
              aria-selected={selectedCategory === cat}
              onClick={() => {
                onSelect(cat);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelect(cat);
                  setOpen(false);
                }
              }}
              tabIndex={0}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 ${
                selectedCategory === cat ? 'font-semibold bg-gray-200' : ''
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
