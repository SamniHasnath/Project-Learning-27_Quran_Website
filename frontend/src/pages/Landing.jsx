import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const features = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    ),
    title: 'Full Quran Explorer',
    desc: 'Browse all 114 Surahs with authentic Arabic script, translations, and Juz filtering.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.375c0-1.036-.84-1.875-1.875-1.875H8.281c-1.036 0-1.875.84-1.875 1.875v15.656a1.5 1.5 0 002.533 1.113l3.061-2.906 3.06 2.906a1.5 1.5 0 002.534-1.113V3.375z" />
    ),
    title: 'Save Your Bookmarks',
    desc: 'Mark meaningful verses and return to them instantly, whenever inspiration strikes.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Track Your Progress',
    desc: 'Reading history keeps your place, so you can pick up exactly where you left off.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    ),
    title: 'Any Time, Any Device',
    desc: 'A clean, distraction-free reading experience with full dark mode support.',
  },
];

const steps = [
  { n: '01', title: 'Create your account', desc: 'Sign up free in under a minute — no commitment required.' },
  { n: '02', title: 'Explore the Quran', desc: 'Search or filter by Surah, translation, or Juz to find your starting point.' },
  { n: '03', title: 'Read & grow daily', desc: 'Bookmark verses and build a consistent habit with your saved reading history.' },
];

const Landing = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-12 items-center py-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-islamic-green dark:text-islamic-gold bg-islamic-green/10 dark:bg-islamic-gold/10 px-3 py-1.5 rounded-full mb-5">
            Trusted Quran Learning Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-stone-850 dark:text-stone-100 tracking-tight">
            Your Online <span className="text-islamic-green dark:text-islamic-gold">Quran</span> Learning Journey Starts Here
          </h1>
          <p className="text-stone-550 dark:text-stone-400 mt-5 text-base md:text-lg leading-relaxed max-w-lg">
            Read, bookmark, and study the Quran with a calm, guided experience designed to make recitation and understanding easier for everyone.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/register"
              className="bg-islamic-green dark:bg-islamic-gold text-white dark:text-islamic-dark font-bold px-6 py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Start Free
            </Link>
            <Link
              to="/search"
              className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold px-6 py-3.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-all"
            >
              Search the Quran
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-10 text-sm text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500">★★★★★</span>
              <span className="font-semibold text-stone-700 dark:text-stone-300">5.0</span>
            </div>
            <span>·</span>
            <span>114 Surahs · Free Forever</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="relative glass rounded-3xl p-10 md:p-14 flex items-center justify-center overflow-hidden border border-islamic-green/10 dark:border-islamic-gold/15">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-islamic-gold/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-islamic-green/20 rounded-full blur-3xl"></div>
            <span className="font-arabic text-7xl md:text-8xl text-islamic-green dark:text-islamic-gold relative z-10 drop-shadow-sm">
              بِسْمِ اللَّٰهِ
            </span>
          </div>

          {/* Floating rating card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass absolute -top-4 -right-4 md:right-2 rounded-2xl px-5 py-3.5 shadow-lg"
          >
            <div className="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
            <p className="text-lg font-bold text-stone-850 dark:text-stone-100 leading-none mt-1">5.0</p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">Loved by learners</p>
          </motion.div>

          {/* Floating feature card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="glass absolute -bottom-6 left-2 md:-left-6 rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3 max-w-[230px]"
          >
            <span className="text-2xl">📖</span>
            <div>
              <p className="text-sm font-bold text-stone-850 dark:text-stone-100 leading-tight">Pure, guided reading</p>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Study the Quran with clarity</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <motion.section {...fadeUp} className="glass rounded-2xl px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center my-8">
        {[
          ['114', 'Surahs'],
          ['30', 'Juz Sections'],
          ['6,236', 'Verses'],
          ['100%', 'Free Access'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-2xl md:text-3xl font-bold text-islamic-green dark:text-islamic-gold">{value}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 uppercase tracking-wide font-semibold">{label}</p>
          </div>
        ))}
      </motion.section>

      {/* Features */}
      <section id="features" className="py-16 scroll-mt-24">
        <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-stone-850 dark:text-stone-100 tracking-tight">A trusted platform, built for focus</h2>
          <p className="text-stone-550 dark:text-stone-400 mt-3">
            Everything you need to build a consistent, meaningful relationship with the Quran.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-interactive rounded-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-islamic-green/10 dark:bg-islamic-gold/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5.5 h-5.5 text-islamic-green dark:text-islamic-gold">
                  {f.icon}
                </svg>
              </div>
              <h3 className="font-bold text-stone-850 dark:text-stone-100">{f.title}</h3>
              <p className="text-sm text-stone-550 dark:text-stone-400 mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-stone-850 dark:text-stone-100 tracking-tight">Start in three simple steps</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass rounded-2xl p-7"
            >
              <span className="text-4xl font-bold text-islamic-green/15 dark:text-islamic-gold/20">{s.n}</span>
              <h3 className="font-bold text-stone-850 dark:text-stone-100 mt-2">{s.title}</h3>
              <p className="text-sm text-stone-550 dark:text-stone-400 mt-2 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <motion.section
        {...fadeUp}
        className="relative overflow-hidden rounded-3xl bg-islamic-green dark:bg-islamic-gold text-white dark:text-islamic-dark px-8 py-14 text-center my-16"
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
        <h2 className="text-3xl font-bold tracking-tight relative z-10">Begin your Quran journey today</h2>
        <p className="mt-3 opacity-90 max-w-md mx-auto relative z-10">Join learners around the world reading and reflecting on the Quran, free and forever.</p>
        <div className="flex flex-wrap gap-4 justify-center mt-7 relative z-10">
          <Link
            to="/register"
            className="inline-block bg-white dark:bg-islamic-dark text-islamic-green dark:text-islamic-gold font-bold px-7 py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Create Free Account
          </Link>
          <Link
            to="/search"
            className="inline-block border border-white/50 dark:border-islamic-dark/40 font-bold px-7 py-3.5 rounded-xl hover:bg-white/10 dark:hover:bg-islamic-dark/10 transition-all"
          >
            Or Search Without Signing Up
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 dark:border-stone-800/60 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
        <span>© {new Date().getFullYear()} Quran Learning. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <Link to="/login" className="hover:text-islamic-green dark:hover:text-islamic-gold transition-colors">Login</Link>
          <Link to="/register" className="hover:text-islamic-green dark:hover:text-islamic-gold transition-colors">Sign Up</Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
