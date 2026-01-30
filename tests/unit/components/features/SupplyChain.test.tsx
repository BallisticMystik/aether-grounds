/**
 * Supply Chain Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { SupplyChain } from '../../../../src/components/features/SupplyChain';

describe('Supply Chain Feature Component', () => {
  describe('Partial Access (Farmers)', () => {
    it('should render supply chain with partial access', () => {
      render(<SupplyChain accessLevel="partial" />, { initialRole: 'farmers' });

      expect(screen.getAllByText('Supply Chain').length).toBeGreaterThan(0);
    });

    it('should display supply chain map', () => {
      render(<SupplyChain accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show supply chain visualization
      expect(screen.getAllByText('Supply Chain').length).toBeGreaterThan(0);
      expect(screen.getByText('Network Map')).toBeInTheDocument();
    });

    it('should allow limited editing with partial access', () => {
      render(<SupplyChain accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show content but with restrictions
      expect(screen.getAllByText('Supply Chain').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Limited editing available').length).toBeGreaterThan(0);
    });
  });

  describe('Full Access (Others)', () => {
    it('should render supply chain with full access', () => {
      render(<SupplyChain accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      expect(screen.getAllByText('Supply Chain').length).toBeGreaterThan(0);
      expect(screen.getByText('Supply Chain Stages')).toBeInTheDocument();
    });

    it('should allow full editing with full access', () => {
      render(<SupplyChain accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      // Should have full editing capabilities
      expect(screen.getAllByText('Supply Chain').length).toBeGreaterThan(0);
      expect(screen.getByText('Add Node')).toBeInTheDocument();
      expect(screen.getByText('Network Management')).toBeInTheDocument();
    });
  });
});
