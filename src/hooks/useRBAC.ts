/**
 * useRBAC Hook
 * Provides RBAC instance and utilities for checking feature access
 */

import React, { useMemo } from 'react';
import { useRole } from '../contexts/RoleContext';
import { RBAC } from '../../types/rbac.types';
import { xmlParser } from '../parsers/xml-parser';
import { useAsync } from './useAsync';
import type { FeatureId, PermissionResult } from '../../types/rbac.types';

// Cache for RBAC config
let rbacConfigCache: any = null;
let rbacInstanceCache: RBAC | null = null;

/**
 * Load RBAC configuration from XML file
 */
async function loadRBACConfig() {
  if (rbacConfigCache) {
    return rbacConfigCache;
  }

  // Check if we're in a test environment
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
    return getFallbackConfig();
  }

  try {
    // In browser, we'll need to fetch the XML or use a pre-loaded config
    // TODO: Load from actual XML file or API endpoint
    const response = await fetch('/coffee-platform-roles.xml');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const xmlContent = await response.text();
    const result = await xmlParser.parseString(xmlContent);

    if (result.success && result.data) {
      rbacConfigCache = result.data;
      return result.data;
    }

    throw new Error(result.error || 'Failed to load RBAC config');
  } catch (error) {
    // Fallback: return minimal config for development
    console.warn('Failed to load RBAC config, using fallback:', error);
    return getFallbackConfig();
  }
}

/**
 * Fallback RBAC config for development
 */
function getFallbackConfig() {
  // This is a minimal config - in production, load from XML
  return {
    metadata: { name: 'Coffee Platform', description: '', version: '1.0' },
    roles: [],
    features: [],
    accessLevels: [],
    categories: [],
    connectionTypes: [],
  };
}

/**
 * Hook to get RBAC instance
 */
export function useRBAC() {
  const { data: config, loading, error } = useAsync(loadRBACConfig, []);

  const rbac = useMemo(() => {
    if (!config) return null;
    if (rbacInstanceCache && rbacConfigCache === config) {
      return rbacInstanceCache;
    }
    const instance = new RBAC(config);
    rbacInstanceCache = instance;
    return instance;
  }, [config]);

  return { rbac, loading, error };
}

/**
 * Hook to check feature access for current role
 */
export function useFeatureAccess(featureId: FeatureId): PermissionResult | null {
  const { currentRole } = useRole();
  const { rbac } = useRBAC();

  return useMemo(() => {
    if (!rbac || !currentRole) {
      return null;
    }
    return rbac.hasAccess(currentRole, featureId);
  }, [rbac, currentRole, featureId]);
}
