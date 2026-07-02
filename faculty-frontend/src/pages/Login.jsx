import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/login/Input';
import Button from '../components/login/Button';
import { useAuth } from '../context/AuthContext'; // Import the hook

const Login = () => {
  const [faculty_id, setFacultyId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth(); // Get login function and loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await login({ faculty_id, password });
      // Navigation is handled inside the login function in AuthContext
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <header className="w-full bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">IDRS Faculty Portal</h1>
        <a href="http://localhost:3000" className="text-gray-300 hover:text-white transition-colors font-normal text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portal Selection
        </a>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome to IDRS Faculty Portal
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <Input
              type="text" // Use text for faculty ID
              placeholder="Enter institutional ID"
              value={faculty_id}
              onChange={(e) => setFacultyId(e.target.value)}
              name="faculty_id"
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-gray-600 hover:text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Your data is protected by our security measures.
          </p>
        </div>
      </main>

      <footer className="w-full text-center p-4 text-gray-500 text-sm">
        <p>Version 1.2 | © 2025 Institute Data Retrieval System</p>
      </footer>
    </div>
  );
};

export default Login;