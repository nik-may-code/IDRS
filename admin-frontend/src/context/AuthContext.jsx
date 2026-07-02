import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({ user: null, loading: true, setUser: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to hydrate user from localStorage (non-blocking)
    try {
      const raw = localStorage.getItem('admin_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Default export the provider to satisfy fast-refresh expectations
export default AuthProvider;
