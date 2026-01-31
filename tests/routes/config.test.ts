/**
 * Route Configuration Tests
 * Tests for route configuration structure and utilities
 */

import { describe, it, expect } from 'vitest';
import {
  routes,
  getRouteConfig,
  getRouteByFeatureId,
  getValidRoutes,
  validateRouteConfig,
} from '../../src/routes/index';
import type { RouteConfig } from '../../src/routes/types';

describe('Route Configuration', () => {
  it('should have routes defined', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have valid route structure', () => {
    routes.forEach((route) => {
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('featureId');
      expect(route).toHaveProperty('component');
      expect(route.path).toMatch(/^\//);
    });
  });

  it('should have dashboard route', () => {
    const dashboardRoute = routes.find((r) => r.path === '/dashboard');
    expect(dashboardRoute).toBeDefined();
    expect(dashboardRoute?.featureId).toBe('role-dash');
  });

  it('should have profile route', () => {
    const profileRoute = routes.find((r) => r.path === '/profile');
    expect(profileRoute).toBeDefined();
    expect(profileRoute?.featureId).toBe('profile');
  });
});

describe('getRouteConfig', () => {
  it('should return route config for valid path', () => {
    const route = getRouteConfig('/dashboard');
    expect(route).toBeDefined();
    expect(route?.path).toBe('/dashboard');
  });

  it('should return undefined for invalid path', () => {
    const route = getRouteConfig('/nonexistent');
    expect(route).toBeUndefined();
  });
});

describe('getRouteByFeatureId', () => {
  it('should return route config for valid feature ID', () => {
    const route = getRouteByFeatureId('profile');
    expect(route).toBeDefined();
    expect(route?.featureId).toBe('profile');
  });

  it('should return undefined for invalid feature ID', () => {
    const route = getRouteByFeatureId('nonexistent' as any);
    expect(route).toBeUndefined();
  });
});

describe('validateRouteConfig', () => {
  it('should validate correct route config', () => {
    const validRoute: RouteConfig = {
      path: '/test',
      featureId: 'profile',
      component: 'src/components/features/Profile',
    };
    expect(validateRouteConfig(validRoute)).toBe(true);
  });

  it('should reject route without path', () => {
    const invalidRoute = {
      featureId: 'profile',
      component: 'src/components/features/Profile',
    } as RouteConfig;
    expect(validateRouteConfig(invalidRoute)).toBe(false);
  });

  it('should reject route without featureId', () => {
    const invalidRoute = {
      path: '/test',
      component: 'src/components/features/Profile',
    } as RouteConfig;
    expect(validateRouteConfig(invalidRoute)).toBe(false);
  });

  it('should reject route without component', () => {
    const invalidRoute = {
      path: '/test',
      featureId: 'profile',
    } as RouteConfig;
    expect(validateRouteConfig(invalidRoute)).toBe(false);
  });

  it('should reject route with path not starting with /', () => {
    const invalidRoute: RouteConfig = {
      path: 'test',
      featureId: 'profile',
      component: 'src/components/features/Profile',
    };
    expect(validateRouteConfig(invalidRoute)).toBe(false);
  });
});

describe('getValidRoutes', () => {
  it('should return all valid routes', () => {
    const validRoutes = getValidRoutes();
    expect(validRoutes.length).toBe(routes.length);
    validRoutes.forEach((route) => {
      expect(validateRouteConfig(route)).toBe(true);
    });
  });
});
