import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const SurahDetail = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState(new Set());
  
  const { user, token } = useAuthStore();

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        // Fetch Quran API data
        const [arabicRes, translationRes] = await Promise.all([
          axios.get(`https://api.alquran.cloud/v1/surah/${id}`),
          axios.get(`https://api.alquran.cloud/v1/surah/${id}/en.asad`)
        ]);
        
        setSurah({
          arabic: arabicRes.data.data,
          translation: translationRes.data.data
        });

        // If user logged in, fetch their bookmarks for this surah and save history
        if (user && token) {
          try {
            // Save history
            await axios.post('http://localhost:5000/api/user/history', {
              surah_id: parseInt(id),
              last_ayah_read: 1
            }, { headers: { Authorization: `Bearer ${token}` } });

            // Fetch bookmarks
            const bookmarkRes = await axios.get('http://localhost:5000/api/user/bookmarks', {
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
      const response = await axios.post('http://localhost:5000/api/user/bookmarks', {
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
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link to="/" className="inline-block mb-6 text-gray-500 hover:text-islamic-green dark:hover:text-islamic-gold transition-colors">
        ← Back to Surahs
      </Link>
      
      <div className="text-center mb-12 glass rounded-2xl p-8 border-t-4 border-t-islamic-green dark:border-t-islamic-gold">
        <h1 className="text-5xl font-arabic text-islamic-green dark:text-islamic-gold mb-4">
          {surah.arabic.name}
        </h1>
        <h2 className="text-2xl font-bold mb-2">{surah.arabic.englishName}</h2>
        <p className="text-gray-500">{surah.arabic.englishNameTranslation}</p>
        <div className="flex justify-center gap-4 mt-6 text-sm font-semibold uppercase tracking-widest text-gray-400">
          <span>{surah.arabic.revelationType}</span>
          <span>•</span>
          <span>{surah.arabic.numberOfAyahs} Ayahs</span>
        </div>
      </div>

      <div className="space-y-8">
        {surah.arabic.ayahs.map((ayah, index) => (
          <div key={ayah.numberInSurah} className="glass p-6 md:p-8 rounded-xl border-l-4 border-l-transparent hover:border-l-islamic-green dark:hover:border-l-islamic-gold transition-all">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-islamic-green/10 dark:bg-islamic-gold/10 flex items-center justify-center font-bold text-islamic-green dark:text-islamic-gold text-sm">
                    {ayah.numberInSurah}
                  </span>
                  {user && (
                    <button 
                      onClick={() => toggleBookmark(ayah.numberInSurah)}
                      className={`text-2xl transition-colors ${bookmarkedAyahs.has(ayah.numberInSurah) ? 'text-islamic-gold' : 'text-gray-300 hover:text-islamic-green'}`}
                      title="Bookmark this Ayah"
                    >
                      {bookmarkedAyahs.has(ayah.numberInSurah) ? '★' : '☆'}
                    </button>
                  )}
                </div>
                <p className="text-3xl md:text-4xl font-arabic leading-loose text-right text-islamic-dark dark:text-islamic-light w-full">
                  {ayah.text}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {surah.translation.ayahs[index].text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetail;
