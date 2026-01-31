# Authentication & Database Setup

## ✅ Completed

### Frontend
- ✅ Login page (`/login`) - User authentication
- ✅ Registration page (`/register`) - Account creation
- ✅ AuthContext - Global authentication state management
- ✅ Updated Landing page with login/register links
- ✅ Protected routes integration with authentication

### Backend
- ✅ Authentication API endpoints:
  - `POST /api/auth/register` - Create new user account
  - `POST /api/auth/login` - User login
  - `GET /api/auth/me` - Get current user (protected)
- ✅ Database connection setup (PostgreSQL)
- ✅ Database schema (users, sessions, user_profiles tables)
- ✅ Password hashing with bcrypt
- ✅ JWT token generation and validation
- ✅ Migration system

### Database
- ✅ PostgreSQL schema defined
- ✅ User table with email, password hash, and role
- ✅ Session management table
- ✅ User profiles table

## 🔧 Setup Required

### 1. Add PostgreSQL Database to Railway

**Option A: Via Railway Dashboard**
1. Go to https://railway.app
2. Open project: `aether-grounds`
3. Click "New" → "Database" → "Add PostgreSQL"
4. Railway automatically sets `DATABASE_URL`

**Option B: Via Railway CLI**
```bash
railway add --database postgres
```

### 2. Set Environment Variables

Railway will automatically set:
- `DATABASE_URL` - PostgreSQL connection string

**Optional (recommended):**
- `JWT_SECRET` - Secret key for JWT tokens (generate a secure random string)
- `JWT_EXPIRES_IN` - Token expiration (default: `7d`)

To set custom variables:
```bash
railway variables set JWT_SECRET=your-secret-key-here
railway variables set JWT_EXPIRES_IN=7d
```

### 3. Run Database Migrations

Migrations run automatically on server startup, or run manually:

```bash
# Via npm script
bun run db:setup

# Or directly
bun run scripts/setup-database.ts
```

## 📋 API Endpoints

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "roleId": "farmers"
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "roleId": "farmers"
  }
}
```

### Get Current User (Protected)
```bash
GET /api/auth/me
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "roleId": "farmers",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token-based authentication
- ✅ Token expiration support
- ✅ Protected API endpoints
- ✅ CORS configuration
- ✅ Input validation

## 🚀 Usage Flow

1. User visits landing page
2. Clicks "Create Account" or "Sign In"
3. Fills out form (email/password)
4. Backend validates and creates/authenticates user
5. JWT token stored in localStorage
6. User redirected to dashboard
7. Role automatically set from user data
8. Protected routes accessible based on role

## 📝 Notes

- Default role for new users: `farmers`
- Password minimum length: 8 characters
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Database migrations run automatically on server startup
- Connection errors are logged but don't crash the server

## 🐛 Troubleshooting

**Database not connecting:**
- Check `DATABASE_URL` is set in Railway
- Verify database service is running
- Check connection string format

**Migrations failing:**
- Check database permissions
- Verify schema doesn't already exist
- Check server logs for specific errors

**Authentication not working:**
- Verify JWT_SECRET is set
- Check token expiration
- Verify API endpoints are accessible
- Check browser console for errors
