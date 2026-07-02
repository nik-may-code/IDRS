import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Get base URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('faculty_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Auth Service Functions ---

export const loginUser = (credentials) => {
  // credentials should be { faculty_id, password }
  return api.post('/user/login', credentials);
};

export const registerUser = (userData) => {
  // userData should be { name, faculty_id, password }
  return api.post('/user/register', userData);
};

export const getUserProfile = () => {
  return api.get('/user/profile');
};

// You can add other API calls here as you build out your app
// e.g., export const getNotices = () => api.get('/notices');

export default api;