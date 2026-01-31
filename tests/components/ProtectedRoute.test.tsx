/**
 * ProtectedRoute Component Tests
 * Tests for RBAC-protected route component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../src/components/routing/ProtectedRoute';
import { RoleProvider } from '../../src/contexts/RoleContext';
import type { RoleId } from '../../types/rbac.types';

// Mock useRBAC hook
vi.mock('../../src/hooks/useRBAC', () => ({
  useFeatureAccess: vi.fn(),
}));

import { useFeatureAccess } from '../../src/hooks/useRBAC';

const mockUseFeatureAccess = vi.mocked(useFeatureAccess);

function TestWrapper({ children, role }: { children: React.ReactNode; role?: RoleId }) {
  return (
    <MemoryRouter>
      <RoleProvider initialRole={role}>
        {children}
      </RoleProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when access is granted with full access', async () => {
    mockUseFeatureAccess.mockReturnValue({
      allowed: true,
      accessLevel: 'full',
    });

    render(
      <TestWrapper role="farmers">
        <ProtectedRoute featureId="profile">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('should render children with access badge for partial access', async () => {
    mockUseFeatureAccess.mockReturnValue({
      allowed: true,
      accessLevel: 'partial',
    });

    render(
      <TestWrapper role="farmers">
        <ProtectedRoute featureId="supply-chain">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      // Access badge should be visible for non-full access
      expect(screen.getByText(/partial/i)).toBeInTheDocument();
    });
  });

  it('should render children with access badge for view-only access', async () => {
    mockUseFeatureAccess.mockReturnValue({
      allowed: true,
      accessLevel: 'view-only',
    });

    render(
      <TestWrapper role="hub-community">
        <ProtectedRoute featureId="analytics">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      expect(screen.getByText(/view only/i)).toBeInTheDocument();
    });
  });

  it('should redirect to unauthorized when access is denied', async () => {
    mockUseFeatureAccess.mockReturnValue({
      allowed: false,
      accessLevel: 'no',
      reason: 'Access denied',
    });

    render(
      <TestWrapper role="affiliates-distributors">
        <ProtectedRoute featureId="analytics">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    await waitFor(() => {
      // Should navigate to /unauthorized
      expect(window.location.pathname).toBe('/unauthorized');
    });
  });

  it('should redirect when access level is insufficient', async () => {
    mockUseFeatureAccess.mockReturnValue({
      allowed: true,
      accessLevel: 'view-only',
    });

    render(
      <TestWrapper role="hub-community">
        <ProtectedRoute featureId="farm-management" requiredAccessLevel="full">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    await waitFor(() => {
      // Should redirect because view-only < full
      expect(window.location.pathname).toBe('/unauthorized');
    });
  });

  it('should show loading state while permissions are being checked', () => {
    mockUseFeatureAccess.mockReturnValue(null);

    render(
      <TestWrapper role="farmers">
        <ProtectedRoute featureId="profile">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.getByText(/loading permissions/i)).toBeInTheDocument();
  });

  it('should allow partial access when required level is view-only', async () => {
    mockUseFeatureAccess.mockReturnValue({
      allowed: true,
      accessLevel: 'partial',
    });

    render(
      <TestWrapper role="farmers">
        <ProtectedRoute featureId="supply-chain" requiredAccessLevel="view-only">
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
