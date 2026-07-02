import { useState } from 'react';
import FilterBar from './FilterBar';
import NoticeTableRow from './NoticeTableRow';
import Modal from './Modal';

const dummyNotices = [
  { title: 'Important Announcement', recipients: 'Students', date: '2024-07-26' },
  { title: 'Faculty Meeting', recipients: 'Faculty', date: '2024-07-25' },
  { title: 'Holiday Notice', recipients: 'All', date: '2024-07-20' },
  { title: 'Exam Schedule', recipients: 'Students', date: '2024-07-15' },
  { title: 'Department Update', recipients: 'HOD', date: '2024-07-10' },
  { title: 'Extra Class', recipients: 'Students', date: '2024-07-05' },
  { title: 'Annual Day', recipients: 'All', date: '2024-06-30' },
  { title: 'Project Submission Deadline', recipients: 'Students', date: '2024-08-22' },
  { title: 'Staff Orientation', recipients: 'Faculty', date: '2024-08-18' },
  { title: 'Maintenance Work', recipients: 'All', date: '2024-08-15' },
  { title: 'Internal Assessment Schedule', recipients: 'Students', date: '2024-08-10' },
  { title: 'Budget Review Meeting', recipients: 'HOD', date: '2024-08-05' },
  { title: 'Guest Lecture', recipients: 'Students', date: '2024-08-02' },
  { title: 'Cultural Fest Planning', recipients: 'All', date: '2024-07-30' },

];


const ITEMS_PER_PAGE = 8;

const NoticeHistory = () => {
  const [search, setSearch] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [modalType, setModalType] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);


  const openModal = (type, notice) => {
    setModalType(type);
    setSelectedNotice(notice);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedNotice(null);
  };


  const isInDateRange = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);

    if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      return date >= weekAgo && date <= today;
    } else if (dateFilter === 'month') {
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    } else if (dateFilter === 'year') {
      return date.getFullYear() === today.getFullYear();
    }
    return true;
  };

  const filteredNotices = dummyNotices
    .filter((notice) => notice.title.toLowerCase().includes(search.toLowerCase()))
    .filter((notice) =>
      audienceFilter === ''
        ? true
        : notice.recipients === audienceFilter || notice.recipients === 'All'
    )
    .filter((notice) => isInDateRange(notice.date))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotices = filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  return (
    <div className="p-4 rounded-lg">
      <FilterBar search={search} setSearch={setSearch} audienceFilter={audienceFilter} setAudienceFilter={setAudienceFilter} dateFilter={dateFilter} setDateFilter={setDateFilter} />
      <div className="overflow-x-auto border border-zinc-300 rounded-xl mt-4">
        <table className="min-w-full divide-y divide-zinc-300">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Recipients</th>
              {/* <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Send Date</th> */}
              <th scope='col' className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider cursor-pointer select-none" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Send Date {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className='min-w-full divide-y divide-zinc-300'>
            {paginatedNotices.length > 0 ? (
              paginatedNotices.map((notice, index) => (
                <NoticeTableRow
                  key={index}
                  notice={notice}
                  onView={(n) => openModal('view', n)}
                  onEdit={(n) => openModal('edit', n)}
                  onDelete={(n) => openModal('delete', n)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-zinc-500">
                  No notices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal
          isOpen={!!modalType}
          onClose={closeModal}
          title={
            modalType === 'view' ? 'Notice Details' :
              modalType === 'edit' ? 'Edit Notice' :
                'Delete Notice'
          }
        >
          {modalType === 'view' && (
            <div className="space-y-4 text-sm tracking-wide">
              <p><strong>Title:</strong> {selectedNotice?.title}</p>
              <p><strong>Recipients:</strong> {selectedNotice?.recipients}</p>
              <p><strong>Date:</strong> {selectedNotice?.date}</p>
            </div>
          )}

          {modalType === 'edit' && (
            <form className="space-y-3 text-sm">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input className="w-full border px-3 py-2 rounded" defaultValue={selectedNotice?.title} />
              </div>
              <div>
                <label className="block font-medium mb-1">Recipients</label>
                <select className="w-full border px-3 py-2 rounded" defaultValue={selectedNotice?.recipients}>
                  <option>Students</option>
                  <option>Faculty</option>
                  <option>HOD</option>
                  <option>All</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Date</label>
                <input type="date" className="w-full border px-3 py-2 rounded" defaultValue={selectedNotice?.date} />
              </div>
              <button type="submit" className="w-full mt-4 bg-zinc-600 text-white px-4 py-2 rounded-xl hover:bg-zinc-700">
                Save Changes
              </button>
            </form>
          )}

          {modalType === 'delete' && (
            <div className="text-sm">
              <p>Are you sure you want to delete <strong>{selectedNotice?.title}</strong>?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button onClick={closeModal} className="px-4 py-2 bg-zinc-300 rounded-xl hover:bg-zinc-400 cursor-pointer transition">Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 cursor-pointer transition">Delete</button>
              </div>
            </div>
          )}
        </Modal>


      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 py-2 text-white bg-neutral-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Previous</button>
        <span className="text-sm text-zinc-600">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 text-white bg-neutral-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Next</button>
      </div>

    </div>
  );
};

export default NoticeHistory;
