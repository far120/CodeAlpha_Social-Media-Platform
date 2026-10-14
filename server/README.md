# ⚙️ ELFAR Social — Backend REST API

The backend RESTful API for **ELFAR Social Media Platform**, built using Express 5, Node.js, TypeScript, MongoDB (Mongoose 9).

## 🚀 Key Server Features

- **Express 5 & TypeScript Architecture**: Modular, domain-driven structure (`modules/`, `core/`, `routes/`, `integrations/`).
- **Social Media Domain APIs**:
  - **Posts**: Full CRUD, image uploads with Multer, pagination, and Like/Unlike toggling.
  - **Comments**: Nested route controllers (`/api/v1/posts/:postId/comments`) with owner authorization.
  - **Users & Social Graph**: Follow/unfollow toggle, public profile retrieval with followers and following, debounced multi-field search engine via `APIFeatures`.
- **Role-Based Access Control (RBAC)**: Enforced via `authorizationMiddleware` (`user`, `admin`, `super-admin`).
- **Audit Activity Logging**: Custom Express middleware automatically logging requests, status codes, IP addresses, and response latencies to MongoDB (`AuditLog`) and Winston files (`logs/app.log`).
- **Security**: Rate limiting with `express-rate-limit`, `helmet` headers, CORS configuration, and bcrypt password hashing.

## 📁 Directory Structure

```
server/
├── src/
│   ├── app/                # Express bootstrap & middleware configuration
│   ├── core/               # Shared utilities, database connection, errors & middlewares
│   ├── integrations/       # External AI services (Google Gemini SDK)
│   ├── modules/            # Domain modules (posts, comments, users, auth, auditLog)
│   ├── routes/             # Central API router (/api/v1)
│   ├── seeders/            # Database seeders (Faker.js mock users & profiles)
│   └── index.ts            # Application entrypoint
├── logs/                   # Winston log files
├── uploads/                # Static user avatar and post image directory
└── package.json
```

## 🛠️ Scripts

Run these commands inside the `server/` folder:

```bash
# Start development server with TSX & Nodemon
npm run dev

# Compile TypeScript to dist/
npm run build

# Start compiled production server
npm start

# Run database seeder (generates 20 mock users & profiles)
npm run seed
```

For full setup instructions, Postman collection details, and API documentation, refer to the [Root README](../README.md).
