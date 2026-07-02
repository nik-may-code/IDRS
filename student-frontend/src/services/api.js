import axios from 'axios';

// Shared axios instance for student-frontend
// Automatically attaches the student_token from localStorage on every request
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('student_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
