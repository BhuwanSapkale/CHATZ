# NEXUS Chat — Full MERN Stack App

A real-time chat application built with MongoDB, Express, React, and Node.js.
Styled with a dark cyberpunk aesthetic, animated with GSAP, and powered by Socket.io.

---

## 📁 Project Structure

```
NEXUS-chat/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── lib/
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   └── utils.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── index.js          ← Main entry with Socket.io
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Avatar.jsx
    │   │   ├── ChatContainer.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   ├── lib/
    │   │   ├── axios.js
    │   │   └── utils.js
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   └── SignupPage.jsx
    │   ├── store/
    │   │   ├── useAuthStore.js
    │   │   └── useChatStore.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (already configured in .env)
- Cloudinary account (already configured in .env)

---

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on: **http://localhost:5001**

---

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

> The Vite dev server proxies `/api` calls to localhost:5001 automatically.

---

## ✅ Features

| Feature | Status |
|---------|--------|
| User signup / login / logout | ✅ |
| JWT authentication via cookies | ✅ |
| Protected routes (frontend + backend) | ✅ |
| Real-time messaging via Socket.io | ✅ |
| Live online/offline user presence | ✅ |
| Image message uploads (Cloudinary) | ✅ |
| Profile picture upload | ✅ |
| Message history with date grouping | ✅ |
| User search in sidebar | ✅ |
| Online-only user filter | ✅ |
| GSAP animations throughout | ✅ |
| Responsive design | ✅ |
| Toast notifications | ✅ |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| PUT | /api/auth/update-profile | Update profile pic |
| GET | /api/auth/check | Verify current session |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/message/user | Get all users for sidebar |
| GET | /api/message/:id | Get conversation with user |
| POST | /api/message/send/:id | Send a message |

---

## 🎨 Tech Stack

**Backend:** Node.js, Express 5, MongoDB + Mongoose, Socket.io, JWT, bcryptjs, Cloudinary, CORS

**Frontend:** React 18, Vite, Tailwind CSS, GSAP, Zustand, Axios, Socket.io-client, React Router, React Hot Toast, Lucide React
