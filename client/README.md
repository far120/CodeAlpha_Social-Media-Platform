# 📱 ELFAR Social — Frontend Client

The frontend application for **ELFAR Social Media Platform**, built using React 19, Vite, TypeScript, Tailwind CSS v4, and TanStack React Query.

## 🚀 Key Client Features

- **Dynamic Posts Feed**: Real-time post listing, liking, commenting, and creation modal with image previews.
- **Threaded Comments**: Interactive comments section on each post with real-time updates and owner controls.
- **Social Graph & Follow System**: User profile views (`/users/:userId`), follower/following counters, and instant follow/unfollow toggle.
- **User Discovery & Debounced Search**: Fast instant search bar querying users across usernames, full names, and emails.
- **User Settings & Profile**: Profile editing (`/profile`) with avatar upload, bio update, and password reset (`/change-password`).
- **Super-Admin Dashboard**:
  - `/dashboard`: Platform analytics and system stats.
  - `/dashboard/users`: User management table with inline role switching and account blocking.
  - `/dashboard/logs`: Live HTTP audit activity tracking.
- **Tailwind CSS v4 Glassmorphic UI**: Elegant dark & light modes, smooth transitions, and Lucide icons.

## 📁 Directory Structure

```
client/
├── public/                 # Static public assets
├── src/
│   ├── app/                # Application setup, router & ProtectedRoute
│   ├── components/         # Shared UI elements (Layout, Feedback, Forms, UI)
│   ├── features/           # Feature-based modular architecture
│   │   ├── auth/           # Login, Register, validation schemas
│   │   ├── comment/        # CommentItem, CommentSection, hooks & APIs
│   │   ├── logs/           # UserActivityLogs table & filters
│   │   ├── post/           # PostsFeed, PostCard, CreatePostModal
│   │   └── user/           # UserProfile, UserManagement, Dashboard, SearchBar
│   ├── lib/                # Axios instance with interceptors & React Query client
│   ├── pages/              # Landing page & layout views
│   └── styles/             # Tailwind CSS tokens
├── index.html              # HTML entrypoint
└── vite.config.ts          # Vite configuration
```

## 🛠️ Scripts

Run these commands inside the `client/` folder:

```bash
# Start Vite development server
npm run dev

# Type-check and build production bundle
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

For full project documentation, setup guides, and backend endpoints, please refer to the [Root README](../README.md).
