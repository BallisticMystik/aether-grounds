/**
 * Sidebar Component Tests
 * Tests for Sidebar navigation with React Router
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../../src/components/layout/Sidebar';
import { RoleProvider } from '../../src/contexts/RoleContext';

// Mock RoleSelector
vi.mock('../../src/components/layout/RoleSelector', () => ({
  RoleSelector: () => <div data-testid="role-selector">Role Selector</div>,
}));

describe('Sidebar Navigation', () => {
  it('should render sidebar with navigation items', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Sidebar onLogout={onLogout} />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Aether Grounds')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should show Dashboard link for farmers role', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Sidebar onLogout={onLogout} />
        </RoleProvider>
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink?.getAttribute('href')).toBe('/dashboard');
  });

  it('should filter navigation items by role', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Sidebar onLogout={onLogout} />
        </RoleProvider>
      </MemoryRouter>
    );

    // Farmers should see Farm Management
    expect(screen.getByText('Farm Management')).toBeInTheDocument();
    // Farmers should see IoT Devices
    expect(screen.getByText('IoT Devices')).toBeInTheDocument();
  });

  it('should highlight active route', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <RoleProvider initialRole="farmers">
          <Sidebar onLogout={onLogout} />
        </RoleProvider>
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink?.className).toContain('bg-accent');
  });

  it('should call onLogout when logout button is clicked', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Sidebar onLogout={onLogout} />
        </RoleProvider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Logout');
    logoutButton.click();

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('should use Link components for navigation', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Sidebar onLogout={onLogout} />
        </RoleProvider>
      </MemoryRouter>
    );

    // All navigation items should be Link components (not anchor tags)
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Check that Dashboard is a Link
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toBeInTheDocument();
  });
});
