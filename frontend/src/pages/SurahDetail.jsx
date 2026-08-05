import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { API_URL } from '../utils/api';

const SurahDetail = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState(new Set());
  const [translationMode, setTranslationMode] = useState('both'); // 'english' | 'tamil' | 'both'
  
  const { user, token } = useAuthStore();

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        // Fetch Quran API data (Arabic + English translation + Tamil translation)
        const [arabicRes, englishRes, tamilRes] = await Promise.all([
          axios.get(`https://api.alquran.cloud/v1/surah/${id}`),
          axios.get(`https://api.alquran.cloud/v1/surah/${id}/en.asad`),
          axios.get(`https://api.alquran.cloud/v1/surah/${id}/ta.tamil`)
        ]);
        
        setSurah({
          arabic: arabicRes.data.data,
          english: englishRes.data.data,
          tamil: tamilRes.data.data
        });

        // If user logged in, fetch their bookmarks for this surah and save history
        if (user && token) {
          try {
            // Save history
            await axios.post(`${API_URL}/api/user/history`, {
              surah_id: parseInt(id),
              last_ayah_read: 1
            }, { headers: { Authorization: `Bearer ${token}` } });

            // Fetch bookmarks
            const bookmarkRes = await axios.get(`${API_URL}/api/user/bookmarks`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            // Filter bookmarks for this specific surah
            const surahBookmarks = bookmarkRes.data
              .filter(b => b.surah_id === parseInt(id))
              .map(b => b.ayah_number);
              
            setBookmarkedAyahs(new Set(surahBookmarks));
          } catch (err) {
            console.error("User data fetch error:", err);
          }
        }
      } catch (error) {
        console.error("Error fetching surah detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahData();
  }, [id, user, token]);

  const toggleBookmark = async (ayahNumber) => {
    if (!user) {
      alert("Please login to save bookmarks");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/user/bookmarks`, {
        surah_id: parseInt(id),
        ayah_number: ayahNumber
      }, { headers: { Authorization: `Bearer ${token}` } });

      setBookmarkedAyahs(prev => {
        const newBookmarks = new Set(prev);
        if (response.data.isBookmarked) {
          newBookmarks.add(ayahNumber);
        } else {
          newBookmarks.delete(ayahNumber);
        }
        return newBookmarks;
      });
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  if (loading || !surah) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green dark:border-islamic-gold"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in px-2 md:px-0">
      <Link 
        to="/dashboard" 
        className="inline-flex items-center gap-2 mb-6 text-stone-500 hover:text-islamic-green dark:hover:text-islamic-gold transition-colors duration-300 font-semibold group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span>Back to Dashboard</span>
      </Link>
      
      <div className="text-center mb-12 glass rounded-2xl p-8 md:p-12 border-t-4 border-t-islamic-green dark:border-t-islamic-gold shadow-sm relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-islamic-green/5 dark:bg-islamic-gold/5 rounded-full blur-xl -translate-y-6 translate-x-6"></div>
        
        <h1 className="text-5xl md:text-7xl font-arabic text-islamic-green dark:text-islamic-gold mb-6 select-none font-medium leading-normal drop-shadow-sm">
          {surah.arabic.name}
        </h1>
        <h2 className="text-3xl font-bold mb-2 font-sans text-stone-800 dark:text-stone-100 tracking-tight">
          {surah.arabic.englishName}
        </h2>
        <p className="text-stone-500 dark:text-stone-400 italic text-base mb-6">
          {surah.arabic.englishNameTranslation}
        </p>
        <div className="flex justify-center items-center gap-3 mt-6 text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
          <span className="bg-stone-100 dark:bg-stone-900/60 px-3 py-1 rounded-md">
            {surah.arabic.revelationType}
          </span>
          <span>•</span>
          <span className="bg-stone-100 dark:bg-stone-900/60 px-3 py-1 rounded-md">
            {surah.arabic.numberOfAyahs} Ayahs
          </span>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4 bg-white/40 dark:bg-stone-900/30 border border-stone-200/40 dark:border-stone-850 px-4 py-2.5 rounded-xl max-w-sm mx-auto shadow-sm backdrop-blur-sm">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">Translation:</label>
          <select 
            value={translationMode}
            onChange={(e) => setTranslationMode(e.target.value)}
            className="text-xs font-bold text-stone-800 dark:text-stone-200 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="both" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">English & Tamil</option>
            <option value="english" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">English Only</option>
            <option value="tamil" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">Tamil Only</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {surah.arabic.ayahs.map((ayah, index) => (
          <div 
            key={ayah.numberInSurah} 
            className="glass p-6 md:p-8 rounded-2xl border-l-4 border-l-transparent hover:border-l-islamic-green dark:hover:border-l-islamic-gold transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-md"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start gap-5">
                <div className="flex flex-col items-center gap-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-islamic-green/10 dark:bg-islamic-gold/10 flex items-center justify-center font-bold text-islamic-green dark:text-islamic-gold text-xs border border-islamic-green/5 dark:border-islamic-gold/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                    {ayah.numberInSurah}
                  </span>
                  {user && (
                    <button 
                      onClick={() => toggleBookmark(ayah.numberInSurah)}
                      className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
                      title="Bookmark this Ayah"
                    >
                      {bookmarkedAyahs.has(ayah.numberInSurah) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-islamic-gold drop-shadow-sm hover:scale-110 transition-transform">
                          <path fillRule="evenodd" d="M6.32 2.577a.75.75 0 011.12-.124l3.117 3.025 3.117-3.025a.75.75 0 011.12.124l4.753 5.704a1.5 1.5 0 01.373 1.02v11.453a.75.75 0 01-1.2.6L12 17.69l-7.8 3.85a.75.75 0 01-1.2-.6V9.302a1.5 1.5 0 01.373-1.02l4.752-5.704z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-stone-400 dark:text-stone-500 hover:text-islamic-green dark:hover:text-islamic-gold hover:scale-110 transition-all">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.375c0-1.036-.84-1.875-1.875-1.875H8.281c-1.036 0-1.875.84-1.875 1.875v15.656a1.5 1.5 0 002.533 1.113l3.061-2.906 3.06 2.906a1.5 1.5 0 002.534-1.113V3.375z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                <p 
                  className="text-3xl md:text-5xl font-arabic leading-[2.1] md:leading-[2.2] text-right text-stone-900 dark:text-stone-100 w-full select-all tracking-normal"
                  dir="rtl"
                >
                  {ayah.text}
                </p>
              </div>
              <div className="pt-5 border-t border-stone-100 dark:border-stone-800/40 space-y-4">
                {(translationMode === 'english' || translationMode === 'both') && (
                  <div>
                    {translationMode === 'both' && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-stone-450 dark:text-stone-500 block mb-1">English (Asad)</span>
                    )}
                    <p className="text-stone-650 dark:text-stone-300 leading-relaxed font-sans text-base md:text-lg">
                      {surah.english.ayahs[index].text}
                    </p>
                  </div>
                )}
                {(translationMode === 'tamil' || translationMode === 'both') && (
                  <div className={translationMode === 'both' ? "pt-3 border-t border-stone-150/45 dark:border-stone-850/50" : ""}>
                    {translationMode === 'both' && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-islamic-gold block mb-1">Tamil (ஜான் டிரஸ்ட்)</span>
                    )}
                    <p className="text-stone-650 dark:text-stone-300 leading-relaxed font-sans text-base md:text-lg">
                      {surah.tamil.ayahs[index].text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetail;
