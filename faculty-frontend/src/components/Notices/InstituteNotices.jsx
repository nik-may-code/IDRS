import React, { useState, useEffect } from 'react';
import api from '../../api/notice/api'; 


const NoticeItem = ({ notice }) => (
    <div className="flex justify-between items-start py-8 border-b border-gray-200 last:border-b-0">
        <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-900">{notice.title}</h2>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>
                    Posted by: <span className="font-medium text-gray-800">{notice.userid?.name || 'Unknown Author'}</span>
                </span>
                <span>|</span>
                <span>
                    For: <span className="font-medium text-gray-800">{notice.recipients.join(', ')}</span>
                </span>
            </div>
            
            <p className="mt-4 text-gray-600">{notice.content}</p>
        </div>

        {notice.attachment && (
            <a
              href={notice.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-full transition-colors"
            >
              View Attachment
            </a>
        )}
    </div>
);

const InstituteNotices = () => {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const noticesPerPage = 5; 

    useEffect(() => {
        const fetchRecentNotices = async () => {
            setIsLoading(true);
            try {
                const response = await api.getInstituteNotices(currentPage, noticesPerPage);
                setNotices(response.data.notices);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                console.error("Failed to fetch institute notices:", err);
                setError("Could not load recent notices. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentNotices();
    }, [currentPage]); 

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    let content;
    if (isLoading) {
        content = <p className="text-center text-gray-500">Loading notices...</p>;
    } else if (error) {
        content = <p className="text-center text-red-500">{error}</p>;
    } else if (notices.length === 0) {
        content = <p className="text-center text-gray-500">No recent notices found.</p>;
    } else {
        content = notices.map((notice) => (
            <NoticeItem key={notice._id} notice={notice} />
        ));
    }

    return (
        <div className="container mx-auto">
            
            <main>
                {content}
            </main>

            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default InstituteNotices;