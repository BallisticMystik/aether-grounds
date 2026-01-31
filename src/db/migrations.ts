/**
 * Database Migrations
 * Run schema setup and migrations
 */

import pool from './connection';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function runMigrations() {
  if (!pool) {
    console.warn('⚠️  Database not configured. Skipping migrations.');
    return;
  }

  try {
    // Read schema file
    const schemaPath = join(process.cwd(), 'src/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    // Execute schema
    await pool.query(schema);
    console.log('✅ Database migrations completed');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
}

// Run migrations on import if in server context
if (typeof window === 'undefined' && import.meta.main) {
  runMigrations()
    .then(() => {
      console.log('Migrations complete');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}
