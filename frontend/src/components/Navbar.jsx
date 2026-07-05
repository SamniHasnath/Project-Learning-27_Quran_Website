import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="glass sticky top-0 z-50 px-4 py-3 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-islamic-green dark:text-islamic-gold flex items-center gap-2">
          <span className="text-3xl">📖</span> Quran Learning
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-semibold hover:text-islamic-green transition-colors">
                {user.name}
              </Link>
              <button onClick={logout} className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold hover:text-islamic-green transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm font-semibold bg-islamic-green text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </div>
          )}
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
