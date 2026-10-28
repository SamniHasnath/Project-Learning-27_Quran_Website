<div align="center">

# 📖 Islamic Quran Learning Platform

**A modern full-stack web app for reading, bookmarking, and tracking your Quran learning journey.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#-tech-stack)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#-tech-stack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](#-tech-stack)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#-tech-stack)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](#-tech-stack)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](#-tech-stack)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#-option-1-run-with-docker-recommended)

</div>

---

## 📖 About

The **Islamic Quran Learning Platform** offers a calm, distraction-free space to:

- 🕌 Browse all **114 Surahs**
- 📖 Read Arabic verses alongside English translations
- 🔖 Bookmark meaningful Ayahs
- 🕘 Pick up right where you left off

It's built on **React + Node.js + Express + MySQL**, with Quranic content provided by the **[AlQuran.cloud API](https://alquran.cloud/api)**. The platform is being developed in phases — see the [Roadmap](#-roadmap) for what's coming next.

---

## 📑 Table of Contents

- [Features](#-features)
- [Screens](#️-screens)
- [System Architecture](#️-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [API Overview](#-api-overview)
- [Roadmap](#-roadmap)
- [Learning Outcomes](#-learning-outcomes)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 🕌 Surah Browser
Browse all 114 Surahs, each showing its **Arabic name, English name, number, Ayah count, and revelation type**, with one-click access to the reading view.

### 📖 Interactive Reading
- Arabic text with English translation, laid out **Ayah by Ayah**
- Traditional typography using the **Amiri** font
- Bookmark any Ayah directly while reading

### 🔖 Ayah Bookmarks
Save favorite, important, or memorization verses with the ⭐ button — all available later in your dashboard.

### 🕘 Reading History
Your reading activity is tracked automatically, so you can revisit recent Surahs and continue where you stopped.

### 👤 Personal Dashboard
One place for your **reading history**, **saved bookmarks**, and **recently viewed Surahs**, with quick links back into reading.

### 🔐 Secure Authentication
- Registration and login
- Passwords hashed with **bcryptjs**
- **JWT**-based authentication with protected routes
- Persistent login state

### 🌙 Dark Mode
A dedicated dark theme for comfortable reading in low light.

### 🎨 Islamic-Inspired Design
Emerald green and gold palette, glassmorphism, soft shadows, rounded components, and smooth **Framer Motion** transitions — fully responsive across desktop, tablet, and mobile.

---

## 🖥️ Screens

```text
Landing Page
├── About
├── Quran (Surah Browser)
│   └── Surah Reading
│       └── Bookmark Ayah ⭐
├── Login
├── Register
└── Dashboard  🔒
    ├── Reading History
    └── Bookmarked Ayahs
```

---

## 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │        User         │
                 └──────────┬──────────┘
                            ▼
                 ┌─────────────────────┐
                 │   React + Vite      │
                 │     Frontend        │
                 └─────┬─────────┬─────┘
          REST (Axios) │         │ Quran data
                       ▼         ▼
       ┌─────────────────────┐  ┌──────────────────────┐
       │  Node.js + Express  │  │  AlQuran.cloud API   │
       │      Backend        │  │  (Surahs, Ayahs,     │
       └──────────┬──────────┘  │   translations)      │
                  ▼             └──────────────────────┘
       ┌─────────────────────┐
       │   MySQL Database    │
       │ (users, bookmarks,  │
       │  reading history)   │
       └─────────────────────┘
```

> The backend and MySQL handle user data; Quranic text and translations come from AlQuran.cloud.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React | UI components |
| | Vite | Dev server & build tool |
| | Tailwind CSS v4 | Styling |
| | Framer Motion | Animations |
| | React Router | Client-side routing |
| | Zustand | Global state management |
| | Axios | HTTP requests |
| **Backend** | Node.js | JavaScript runtime |
| | Express.js | REST API framework |
| | jsonwebtoken (JWT) | Authentication |
| | bcryptjs | Password hashing |
| | mysql2 | MySQL driver |
| **Database** | MySQL | Users, bookmarks, reading history |
| **External API** | AlQuran.cloud | Surahs, Ayahs, Arabic text, translations |
| **DevOps** | Docker & Docker Compose | Containerized local setup |

---

## 📁 Project Structure

```text
Islamic-Quran-Learning-Platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images, fonts
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Route-level pages
│   │   ├── services/       # API calls (Axios)
│   │   ├── store/          # Zustand stores
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/             # App & DB configuration
│   ├── controllers/        # Request handlers
│   ├── database/           # SQL schema / init scripts
│   ├── middleware/         # Auth (JWT) & error handling
│   ├── models/             # Data access
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   ├── run_init_db.js      # Database initializer
│   ├── package.json
│   └── .env                # Local only — not committed
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

Choose one of two setups:

| Option | Best for |
| --- | --- |
| 🐳 **Docker** (recommended) | Quickest setup — runs frontend, backend, and MySQL together |
| 💻 **Local** | Developing without Docker |

First, clone the repository:

```bash
git clone <your-repository-url>
cd Islamic-Quran-Learning-Platform
```

### 🐳 Option 1: Run with Docker (Recommended)

**Prerequisite:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

```bash
docker compose up --build
```

This builds the frontend and backend, creates the MySQL database, and starts all services.

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| API health check | http://localhost:5000/api/test |
| Database status | http://localhost:5000/api/db-status |

**Useful commands:**

```bash
# Stop all services (or press Ctrl + C)
docker compose down

# Reset everything, including the database
docker compose down -v
docker compose up --build
```

> ⚠️ `docker compose down -v` **permanently deletes** all stored MySQL data.

### 💻 Option 2: Run Locally

**Prerequisites:** Node.js 18+, npm, and a running MySQL server.

**1. Configure the backend** — create `backend/.env` (see [Environment Variables](#-environment-variables)).

**2. Initialize the database and start the backend**

```bash
cd backend
npm install
node run_init_db.js     # creates the database and tables
npm run start           # or: npx nodemon server.js (auto-reload)
```

Backend runs at **http://localhost:5000**.

**3. Start the frontend** (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**.

---

## 🔑 Environment Variables

Create `backend/.env`:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=quran_db

JWT_SECRET=your_secure_jwt_secret
```

> 🔒 **Never commit `.env` to GitHub.** Make sure your `.gitignore` includes:
>
> ```gitignore
> .env
> node_modules/
> dist/
> ```

---

## ⚙️ How It Works

### 🔐 Authentication

```text
Register / Login
      │
      ▼
Express Auth API ──► bcryptjs hashes & verifies password
      │
      ▼
JWT issued ──► stored in Zustand on the frontend
      │
      ▼
Protected routes unlocked ──► Dashboard
```

### 📖 Reading a Surah

```text
Surah Browser → select Surah → fetch from AlQuran.cloud
      → Arabic text + English translation → Reading view
```

### 🔖 Bookmarking an Ayah

```text
Click ⭐ on an Ayah → API request with JWT → backend verifies token
      → bookmark saved in MySQL → appears in Dashboard
```

---

## 🧪 API Overview

| Category | Operations |
| --- | --- |
| **Auth** | Register, Login |
| **Users** | Get user profile |
| **Bookmarks** | Create, list, remove |
| **Reading History** | Save, list |
| **System** | `GET /api/test`, `GET /api/db-status` |

---

## 🔮 Roadmap

**Learning features**
- [ ] 🔊 Audio recitation
- [ ] 🔎 Quran search (including semantic search)
- [ ] 🧠 Memorization support & AI memorization assistant
- [ ] 📚 Tafsir integration
- [ ] 🌐 Multiple translation languages
- [ ] 📝 AI-generated revision quizzes
- [ ] 🎙️ Voice-based recitation practice
- [ ] 🕌 Islamic articles & resources

**Platform features**
- [ ] 🛠️ Admin panel — user, article & quiz management, moderation, statistics, activity monitoring
- [ ] 📊 Learning progress & analytics
- [ ] 🎯 Personalized recommendations
- [ ] 🔔 Learning reminders
- [ ] 👥 Community learning
- [ ] 📱 Progressive Web App (PWA)

---

## 📚 Learning Outcomes

| Area | Concepts practiced |
| --- | --- |
| **Frontend** | React components, props, hooks, routing, Zustand state, API integration, auth state, responsive design, animations |
| **Backend** | Express REST APIs, controllers, middleware, JWT auth, password hashing, error handling |
| **Database** | MySQL, relationships, SQL queries, CRUD, database initialization |
| **DevOps** | Docker, Docker Compose, containers, service networking, environment variables |

---

## 🤝 Contributing

Contributions and suggestions are welcome!

1. **Fork** the repository
2. **Clone** your fork
   ```bash
   git clone <your-fork-url>
   ```
3. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit** your changes
   ```bash
   git add .
   git commit -m "Add: short description of your change"
   ```
5. **Push** and open a **Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 📜 License

This project is developed for **educational purposes**.

Quranic text, translations, audio, and other external resources remain subject to their respective licenses and terms of use — please respect them when using or extending this project.

---

## 👩‍💻 Author

**Samni Hasnath** — Software Engineering Undergraduate

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Samni_Hasnath-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/samni-hasnath03)
[![GitHub](https://img.shields.io/badge/GitHub-SamniHasnath-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/SamniHasnath)

---

<div align="center">

> 🕌 *"And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?"*
>
> — **Surah Al-Qamar 54:17**

⭐ **If you find this project useful, consider giving it a star!**

</div>
