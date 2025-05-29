# Book Review Backend API

A robust RESTful API for managing books and reviews, built with Node.js, Express.js, and PostgreSQL. This system provides secure JWT-based authentication, comprehensive book management, and a fully-featured review system with advanced search capabilities.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Book Management**: Complete CRUD operations for books with metadata
- **Review System**: Rate and review books (1-5 stars) with ownership controls
- **Advanced Search**: Search books by title and author with filtering
- **Data Validation**: Comprehensive input validation using Joi
- **Error Handling**: Professional error handling with proper HTTP status codes
- **Method Validation**: Custom middleware for 404/405 error handling
- **Database Relations**: Properly structured PostgreSQL database with foreign keys

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Bookshelf.js with Knex.js query builder
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs for hashing
- **Validation**: Joi schema validation
- **Environment Management**: dotenv
- **Development**: nodemon
- **Route Matching**: path-to-regexp for advanced routing

## 📁 Project Structure

```
book-review-api/
├── controllers/
│   ├── authController.js     # User registration and login
│   ├── bookController.js     # Book CRUD and search operations
│   └── reviewController.js   # Review management
├── db/
│   └── knex.js              # Database configuration and Bookshelf setup
├── middlewares/
│   └── auth.js              # JWT authentication middleware
├── migrations/
│   └── 20250528142004_create_users_books_reviews.js  # Database schema migration
├── models/
│   ├── User.js              # User model
│   ├── Book.js              # Book model with relationships
│   └── Review.js            # Review model with constraints
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── books.js             # Book-related endpoints
│   └── reviews.js           # Review management endpoints
├── .env                     # Environment variables
├── app.js                   # Main application with advanced error handling
├── knexfile.js             # Knex configuration
└── package.json            # Dependencies and scripts
```

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd book-review-api
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123456789
DB_NAME=backend-assignment--book-store-db
DB_PORT=5432

# Server Configuration
PORT=8000

# Security
JWT_SECRET=your-super-secure-jwt-secret-key
```

### 3. Database Setup

Create PostgreSQL database:

```bash
createdb backend-assignment--book-store-db
```

Run database migrations:

```bash
npx knex migrate:latest
```

### 4. Start the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run start
```

Server will be available at `http://localhost:8000`

## 📊 Database Schema

### Users Table
```sql
id (Primary Key, Auto-increment)
username (String, Unique, Required)
email (String, Unique, Required)
password (String, Hashed, Required)
created_at, updated_at (Timestamps)
```

### Books Table
```sql
id (Primary Key, Auto-increment)
title (String, Required)
author (String, Required)
genre (String, Required)
description (Text, Required)
created_at, updated_at (Timestamps)
```

### Reviews Table
```sql
id (Primary Key, Auto-increment)
book_id (Foreign Key → books.id, CASCADE DELETE)
user_id (Foreign Key → users.id, CASCADE DELETE)
rating (Integer, 1-5, Required)
review (Text, Required)
created_at, updated_at (Timestamps)
```

## 🔐 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Book Management Endpoints

#### Add New Book (Authentication Required)
```http
POST /api/books
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic Literature",
  "description": "A masterpiece of American literature set in the Jazz Age."
}
```

**Success Response (201):**
```json
{
  "message": "Book added",
  "book": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic Literature",
    "description": "A masterpiece of American literature set in the Jazz Age.",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Get All Books with Filtering
```http
GET /api/books
GET /api/books?author=fitzgerald
GET /api/books?genre=classic
GET /api/books?author=hemingway&genre=fiction
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic Literature",
    "description": "A masterpiece of American literature set in the Jazz Age.",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
]
```

#### Get Book by ID with Reviews
```http
GET /api/books/:id
```

**Success Response (200):**
```json
{
  "book": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic Literature",
    "description": "A masterpiece of American literature set in the Jazz Age.",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  },
  "averageRating": "4.50",
  "reviews": [
    {
      "id": 1,
      "book_id": 1,
      "user_id": 1,
      "rating": 5,
      "review": "Absolutely brilliant masterpiece!",
      "created_at": "2024-01-01T12:00:00.000Z",
      "updated_at": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

#### Search Books
```http
GET /api/books/search/title?q=gatsby
GET /api/books/search/title?q=fitzgerald
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic Literature",
    "description": "A masterpiece of American literature set in the Jazz Age.",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
]
```

#### Add Review to Book (Authentication Required)
```http
POST /api/books/:id/reviews
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "rating": 5,
  "review": "An absolute masterpiece! Highly recommend."
}
```

**Success Response (201):**
```json
{
  "message": "Review added",
  "reviewFinal": {
    "id": 1,
    "book_id": 1,
    "user_id": 1,
    "rating": 5,
    "review": "An absolute masterpiece! Highly recommend.",
    "created_at": "2024-01-01T12:00:00.000Z",
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
}
```

### Review Management Endpoints

#### Update Review (Authentication Required - Owner Only)
```http
PUT /api/reviews/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "rating": 4,
  "review": "Great book, but not perfect. Still highly enjoyable."
}
```

**Success Response (200):**
```json
{
  "message": "Review updated",
  "review": "Great book, but not perfect. Still highly enjoyable."
}
```

#### Delete Review (Authentication Required - Owner Only)
```http
DELETE /api/reviews/:id
Authorization: Bearer <jwt-token>
```

**Success Response (200):**
```json
{
  "message": "Review deleted"
}
```

## 🔒 Authentication System

This API uses **JWT (JSON Web Tokens)** for secure authentication:

### How it Works:
1. User registers via `/api/auth/signup`
2. User logs in via `/api/auth/login` and receives a JWT token
3. Include token in `Authorization` header for protected routes:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Protected Endpoints:
- `POST /api/books` - Add new book
- `POST /api/books/:id/reviews` - Add review
- `PUT /api/reviews/:id` - Update review (owner only)
- `DELETE /api/reviews/:id` - Delete review (owner only)

## ✅ Error Handling & Status Codes

The API implements comprehensive error handling with proper HTTP status codes:

### Authentication Errors
- **401 Unauthorized**: Missing or invalid JWT token
- **403 Forbidden**: Insufficient permissions (e.g., trying to edit another user's review)

### Validation Errors
- **400 Bad Request**: Invalid input data, validation failures
- **404 Not Found**: Resource not found (book, review, user)
- **405 Method Not Allowed**: HTTP method not supported for endpoint

### Business Logic Errors
- **400 Bad Request**: Duplicate review, invalid rating values
- **500 Internal Server Error**: Server-side errors

### Error Response Format:
```json
{
  "error": "Descriptive error message"
}
```

```json
{
  "message": "Descriptive error message"
}
```

## 🧪 Input Validation

### User Registration Validation
```javascript
{
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}
```

### Book Creation Validation
```javascript
{
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().optional(),
  description: Joi.string().optional()
}
```

### Review Validation
- **Rating**: Must be integer between 1-5
- **Review**: Text field (required)
- **Uniqueness**: One review per user per book

## 🔍 Advanced Features

### Search Capabilities
- **Title Search**: Case-insensitive search in book titles
- **Author Search**: Case-insensitive search in author names
- **Combined Search**: Search across both title and author fields

### Filtering Options
- **Author Filter**: `GET /api/books?author=fitzgerald`
- **Genre Filter**: `GET /api/books?genre=classic`
- **Combined Filters**: `GET /api/books?author=hemingway&genre=fiction`

### Review System Features
- **Average Rating Calculation**: Automatic calculation with 2 decimal precision
- **Ownership Protection**: Users can only edit/delete their own reviews
- **Duplicate Prevention**: One review per user per book constraint
- **Chronological Ordering**: Reviews ordered by creation date (newest first)

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=your-production-db-name
DB_PORT=5432
PORT=8000
JWT_SECRET=your-ultra-secure-production-jwt-secret
```

### Production Best Practices
- Use strong, unique JWT secrets (minimum 32 characters)
- Enable HTTPS/SSL in production
- Configure proper CORS policies
- Implement rate limiting
- Set up database connection pooling
- Add request logging and monitoring
- Configure proper database user permissions

## 📦 Dependencies

### Core Production Dependencies
```json
{
  "express": "Web framework for Node.js",
  "bookshelf": "ORM for PostgreSQL",
  "knex": "SQL query builder and migration tool",
  "pg": "PostgreSQL client for Node.js",
  "jsonwebtoken": "JWT implementation",
  "bcryptjs": "Password hashing library",
  "joi": "Data validation library",
  "dotenv": "Environment variable management",
  "path-to-regexp": "Advanced URL pattern matching"
}
```

### Development Dependencies
```json
{
  "nodemon": "Development server with auto-reload"
}
```

## 🧪 Testing the API

### Using cURL Examples

**Register a new user:**
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login and get token:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Add a book (with token):**
```bash
curl -X POST http://localhost:8000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Book","author":"Test Author","genre":"Fiction","description":"A test book"}'
```

## 🛡️ Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Security**: Secure token-based authentication
- **Input Validation**: Joi schema validation for all inputs
- **SQL Injection Prevention**: Parameterized queries via Knex
- **Authorization Controls**: Route-level authentication middleware
- **Ownership Verification**: Users can only modify their own reviews

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 🆘 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**⚠️ Important Security Notes:**
- Never commit `.env` files to version control
- Use strong, unique JWT secrets in production
- Regularly update dependencies for security patches
- Implement proper logging and monitoring in production environments