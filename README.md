# IDRS ERP System

A unified multi-portal ERP system for KITSW — featuring Admin, Faculty, Student, and Alumni portals, each backed by dedicated microservices.

---

## 🚀 Quick Start

```bash
npm run install:all   # Install dependencies in all 9 modules
npm start             # Boot the entire ERP system
```

Then open: **http://localhost:3000**

---

## 🌐 Port Reference

| Module           | Port  |
|------------------|-------|
| ERP Gateway      | 3000  |
| Faculty Frontend | 5173  |
| Admin Frontend   | 5174  |
| Student Frontend | 5175  |
| Alumni Frontend  | 5176  |
| Admin Backend    | 5004  |
| Student Backend  | 5001  |
| Faculty Backend  | 5002  |
| Alumni Backend   | 5003  |

---

## 🔑 Test Credentials

| Module   | Login Field | Value                 | Password     |
|----------|-------------|-----------------------|--------------|
| Admin    | Username    | `admin`               | `admin123`   |
| Faculty  | Faculty ID  | `FAC001`              | `password123`|
| Student  | Email       | `student@kitsw.ac.in` | `password123`|
| Alumni   | Email       | `alumni@kitsw.ac.in`  | `password123`|

> **To re-seed test data:** `node seed.js` from the root folder.  
> ⚠️ The faculty user's password is stored as an AES-256-encrypted bcrypt hash (matching the faculty-backend's storage format). Always use `seed.js` to create test users — do **not** insert them directly into MongoDB.

---

## 📁 Project Structure

```
IDRS copy/
├── Kitsw-IDRS-ERP-Gateway/  # Central ERP Landing Page (port 3000)
├── admin-frontend/           # Admin Portal UI (port 5174)
├── admin-backend/            # Admin & Document Microservice (port 5004)
├── faculty-frontend/         # Faculty Portal UI (port 5173)
├── faculty-backend/          # Faculty Microservice (port 5002)
├── student-frontend/         # Student Hub UI (port 5175)
├── student-backend/          # Student Microservice (port 5001)
├── alumni-frontend/          # Alumni Network UI (port 5176)
├── alumni-backend/           # Alumni Microservice (port 5003)
├── seed.js                   # Database seeder script (all 4 modules)
└── package.json              # Unified ERP runner (concurrently)
```

---

## 🏗️ Architecture Notes

### Authentication
- Each portal manages its own auth independently via JWT tokens.
- The faculty backend stores passwords as **AES-256-CBC encrypted bcrypt hashes** for an extra layer of security.
- Tokens expire after **30 minutes** — users will be redirected to login automatically.

### LocalStorage Key Scoping
Since all portals share the `localhost` domain, each portal uses **scoped localStorage keys** to prevent collisions:

| Portal   | Token Key        | User Key        |
|----------|------------------|-----------------|
| Faculty  | `faculty_token`  | `faculty_user`  |
| Student  | `token`          | `user`          |
| Alumni   | `token`          | –               |
| Admin    | `admin_token`    | `admin_user`    |

> ⚠️ If running multiple portals simultaneously in the same browser, use separate browser profiles or incognito windows to avoid localStorage key conflicts (especially between Student and Alumni portals which share the same key names).

### Database
Each module has its own MongoDB database on Atlas:

| Module   | Database Name           |
|----------|-------------------------|
| Student  | `idrs-copy`             |
| Alumni   | `alumni-module-copy`    |
| Faculty  | `faculty-module-copy`   |
| Admin    | `idrs_admin-copy`       |

---

## 🛠️ Environment Variables

Each backend has a `.env` file in its root folder. Key variables:

| Variable          | Description                                      |
|-------------------|--------------------------------------------------|
| `PORT`            | The port the backend listens on                  |
| `DATABASE_URL`    | MongoDB Atlas connection string                  |
| `JWT_SECRET`      | Secret key for signing JWT tokens                |
| `ENCRYPTION_KEY`  | 32-byte AES key (faculty-backend only)           |
| `EMAIL_USER`      | Gmail address for nodemailer (admin-backend)     |
| `EMAIL_PASS`      | Gmail App Password for nodemailer                |
| `FIREBASE_*`      | Firebase config for push notifications (faculty) |

---

## 📦 Scripts

```bash
npm run install:all   # Install dependencies across all 9 packages
npm start             # Start all services concurrently
node seed.js          # Re-seed all 4 databases with test data
```
