** IN PROGRESS **

# 🛠️ CraftLink Frontend

**CraftLink** is a web platform that connects clients with specialists — similar to Fixly.  
The frontend is built with **React**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Zustand**, and **TanStack Query & Router**, focusing on modern architecture, performance, and reusability.

---

## 🚀 Key Features

- 🔑 **Authentication and user roles** (Client, Specialist, Admin)  
- 📋 **Create and browse job requests** with categories and locations  
- 💬 **Real-time chat** using WebSocket (STOMP)  
- 📸 **File uploads** with pre-signed URLs (AWS S3 integration)  
- 🧭 **Dynamic user dashboards** with role-based navigation  
- 📱 **Fully responsive design** powered by Tailwind and shadcn/ui  
- ⚙️ **Data fetching and caching** handled by TanStack Query

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Framework | React 18 |
| Language | TypeScript |
| UI | Tailwind CSS + shadcn/ui + MUI icons |
| Forms | React Hook Form + Zod |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Routing | TanStack Router |
| Authentication | Auth.js (NextAuth v5) |
| WebSocket | STOMP.js |

---

## 🧠 Architecture

The project follows a **feature-first modular architecture** that promotes scalability and maintainability.  
Each feature (e.g., `auth`, `chat`, `job-request`, `category`) contains its own components, hooks, stores, and API logic.

Example structure:
```
src/
 ├─ features/
 │   ├─ auth/
 │   ├─ chat/
 │   ├─ job-request/
 │   └─ category/
 ├─ components/
 ├─ hooks/
 ├─ lib/
 └─ styles/
```

---

## 🧰 Getting Started

```bash
git clone https://github.com/ajzyn/craftlink-frontend.git
cd craftlink-frontend
npm install
npm run dev
```

Then open:  
👉 http://localhost:3000

---

## 🤝 Project Context

This repository contains the frontend application of CraftLink.

- **Frontend (React)** – this repository  
- **Backend (Spring Boot + DDD + Hexagonal Architecture)** → [craftlink-backend](https://github.com/ajzyn/craftlink-backend)
