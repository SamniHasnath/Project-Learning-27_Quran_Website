import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { juzToSurahs, getJuzsForSurah } from '../utils/quranData';

const Dashboard = () => {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // App data states
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [surahs, setSurahs] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [activeTab, setActiveTab] = useState('quran'); // 'quran' | 'bookmarks' | 'history' | 'profile'
  
  // Search & Filter states for Quran Explorer
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuz, setSelectedJuz] = useState('all');

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

    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoadingSurahs(false);
      }
    };

    fetchUserData();
    fetchSurahs();
  }, [user, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter Surahs logic (Quran Explorer)
  const filteredSurahs = surahs.filter((surah) => {
    const matchesSearch = 
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.name.includes(searchQuery) ||
      surah.number.toString() === searchQuery.trim();

    let matchesJuz = true;
    if (selectedJuz !== 'all') {
      const juzNumber = parseInt(selectedJuz);
      const surahsInJuz = juzToSurahs[juzNumber] || [];
      matchesJuz = surahsInJuz.includes(surah.number);
    }

    return matchesSearch && matchesJuz;
  });

  if (!user) return null;

  if (loading || loadingSurahs) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green dark:border-islamic-gold"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-2 md:px-0">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-stone-200/50 dark:border-stone-800/40 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-850 dark:text-stone-100 tracking-tight">
            Assalamu Alaikum, <span className="text-islamic-green dark:text-islamic-gold">{user.name}</span>
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Welcome back to your Quran learning dashboard.</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500/20 dark:border-red-900/30 text-red-550 dark:text-red-400 rounded-xl hover:bg-red-500 hover:text-white dark:hover:bg-red-550 transition-all duration-300 font-bold text-sm hover:shadow-sm cursor-pointer flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <span>Logout</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="flex flex-row md:flex-col gap-1.5 p-2 bg-white/45 dark:bg-stone-900/35 backdrop-blur-md rounded-2xl border border-stone-200/40 dark:border-stone-850 shadow-sm md:h-fit overflow-x-auto md:overflow-x-visible">
            
            <button
              onClick={() => setActiveTab('quran')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === 'quran'
                  ? 'bg-islamic-green text-white dark:bg-islamic-gold dark:text-islamic-dark shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span>Quran Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === 'bookmarks'
                  ? 'bg-islamic-green text-white dark:bg-islamic-gold dark:text-islamic-dark shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.375c0-1.036-.84-1.875-1.875-1.875H8.281c-1.036 0-1.875.84-1.875 1.875v15.656a1.5 1.5 0 002.533 1.113l3.061-2.906 3.06 2.906a1.5 1.5 0 002.534-1.113V3.375z" />
              </svg>
              <span>My Bookmarks</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === 'history'
                  ? 'bg-islamic-green text-white dark:bg-islamic-gold dark:text-islamic-dark shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Reading History</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap md:w-full ${
                activeTab === 'profile'
                  ? 'bg-islamic-green text-white dark:bg-islamic-gold dark:text-islamic-dark shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>My Profile</span>
            </button>

          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-grow">
          
          {/* TAB 1: QURAN EXPLORER */}
          {activeTab === 'quran' && (
            <div className="space-y-6">
              {/* Search & Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4 p-1.5 rounded-2xl bg-white/40 dark:bg-stone-900/30 border border-stone-200/40 dark:border-stone-800/30 shadow-sm backdrop-blur-sm">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search Surah by name, translation, or number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-transparent bg-transparent text-stone-850 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none text-sm transition-all"
                  />
                </div>
                
                <div className="hidden md:block w-px bg-stone-200 dark:bg-stone-800/80 my-2"></div>
                
                <div className="relative md:w-56">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </span>
                  <select
                    value={selectedJuz}
                    onChange={(e) => setSelectedJuz(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-transparent bg-transparent text-stone-850 dark:text-stone-200 font-semibold focus:outline-none text-sm transition-all appearance-none cursor-pointer"
                  >
                    <option value="all" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">All Juzs</option>
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                      <option key={juz} value={juz.toString()} className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">Juz {juz}</option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Surah List Grid */}
              {filteredSurahs.length === 0 ? (
                <div className="text-center py-16 glass rounded-2xl max-w-xl mx-auto border border-stone-200 dark:border-stone-800">
                  <span className="text-5xl mb-4 block">🔍</span>
                  <h3 className="text-lg font-bold text-stone-850 dark:text-stone-200">No Surahs Found</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                    No match for search "{searchQuery}" {selectedJuz !== 'all' && `in Juz ${selectedJuz}`}.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSurahs.map((surah, index) => (
                    <motion.div
                      key={surah.number}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.01 > 0.3 ? 0 : index * 0.01 }}
                    >
                      <Link to={`/surah/${surah.number}`}>
                        <div className="glass-interactive rounded-xl p-5 flex flex-col justify-between h-full group">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3.5">
                                <div className="w-9 h-9 rounded-xl bg-islamic-green/10 dark:bg-islamic-gold/10 flex items-center justify-center font-bold text-sm text-islamic-green dark:text-islamic-gold border border-islamic-green/5 dark:border-islamic-gold/5">
                                  {surah.number}
                                </div>
                                <div>
                                  <h3 className="font-bold text-base text-stone-800 dark:text-stone-100 group-hover:text-islamic-green dark:group-hover:text-islamic-gold transition-colors duration-300">
                                    {surah.englishName}
                                  </h3>
                                  <p className="text-[11px] text-stone-500 dark:text-stone-400 tracking-wide mt-0.5">
                                    {surah.englishNameTranslation}
                                  </p>
                                </div>
                              </div>
                              <div className="font-arabic text-2xl text-islamic-green dark:text-islamic-gold">
                                {surah.name}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3.5 border-t border-stone-100 dark:border-stone-800/40 text-[10px] text-stone-500 dark:text-stone-400 font-semibold tracking-wider uppercase">
                            <div className="flex items-center gap-2">
                              <span className="bg-stone-100 dark:bg-stone-800/40 px-2 py-0.5 rounded-md text-[9px]">
                                {surah.revelationType}
                              </span>
                              <span>•</span>
                              <span>{surah.numberOfAyahs} Ayahs</span>
                            </div>
                            <span className="text-[9px] text-islamic-green/80 dark:text-islamic-gold/80 font-bold bg-islamic-green/5 dark:bg-islamic-gold/5 px-2 py-0.5 rounded-md">
                              {(() => {
                                const juzs = getJuzsForSurah(surah.number);
                                if (juzs.length === 1) return `Juz ${juzs[0]}`;
                                return `Juz ${juzs[0]}-${juzs[juzs.length - 1]}`;
                              })()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-6">
              <div className="pb-2">
                <h2 className="text-xl font-bold text-stone-850 dark:text-stone-100">Saved Bookmarks</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Direct access to your bookmarked verses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.length === 0 ? (
                  <div className="col-span-full p-12 text-center glass rounded-2xl border border-stone-200/40 dark:border-stone-800/40">
                    <span className="text-4xl block mb-3">⭐</span>
                    <h3 className="font-bold text-stone-800 dark:text-stone-200">No Bookmarks Saved</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 max-w-sm mx-auto">
                      Click the bookmark icon next to any verse while reading a Surah to save it here.
                    </p>
                  </div>
                ) : (
                  bookmarks.map((b) => {
                    const surahObj = surahs.find(s => s.number === b.surah_id);
                    return (
                      <Link key={b.id} to={`/surah/${b.surah_id}`} className="block">
                        <div className="glass-interactive p-5 rounded-xl border border-stone-200/30 dark:border-stone-800/30 hover:border-islamic-gold/45 flex justify-between items-center group">
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-wider text-islamic-gold bg-islamic-gold/10 dark:bg-islamic-gold/20 px-2 py-0.5 rounded-md">
                              Ayah {b.ayah_number}
                            </span>
                            <h4 className="font-bold text-stone-805 dark:text-stone-100 group-hover:text-islamic-gold transition-colors duration-300 mt-2 text-base">
                              {surahObj ? surahObj.englishName : `Surah ${b.surah_id}`}
                            </h4>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {surahObj ? surahObj.englishNameTranslation : ''}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2.5">
                            {surahObj && <span className="font-arabic text-xl text-islamic-gold">{surahObj.name}</span>}
                            <span className="text-stone-400 dark:text-stone-500 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                              <span>Read verse</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: READING HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="pb-2">
                <h2 className="text-xl font-bold text-stone-850 dark:text-stone-100">Reading History</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Pick up your reading exactly where you left off.</p>
              </div>

              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="p-12 text-center glass rounded-2xl border border-stone-200/40 dark:border-stone-800/40">
                    <span className="text-4xl block mb-3">📖</span>
                    <h3 className="font-bold text-stone-800 dark:text-stone-200">No Reading History</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 max-w-sm mx-auto">
                      Select a Surah in the Quran Explorer and start reading to record history.
                    </p>
                  </div>
                ) : (
                  history.map((h) => {
                    const surahObj = surahs.find(s => s.number === h.surah_id);
                    return (
                      <Link key={h.id} to={`/surah/${h.surah_id}`} className="block">
                        <div className="glass-interactive p-5 rounded-xl border border-stone-200/30 dark:border-stone-800/30 hover:border-islamic-green/45 flex justify-between items-center group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-islamic-green/10 flex items-center justify-center font-bold text-islamic-green">
                              {h.surah_id}
                            </div>
                            <div>
                              <h4 className="font-bold text-stone-850 dark:text-stone-100 group-hover:text-islamic-green transition-colors duration-300 text-base">
                                {surahObj ? surahObj.englishName : `Surah ${h.surah_id}`}
                              </h4>
                              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                                Last read up to Ayah {h.last_ayah_read}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {surahObj && <span className="font-arabic text-xl text-stone-700 dark:text-stone-300">{surahObj.name}</span>}
                            <span className="text-islamic-green dark:text-islamic-gold text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>Resume</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MY PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="glass p-6 md:p-8 rounded-2xl border border-stone-200/40 dark:border-stone-800/40 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-islamic-green/5 dark:bg-islamic-gold/5 rounded-full blur-xl -translate-y-6 translate-x-6"></div>
                
                {/* Profile header */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-6 border-b border-stone-150 dark:border-stone-800/60">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-islamic-green to-emerald-600 dark:from-islamic-gold dark:to-amber-500 flex items-center justify-center text-white dark:text-islamic-dark text-3xl font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-stone-805 dark:text-stone-100">{user.name}</h3>
                    <p className="text-stone-550 dark:text-stone-400 mt-1">{user.email}</p>
                    <span className="mt-3.5 inline-block text-xs uppercase tracking-widest font-bold bg-islamic-green/10 text-islamic-green dark:bg-islamic-gold/10 dark:text-islamic-gold px-2.5 py-1 rounded-md">
                      {user.role || 'User'} Account
                    </span>
                  </div>
                </div>

                {/* Statistics Grid */}
                <h4 className="text-base font-bold mb-4 text-stone-800 dark:text-stone-200 uppercase tracking-wide">Learning Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-stone-50/50 dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/60 text-center">
                    <span className="text-3xl block mb-1">⭐</span>
                    <span className="text-2xl font-bold text-stone-800 dark:text-stone-100">{bookmarks.length}</span>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1.5 uppercase font-semibold tracking-wider">Bookmarks</p>
                  </div>
                  
                  <div className="p-5 rounded-xl bg-stone-50/50 dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/60 text-center">
                    <span className="text-3xl block mb-1">📖</span>
                    <span className="text-2xl font-bold text-stone-800 dark:text-stone-100">{history.length}</span>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1.5 uppercase font-semibold tracking-wider">Surahs Read</p>
                  </div>
                  
                  <div className="p-5 rounded-xl bg-stone-50/50 dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/60 col-span-2 md:col-span-1 text-center">
                    <span className="text-3xl block mb-1">🏆</span>
                    <span className="text-2xl font-bold text-stone-800 dark:text-stone-100">Active</span>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1.5 uppercase font-semibold tracking-wider">Status</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default Dashboard;
