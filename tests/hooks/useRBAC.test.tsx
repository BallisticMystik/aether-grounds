import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import type { RBACConfig } from '../../types/rbac.types';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock useRole to return a controllable role
let mockCurrentRole: string = 'farmers';
vi.mock('../../src/contexts/RoleContext', () => ({
  useRole: () => ({
    currentRole: mockCurrentRole,
    setCurrentRole: (role: string) => { mockCurrentRole = role; },
    availableRoles: ['farmers', 'roasters', 'retailers', 'hub-community', 'affiliates-distributors'],
    hasRole: (role: string) => mockCurrentRole === role,
  }),
  RoleProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock RBAC config response
const mockConfig: RBACConfig = {
  metadata: {
    name: 'Coffee Platform Roles',
    description: 'Test',
    version: '1.0',
  },
  roles: [
    {
      id: 'farmers',
      name: 'Farmers',
      connectionType: 'purple',
      features: [
        { id: 'profile', name: 'Profile', accessLevel: 'full' },
        { id: 'supply-chain', name: 'Supply Chain', accessLevel: 'partial' },
      ],
    },
    {
      id: 'roasters',
      name: 'Roasters',
      connectionType: 'purple',
      features: [
        { id: 'profile', name: 'Profile', accessLevel: 'full' },
        { id: 'iot-devices', name: 'IoT Devices', accessLevel: 'no' },
      ],
    },
  ],
  features: [
    { id: 'profile', name: 'Profile', category: 'core' },
    { id: 'supply-chain', name: 'Supply Chain', category: 'certification-traceability' },
    { id: 'iot-devices', name: 'IoT Devices', category: 'farm-operations' },
  ],
  accessLevels: [
    { id: 'full', name: 'Full', description: 'Full access' },
    { id: 'partial', name: 'Partial', description: 'Partial access' },
    { id: 'view-only', name: 'View Only', description: 'View only' },
    { id: 'no', name: 'No Access', description: 'No access' },
  ],
  categories: [
    { id: 'core', name: 'Core', description: 'Core' },
    { id: 'certification-traceability', name: 'Cert', description: 'Cert' },
    { id: 'farm-operations', name: 'Farm', description: 'Farm' },
  ],
  connectionTypes: [
    { id: 'purple', name: 'Purple', description: 'Purple' },
    { id: 'pink', name: 'Pink', description: 'Pink' },
  ],
};

// Wrapper component with role provider
function createWrapper(role: string = 'farmers') {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <RoleProvider initialRole={role as any}>
        {children}
      </RoleProvider>
    );
  };
}

describe('useRBAC hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the module cache
    vi.resetModules();
    // Setup default successful response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockConfig),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useRBAC', () => {
    it('should fetch and return RBAC instance', async () => {
      const { useRBAC, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper();
      const { result } = renderHook(() => useRBAC(), { wrapper });

      // Wait for loading to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.rbac).toBeDefined();
      expect(result.current.config).toBeDefined();
      expect(result.current.error).toBeNull();
    });

    it('should return working RBAC methods', async () => {
      const { useRBAC, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper();
      const { result } = renderHook(() => useRBAC(), { wrapper });

      await waitFor(() => {
        expect(result.current.rbac).toBeDefined();
      });

      // Test hasAccess
      const access = result.current.rbac?.hasAccess('farmers', 'profile');
      expect(access?.allowed).toBe(true);
      expect(access?.accessLevel).toBe('full');
    });

    it('should cache config and reuse it', async () => {
      const { useRBAC, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper();

      // First render
      const { result: result1 } = renderHook(() => useRBAC(), { wrapper });
      await waitFor(() => expect(result1.current.rbac).toBeDefined());

      // Second render should use cache
      const { result: result2 } = renderHook(() => useRBAC(), { wrapper });
      await waitFor(() => expect(result2.current.rbac).toBeDefined());

      // Only one fetch call (cached)
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch error with fallback', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const { useRBAC, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper();
      const { result } = renderHook(() => useRBAC(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Should still have rbac with fallback config
      expect(result.current.rbac).toBeDefined();
      expect(result.current.config).toBeDefined();
    });

    it('should call correct API endpoint', async () => {
      const { useRBAC, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper();
      renderHook(() => useRBAC(), { wrapper });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/rbac/config');
      });
    });
  });

  describe('useFeatureAccess', () => {
    it('should return permission result for feature', async () => {
      const { useFeatureAccess, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('farmers');
      const { result } = renderHook(() => useFeatureAccess('profile'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current?.allowed).toBe(true);
      expect(result.current?.accessLevel).toBe('full');
    });

    it('should return partial access correctly', async () => {
      const { useFeatureAccess, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('farmers');
      const { result } = renderHook(() => useFeatureAccess('supply-chain'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current?.allowed).toBe(true);
      expect(result.current?.accessLevel).toBe('partial');
    });

    it('should return no access for denied feature', async () => {
      const { useFeatureAccess, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('roasters');
      const { result } = renderHook(() => useFeatureAccess('iot-devices'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current?.allowed).toBe(false);
      expect(result.current?.accessLevel).toBe('no');
    });
  });

  describe('useCanWrite', () => {
    it('should return true for full access', async () => {
      const { useCanWrite, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('farmers');
      const { result } = renderHook(() => useCanWrite('profile'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current).toBe(true);
    });

    it('should return true for partial access', async () => {
      const { useCanWrite, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('farmers');
      const { result } = renderHook(() => useCanWrite('supply-chain'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current).toBe(true);
    });

    it('should return false for no access', async () => {
      const { useCanWrite, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('roasters');
      const { result } = renderHook(() => useCanWrite('iot-devices'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current).toBe(false);
    });
  });

  describe('useCanRead', () => {
    it('should return true for any access level except no', async () => {
      const { useCanRead, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('farmers');
      const { result } = renderHook(() => useCanRead('profile'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current).toBe(true);
    });

    it('should return false for no access', async () => {
      const { useCanRead, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('roasters');
      const { result } = renderHook(() => useCanRead('iot-devices'), { wrapper });

      await waitFor(() => {
        expect(result.current).not.toBeNull();
      });

      expect(result.current).toBe(false);
    });
  });

  describe('useRoleFeatures', () => {
    it('should return all features for role', async () => {
      const { useRoleFeatures, resetRBACCache } = await import('../../src/hooks/useRBAC');
      resetRBACCache();

      const wrapper = createWrapper('farmers');
      const { result } = renderHook(() => useRoleFeatures(), { wrapper });

      await waitFor(() => {
        expect(result.current.length).toBeGreaterThan(0);
      });

      expect(result.current).toHaveLength(2);
      expect(result.current.some(f => f.id === 'profile')).toBe(true);
    });
  });
});
