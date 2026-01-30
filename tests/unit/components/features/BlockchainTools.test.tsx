/**
 * Blockchain Tools Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { BlockchainTools } from '../../../../src/components/features/BlockchainTools';

describe('Blockchain Tools Feature Component', () => {
  describe('Partial Access (Farmers/Roasters)', () => {
    it('should render blockchain tools with partial access', () => {
      render(<BlockchainTools accessLevel="partial" />, { initialRole: 'farmers' });

      expect(screen.getByText('Blockchain Tools')).toBeInTheDocument();
    });

    it('should display blockchain tools dashboard', () => {
      render(<BlockchainTools accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show blockchain tools interface
      expect(screen.getByText('Blockchain Tools')).toBeInTheDocument();
      expect(screen.getByText('Wallet Integration')).toBeInTheDocument();
    });

    it('should show limited functionality with partial access', () => {
      render(<BlockchainTools accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show tools but with restrictions
      expect(screen.getByText('Blockchain Tools')).toBeInTheDocument();
      expect(screen.getAllByText('Full Access').length).toBeGreaterThan(0);
    });
  });

  describe('Full Access (Hubs/Affiliates)', () => {
    it('should render blockchain tools with full access', () => {
      render(<BlockchainTools accessLevel="full" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getByText('Blockchain Tools')).toBeInTheDocument();
    });

    it('should allow full tool usage with full access', () => {
      render(<BlockchainTools accessLevel="full" />, {
        initialRole: 'hub-community',
      });

      // Should have full functionality
      expect(screen.getByText('Blockchain Tools')).toBeInTheDocument();
      expect(screen.getByText('Smart Contract Tools')).toBeInTheDocument();
    });
  });
});
