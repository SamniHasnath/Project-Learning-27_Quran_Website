import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { API_URL } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      
      setCredentials(response.data, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center animate-fade-in px-4">
      <div className="glass p-8 md:p-10 rounded-2xl w-full max-w-md border-t-4 border-t-islamic-green dark:border-t-islamic-gold shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-islamic-green/5 dark:bg-islamic-gold/5 rounded-full blur-lg -translate-y-4 translate-x-4"></div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-islamic-green dark:hover:text-islamic-gold transition-colors relative mb-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>

        <div className="text-center mb-8 relative">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm">Sign in to continue your learning journey</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-stone-600 dark:text-stone-400">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-islamic-green/40 dark:focus:border-islamic-gold/40 focus:ring-2 focus:ring-islamic-green/10 dark:focus:ring-islamic-gold/10 transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-stone-600 dark:text-stone-400">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-islamic-green/40 dark:focus:border-islamic-gold/40 focus:ring-2 focus:ring-islamic-green/10 dark:focus:ring-islamic-gold/10 transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-islamic-green dark:bg-islamic-gold text-white dark:text-islamic-dark font-bold hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600 dark:text-stone-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-islamic-green dark:text-islamic-gold font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
