# 🌐 ELFAR Social Media Platform

A modern, full-stack social networking application built with **React 19**, **Node.js (Express 5)**, **TypeScript**, **MongoDB**.

---

## ⚡ Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, TanStack Query, Lucide Icons
- **Backend:** Node.js, Express 5, TypeScript, MongoDB (Mongoose 9), JWT, Winston
- **DevOps & Tooling:** Concurrently, Postman API Collection

---

## ✨ Features

- **Dynamic Feed & Posts:** Create, edit, and delete posts with image uploads, likes, and real-time updates.
- **Interactive Comments:** Nested discussion threads with full ownership control.
- **Social Graph & Discovery:** Follow/unfollow users, profile views, follower counts, and debounced search.
- **Admin Dashboard:** System analytics, user moderation, role management, and live HTTP audit logs.
- **Security & Performance:** JWT auth with refresh tokens, bcrypt hashing, rate limiting, and Helmet headers.

---

## 📂 Project Structure

```
├── client/          # Frontend application (React 19 + Vite + Tailwind CSS)
├── server/          # Backend REST API (Express 5 + TypeScript + MongoDB)
├── shared/          # Shared types and validation schemas
└── Social_Media_Platform.postman_collection.json  # API testing collection
```

> For details on specific layers, see the [Client README](client/README.md) and [Server README](server/README.md).

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

### 2. Environment Setup
Copy the sample environment file in the root directory:
```bash
cp .env.example .env
```
Fill in your MongoDB URI, JWT secrets, and optional `GEMINI_API_KEY`.

### 3. Installation
Install dependencies for root, client, and server:
```bash
npm install
npm --prefix client install
npm --prefix server install
```

### 4. Run Development Servers
Start both the client and server concurrently from the root directory:
```bash
npm run dev
```

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000/api/v1`

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs both client & server concurrently |
| `npm run dev:client` | Starts Vite frontend dev server |
| `npm run dev:server` | Starts Express backend dev server |
| `npm run build:client` | Builds frontend for production |
| `npm run build:server` | Compiles backend TypeScript to JS |
| `npm --prefix server run seed` | Seeds database with mock test users |



## 👤 Author

- **Mostafa Elfar**
- GitHub: [@far120](https://github.com/far120)
- LinkedIn: [Mostafa Elfar](https://www.linkedin.com/in/mostafa-mahmoud-elfar-6a67732b5)




