import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../api/apiConfig';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(endpoints.users);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const users = await response.json();
      const adminUser = users.find(u => u.username === username && u.password === password && u.role === 'admin');

      if (adminUser) {
        localStorage.setItem('isAuthenticated', 'true');
        setAuth(true);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="mt-16 flex items-center justify-center min-h-screen bg-gray-100 px-4 font-['Noto_Sans_Khmer']">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-['Noto_Sans_Khmer']">ចូលគណនីគ្រប់គ្រង</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 font-['Noto_Sans_Khmer']">ឈ្មោះអ្នកប្រើប្រាស់</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-['Noto_Sans_Khmer']"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-['Noto_Sans_Khmer']">លេខសម្ងាត់</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-['Noto_Sans_Khmer']"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-['Noto_Sans_Khmer']">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
          >
            ចូល
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
