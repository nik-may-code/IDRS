// src/components/Notices/NoticeHistory.jsx
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast'; 
import FilterBar from './FilterBar';
import NoticeTableRow from './NoticeTableRow';
import Modal from './Modal';
import api from '../../api/notice/api'; 
import ViewNoticeModal from './modals/ViewNoticeModal';
import EditNoticeModal from './modals/EditNoticeModal';
import DeleteNoticeModal from './modals/DeleteNoticeModal';

const ITEMS_PER_PAGE = 10;

const NoticeHistory = () => {
  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [modalType, setModalType] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);


  const fetchNotices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { search, audience: audienceFilter, date: dateFilter, page: currentPage, limit: ITEMS_PER_PAGE, sort: sortOrder };
      const res = await api.getNotices(params);
      setNotices(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError('Failed to fetch notices. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [search, audienceFilter, dateFilter, currentPage, sortOrder]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const openModal = (type, notice) => { setModalType(type); setSelectedNotice(notice); };
  const closeModal = () => { if (!isActionLoading) { setModalType(null); setSelectedNotice(null); } };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedNotice) return;

    setIsActionLoading(true);
    try {
      const formData = new FormData(e.target);
      const recipientsValue = formData.get('recipients');
      formData.set('recipients', JSON.stringify([recipientsValue]));

      await api.updateNotice(selectedNotice._id, formData);
      
      toast.success(`Notice "${selectedNotice.title}" updated successfully!`);
     
      closeModal();
      fetchNotices(); 
    } catch (err) {
      toast.error("Failed to update notice. Please try again."); 
      console.error("Failed to update notice", err);
    } finally {
      setIsActionLoading(false);
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedNotice) return;
    setIsActionLoading(true);
    try {
      await api.deleteNotice(selectedNotice._id);
      toast.success(`Notice "${selectedNotice.title}" deleted successfully!`);

      closeModal();
      fetchNotices();
    } catch (err) { 
      toast.error("Failed to delete notice. Please try again."); 
      console.error("Failed to delete notice", err); 
    } 
    finally { 
      setIsActionLoading(false); 
    }
  };

  const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNext = () => { if (currentPage < pagination.pages) setCurrentPage(currentPage + 1); };

  return (
    <div className="p-4 rounded-lg bg-white shadow">
      <FilterBar {...{ search, setSearch, audienceFilter, setAudienceFilter, dateFilter, setDateFilter }} />
      
      <div className="overflow-x-auto border border-zinc-300 rounded-xl mt-4">
        <table className="min-w-full divide-y divide-zinc-300">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Recipients</th>
              <th scope='col' className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer select-none" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Send Date {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className='min-w-full divide-y divide-zinc-300'>
            {isLoading ? (
              <tr><td colSpan="4" className="text-center py-4 text-gray-500">Loading notices...</td></tr>
            ) : error ? (
              <tr><td colSpan="4" className="text-center py-4 text-red-600">{error}</td></tr>
            ) : notices.length > 0 ? (
              notices.map((notice) => (
                <NoticeTableRow
                  key={notice._id}
                  notice={notice}
                  onView={() => openModal('view', notice)}
                  onEdit={() => openModal('edit', notice)}
                  onDelete={() => openModal('delete', notice)}
                />
              ))
            ) : (
              <tr><td colSpan="4" className="text-center py-4 text-gray-500">No notices found.</td></tr>
            )}
          </tbody>
        </table>
        
        <Modal
          isOpen={!!modalType}
          onClose={closeModal}
          title={
            modalType === 'view' ? 'Notice Details' :
            modalType === 'edit' ? 'Edit Notice' : 'Delete Notice'
          }
        >
          {modalType === 'view' && <ViewNoticeModal notice={selectedNotice} />}
          {modalType === 'edit' && <EditNoticeModal notice={selectedNotice} onSubmit={handleEditSubmit} isLoading={isActionLoading} />}
          {modalType === 'delete' && <DeleteNoticeModal notice={selectedNotice} onConfirm={handleDeleteConfirm} onClose={closeModal} isLoading={isActionLoading} />}
        </Modal>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePrevious} disabled={currentPage === 1 || isLoading} className="px-4 py-2 text-white bg-neutral-800 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <span className="text-sm text-zinc-600">
          Page {currentPage} of {pagination.pages || 1}
        </span>
        <button onClick={handleNext} disabled={currentPage >= pagination.pages || isLoading} className="px-4 py-2 text-white bg-neutral-800 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

export default NoticeHistory;