/**
 * Dashboard Component Tests
 * Tests for role-based dashboard routing
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../src/pages/Dashboard';
import { RoleProvider } from '../../src/contexts/RoleContext';

// Mock dashboard components
vi.mock('../../src/components/dashboards/FarmersDashboard', () => ({
  FarmersDashboard: () => <div data-testid="farmers-dashboard">Farmers Dashboard</div>,
}));

vi.mock('../../src/components/dashboards/RoastersDashboard', () => ({
  RoastersDashboard: () => <div data-testid="roasters-dashboard">Roasters Dashboard</div>,
}));

vi.mock('../../src/components/dashboards/RetailersDashboard', () => ({
  RetailersDashboard: () => <div data-testid="retailers-dashboard">Retailers Dashboard</div>,
}));

vi.mock('../../src/components/dashboards/HubDashboard', () => ({
  HubDashboard: () => <div data-testid="hub-dashboard">Hub Dashboard</div>,
}));

vi.mock('../../src/components/dashboards/AffiliatesDashboard', () => ({
  AffiliatesDashboard: () => <div data-testid="affiliates-dashboard">Affiliates Dashboard</div>,
}));

describe('Dashboard Role-Based Routing', () => {
  it('should render FarmersDashboard for farmers role', () => {
    render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('farmers-dashboard')).toBeInTheDocument();
  });

  it('should render RoastersDashboard for roasters role', () => {
    render(
      <MemoryRouter>
        <RoleProvider initialRole="roasters">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('roasters-dashboard')).toBeInTheDocument();
  });

  it('should render RetailersDashboard for retailers role', () => {
    render(
      <MemoryRouter>
        <RoleProvider initialRole="retailers">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('retailers-dashboard')).toBeInTheDocument();
  });

  it('should render HubDashboard for hub-community role', () => {
    render(
      <MemoryRouter>
        <RoleProvider initialRole="hub-community">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('hub-dashboard')).toBeInTheDocument();
  });

  it('should render AffiliatesDashboard for affiliates-distributors role', () => {
    render(
      <MemoryRouter>
        <RoleProvider initialRole="affiliates-distributors">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('affiliates-dashboard')).toBeInTheDocument();
  });

  it('should show message when no role is selected', () => {
    render(
      <MemoryRouter>
        <RoleProvider>
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/please select a role/i)).toBeInTheDocument();
  });

  it('should handle role switching', () => {
    // Test role switching by rendering with different initial roles
    const { unmount } = render(
      <MemoryRouter>
        <RoleProvider initialRole="farmers">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('farmers-dashboard')).toBeInTheDocument();
    unmount();

    // Render with different role
    render(
      <MemoryRouter>
        <RoleProvider initialRole="roasters">
          <Dashboard />
        </RoleProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('roasters-dashboard')).toBeInTheDocument();
  });
});
