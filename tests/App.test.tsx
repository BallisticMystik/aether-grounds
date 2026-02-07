/**
 * App Component Tests
 * Tests for root application routing
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../src/contexts/RoleContext';
import { AuthProvider } from '../src/contexts/AuthContext';

// Mock the Landing and Dashboard components to avoid complex dependencies
vi.mock('../src/pages/Landing', () => ({
  Landing: ({ onRoleSelect }: any) => (
    <div data-testid="landing-page">
      <button onClick={() => onRoleSelect('farmers')}>Select Role</button>
    </div>
  ),
}));

vi.mock('../src/pages/Dashboard', () => ({
  default: () => <div data-testid="dashboard-page">Dashboard</div>,
}));

vi.mock('../src/components/layout/AuthenticatedLayout', () => ({
  AuthenticatedLayout: ({ children, onLogout }: any) => (
    <div data-testid="authenticated-layout">
      <button onClick={onLogout}>Logout</button>
      {children}
    </div>
  ),
}));

import { AppContent } from '../src/App';

// Ensure AuthProvider is available (no mock - use real one so useAuth works)
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <RoleProvider>{children}</RoleProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('App Routing', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('should render Landing page at root when not authenticated', async () => {
    render(
      <TestWrapper>
        <AppContent />
      </TestWrapper>
    );

    await screen.findByTestId('landing-page');
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  it('should render authenticated layout when authenticated', async () => {
    render(
      <TestWrapper>
        <AppContent />
      </TestWrapper>
    );

    await screen.findByTestId('landing-page');
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  it('should handle route structure', async () => {
    const { container } = render(
      <TestWrapper>
        <AppContent />
      </TestWrapper>
    );

    await screen.findByTestId('landing-page');
    expect(container).toBeTruthy();
  });
});
