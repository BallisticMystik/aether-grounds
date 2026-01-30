/**
 * Roast Profile Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { RoastProfile } from '../../../../src/components/features/RoastProfile';

describe('Roast Profile Feature Component', () => {
  describe('Full Access (Farmers Only)', () => {
    it('should render roast profile with full access', () => {
      render(<RoastProfile accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getByText('Roast Profile')).toBeInTheDocument();
    });

    it('should display roast profiles', () => {
      render(<RoastProfile accessLevel="full" />, { initialRole: 'farmers' });

      // Should show roast profile content
      expect(screen.getByText('Roast Profile')).toBeInTheDocument();
      expect(screen.getByText('Light Roast Profile')).toBeInTheDocument();
    });

    it('should allow creation with full access', () => {
      render(<RoastProfile accessLevel="full" />, { initialRole: 'farmers' });

      // Should have creation functionality
      expect(screen.getByText('Roast Profile')).toBeInTheDocument();
      const createButton = screen.queryByRole('button', { name: /New Profile/i });
      expect(createButton).toBeInTheDocument();
    });

    it('should show roast data', () => {
      render(<RoastProfile accessLevel="full" />, { initialRole: 'farmers' });

      // Should show roast data
      expect(screen.getByText('Roast Profile')).toBeInTheDocument();
      expect(screen.getByText('Light Roast Profile')).toBeInTheDocument();
    });
  });
});
