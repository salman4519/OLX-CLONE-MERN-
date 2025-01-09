import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Redirect to home if already logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', response.data.token);
      setUser({ token });

      toast.success("Login Successful");

      // Redirect to home route after successful login
      navigate('/home');
    } catch (error) {
      console.error(error);
      // Provide better error handling with a fallback message
      toast.error(
        error.response?.data?.message || 
        error.message || 
        'An error occurred during login. Please try again.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-90"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-900"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-cyan-950 text-white rounded-lg hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-900"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-cyan-950">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
