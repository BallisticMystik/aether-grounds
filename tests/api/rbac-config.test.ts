import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express, { Express } from 'express';
import { createServer, Server } from 'http';

// Import the RBAC routes that we'll create
// We'll test them by creating a test express app

describe('RBAC Config API', () => {
  let app: Express;
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    // Dynamic import to avoid issues with module loading
    const { createRBACRouter } = await import('../../src/api/rbac');

    app = express();
    app.use(express.json());
    app.use('/api/rbac', createRBACRouter());

    // Start server on random port
    server = createServer(app);
    await new Promise<void>((resolve) => {
      server.listen(0, () => {
        const address = server.address();
        if (address && typeof address === 'object') {
          baseUrl = `http://localhost:${address.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  describe('GET /api/rbac/config', () => {
    it('should return parsed RBAC configuration', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/config`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('metadata');
      expect(data).toHaveProperty('roles');
      expect(data).toHaveProperty('features');
      expect(data).toHaveProperty('accessLevels');
      expect(data).toHaveProperty('categories');
      expect(data).toHaveProperty('connectionTypes');
    });

    it('should return correct metadata', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/config`);
      const data = await response.json();

      expect(data.metadata.name).toBe('Coffee Platform Roles');
      expect(data.metadata.version).toBe('1.0');
    });

    it('should return all 5 roles', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/config`);
      const data = await response.json();

      expect(data.roles).toHaveLength(5);
      const roleIds = data.roles.map((r: any) => r.id);
      expect(roleIds).toContain('farmers');
      expect(roleIds).toContain('roasters');
      expect(roleIds).toContain('retailers');
      expect(roleIds).toContain('hub-community');
      expect(roleIds).toContain('affiliates-distributors');
    });

    it('should return application/json content type', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/config`);
      expect(response.headers.get('content-type')).toContain('application/json');
    });
  });

  describe('GET /api/rbac/config/validate', () => {
    it('should return validation result', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/config/validate`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('valid');
      expect(data).toHaveProperty('errors');
      expect(data.valid).toBe(true);
      expect(data.errors).toHaveLength(0);
    });
  });

  describe('GET /api/rbac/roles', () => {
    it('should return list of all roles', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/roles`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(5);
    });

    it('should return role details', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/roles`);
      const data = await response.json();

      const farmers = data.find((r: any) => r.id === 'farmers');
      expect(farmers).toBeDefined();
      expect(farmers.name).toBe('Farmers');
      expect(farmers.connectionType).toBe('purple');
      expect(farmers.features).toBeDefined();
    });
  });

  describe('GET /api/rbac/roles/:roleId', () => {
    it('should return specific role details', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/roles/farmers`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe('farmers');
      expect(data.name).toBe('Farmers');
      expect(data.features.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existent role', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/roles/nonexistent`);
      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/rbac/features', () => {
    it('should return list of all features', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/features`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(19);
    });

    it('should return feature with category', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/features`);
      const data = await response.json();

      const profile = data.find((f: any) => f.id === 'profile');
      expect(profile).toBeDefined();
      expect(profile.category).toBe('core');
    });
  });

  describe('GET /api/rbac/features/:featureId', () => {
    it('should return specific feature details', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/features/profile`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.id).toBe('profile');
      expect(data.name).toBe('Profile');
      expect(data.category).toBe('core');
    });

    it('should return 404 for non-existent feature', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/features/nonexistent`);
      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/rbac/access-levels', () => {
    it('should return all access levels', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/access-levels`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveLength(4);

      const ids = data.map((a: any) => a.id);
      expect(ids).toContain('full');
      expect(ids).toContain('partial');
      expect(ids).toContain('view-only');
      expect(ids).toContain('no');
    });
  });

  describe('GET /api/rbac/categories', () => {
    it('should return all categories', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/categories`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveLength(5);
    });
  });

  describe('GET /api/rbac/check/:roleId/:featureId', () => {
    it('should return access check result for valid role/feature', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/check/farmers/profile`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('allowed');
      expect(data).toHaveProperty('accessLevel');
      expect(data.allowed).toBe(true);
      expect(data.accessLevel).toBe('full');
    });

    it('should return denied for no-access feature', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/check/roasters/iot-devices`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.allowed).toBe(false);
      expect(data.accessLevel).toBe('no');
    });

    it('should return 404 for invalid role', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/check/invalid/profile`);
      expect(response.status).toBe(404);
    });

    it('should return partial access correctly', async () => {
      const response = await fetch(`${baseUrl}/api/rbac/check/farmers/supply-chain`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.allowed).toBe(true);
      expect(data.accessLevel).toBe('partial');
    });
  });
});
