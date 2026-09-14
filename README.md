# 📖 Islamic Quran Learning Platform

> A modern, interactive full-stack web application designed to make **Quran reading, learning, bookmarking, and progress tracking** simple and accessible.

The **Islamic Quran Learning Platform** provides a clean, distraction-free learning environment where users can browse all 114 Surahs, read Arabic verses with English translations, bookmark important Ayahs, and continue their learning journey from where they left off.

The application is built with a modern **React + Node.js + Express + MySQL** architecture and integrates the **AlQuran.cloud API** for Quranic content.

---

## 🌐 Project Overview

The goal of this project is to build a complete Quran learning platform that combines:

* 📖 Quran reading
* 🔊 Audio recitation
* 🔖 Ayah bookmarking
* 📚 Learning history
* 🔐 Secure user authentication
* 📊 Learning progress
* 🔎 Quran search
* 🧠 Memorization support
* 🕌 Islamic resources

The platform is being developed incrementally through multiple development phases.

---

## ✨ Current Features

### 🕌 1. Quran Surah Browser

Users can browse all **114 Surahs** of the Quran through a modern, responsive interface.

Each Surah displays:

* Arabic name
* English name
* Surah number
* Number of Ayahs
* Revelation information
* Quick navigation to the reading view

---

### 📖 2. Interactive Quran Reading

Users can open any Surah and read the Quran using a clean reading interface.

The reading view provides:

* Arabic Quranic text
* English translation
* Ayah-by-Ayah layout
* Traditional Arabic typography
* Bookmark functionality
* Smooth navigation

The Arabic text uses the **Amiri font** to provide a traditional Quran-reading experience.

---

### 🔖 3. Ayah Bookmarking

Users can save important Ayahs by clicking the bookmark/star button.

Bookmarked Ayahs can later be accessed from the personal dashboard.

This allows users to save:

* Favorite Ayahs
* Important verses
* Verses for revision
* Verses for memorization

---

### 🕘 4. Reading History

The application automatically tracks the user's reading activity.

Users can:

* See recently visited Surahs
* Continue from their previous learning activity
* Quickly return to previously opened content

---

### 👤 5. Personal Dashboard

Authenticated users have access to a personalized dashboard.

The dashboard displays:

* 📚 Reading history
* 🔖 Saved bookmarks
* 📖 Recently viewed Surahs
* 🔗 Quick navigation back to Quran reading

---

### 🔐 6. Authentication & Security

The application includes secure user authentication.

Implemented technologies include:

* User registration
* User login
* Password hashing
* JWT authentication
* Protected routes
* Persistent login state
* Secure API requests

Passwords are hashed using **bcryptjs**, while **JSON Web Tokens (JWT)** are used for authentication and session management.

---

### 🌙 7. Dark Mode

The application includes a dedicated dark theme designed for comfortable Quran reading, especially during low-light conditions.

---

### 🎨 8. Modern Islamic UI

The platform uses a premium Islamic-inspired design system featuring:

* Emerald green
* Gold accents
* Glassmorphism
* Soft shadows
* Rounded components
* Responsive layouts
* Smooth animations
* Framer Motion transitions

The design focuses on creating a calm and distraction-free learning environment.

---

# 🖥️ Application Screens

The application currently includes the following major screens:

```text
Landing Page
      │
      ├── About
      │
      ├── Quran / Surah Browser
      │       │
      │       └── Surah Reading
      │              │
      │              └── Bookmark Ayah
      │
      ├── Login
      │
      ├── Register
      │
      └── User Dashboard
              │
              ├── Reading History
              │
              └── Bookmarked Ayahs
```

---
---

## 🛠️ Admin Panel

An administrator dashboard will be introduced for platform management.

Planned functionality:

* User management
* Islamic article management
* Quiz management
* Content moderation
* Platform statistics
* User activity monitoring

---

# 🏗️ System Architecture

The project follows a full-stack client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       Vite          │
                    └──────────┬──────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │      Backend        │
                    └───────┬─────┬───────┘
                            │     │
                  ┌─────────┘     └──────────┐
                  ▼                          ▼
        ┌─────────────────┐       ┌──────────────────┐
        │   MySQL         │       │ AlQuran.cloud API│
        │   Database      │       │ Quranic Content  │
        └─────────────────┘       └──────────────────┘
```

---

# 🛠️ Technology Stack

## 🎨 Frontend

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| React           | User interface                  |
| Vite            | Frontend development/build tool |
| Tailwind CSS v4 | Styling                         |
| Framer Motion   | Animations                      |
| React Router    | Client-side routing             |
| Zustand         | Global state management         |
| Axios           | API communication               |

---

## ⚙️ Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | REST API framework        |
| JWT        | Authentication            |
| bcryptjs   | Password hashing          |
| mysql2     | MySQL database connection |

---

## 🗄️ Database

**MySQL**

The database stores application-specific data such as:

* Users
* Bookmarks
* Reading history
* User activity

---

## 🌐 External API

The project uses:

**AlQuran.cloud API**

It provides Quranic data including:

* Surahs
* Ayahs
* Arabic text
* Translations
* Quran metadata

---

# 📁 Project Structure

```text
Islamic-Quran-Learning-Platform/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   ├── database/
│   ├── server.js
│   ├── run_init_db.js
│   ├── package.json
│   └── .env
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 💻 Installation & Setup

There are two ways to run the project:

### Option 1 — Docker ⭐ Recommended

### Option 2 — Run Locally

---

# 🐳 Option 1: Run with Docker

Docker is the recommended method because it automatically manages:

* Frontend
* Backend
* MySQL database
* Dependencies
* Service networking

## Prerequisites

Install:

* Docker Desktop

Make sure Docker Desktop is running before starting the project.

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd Islamic-Quran-Learning-Platform
```

---

## 2. Start the Application

Run:

```bash
docker compose up --build
```

Docker will:

```text
Build Frontend
      ↓
Build Backend
      ↓
Create MySQL Database
      ↓
Start All Services
```

---

## 3. Access the Application

### Frontend

```text
http://localhost:5173
```

### Backend API

```text
http://localhost:5000
```

### Backend Test Endpoint

```text
http://localhost:5000/api/test
```

### Database Status

```text
http://localhost:5000/api/db-status
```

The database status endpoint verifies that the backend can successfully communicate with MySQL.

---

## 🛑 Stop Docker Services

Press:

```text
Ctrl + C
```

or run:

```bash
docker compose down
```

---

## ⚠️ Reset the Database

If you want to completely remove the database volume and start fresh:

```bash
docker compose down -v
```

Then restart:

```bash
docker compose up --build
```

> ⚠️ Removing the volume deletes the stored MySQL data.

---

# 💻 Option 2: Run Locally

## Prerequisites

Install:

* Node.js 18+
* MySQL
* npm

---

# 🗄️ 1. Configure MySQL

Make sure your local MySQL server is running.

Create/configure the backend `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=quran_db

JWT_SECRET=your_secure_jwt_secret
```

---

# 🏗️ 2. Initialize the Database

Navigate to the backend:

```bash
cd backend
```

Run:

```bash
node run_init_db.js
```

This initializes the required database and tables.

---

# ⚙️ 3. Start the Backend

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start
```

For development:

```bash
npx nodemon server.js
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🎨 4. Start the Frontend

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

Never commit sensitive credentials to GitHub.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=quran_db
JWT_SECRET=your_secure_secret
```

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

---

# 🔐 Authentication Flow

The authentication system works approximately as follows:

```text
User
 │
 ▼
Register / Login
 │
 ▼
Express Authentication API
 │
 ├── bcryptjs
 │      └── Password Hashing
 │
 └── JWT
        └── Authentication Token
 │
 ▼
Frontend
 │
 ▼
Zustand
 │
 ▼
Protected Routes
 │
 ▼
Personal Dashboard
```

---

# 🔖 Bookmark Flow

```text
User opens Surah
        │
        ▼
Reads Ayah
        │
        ▼
Clicks ⭐
        │
        ▼
Frontend sends API request
        │
        ▼
Backend verifies JWT
        │
        ▼
Bookmark stored in MySQL
        │
        ▼
Bookmark appears in Dashboard
```

---

# 📖 Quran Reading Flow

```text
User
 │
 ▼
Surah Browser
 │
 ▼
Select Surah
 │
 ▼
Frontend requests Quran data
 │
 ▼
AlQuran.cloud API
 │
 ▼
Arabic + Translation
 │
 ▼
Interactive Reading View
```

---

# 🧪 API Endpoints

The backend exposes REST APIs for application functionality.

Example endpoint categories:

```text
Authentication
├── Register
└── Login

Users
└── User profile

Bookmarks
├── Create bookmark
├── Get bookmarks
└── Remove bookmark

Reading History
├── Save history
└── Get history

System
├── API test
└── Database status
```

---

# 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The interface adapts to different screen sizes using responsive Tailwind CSS layouts.

---

# 🎯 Project Goals

This project is not only focused on building a Quran reader.

It is designed as a practical **full-stack software engineering project** demonstrating:

* Frontend development
* Backend development
* REST API design
* Authentication
* Authorization
* Database design
* External API integration
* State management
* Responsive UI
* Docker containerization
* Application architecture
* Scalable feature development

---

# 📚 Learning Outcomes

Through this project, the following concepts are practiced:

### Frontend

* React components
* Props
* State management
* React hooks
* Routing
* API integration
* Authentication state
* Responsive design
* Animations

### Backend

* Node.js
* Express.js
* REST APIs
* Middleware
* Controllers
* Authentication
* JWT
* Password hashing
* Error handling

### Database

* MySQL
* Database relationships
* SQL queries
* CRUD operations
* Database initialization

### DevOps

* Docker
* Docker Compose
* Containers
* Service networking
* Environment variables

---

# 🔮 Future Improvements

Possible future enhancements include:

* 🤖 AI-powered Quran learning assistant
* 🧠 AI memorization assistant
* 🔎 Semantic Quran search
* 📊 Advanced learning analytics
* 🎙️ Voice-based Quran practice
* 📝 AI-generated revision quizzes
* 🌐 Multiple language translations
* 📱 Progressive Web App (PWA)
* 🔔 Learning reminders
* 👥 Community learning features
* 📚 Tafsir integration
* 🎯 Personalized learning recommendations

---

# 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

```bash
# Fork the repository

# Clone your fork
git clone <your-fork-url>

# Create a new branch
git checkout -b feature/new-feature

# Make your changes

# Commit
git add .
git commit -m "Add new feature"

# Push
git push origin feature/new-feature
```

Then create a Pull Request.

---

# 📜 License

This project is developed for **educational and learning purposes**.

Please ensure that Quranic content, translations, audio, and other external resources are used according to their respective licenses and terms of use.

---

# 👩‍💻 Author

**Samni Hasnath**

Software Engineering Undergraduate

### Technologies

```text
React
Node.js
Express.js
MySQL
JavaScript
Docker
REST APIs
JWT
Tailwind CSS
```

---

## ⭐ Support the Project

If you find this project useful or interesting:

⭐ Star the repository

🍴 Fork the project

🐛 Report issues

💡 Suggest improvements

🤝 Contribute to development

---

> 🕌 **"And We have certainly made the Quran easy for remembrance, so is there anyone who will remember?"**
>
> — Quran 54:17
