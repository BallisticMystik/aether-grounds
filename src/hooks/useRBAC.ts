/**
 * useRBAC Hook
 * Provides RBAC instance and utilities for checking feature access
 * Uses the /api/rbac/config endpoint for configuration
 */

import { useMemo, useState, useEffect } from 'react';
import { useRole } from '../contexts/RoleContext';
import { RBAC } from '../../types/rbac.types';
import type { RBACConfig, FeatureId, PermissionResult, RoleId } from '../../types/rbac.types';

// Cache for RBAC config and instance
let rbacConfigCache: RBACConfig | null = null;
let rbacInstanceCache: RBAC | null = null;
let loadPromise: Promise<RBACConfig> | null = null;

/**
 * Reset the RBAC cache (useful for testing)
 */
export function resetRBACCache(): void {
  rbacConfigCache = null;
  rbacInstanceCache = null;
  loadPromise = null;
}

/**
 * Load RBAC configuration from API endpoint
 */
async function loadRBACConfig(): Promise<RBACConfig> {
  // Return cached config if available
  if (rbacConfigCache) {
    return rbacConfigCache;
  }

  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // Check if we're in a test environment or server-side
  if (typeof window === 'undefined') {
    return getFallbackConfig();
  }

  // Create new load promise
  loadPromise = (async () => {
    try {
      // Try API endpoint first (returns parsed JSON)
      const response = await fetch('/api/rbac/config');

      if (response.ok) {
        const config = await response.json();
        rbacConfigCache = config;
        return config;
      }

      // Fallback: try direct XML file
      const xmlResponse = await fetch('/coffee-platform-roles.xml');
      if (xmlResponse.ok) {
        // Import parser dynamically to avoid bundling issues
        const { xmlParser } = await import('../parsers/xml-parser');
        const xmlContent = await xmlResponse.text();
        const result = await xmlParser.parseString(xmlContent);

        if (result.success && result.data) {
          rbacConfigCache = result.data;
          return result.data;
        }
      }

      throw new Error('Failed to load RBAC configuration');
    } catch (error) {
      console.warn('Failed to load RBAC config, using fallback:', error);
      // Return fallback config on error
      const fallback = getFallbackConfig();
      rbacConfigCache = fallback;
      return fallback;
    } finally {
      loadPromise = null;
    }
  })();

  return loadPromise;
}

/**
 * Fallback RBAC config for development/offline mode
 */
function getFallbackConfig(): RBACConfig {
  return {
    metadata: {
      name: 'Coffee Platform',
      description: 'Fallback configuration',
      version: '1.0',
    },
    roles: [
      {
        id: 'farmers',
        name: 'Farmers',
        connectionType: 'purple',
        features: [
          { id: 'profile', name: 'Profile', accessLevel: 'full' },
          { id: 'role-dash', name: 'Role Dashboard', accessLevel: 'full' },
        ],
      },
    ],
    features: [
      { id: 'profile', name: 'Profile', category: 'core' },
      { id: 'role-dash', name: 'Role Dashboard', category: 'core' },
    ],
    accessLevels: [
      { id: 'full', name: 'Full Access', description: 'Complete access' },
      { id: 'partial', name: 'Partial Access', description: 'Limited access' },
      { id: 'view-only', name: 'View Only', description: 'Read-only access' },
      { id: 'no', name: 'No Access', description: 'No access' },
    ],
    categories: [
      { id: 'core', name: 'Core', description: 'Core features' },
    ],
    connectionTypes: [
      { id: 'purple', name: 'Purple Connection', description: 'Purple connection' },
      { id: 'pink', name: 'Pink Connection', description: 'Pink connection' },
    ],
  };
}

/**
 * Hook to get RBAC instance
 * @returns Object containing rbac instance, loading state, and error
 */
export function useRBAC() {
  const [config, setConfig] = useState<RBACConfig | null>(rbacConfigCache);
  const [loading, setLoading] = useState(!rbacConfigCache);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Skip if already cached
    if (rbacConfigCache) {
      setConfig(rbacConfigCache);
      setLoading(false);
      return;
    }

    let cancelled = false;

    loadRBACConfig()
      .then((loadedConfig) => {
        if (!cancelled) {
          setConfig(loadedConfig);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          // Still set config to fallback
          setConfig(getFallbackConfig());
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const rbac = useMemo(() => {
    if (!config) return null;

    // Return cached instance if config hasn't changed
    if (rbacInstanceCache && rbacConfigCache === config) {
      return rbacInstanceCache;
    }

    // Create new RBAC instance
    const instance = new RBAC(config);
    rbacInstanceCache = instance;
    return instance;
  }, [config]);

  return { rbac, config, loading, error };
}

/**
 * Hook to check feature access for current role
 * @param featureId - The feature ID to check access for
 * @returns PermissionResult or null if RBAC not loaded
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

/**
 * Hook to check if user can perform write operations on a feature
 * @param featureId - The feature ID to check
 * @returns boolean or null if RBAC not loaded
 */
export function useCanWrite(featureId: FeatureId): boolean | null {
  const { currentRole } = useRole();
  const { rbac } = useRBAC();

  return useMemo(() => {
    if (!rbac || !currentRole) {
      return null;
    }
    return rbac.canWrite(currentRole, featureId);
  }, [rbac, currentRole, featureId]);
}

/**
 * Hook to check if user can read a feature
 * @param featureId - The feature ID to check
 * @returns boolean or null if RBAC not loaded
 */
export function useCanRead(featureId: FeatureId): boolean | null {
  const { currentRole } = useRole();
  const { rbac } = useRBAC();

  return useMemo(() => {
    if (!rbac || !currentRole) {
      return null;
    }
    return rbac.canRead(currentRole, featureId);
  }, [rbac, currentRole, featureId]);
}

/**
 * Hook to get all features accessible to current role
 * @returns Array of RoleFeatures or empty array if not loaded
 */
export function useRoleFeatures() {
  const { currentRole } = useRole();
  const { rbac } = useRBAC();

  return useMemo(() => {
    if (!rbac || !currentRole) {
      return [];
    }
    return rbac.getRoleFeatures(currentRole);
  }, [rbac, currentRole]);
}

/**
 * Hook to get features by category for current role
 * @param categoryId - The category to filter by
 * @returns Array of RoleFeatures in the category
 */
export function useFeaturesByCategory(categoryId: string) {
  const { currentRole } = useRole();
  const { rbac } = useRBAC();

  return useMemo(() => {
    if (!rbac || !currentRole) {
      return [];
    }
    return rbac.getFeaturesByCategory(currentRole, categoryId as any);
  }, [rbac, currentRole, categoryId]);
}
