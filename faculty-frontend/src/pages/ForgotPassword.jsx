import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/login/Input';
import Button from '../components/login/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle password reset request
    alert(`Password reset link sent to ${email}`);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black font-sans">
      <div className="w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-center text-base mb-8">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Your Institutional Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-6">
            <Button type="submit" variant="secondary">
              Send Reset Link
            </Button>
          </div>
        </form>
        <div className="text-center mt-6">
          <Link to="/login" className="font-bold hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;