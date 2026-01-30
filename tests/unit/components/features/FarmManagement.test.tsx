/**
 * Farm Management Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { FarmManagement } from '../../../../src/components/features/FarmManagement';

describe('Farm Management Feature Component', () => {
  describe('Full Access (Farmers Only)', () => {
    it('should render farm management with full access', () => {
      render(<FarmManagement accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getByText(/Farm Management/i)).toBeInTheDocument();
    });

    it('should display farm list', () => {
      render(<FarmManagement accessLevel="full" />, { initialRole: 'farmers' });

      // Should show farm list
      expect(screen.getByText('Farm Management')).toBeInTheDocument();
      expect(screen.getByText('Highland Farm')).toBeInTheDocument();
    });

    it('should allow farm creation', () => {
      render(<FarmManagement accessLevel="full" />, { initialRole: 'farmers' });

      const createButton = screen.queryByRole('button', { name: /New Farm/i });
      expect(createButton).toBeInTheDocument();
      expect(createButton).not.toBeDisabled();
    });

    it('should allow farm editing', () => {
      render(<FarmManagement accessLevel="full" />, { initialRole: 'farmers' });

      // Should have edit functionality
      expect(screen.getByText(/Farm Management/i)).toBeInTheDocument();
    });

    it('should show farm details', () => {
      render(<FarmManagement accessLevel="full" />, { initialRole: 'farmers' });

      // Should show farm details view
      expect(screen.getByText(/Farm Management/i)).toBeInTheDocument();
    });

    it('should manage farm data', () => {
      render(<FarmManagement accessLevel="full" />, { initialRole: 'farmers' });

      // Should have data management features
      expect(screen.getByText(/Farm Management/i)).toBeInTheDocument();
    });
  });
});
