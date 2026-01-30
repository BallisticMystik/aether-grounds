/**
 * Coffee Platform RBAC - Development Server
 * Basic Express server for testing RBAC framework
 */

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      rbac: '/api/rbac/* (coming soon)'
    }
  });
});

// Placeholder for RBAC endpoints (will be implemented later)
app.get('/api/rbac/status', (req, res) => {
  res.json({
    message: 'RBAC framework is being built',
    status: 'in-progress',
    completed: [
      'Infrastructure setup',
      'Test framework setup'
    ],
    next: 'XML Parser implementation'
  });
});

// 404 handler
app.use((req, res) => {
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

// Start server
if (import.meta.main) {
  app.listen(PORT, () => {
    console.log(`🚀 Coffee Platform RBAC Server running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`ℹ️  API info: http://localhost:${PORT}/api/info`);
    console.log(`🔐 RBAC status: http://localhost:${PORT}/api/rbac/status`);
  });
}

export default app;
