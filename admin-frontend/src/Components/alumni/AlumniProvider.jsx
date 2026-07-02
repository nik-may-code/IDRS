import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AlumniContext = createContext();

// Set your backend API base URL here
const API_BASE = ''; // Uses Vite proxy

export const AlumniProvider = ({ children }) => {
  const [alumniData, setAlumniData] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchAlumni();
    fetchStats();
  }, []);

  const fetchAlumni = async () => {
    const res = await axios.get(`${API_BASE}/api/alumni`);
    setAlumniData(res.data);
  };

  const fetchStats = async () => {
    const res = await axios.get(`${API_BASE}/api/alumni/stats`);
    setStats(res.data);
  };

  const addAlumni = async (alumni) => {
    const res = await axios.post(`${API_BASE}/api/alumni`, alumni);
    setAlumniData(prev => [...prev, res.data]);
    fetchStats();
  };

  return (
    <AlumniContext.Provider value={{ alumniData, setAlumniData, stats, addAlumni }}>
      {children}
    </AlumniContext.Provider>
  );
};