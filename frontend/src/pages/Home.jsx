import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from public API for MVP Phase 1
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green dark:border-islamic-gold"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic text-islamic-green dark:text-islamic-gold">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          In the name of Allah, the Entirely Merciful, the Especially Merciful.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah, index) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 > 0.5 ? 0 : index * 0.02 }}
          >
            <Link to={`/surah/${surah.number}`}>
              <div className="glass rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full border-transparent hover:border-islamic-green/30 dark:hover:border-islamic-gold/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-islamic-green/10 dark:bg-islamic-gold/10 flex items-center justify-center font-bold text-islamic-green dark:text-islamic-gold">
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-islamic-green dark:group-hover:text-islamic-gold transition-colors">
                        {surah.englishName}
                      </h3>
                      <p className="text-sm text-gray-500">{surah.englishNameTranslation}</p>
                    </div>
                  </div>
                  <div className="font-arabic text-2xl text-islamic-green dark:text-islamic-gold">
                    {surah.name}
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <span>{surah.revelationType}</span>
                  <span>•</span>
                  <span>{surah.numberOfAyahs} Ayahs</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
