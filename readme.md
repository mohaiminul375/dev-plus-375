## 🚼 DevPulse – Issue Tracker API

**A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.
Built with secure authentication, role-based access control, and full CRUD operations.**

![License](https://img.shields.io/badge/license-Unlicense-green) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![Language](https://img.shields.io/badge/language-JavaScript-yellow) ![Framework](https://img.shields.io/badge/framework-Node.js-orange) ![GitHub](https://img.shields.io/badge/GitHub-mohaiminul375/dev-plus-375-black?logo=github) ![Build Status](https://img.shields.io/github/actions/workflow/status/mohaiminul375/dev-plus-375/ci.yml?branch=main)

## 📋 Table of Contents
- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## ℹ️ Project Information
- **👤 Author:** mohaiminul375
- **📦 Version:** 1.0.0
- **📄 License:** Unlicense
- **🌐 Website:** [https://as-2-dev-plus.vercel.app](https://as-2-dev-plus.vercel.app)
- **📂 Repository:** [https://github.com/mohaiminul375/dev-plus-375](https://github.com/mohaiminul375/dev-plus-375)

## Features
- User Registration & Login system
- Password hashing using bcrypt
- Authentication using JWT (Access Token)
- Role-based authorization (Contributor / Maintainer)
- Create, Read, Update, Delete (CRUD) for issues
- Middleware-based route protection
- Only Maintainer can delete issues
- PostgreSQL (NeonDB) database integration

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (`pg`)
- **Authentication:** `jsonwebtoken`, `bcrypt`

## 📦 Installation & Setup
```
git clone https://github.com/mohaiminul375/dev-plus-375
cd dev-plus-375
npm install
```

**🔐 Environment Variables
Create a `.env` file:**
```
- PORT=8800
- DATABASE_URL=your_neon_db_url
- JWT_SECRET=your_jwt_secret
- ACCESS_EXPIRE= access_expire_time
- CORS_URL=http://localhost:3000
```

## ▶️ Run Project
**Development**

```
npm run dev
```

**Production**

```
npm run build
npm start
```

## 📌 API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user and receive a JWT

### Issues (`/api/issues`)

- `GET /api/issues` - Retrieve all issues
- `GET /api/issues/:id` - Retrieve a single issue by its ID
- `POST /api/issues` - Create a new issue (Requires Auth)
- `PATCH /api/issues/:id` - Update an existing issue (Requires Auth)
- `DELETE /api/issues/:id` - Delete an issue (Requires Auth)

## 🗄️ Database Schema Summary

### users Table

| Column     | Type         | Description                      |
| ---------- | ------------ | -------------------------------- |
| id         | SERIAL       | Primary key                      |
| name       | VARCHAR(255) | User full name                   |
| email      | VARCHAR(255) | Unique user email                |
| password   | TEXT         | Hashed password                  |
| role       | VARCHAR(20)  | User role (default: contributor) |
| created_at | TIMESTAMP    | Account creation time            |
| updated_at | TIMESTAMP    | Last update time                 |

### issues Table

| Column      | Type         | Description                  |
| ----------- | ------------ | ---------------------------- |
| id          | SERIAL       | Primary key                  |
| title       | VARCHAR(150) | Issue title                  |
| description | TEXT         | Issue description            |
| type        | VARCHAR(50)  | Issue type (bug/feature)     |
| status      | VARCHAR(50)  | Issue status (default: open) |
| reporter_id | INTEGER      | ID of issue reporter         |
| created_at  | TIMESTAMP    | Issue creation time          |
| updated_at  | TIMESTAMP    | Last update time             |