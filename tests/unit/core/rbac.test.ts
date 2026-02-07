/**
 * RBAC Core Class Unit Tests
 * Tests for the RBAC utility class (types/rbac.types.ts)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { RBAC } from '../../../types/rbac.types';
import type { RBACConfig, RoleId, FeatureId, CategoryId } from '../../../types/rbac.types';
import {
  mockRBACConfig,
  mockAccessLevels,
  mockCategories,
  mockConnectionTypes,
  mockFeatures,
} from '../../helpers/fixtures';

// Build a config with valid RoleIds only (fixtures use 'roasters-retailers' which is invalid)
function buildValidConfig(): RBACConfig {
  const farmerRole = {
    id: 'farmers' as RoleId,
    name: 'Farmers',
    connectionType: 'purple' as const,
    features: [
      { id: 'profile' as FeatureId, name: 'Profile', accessLevel: 'full' as const },
      { id: 'farm-management' as FeatureId, name: 'Farm Management', accessLevel: 'full' as const },
      { id: 'smart-contract-wizard' as FeatureId, name: 'Smart Contract Wizard', accessLevel: 'full' as const },
      { id: 'qr-certs' as FeatureId, name: 'QR Certs', accessLevel: 'full' as const },
    ],
  };
  const roasterRole = {
    id: 'roasters' as RoleId,
    name: 'Roasters',
    connectionType: 'purple' as const,
    features: [
      { id: 'profile' as FeatureId, name: 'Profile', accessLevel: 'full' as const },
      { id: 'farm-management' as FeatureId, name: 'Farm Management', accessLevel: 'partial' as const },
      { id: 'smart-contract-wizard' as FeatureId, name: 'Smart Contract Wizard', accessLevel: 'full' as const },
      { id: 'qr-certs' as FeatureId, name: 'QR Certs', accessLevel: 'view-only' as const },
    ],
  };
  const hubRole = {
    id: 'hub-community' as RoleId,
    name: 'Hubs - Community',
    connectionType: 'pink' as const,
    features: [
      { id: 'profile' as FeatureId, name: 'Profile', accessLevel: 'full' as const },
      { id: 'farm-management' as FeatureId, name: 'Farm Management', accessLevel: 'full' as const },
      { id: 'smart-contract-wizard' as FeatureId, name: 'Smart Contract Wizard', accessLevel: 'full' as const },
      { id: 'qr-certs' as FeatureId, name: 'QR Certs', accessLevel: 'full' as const },
    ],
  };
  const affiliateRole = {
    id: 'affiliates-distributors' as RoleId,
    name: 'Affiliates/Distributors',
    connectionType: 'pink' as const,
    features: [
      { id: 'profile' as FeatureId, name: 'Profile', accessLevel: 'full' as const },
      { id: 'farm-management' as FeatureId, name: 'Farm Management', accessLevel: 'no' as const },
      { id: 'smart-contract-wizard' as FeatureId, name: 'Smart Contract Wizard', accessLevel: 'partial' as const },
      { id: 'qr-certs' as FeatureId, name: 'QR Certs', accessLevel: 'full' as const },
    ],
  };

  return {
    metadata: mockRBACConfig.metadata,
    roles: [farmerRole, roasterRole, hubRole, affiliateRole],
    features: mockFeatures,
    accessLevels: mockAccessLevels,
    categories: mockCategories,
    connectionTypes: mockConnectionTypes,
  };
}

describe('RBAC', () => {
  let rbac: RBAC;
  let config: RBACConfig;

  beforeEach(() => {
    config = buildValidConfig();
    rbac = new RBAC(config);
  });

  describe('constructor', () => {
    it('should create an instance with config', () => {
      expect(rbac).toBeInstanceOf(RBAC);
    });
  });

  describe('hasAccess', () => {
    it('should return allowed and full for farmers profile', () => {
      const result = rbac.hasAccess('farmers', 'profile');
      expect(result.allowed).toBe(true);
      expect(result.accessLevel).toBe('full');
      expect(result.reason).toBeUndefined();
    });

    it('should return allowed and partial for roasters farm-management', () => {
      const result = rbac.hasAccess('roasters', 'farm-management');
      expect(result.allowed).toBe(true);
      expect(result.accessLevel).toBe('partial');
    });

    it('should return allowed and view-only for roasters qr-certs', () => {
      const result = rbac.hasAccess('roasters', 'qr-certs');
      expect(result.allowed).toBe(true);
      expect(result.accessLevel).toBe('view-only');
    });

    it('should return not allowed and no for affiliates farm-management', () => {
      const result = rbac.hasAccess('affiliates-distributors', 'farm-management');
      expect(result.allowed).toBe(false);
      expect(result.accessLevel).toBe('no');
      expect(result.reason).toBeDefined();
    });

    it('should return not allowed for invalid role', () => {
      const result = rbac.hasAccess('invalid' as RoleId, 'profile');
      expect(result.allowed).toBe(false);
      expect(result.accessLevel).toBe('no');
      expect(result.reason).toContain('not found');
    });

    it('should return not allowed for feature not in role', () => {
      const result = rbac.hasAccess('farmers', 'nonexistent' as FeatureId);
      expect(result.allowed).toBe(false);
      expect(result.accessLevel).toBe('no');
      expect(result.reason).toContain('not available');
    });
  });

  describe('hasFullAccess', () => {
    it('should return true for farmers profile', () => {
      expect(rbac.hasFullAccess('farmers', 'profile')).toBe(true);
    });

    it('should return false for roasters farm-management (partial)', () => {
      expect(rbac.hasFullAccess('roasters', 'farm-management')).toBe(false);
    });

    it('should return false for roasters qr-certs (view-only)', () => {
      expect(rbac.hasFullAccess('roasters', 'qr-certs')).toBe(false);
    });

    it('should return false for no access', () => {
      expect(rbac.hasFullAccess('affiliates-distributors', 'farm-management')).toBe(false);
    });
  });

  describe('canWrite', () => {
    it('should return true for full access', () => {
      expect(rbac.canWrite('farmers', 'profile')).toBe(true);
    });

    it('should return true for partial access', () => {
      expect(rbac.canWrite('roasters', 'farm-management')).toBe(true);
    });

    it('should return false for view-only', () => {
      expect(rbac.canWrite('roasters', 'qr-certs')).toBe(false);
    });

    it('should return false for no access', () => {
      expect(rbac.canWrite('affiliates-distributors', 'farm-management')).toBe(false);
    });
  });

  describe('canRead', () => {
    it('should return true for full, partial, view-only', () => {
      expect(rbac.canRead('farmers', 'profile')).toBe(true);
      expect(rbac.canRead('roasters', 'farm-management')).toBe(true);
      expect(rbac.canRead('roasters', 'qr-certs')).toBe(true);
    });

    it('should return false for no access', () => {
      expect(rbac.canRead('affiliates-distributors', 'farm-management')).toBe(false);
    });
  });

  describe('getRoleFeatures', () => {
    it('should return all features for a role', () => {
      const features = rbac.getRoleFeatures('farmers');
      expect(features).toHaveLength(4);
      expect(features.map(f => f.id)).toContain('profile');
      expect(features.map(f => f.id)).toContain('farm-management');
    });

    it('should return empty array for invalid role', () => {
      const features = rbac.getRoleFeatures('invalid' as RoleId);
      expect(features).toEqual([]);
    });
  });

  describe('getFeatureRoles', () => {
    it('should return all roles that have access to a feature', () => {
      const roles = rbac.getFeatureRoles('profile');
      expect(roles.length).toBeGreaterThanOrEqual(1);
      expect(roles.map(r => r.roleId)).toContain('farmers');
      expect(roles.every(r => r.accessLevel !== 'no')).toBe(true);
    });

    it('should not include roles with no access', () => {
      const roles = rbac.getFeatureRoles('farm-management');
      const affiliateEntry = roles.find(r => r.roleId === 'affiliates-distributors');
      expect(affiliateEntry).toBeUndefined();
    });

    it('should return empty array for non-existent feature', () => {
      const roles = rbac.getFeatureRoles('nonexistent' as FeatureId);
      expect(roles).toEqual([]);
    });
  });

  describe('getFeaturesByCategory', () => {
    it('should return role features that belong to the category', () => {
      const features = rbac.getFeaturesByCategory('farmers', 'farm-operations');
      expect(Array.isArray(features)).toBe(true);
      const farmMgmt = features.find(f => f.id === 'farm-management');
      expect(farmMgmt).toBeDefined();
    });

    it('should return only features the role has access to', () => {
      const features = rbac.getFeaturesByCategory('farmers', 'core');
      expect(features.some(f => f.id === 'profile')).toBe(true);
    });

    it('should return empty for invalid role', () => {
      const features = rbac.getFeaturesByCategory('invalid' as RoleId, 'core');
      expect(features).toEqual([]);
    });
  });
});
