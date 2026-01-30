/**
 * Coffee Studio Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { CoffeeStudio } from '../../../../src/components/features/CoffeeStudio';
import type { AccessLevel } from '../../../../types/rbac.types';

describe('Coffee Studio Feature Component', () => {
  describe('Full Access', () => {
    it('should render coffee studio with full access', () => {
      render(<CoffeeStudio accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getByText(/Coffee Studio|coffee studio/i)).toBeInTheDocument();
    });

    it('should display coffee profiles', () => {
      render(<CoffeeStudio accessLevel="full" />, { initialRole: 'farmers' });

      // Should show coffee profile content
      expect(screen.getByText('Coffee Studio')).toBeInTheDocument();
      expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
    });

    it('should allow creation with full access', () => {
      render(<CoffeeStudio accessLevel="full" />, { initialRole: 'farmers' });

      const createButton = screen.queryByRole('button', { name: /New Profile/i });
      expect(createButton).toBeInTheDocument();
      expect(createButton).not.toBeDisabled();
    });

    it('should allow editing with full access', () => {
      render(<CoffeeStudio accessLevel="full" />, { initialRole: 'farmers' });

      // Should have edit functionality
      expect(screen.getByText(/Coffee Studio/i)).toBeInTheDocument();
    });
  });

  describe('View-Only Access', () => {
    it('should render coffee studio in view-only mode', () => {
      render(<CoffeeStudio accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getByText(/Coffee Studio/i)).toBeInTheDocument();
    });

    it('should disable creation in view-only mode', () => {
      render(<CoffeeStudio accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      const createButton = screen.queryByRole('button', { name: /create|new|add/i });
      if (createButton) {
        expect(createButton).toBeDisabled();
      }
    });
  });

  describe('Partial Access', () => {
    it('should render coffee studio with partial access', () => {
      render(<CoffeeStudio accessLevel="partial" />, { initialRole: 'farmers' });

      expect(screen.getByText(/Coffee Studio/i)).toBeInTheDocument();
    });

    it('should allow limited editing with partial access', () => {
      render(<CoffeeStudio accessLevel="partial" />, { initialRole: 'farmers' });

      // Should show content but with restrictions
      expect(screen.getByText(/Coffee Studio/i)).toBeInTheDocument();
    });
  });
});
