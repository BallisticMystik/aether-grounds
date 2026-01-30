/**
 * All Farm Analytics Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { AllFarmAnalytics } from '../../../../src/components/features/AllFarmAnalytics';

describe('All Farm Analytics Feature Component', () => {
  describe('Full Access (Farmers)', () => {
    it('should render all farm analytics with full access', () => {
      render(<AllFarmAnalytics accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getByText(/All Farm Analytics|Farm Analytics/i)).toBeInTheDocument();
    });

    it('should display aggregated farm data', () => {
      render(<AllFarmAnalytics accessLevel="full" />, { initialRole: 'farmers' });

      // Should show aggregated analytics
      expect(screen.getByText('All Farm Analytics')).toBeInTheDocument();
      expect(screen.getByText('Total Farms')).toBeInTheDocument();
    });

    it('should allow full analytics tools', () => {
      render(<AllFarmAnalytics accessLevel="full" />, { initialRole: 'farmers' });

      // Should have full functionality
      expect(screen.getByText('All Farm Analytics')).toBeInTheDocument();
      expect(screen.getByText('Farm Performance Comparison')).toBeInTheDocument();
    });
  });

  describe('View-Only Access (Hubs)', () => {
    it('should render all farm analytics in view-only mode', () => {
      render(<AllFarmAnalytics accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getByText('All Farm Analytics')).toBeInTheDocument();
      expect(screen.getByText('VIEW ONLY')).toBeInTheDocument();
    });

    it('should disable editing in view-only mode', () => {
      render(<AllFarmAnalytics accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      // Should show analytics but in read-only mode
      expect(screen.getByText('All Farm Analytics')).toBeInTheDocument();
      expect(screen.getByText('VIEW ONLY')).toBeInTheDocument();
    });
  });

  describe('Partial Access (Roasters)', () => {
    it('should render all farm analytics with partial access', () => {
      render(<AllFarmAnalytics accessLevel="partial" />, {
        initialRole: 'roasters-retailers',
      });

      expect(screen.getByText('All Farm Analytics')).toBeInTheDocument();
    });
  });
});
