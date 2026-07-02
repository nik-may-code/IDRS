import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NotificationPagination = ({ currentPage, totalPages, onPageChange }) => {
  const validTotalPages = Math.max(1, totalPages);
  const validCurrentPage = Math.min(Math.max(1, currentPage), validTotalPages);
  return (
    <ReactPaginate
      previousLabel={<FiChevronLeft />}
      nextLabel={<FiChevronRight />}
      breakLabel="..."
      pageCount={validTotalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={({ selected }) => {
        const newPage = selected + 1;
        onPageChange(newPage);
      }}
      forcePage={validCurrentPage - 1}
      containerClassName="flex items-center space-x-2 text-sm"
      pageClassName=""
      pageLinkClassName="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
      activeLinkClassName="bg-black text-white"
      previousClassName=""
      nextClassName=""
      previousLinkClassName="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
      nextLinkClassName="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
      breakClassName=""
      breakLinkClassName="px-2 py-1 text-gray-700 w-8 h-8 flex items-center justify-center"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};

export default NotificationPagination;