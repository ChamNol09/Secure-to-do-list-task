#  Secure To-Do List API (Backend)

A secure, production-ready RESTful API for managing personal tasks with **Role-Based Access Control (RBAC)**.
Built with **Node.js, Express, MySQL, and JWT Authentication**.

---

## Features

- User Authentication (JWT)
- Role-Based Access Control (User / Admin)
- Task Management (CRUD)
- Data Privacy (users can only access their own tasks)
- Admin Controls:

- Manage users
- View all tasks
- Delete any task

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcrypt

---

## Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/ChamNol09/Secure-to-do-list.git
cd secure-to-do-list
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
# Database configuration
DB_HOST=localhost
DB_NAME=your_db_username
DB_USERNAME=root
DB_PASSWORD=your_db_password

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin@123
ADMIN_EMAIL=admin123@gmail.com

#JWT secret key
JWT_SECRET=secret_key
JWT_EXPIRED=1d

# Mailer credentails
MAIL_HOST=localhost
MAIL_SERVICE=gmail
MAIL_USER=youremail@example.com
MAIL_PASS=your_password_app_email
```

---

### 4. Setup Database

#### Create Database

```sql
CREATE DATABASE todo_db;
```

#### Create Tables

```sql
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  token VARCAHR(255),
  phone VARCHAR(20),
  address TEXT,
  role_id INT DEFAULT 2,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  is_verified TINYINT(1) DEFAULT 0,
  verification_token VARCHAR(255),
  verification_expires DATETIME,
  email_verified_at DATETIME,
  last_login_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in progress', 'completed') DEFAULT 'pending',
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### 5. Seed Roles & Admin User

```sql
INSERT INTO roles (id, name) VALUES (1, 'admin'), (2, 'user');
```

 Create Admin (use hashed password)
```
npm run seed:admin
```

---

### 6. Run Server

```bash
nodemon app.js
```

---

## Authentication

Use JWT token in headers:

```http
Authorization: Bearer <your_token>
```

---

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/verify-email`
- `POST /api/auth/resend-verification-email`
- `GET /api/auth/profile`

---

### User Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

### Admin

- `GET /api/admin/users`
- `DELETE /api/admin/users/:id`
- `GET /api/admin/tasks`
- `DELETE /api/admin/tasks/:id`

---

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Role-based authorization middleware
- Ownership validation (`user_id`)
- Environment variables for sensitive data

---

## Project Structure

```
src/
 ├── configs/
 ├── controllers/
 ├── middlewares/
 ├── models/
 ├── routes/
 ├── seeds/
 ├── services/
 ├── validators/
 └── app.js
```
