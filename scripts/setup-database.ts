/**
 * Database Setup Script
 * Helps set up Railway PostgreSQL database
 */

import pool from '../src/db/connection';
import { runMigrations } from '../src/db/migrations';

async function setupDatabase() {
  console.log('🔧 Setting up database...\n');

  if (!pool) {
    console.error('❌ DATABASE_URL not found!');
    console.log('\n📋 To set up the database:');
    console.log('1. Go to https://railway.app');
    console.log('2. Open your project: aether-grounds');
    console.log('3. Click "New" → "Database" → "Add PostgreSQL"');
    console.log('4. Railway will automatically set DATABASE_URL');
    console.log('\nOr run: railway add --database postgres\n');
    process.exit(1);
  }

  try {
    console.log('✅ Database connection found');
    console.log('📦 Running migrations...\n');
    
    await runMigrations();
    
    console.log('\n✅ Database setup complete!');
    console.log('🚀 You can now use the authentication endpoints:\n');
    console.log('   POST /api/auth/register');
    console.log('   POST /api/auth/login');
    console.log('   GET  /api/auth/me\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
