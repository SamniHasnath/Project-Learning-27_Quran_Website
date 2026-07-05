import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const Dashboard = () => {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const [historyRes, bookmarksRes] = await Promise.all([
          axios.get('http://localhost:5000/api/user/history', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/user/bookmarks', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setHistory(historyRes.data);
        setBookmarks(bookmarksRes.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-islamic-green dark:text-islamic-gold">
          Welcome, {user.name}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-bold"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green dark:border-islamic-gold"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-xl border-t-2 border-islamic-green">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>📖</span> Reading History
            </h3>
            <p className="text-gray-500 mb-6 text-sm">Pick up where you left off.</p>
            
            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-100 dark:border-gray-800">
                  <p className="text-center text-gray-400 italic">No history yet. Start reading a Surah!</p>
                </div>
              ) : (
                history.map((h) => (
                  <Link key={h.id} to={`/surah/${h.surah_id}`} className="block">
                    <div className="p-4 rounded-lg bg-white/50 dark:bg-black/30 hover:bg-islamic-green/5 border border-transparent hover:border-islamic-green/20 transition-all flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-islamic-dark dark:text-islamic-light">Surah {h.surah_id}</h4>
                        <p className="text-xs text-gray-500">Last read: Ayah {h.last_ayah_read}</p>
                      </div>
                      <span className="text-islamic-green text-sm font-bold">Continue →</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-xl border-t-2 border-islamic-gold">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>⭐</span> Bookmarks
            </h3>
            <p className="text-gray-500 mb-6 text-sm">Your saved Ayahs.</p>
            
            <div className="space-y-4">
              {bookmarks.length === 0 ? (
                <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-100 dark:border-gray-800">
                  <p className="text-center text-gray-400 italic">No bookmarks yet.</p>
                </div>
              ) : (
                bookmarks.map((b) => (
                  <Link key={b.id} to={`/surah/${b.surah_id}`} className="block">
                    <div className="p-4 rounded-lg bg-white/50 dark:bg-black/30 hover:bg-islamic-gold/5 border border-transparent hover:border-islamic-gold/20 transition-all flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-islamic-dark dark:text-islamic-light">Surah {b.surah_id}</h4>
                        <p className="text-xs text-gray-500">Bookmarked Ayah: {b.ayah_number}</p>
                      </div>
                      <span className="text-islamic-gold text-sm font-bold">Read →</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
