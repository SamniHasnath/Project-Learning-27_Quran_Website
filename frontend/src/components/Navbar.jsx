import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8 border-b border-islamic-green/10 dark:border-islamic-gold/15 bg-white/70 dark:bg-islamic-dark/75">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-islamic-green dark:text-islamic-gold flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(13,92,70,0.15)] dark:drop-shadow-[0_2px_8px_rgba(197,168,128,0.25)]">📖</span>
          <span className="font-sans tracking-tight">Quran Learning</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/search" className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-islamic-green dark:hover:text-islamic-gold transition-colors">
            Search Quran
          </Link>

          {user ? (
            <div className="flex items-center gap-5">
              <Link to="/dashboard" className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-islamic-green dark:hover:text-islamic-gold transition-colors">
                {user.name}
              </Link>
              <button onClick={logout} className="text-sm font-semibold text-red-500 hover:text-red-600 hover:underline transition-all cursor-pointer">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/login" className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-islamic-green dark:hover:text-islamic-gold transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm font-semibold bg-islamic-green dark:bg-islamic-gold text-white dark:text-islamic-dark px-4 py-2 rounded-lg hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all">
                Sign Up
              </Link>
            </div>
          )}
          
          <div className="h-5 w-px bg-stone-300 dark:bg-stone-700"></div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-14 h-8 rounded-full bg-stone-200 dark:bg-stone-900 p-1 cursor-pointer transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:outline-none flex items-center justify-between group"
            aria-label="Toggle Dark Mode"
          >
            {/* Sliding Knob */}
            <div 
              className={`absolute top-[4px] left-[4px] w-6 h-6 rounded-full bg-white dark:bg-islamic-dark shadow-md transition-all duration-300 ease-out flex items-center justify-center border border-stone-200/50 dark:border-stone-850 ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-islamic-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-amber-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.93 4.93l1.59 1.59m10.96 10.96l1.59 1.59M3 12h2.25m13.5 0H21m-2.23-7.07l-1.59 1.59m-10.96 10.96l-1.59 1.59M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
                </svg>
              )}
            </div>
            {/* Background Icons */}
            <div className="flex justify-between w-full px-1.5 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.93 4.93l1.59 1.59m10.96 10.96l1.59 1.59M3 12h2.25m13.5 0H21m-2.23-7.07l-1.59 1.59m-10.96 10.96l-1.59 1.59M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-islamic-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
