# 📖 Islamic Quran Learning Platform

Welcome to the **Islamic Quran Learning Platform**! This is a modern, interactive full-stack web application designed to help users read, listen to, and understand the Quran seamlessly. Built with a premium Islamic-themed UI, it offers a distraction-free and highly customizable learning experience.

## ✨ Features Currently Available (Phases 1-3)

### 🕌 Core Reading Experience
- **Browse All Surahs**: A beautifully designed grid showcasing all 114 Surahs with their Arabic names, English meanings, and revelation details.
- **Interactive Reading View**: Read the Quran in traditional Arabic script (Amiri font) alongside synchronized English translations.
- **Premium Design Aesthetics**: Features a modern "glassmorphism" UI, custom Islamic color palette (emerald green and gold), and smooth Framer Motion animations.
- **Dark Mode**: A built-in dark theme optimized to reduce eye strain during long reading sessions.

### 🔐 User Accounts & Security
- **Secure Registration & Login**: Create a personal account to track your learning journey. Passwords are securely hashed using `bcryptjs`.
- **JWT Authentication**: Fast and secure session management using JSON Web Tokens.
- **Global State**: Your login session persists across the app using Zustand.

### 📚 Interactive Learning Tools
- **Ayah Bookmarking**: Click the star icon (★) next to any verse to save it for later.
- **Automatic Reading History**: The platform automatically remembers the last Surah you visited.
- **Personal Dashboard**: A secure user dashboard that dynamically fetches and displays your Reading History and saved Bookmarks, allowing you to jump right back into learning.

---

## 🚀 Future Updates & Roadmap

We are actively developing the platform! Here is what's coming in the upcoming phases:

### Phase 4: Memorization & Search
- **Memorization Mode**: Hide translations or Arabic text, show first-word hints, and auto-repeat verses to aid in Hifz (memorization).
- **Smart Search Engine**: Instantly search across Surah names, Arabic words, translations, and specific topics (e.g., "Patience", "Mercy").
- **Audio Recitation**: Play full Surahs or individual Ayahs with playback speed controls.

### Phase 5: Gamification & Islamic Resources
- **Progress Tracking**: Daily reading streaks, weekly reports, and percentage-based completion trackers.
- **Achievement Badges**: Earn milestones for consistent reading and memorization.
- **Islamic Resources**: Integrated prayer times, Qibla direction, daily Duas, and morning/evening Adhkar.
- **Admin Panel**: To manage users, publish Islamic articles, and oversee quizzes.

---

## 🛠️ Technology Stack

This platform is built using a modern **MERN-like** architecture (using MySQL instead of MongoDB):

- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion, Zustand, React Router, Axios.
- **Backend**: Node.js, Express.js, JWT, Bcryptjs.
- **Database**: MySQL (using `mysql2`).
- **External API**: [AlQuran.cloud API](https://alquran.cloud/api) for high-quality Quranic data.

---

## 💻 Running the Project Locally

### Prerequisites
- Node.js (v18+)
- MySQL Server

### 1. Database Setup
1. Open MySQL and ensure your local server is running.
2. Navigate to the `backend` folder and configure your `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=quran_db
   JWT_SECRET=super_secret_key
   ```
3. Run `node run_init_db.js` in the `backend` folder to automatically create the database and tables.

### 2. Start the Backend Server
```bash
cd backend
npm install
npm run start # or `npx nodemon server.js` for development
```

### 3. Start the Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.
