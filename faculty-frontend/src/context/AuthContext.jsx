import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfile, loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('faculty_token') || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If a token exists, you could optionally verify it with the backend
    // For now, we'll just keep the user logged in if the token is present
    const storedUser = localStorage.getItem('faculty_user');
    let parsedUser = null;
    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (e) {
        console.warn("Invalid JSON in localStorage 'faculty_user' key. Removing it.", e);
        localStorage.removeItem('faculty_user');
      }
    }

    if (token && parsedUser) {
      setUser(parsedUser);
    } else if (token && !parsedUser) {
      setLoading(true);
      getUserProfile()
      .then((res)=>{
        const userData={name:res.data.name,faculty_id:res.data.faculty_id
        };
        localStorage.setItem('faculty_user', JSON.stringify(userData));
        setUser(userData);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        // If token is invalid/expired, clear it so the user gets redirected to login
        if (err?.response?.status === 401) {
          localStorage.removeItem('faculty_token');
          localStorage.removeItem('faculty_user');
          setToken(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      const { token, name } = response.data;
      
      // Store token and user info
      localStorage.setItem('faculty_token', token);
      const userData = { name, faculty_id: credentials.faculty_id };
      localStorage.setItem('faculty_user', JSON.stringify(userData));

      setToken(token);
      setUser(userData);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      // You can throw the error to be caught in the component
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear everything
    localStorage.removeItem('faculty_token');
    localStorage.removeItem('faculty_user');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};