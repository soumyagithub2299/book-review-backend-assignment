# book-review-backend-assignment

## 📦 Technologies Used
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (with pg driver)
- **ORM**: Bookshelf.js with Knex query builder
- **Authentication**: JWT, bcryptjs
- **Validation**: Joi
- **Environment**: dotenv
- **Development**: nodemon

## 📁 Project Structure
book-review-api/
├── config/
│ └── db.js # Database configuration
├── controllers/
│ ├── authController.js # Authentication logic
│ ├── bookController.js # Book operations
│ └── reviewController.js # Review operations
├── migrations/ # Database migrations
├── models/ # Data models
│ ├── Book.js
│ ├── Review.js
│ └── User.js
├── routes/
│ ├── authRoutes.js # Auth endpoints
│ ├── bookRoutes.js # Book endpoints
│ └── reviewRoutes.js # Review endpoints
├── middlewares/
│ └── auth.js # Authentication middleware
├── .env # Environment variables
├── app.js # Main application entry
└── package.json


## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
npm install bookshelf dotenv express joi jsonwebtoken knex pg bcryptjs
npm install nodemon --save-dev
2. Database Setup
Create PostgreSQL database:

bash
createdb backend-assignment--book-store-db
Run migrations:

bash
npx knex migrate:latest
3. Configuration
Create .env file:

env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123456789
DB_NAME=backend-assignment--book-store-db
DB_PORT=5432
PORT=8000
JWT_SECRET=supersecretkey
4. Start the Server
bash
npm run start
# or for development with nodemon:
npm run dev

Also i have attached postman collection to test the APIs

🔐 Authentication Flow

User signs up → /api/auth/signup

User logs in → /api/auth/login (returns JWT)

JWT is included in Authorization header for protected routes

Auth middleware verifies JWT before granting access

📊 Database Models
User: Handles authentication (username, email, hashed password)

Book: Stores book information (title, author, genre, description)

Review: Stores user reviews (rating, comment, book/user relations)

🌐 API Endpoints
Authentication
POST /api/auth/signup - Register new user

POST /api/auth/login - Login existing user

Books
POST /api/books - Add new book (auth required)

GET /api/books - Get all books

GET /api/books/:id - Get single book with reviews

GET /api/books/search?q=query - Search books

Reviews
POST /api/books/:id/reviews - Add review (auth required)

PUT /api/reviews/:id - Update review (auth required)

DELETE /api/reviews/:id - Delete review (auth required)

🛠️ Key Packages
bookshelf: ORM for PostgreSQL

knex: SQL query builder

pg: PostgreSQL driver

jsonwebtoken: JWT implementation

bcryptjs: Password hashing

joi: Request validation

dotenv: Environment variables

⚠️ Important Notes
Never commit .env to version control

For production, use stronger secrets

The JWT secret should be complex and kept secure

Database credentials should have limited privileges in production


This README includes all the requested information:
1. Complete setup instructions
2. Technology stack details
3. Folder structure
4. Database configuration
5. API endpoints
6. Authentication flow
7. Key packages used
8. Important notes for security

The content is ready to copy and paste into your README.md file. You may want to adjust the formatting or add additional sections as needed for your specific project requirements.
