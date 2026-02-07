/**
 * Coffee Platform RBAC - Development Server
 * Basic Express server for testing RBAC framework
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Coffee Platform RBAC',
    version: '1.0.0'
  });
});

// Basic info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Coffee Platform RBAC Framework',
    description: 'Role-Based Access Control framework for Coffee Platform',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      info: '/api/info',
      auth: '/api/auth/*',
      rbac: {
        config: '/api/rbac/config',
        validate: '/api/rbac/config/validate',
        roles: '/api/rbac/roles',
        features: '/api/rbac/features',
        accessLevels: '/api/rbac/access-levels',
        categories: '/api/rbac/categories',
        check: '/api/rbac/check/:roleId/:featureId'
      }
    }
  });
});

// Authentication routes
import authRouter from './api/auth';
app.use('/api/auth', authRouter);

// RBAC config is loaded at server startup from coffee-platform-roles.xml (see block below)
import { RBACLoaderService } from './services/RBACLoaderService';
import { createRBACRouter } from './api/rbac';
app.use('/api/rbac', createRBACRouter());

// Serve XML config file for frontend fetch
app.get('/coffee-platform-roles.xml', (req, res) => {
  res.sendFile(join(process.cwd(), 'coffee-platform-roles.xml'));
});

// Initialize database on startup
import { runMigrations } from './db/migrations';

// Load RBAC configuration at startup so /api/rbac/config and permission checks work immediately
async function loadRbacAtStartup(): Promise<void> {
  try {
    const loader = RBACLoaderService.getInstance();
    await loader.loadConfig();
    console.log('RBAC config loaded from coffee-platform-roles.xml');
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('RBAC config load failed (first request may still load it):', msg);
    if (isProduction) {
      console.error('Exiting in production due to missing RBAC config.');
      process.exit(1);
    }
  }
}

if (import.meta.main) {
  runMigrations().catch((err) => {
    console.error('Failed to run migrations:', err);
  });
}

// Serve static files from frontend build in production
if (isProduction) {
  app.use(express.static(join(__dirname, '../dist')));
  
  // SPA fallback: serve index.html for all non-API routes
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return next();
    }
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server (RBAC config loaded before listen so first request gets config)
if (import.meta.main) {
  loadRbacAtStartup().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Coffee Platform RBAC Server running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`ℹ️  API info: http://localhost:${PORT}/api/info`);
      console.log(`🔐 RBAC config: http://localhost:${PORT}/api/rbac/config`);
    });
  }).catch((err) => {
    console.error('Startup failed:', err);
    process.exit(1);
  });
}

export default app;
