## 🚼 DevPulse – Issue Tracker API

**A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.
Built with secure authentication, role-based access control, and full CRUD operations.**

![License](https://img.shields.io/badge/license-Unlicense-green) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![Language](https://img.shields.io/badge/language-JavaScript-yellow) ![Framework](https://img.shields.io/badge/framework-express-green) ![GitHub](https://img.shields.io/badge/GitHub-mohaiminul375/dev-plus-375-black?logo=github) ![Build Status](https://img.shields.io/github/actions/workflow/status/mohaiminul375/dev-plus-375/ci.yml?branch=main)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Run Project](#run-project)
- [API Endpoints](#api-endpoints)
- [Database Schema Summary](#database-schema-summary)

## ℹ️ Project Information

- **👤 Author:** [Mohaiminul](https://mohaiminul-dev.web.app)
- **📦 Version:** 1.0.0
- **📄 License:** Unlicense
- **🌐 Website:** [https://as-2-dev-plus.vercel.app](https://as-2-dev-plus.vercel.app)
- **📂 Repository:** [https://github.com/mohaiminul375/dev-plus-375](https://github.com/mohaiminul375/dev-plus-375)

## Features

- **User Authentication:** Secure signup and login functionality using JSON Web Tokens (JWT) and `bcrypt` for password hashing.
- **Issue Management:** Complete CRUD (Create, Read, Update, Delete) operations for issues.
- **Protected Routes:** Endpoints for creating, updating, and deleting issues are secured via authentication middleware.
- **TypeScript Support:** Strongly typed codebase for better maintainability and error checking

## Tech Stack

- **Runtime:** Node.js `v24.15.0`
- **Framework:** Express.js `^5.2.1`
- **Language:** TypeScript
- **Database:** PostgreSQL (`pg`) `8.21.0`
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
| name       | VARCHAR(200) | User full name                   |
| email      | VARCHAR(200) | Unique user email                |
| password   | TEXT         | Hashed password                  |
| role       | VARCHAR(12)  | User role (default: contributor) |
| created_at | TIMESTAMP    | Account creation time            |
| updated_at | TIMESTAMP    | Last update time                 |

### issues Table

| Column      | Type         | Description                  |
| ----------- | ------------ | ---------------------------- |
| id          | SERIAL       | Primary key                  |
| title       | VARCHAR(150) | Issue title                  |
| description | TEXT         | Issue description            |
| type        | VARCHAR(20)  | Issue type (bug/feature)     |
| status      | VARCHAR(15)  | Issue status (default: open) |
| reporter_id | INTEGER      | ID of issue reporter         |
| created_at  | TIMESTAMP    | Issue creation time          |
| updated_at  | TIMESTAMP    | Last update time             |
