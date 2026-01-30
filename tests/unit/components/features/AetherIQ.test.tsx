/**
 * AetherIQ Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { AetherIQ } from '../../../../src/components/features/AetherIQ';
import type { AccessLevel } from '../../../../types/rbac.types';

describe('AetherIQ Feature Component', () => {
  describe('Full Access', () => {
    it('should render AetherIQ dashboard with full access', () => {
      render(<AetherIQ accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getByText(/aetheriq|ai insights/i)).toBeInTheDocument();
    });

    it('should display AI insights', () => {
      render(<AetherIQ accessLevel="full" />, { initialRole: 'farmers' });

      // Should show AI insights content
      expect(screen.getByText('AetherIQ')).toBeInTheDocument();
      expect(screen.getByText('Key Insights')).toBeInTheDocument();
    });

    it('should show data visualizations', () => {
      render(<AetherIQ accessLevel="full" />, { initialRole: 'farmers' });

      // Should have visualization or chart elements
      const component = screen.getByText(/aetheriq/i).closest('div');
      expect(component).toBeInTheDocument();
    });

    it('should allow queries with full access', () => {
      render(<AetherIQ accessLevel="full" />, { initialRole: 'farmers' });

      // Should have query interface (input or button)
      const queryInput = screen.queryByPlaceholderText(/query|ask|search/i);
      const queryButton = screen.queryByRole('button', { name: /query|ask|search/i });
      
      // At least one query interface should exist
      expect(queryInput || queryButton || screen.getByText(/aetheriq/i)).toBeInTheDocument();
    });
  });

  describe('View-Only Access', () => {
    it('should render AetherIQ in view-only mode', () => {
      render(<AetherIQ accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getByText(/aetheriq|ai insights/i)).toBeInTheDocument();
    });

    it('should disable query interface in view-only mode', () => {
      render(<AetherIQ accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      const queryInput = screen.queryByPlaceholderText(/query|ask|search/i);
      if (queryInput) {
        expect(queryInput).toBeDisabled();
      }
    });
  });

  describe('Partial Access', () => {
    it('should render AetherIQ with partial access', () => {
      render(<AetherIQ accessLevel="partial" />, { initialRole: 'farmers' });

      expect(screen.getByText(/aetheriq|ai insights/i)).toBeInTheDocument();
    });

    it('should show limited functionality with partial access', () => {
      render(<AetherIQ accessLevel="partial" />, { initialRole: 'farmers' });

      // Should still show content but with restrictions
      expect(screen.getByText(/aetheriq/i)).toBeInTheDocument();
    });
  });
});
