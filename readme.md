# dev-plus-375

> A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions._
> CRUD operation

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

## Installation
```
git clone https://github.com/mohaiminul375/dev-plus-375
cd dev-plus-375
npm install
```


## 📌 API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login

### Issues
GET /api/issues  
POST /api/issues  
PATCH /api/issues/:id  
DELETE /api/issues/:id

## Environment Variables
- PORT=8800
- DATABASE_URL=your_neon_db_url
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRES_IN=7d
- CORS_URL="http://localhost:3000"

## 🚀 Deployment
Live API: https://as-2-dev-plus.vercel.app