import API from '../../services/api';

// All of your existing functions remain unchanged
export const createNotice = (noticeData) => {
  const formData = new FormData();
  formData.append('title', noticeData.title);
  formData.append('content', noticeData.content);
  formData.append('recipients', JSON.stringify([noticeData.visibility]));

  if (noticeData.file) {
    formData.append('attachment', noticeData.file);
  }

  return API.post('/notices', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getNotices = (params) => {
  return API.get('/notices', { params });
};

export const updateNotice = (id, formData) => {
  return API.put(`/notices/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteNotice = (id) => {
  return API.delete(`/notices/${id}`);
};

export const getInstituteNotices = () => {
  return API.get('/institution-notices');
};


// --- THE FIX: ADD THIS BLOCK AT THE END OF THE FILE ---

// 1. Create an object that holds all the functions.
const noticeService = {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
  getInstituteNotices,
};

// 2. Export this object as the default export.
export default noticeService;