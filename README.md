# Week3 Express REST API

Express.js REST API project containing Week 3 Assignments.

## Assignments

### Assignment 1

- Express.js REST API setup
- API routes and controllers

### Assignment 2

- Cat and user CRUD operations
- GET, POST, PUT and DELETE endpoints

### Assignment 3

- File upload using Multer
- Uploaded files stored in the uploads folder

### Assignment 4

- Thumbnail creation using Sharp
- Image processing middleware

### Assignment 5

- MySQL database connection
- Cat and user data stored in MySQL
- Prepared SQL statements
- Cat owner information
- Database transaction when deleting users

### Assignment 6

- Password hashing with bcrypt
- JWT authentication
- User login
- Protected routes
- Role-based authorization
- Regular user and admin permissions
- CORS support

### Assignment 7

- Custom error handling middleware
- JSON error responses
- Server-side validation using express-validator
- Input sanitization
- User validation
- Cat validation
- Login validation
- File type validation
- Maximum file upload size of 10 MB
- 404 error handling

## Authentication

Users can log in using:
POST /api/v1/auth/login
A successful login returns a JWT token.
Protected routes use:
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

## Validation and Error Handling

- Invalid requests return JSON error messages.
- User registration validates name, username, email and password.
- Cat data validates name, weight, owner and birthdate.
- Login validates username and password.
- Uploaded files are limited to images and videos.
- Maximum upload size is 10 MB.
- Unknown routes return a 404 JSON error.

## Security

- Passwords are hashed using bcrypt before being stored in the database.
- JWT tokens are used for authentication.
- JWT secret and database credentials are stored in the `.env` file.
- `.env` is ignored by Git and is not committed to GitHub.
