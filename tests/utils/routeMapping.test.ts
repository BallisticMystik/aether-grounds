/**
 * Route Mapping Utility Tests
 * Tests for route-to-feature mapping functions
 */

import { describe, it, expect } from 'vitest';
import {
  getFeatureFromPath,
  getComponentForRoute,
  getPathForFeature,
  isValidRoute,
  getRouteMetadata,
} from '../../src/utils/routeMapping';

describe('getFeatureFromPath', () => {
  it('should return feature ID for valid route', () => {
    const featureId = getFeatureFromPath('/profile');
    expect(featureId).toBe('profile');
  });

  it('should return feature ID for dashboard route', () => {
    const featureId = getFeatureFromPath('/dashboard');
    expect(featureId).toBe('role-dash');
  });

  it('should return undefined for invalid route', () => {
    const featureId = getFeatureFromPath('/nonexistent');
    expect(featureId).toBeUndefined();
  });
});

describe('getComponentForRoute', () => {
  it('should return component path for valid route', () => {
    const component = getComponentForRoute('/profile');
    expect(component).toBe('src/components/features/Profile');
  });

  it('should return component path for dashboard', () => {
    const component = getComponentForRoute('/dashboard');
    expect(component).toBe('src/pages/Dashboard');
  });

  it('should return undefined for invalid route', () => {
    const component = getComponentForRoute('/nonexistent');
    expect(component).toBeUndefined();
  });
});

describe('getPathForFeature', () => {
  it('should return path for valid feature ID', () => {
    const path = getPathForFeature('profile');
    expect(path).toBe('/profile');
  });

  it('should return path for role-dash feature', () => {
    const path = getPathForFeature('role-dash');
    expect(path).toBe('/dashboard');
  });

  it('should return undefined for invalid feature ID', () => {
    const path = getPathForFeature('nonexistent' as any);
    expect(path).toBeUndefined();
  });
});

describe('isValidRoute', () => {
  it('should return true for valid routes', () => {
    expect(isValidRoute('/profile')).toBe(true);
    expect(isValidRoute('/dashboard')).toBe(true);
    expect(isValidRoute('/analytics')).toBe(true);
  });

  it('should return false for invalid routes', () => {
    expect(isValidRoute('/nonexistent')).toBe(false);
    expect(isValidRoute('/invalid-path')).toBe(false);
    expect(isValidRoute('')).toBe(false);
  });
});

describe('getRouteMetadata', () => {
  it('should return metadata for valid route', () => {
    const metadata = getRouteMetadata('/profile');
    expect(metadata).toBeDefined();
    expect(metadata?.title).toBe('Profile');
  });

  it('should return metadata for dashboard route', () => {
    const metadata = getRouteMetadata('/dashboard');
    expect(metadata).toBeDefined();
    expect(metadata?.title).toBe('Dashboard');
  });

  it('should return undefined for invalid route', () => {
    const metadata = getRouteMetadata('/nonexistent');
    expect(metadata).toBeUndefined();
  });
});

describe('Route Mapping Integration', () => {
  it('should correctly map all core features', () => {
    const coreFeatures = ['/profile', '/aether-iq', '/coffee-studio', '/shop-mint'];
    coreFeatures.forEach((path) => {
      expect(isValidRoute(path)).toBe(true);
      expect(getFeatureFromPath(path)).toBeDefined();
      expect(getComponentForRoute(path)).toBeDefined();
    });
  });

  it('should correctly map farm operations features', () => {
    const farmFeatures = ['/farm-management', '/iot-devices', '/farm-analytics'];
    farmFeatures.forEach((path) => {
      expect(isValidRoute(path)).toBe(true);
      expect(getFeatureFromPath(path)).toBeDefined();
    });
  });

  it('should correctly map production features', () => {
    const productionFeatures = [
      '/smart-contract-wizard',
      '/roast-profile',
      '/roasting-contracts',
      '/roasting-profiler',
    ];
    productionFeatures.forEach((path) => {
      expect(isValidRoute(path)).toBe(true);
      expect(getFeatureFromPath(path)).toBeDefined();
    });
  });

  it('should correctly map certification features', () => {
    const certFeatures = ['/qr-certs', '/traceability', '/supply-chain'];
    certFeatures.forEach((path) => {
      expect(isValidRoute(path)).toBe(true);
      expect(getFeatureFromPath(path)).toBeDefined();
    });
  });
});
