/**
 * AI Tools Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { AITools } from '../../../../src/components/features/AITools';

describe('AI Tools Feature Component', () => {
  describe('Partial Access (Farmers)', () => {
    it('should render AI tools with partial access', () => {
      render(<AITools accessLevel="partial" />, { initialRole: 'farmers' });

      expect(screen.getByText('AI Tools')).toBeInTheDocument();
    });

    it('should display AI tools dashboard', () => {
      render(<AITools accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show AI tools interface
      expect(screen.getByText('AI Tools')).toBeInTheDocument();
      expect(screen.getByText('Predictive Analytics')).toBeInTheDocument();
    });

    it('should show limited functionality with partial access', () => {
      render(<AITools accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show tools but with restrictions
      expect(screen.getByText('AI Tools')).toBeInTheDocument();
      // Check for locked tools - "Requires Full Access" appears in buttons
      const lockedButtons = screen.queryAllByRole('button', { name: /Requires Full Access/i });
      expect(lockedButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Full Access (Others)', () => {
    it('should render AI tools with full access', () => {
      render(<AITools accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      expect(screen.getByText('AI Tools')).toBeInTheDocument();
    });

    it('should allow full tool usage with full access', () => {
      render(<AITools accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      // Should have full functionality
      expect(screen.getByText('AI Tools')).toBeInTheDocument();
      expect(screen.getByText('Advanced Modeling')).toBeInTheDocument();
    });
  });
});
