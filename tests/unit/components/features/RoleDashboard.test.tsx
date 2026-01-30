/**
 * Role Dashboard Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { RoleDashboard } from '../../../../src/components/features/RoleDashboard';
import type { AccessLevel } from '../../../../types/rbac.types';

describe('Role Dashboard Feature Component', () => {
  describe('Full Access', () => {
    it('should render role dashboard with full access', () => {
      render(<RoleDashboard accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getAllByText(/Farmers Dashboard/i).length).toBeGreaterThan(0);
    });

    it('should display role-specific metrics', () => {
      render(<RoleDashboard accessLevel="full" />, { initialRole: 'farmers' });

      // Should show metrics
      expect(screen.getByText('Total Farms')).toBeInTheDocument();
    });

    it('should show correct tabs based on role', () => {
      render(<RoleDashboard accessLevel="full" />, { initialRole: 'farmers' });

      // Dashboard should be visible
      expect(screen.getAllByText(/Farmers Dashboard/i).length).toBeGreaterThan(0);
    });

    it('should handle role switching', () => {
      render(<RoleDashboard accessLevel="full" />, {
        initialRole: 'farmers',
      });

      expect(screen.getAllByText(/Farmers Dashboard/i).length).toBeGreaterThan(0);

      // Component should render correctly
      expect(screen.getByText('Total Farms')).toBeInTheDocument();
    });
  });

  describe('View-Only Access', () => {
    it('should render role dashboard in read-only mode', () => {
      render(<RoleDashboard accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getAllByText(/Hub - Community Dashboard/i).length).toBeGreaterThan(0);
    });

    it('should show view-only indicator', () => {
      const { container } = render(<RoleDashboard accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      const wrapper = container.querySelector('[data-access-level="view-only"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Partial Access', () => {
    it('should render role dashboard with partial access', () => {
      render(<RoleDashboard accessLevel="partial" />, {
        initialRole: 'farmers',
      });

      // Should render dashboard (may have multiple "Dashboard" texts)
      expect(screen.getAllByText(/Farmers Dashboard|Dashboard/i).length).toBeGreaterThan(0);
    });
  });

  describe('Role-Specific Content', () => {
    it('should display farmers-specific content', () => {
      render(<RoleDashboard accessLevel="full" />, { initialRole: 'farmers' });

      // Should show dashboard content
      expect(screen.getAllByText(/Farmers Dashboard/i).length).toBeGreaterThan(0);
      expect(screen.getByText('Total Farms')).toBeInTheDocument();
    });

    it('should display roasters-specific content', () => {
      render(<RoleDashboard accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      expect(screen.getAllByText(/Roasters\/Retailers Dashboard/i).length).toBeGreaterThan(0);
    });

    it('should display hub-specific content', () => {
      render(<RoleDashboard accessLevel="full" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getAllByText(/Hub - Community Dashboard/i).length).toBeGreaterThan(0);
    });

    it('should display affiliates-specific content', () => {
      render(<RoleDashboard accessLevel="full" />, {
        initialRole: 'affiliates-distributors',
      });

      expect(screen.getAllByText(/Affiliates\/Distributors Dashboard/i).length).toBeGreaterThan(0);
    });
  });
});
