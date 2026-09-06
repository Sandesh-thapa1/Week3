# Week3 Express REST API

Express.js REST API assignments for Week 3.

## Features

- Express.js REST API
- MySQL database connection
- Cat and user CRUD operations
- File upload with Multer
- Thumbnail creation with Sharp
- Password hashing with bcrypt
- JWT authentication
- User login
- Protected routes
- Role-based authorization

## Authentication

Users can log in using:
POST /api/v1/auth/login

A successful login returns a JWT token.
The token is used in protected routes with:
Authorization: Bearer <token>

The logged-in user can be checked using:
GET /api/v1/auth/me

## Authorization Rules

### Regular user

- Can update their own user information.
- Can delete their own user account.
- Cannot update or delete another user.
- Can update their own cats.
- Can delete their own cats.
- Cannot update or delete cats owned by another user.
- Cannot change their role to admin.

### Admin

- Can update any user.
- Can delete any user.
- Can update any cat.
- Can delete any cat.

## Security

- Passwords are hashed using bcrypt before being stored in the database.
- JWT tokens are used for authentication.
- JWT secret and database credentials are stored in the `.env` file.
- `.env` is ignored by Git and is not committed to GitHub.
