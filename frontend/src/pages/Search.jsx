import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { juzToSurahs, getJuzsForSurah } from '../utils/quranData';

const Search = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuz, setSelectedJuz] = useState('all');

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

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

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-2 md:px-0">
      <div className="text-center mb-8 pt-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-islamic-green dark:text-islamic-gold bg-islamic-green/10 dark:bg-islamic-gold/10 px-3 py-1.5 rounded-full mb-4">
          No Sign-Up Needed
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-850 dark:text-stone-100 tracking-tight">
          Search the Quran
        </h1>
        <p className="text-stone-550 dark:text-stone-400 mt-3 max-w-lg mx-auto">
          Find any Surah instantly by name, translation, number, or Juz — free to browse and read for everyone.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 p-1.5 rounded-2xl bg-white/40 dark:bg-stone-900/30 border border-stone-200/40 dark:border-stone-800/30 shadow-sm backdrop-blur-sm mb-8">
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
            autoFocus
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green dark:border-islamic-gold"></div>
        </div>
      ) : filteredSurahs.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl max-w-xl mx-auto border border-stone-200 dark:border-stone-800">
          <span className="text-5xl mb-4 block">🔍</span>
          <h3 className="text-lg font-bold text-stone-850 dark:text-stone-200">No Surahs Found</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            No match for search "{searchQuery}" {selectedJuz !== 'all' && `in Juz ${selectedJuz}`}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
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
  );
};

export default Search;
