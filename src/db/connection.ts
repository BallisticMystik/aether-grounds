/**
 * Database Connection
 * PostgreSQL connection using Railway environment variables
 */

import pg from 'pg';
const { Pool } = pg;

// Railway provides DATABASE_URL environment variable
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.warn('⚠️  DATABASE_URL not found. Database features will be disabled.');
}

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  : null;

// Test connection
if (pool) {
  pool
    .query('SELECT NOW()')
    .then(() => {
      console.log('✅ Database connected successfully');
    })
    .catch((err) => {
      console.error('❌ Database connection error:', err.message);
    });
}

export default pool;
