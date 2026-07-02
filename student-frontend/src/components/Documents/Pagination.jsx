import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex justify-center items-center gap-2 mt-6 select-none"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition
          disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={`px-4 py-2 rounded border transition
              ${
                isActive
                  ? 'bg-gray-700 border-gray-700 text-white font-semibold shadow-inner'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
              }
            `}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition
          disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
