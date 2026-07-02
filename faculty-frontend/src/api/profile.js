import API from '../services/api';

export const getProfile = () => {
  // Use the imported API instance. It already has the base URL and interceptor.
  return API.get('/profile');
};

export const updateProfile = (formData) => {
  return API.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};