import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPages, paginate, totalUsers, usersPerPage }) => {

  // console.log({ currentPage, totalPages, totalUsers, usersPerPage });

  if (!totalPages || totalPages <= 1) return null;

  const indexOfFirstUser = (currentPage - 1) * usersPerPage + 1;
  const indexOfLastUser = Math.min(currentPage * usersPerPage, totalUsers);

  return (
    <div className="py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 mt-3">
      <p className="text-xs text-gray-600 mb-2 sm:mb-0 sm:mr-4 hidden sm:block">
        {indexOfFirstUser}-{indexOfLastUser} of {totalUsers}
      </p>
      {/* Pagination controls */}
      <ReactPaginate
        previousLabel={<FiChevronLeft className="h-4 w-4" />}
        nextLabel={<FiChevronRight className="h-4 w-4" />}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={1} 
        pageRangeDisplayed={2} 
        onPageChange={({ selected }) => paginate(selected + 1)} 
        forcePage={currentPage - 1} 
        containerClassName="inline-flex rounded-lg -space-x-px text-xs"
        pageClassName="border border-gray-200"
        pageLinkClassName="px-2.5 py-1.5 block text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-200"
        activeClassName="bg-gray-800 text-white"
        previousClassName="border border-gray-200 rounded-l-lg"
        nextClassName="border border-gray-200 rounded-r-lg"
        previousLinkClassName="px-2 py-1.5 block text-gray-600 hover:bg-gray-900 hover:text-white"
        nextLinkClassName="px-2 py-1.5 block text-gray-600 hover:bg-gray-900 hover:text-white"
        breakClassName="border border-gray-200"
        breakLinkClassName="px-2.5 py-1.5 block text-gray-600"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;