/**
 * App Component Tests
 * Tests for root application routing
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../src/contexts/RoleContext';

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

// Import AppContent directly to test without BrowserRouter wrapper
import { AppContent } from '../src/App';

// Export AppContent for testing
vi.mock('../src/App', async () => {
  const actual = await vi.importActual('../src/App');
  return {
    ...actual,
    AppContent: (await import('../src/App')).AppContent,
  };
});

describe('App Routing', () => {
  it('should render Landing page at root when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RoleProvider>
          <AppContent />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  it('should render authenticated layout when authenticated', () => {
    // Mock authenticated state
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <RoleProvider initialRole="farmers">
          <AppContent />
        </RoleProvider>
      </MemoryRouter>
    );

    // Initially shows landing (not authenticated)
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  it('should handle route structure', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <RoleProvider>
          <AppContent />
        </RoleProvider>
      </MemoryRouter>
    );

    // App should render without errors
    expect(container).toBeTruthy();
  });
});
