/**
 * RBAC Express Middleware Integration Tests
 * Verifies createRbacMiddleware returns 401/403/next correctly.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express, { Express, Request, Response } from 'express';
import { createRbacMiddleware } from '../../../src/middleware/express-rbac';
import type { RbacRequest } from '../../../src/middleware/express-rbac';
import type { RoleId, FeatureId } from '../../../types/rbac.types';

// Mock RBACLoaderService so we control hasAccess result
const mockHasAccess = vi.fn();
const mockGetInstance = vi.fn(() => ({
  isLoaded: vi.fn(() => true),
  loadConfig: vi.fn(),
  getRBACInstance: vi.fn(() => ({
    hasAccess: mockHasAccess,
  })),
}));

vi.mock('../../../src/services/RBACLoaderService', () => ({
  RBACLoaderService: {
    getInstance: () => mockGetInstance(),
  },
}));

describe('createRbacMiddleware', () => {
  let app: Express;
  const featureId = 'profile' as FeatureId;

  beforeEach(() => {
    vi.clearAllMocks();
    mockHasAccess.mockReset();
    app = express();
    app.use(express.json());

    // Route that requires 'profile' access
    app.get(
      '/protected',
      createRbacMiddleware(featureId),
      (req: Request, res: Response) => {
        res.status(200).json({ message: 'ok', user: (req as RbacRequest).user });
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 401 when req.user is missing', async () => {
    const res = await fetch('http://localhost:0/protected', {
      method: 'GET',
    }).catch(() => null);
    // We need to actually run the app. Use supertest or createServer and request.
    const http = await import('http');
    const { createServer } = http;
    const server = createServer(app);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const addr = server.address();
    const port = typeof addr === 'object' && addr ? addr.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;

    const response = await fetch(`${baseUrl}/protected`);
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Authentication required');

    server.close();
  });

  it('should return 403 when role has no access to feature', async () => {
    mockHasAccess.mockReturnValue({
      allowed: false,
      accessLevel: 'no',
      reason: 'Access denied',
    });

    const http = await import('http');
    const server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const addr = server.address();
    const port = typeof addr === 'object' && addr ? addr.port : 0;
    const baseUrl = `http://127.0.0.1:${port}`;

    // Middleware reads req.user - we need to inject it. Add a test-only middleware that sets req.user from header.
    const appWithUser = express();
    appWithUser.use(express.json());
    appWithUser.use((req, _res, next) => {
      const roleHeader = req.headers['x-test-role'];
      if (roleHeader && typeof roleHeader === 'string') {
        (req as RbacRequest).user = {
          id: 'test-id',
          email: 'test@test.com',
          roleId: roleHeader as RoleId,
        };
      }
      next();
    });
    appWithUser.get(
      '/protected',
      createRbacMiddleware(featureId),
      (req: Request, res: Response) => {
        res.status(200).json({ message: 'ok' });
      }
    );

    const server2 = http.createServer(appWithUser);
    await new Promise<void>((resolve) => server2.listen(0, () => resolve()));
    const addr2 = server2.address();
    const port2 = typeof addr2 === 'object' && addr2 ? addr2.port : 0;

    const response = await fetch(`http://127.0.0.1:${port2}/protected`, {
      headers: { 'X-Test-Role': 'affiliates-distributors' },
    });
    expect(response.status).toBe(403);
    const body = await response.json();
    expect(body.error).toBe('Forbidden');

    server.close();
    server2.close();
  });

  it('should call next and return 200 when role has access', async () => {
    mockHasAccess.mockReturnValue({
      allowed: true,
      accessLevel: 'full',
    });

    const appWithUser = express();
    appWithUser.use(express.json());
    appWithUser.use((req, _res, next) => {
      (req as RbacRequest).user = {
        id: 'u1',
        email: 'u@test.com',
        roleId: 'farmers',
      };
      next();
    });
    appWithUser.get(
      '/protected',
      createRbacMiddleware(featureId),
      (req: Request, res: Response) => {
        res.status(200).json({ message: 'ok', user: (req as RbacRequest).user });
      }
    );

    const http = await import('http');
    const server = http.createServer(appWithUser);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const addr = server.address();
    const port = typeof addr === 'object' && addr ? addr.port : 0;

    const response = await fetch(`http://127.0.0.1:${port}/protected`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('ok');
    expect(body.user.roleId).toBe('farmers');

    server.close();
  });
});
