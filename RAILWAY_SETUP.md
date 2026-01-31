# Railway Database Setup

## Current Status
- ✅ Railway project linked: `aether-grounds`
- ✅ Authentication API endpoints created
- ⚠️  Database service needs to be added

## Steps to Add PostgreSQL Database

### Option 1: Via Railway Dashboard
1. Go to https://railway.app
2. Open the `aether-grounds` project
3. Click "New" → "Database" → "Add PostgreSQL"
4. Railway will automatically:
   - Create a PostgreSQL database
   - Set `DATABASE_URL` environment variable
   - Provide connection string

### Option 2: Via Railway CLI
```bash
# Add PostgreSQL database service
railway add --database postgres

# This will automatically:
# - Create a PostgreSQL database
# - Set DATABASE_URL environment variable
```

## Environment Variables Needed

After adding the database, Railway will automatically set:
- `DATABASE_URL` - PostgreSQL connection string

You may also want to set:
- `JWT_SECRET` - Secret key for JWT tokens (generate a secure random string)
- `JWT_EXPIRES_IN` - Token expiration (default: 7d)

## Running Migrations

Once the database is set up, migrations will run automatically on server startup.

To run manually:
```bash
bun run src/db/migrations.ts
```

## Testing Database Connection

The server will log connection status on startup:
- ✅ "Database connected successfully" - Connection working
- ❌ "Database connection error" - Check DATABASE_URL
- ⚠️  "DATABASE_URL not found" - Database not configured

## Database Schema

The schema includes:
- `users` table - User accounts with email, password hash, and role
- `sessions` table - Token management (optional)
- `user_profiles` table - Extended user information
