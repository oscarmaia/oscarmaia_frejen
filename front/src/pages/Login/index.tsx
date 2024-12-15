import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth()

  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password })
      .then((res) => {
        console.log(res)
        setLoading(false);
        const userInfo = {
          name: res.data.name,
          email: res.data.email,
          token: res.data.token,
          id: res.data.id,
          admin: res.data.admin,
          id_department: res.data.id_department,
        }
        login(userInfo)
        setLoading(false)
        navigate("/tickets")
      })
      .catch((err) => {
        alert(err.response.data)
        setLoading(false)
      })

  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tickets'); // Redirect to /tickets if the user is already logged in
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen " >
      <h2 className="mb-6 text-2xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block 'text-gray-700">Email:</label>
          <input
            disabled={loading}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='user@email.com'
            className="w-full p-2 mt-1 border rounded focus:border-blue-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            disabled={loading}
            type="password"
            id="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </div>
        <button type="submit" disabled={loading} className="flex items-center justify-center h-12 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          {loading ? (
            <Circles
              height="40"
              width="40"
              color="#ffffff"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;