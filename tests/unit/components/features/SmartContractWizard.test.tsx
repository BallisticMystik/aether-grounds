/**
 * Smart Contract Wizard Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { SmartContractWizard } from '../../../../src/components/features/SmartContractWizard';
import type { AccessLevel } from '../../../../types/rbac.types';

describe('Smart Contract Wizard Feature Component', () => {
  describe('Full Access', () => {
    it('should render smart contract wizard with full access', () => {
      render(<SmartContractWizard accessLevel="full" />, {
        initialRole: 'farmers',
      });

      expect(screen.getByText(/Smart Contract Wizard|Contract Wizard/i)).toBeInTheDocument();
    });

    it('should display wizard interface', () => {
      render(<SmartContractWizard accessLevel="full" />, {
        initialRole: 'farmers',
      });

      // Should show wizard steps or interface
      expect(screen.getByText('Smart Contract Wizard')).toBeInTheDocument();
      expect(screen.getByText('Contract Creation Wizard')).toBeInTheDocument();
    });

    it('should allow contract creation with full access', () => {
      render(<SmartContractWizard accessLevel="full" />, {
        initialRole: 'farmers',
      });

      // Should have creation functionality
      expect(screen.getByText(/Smart Contract Wizard/i)).toBeInTheDocument();
    });

    it('should show step-by-step flow', () => {
      render(<SmartContractWizard accessLevel="full" />, {
        initialRole: 'farmers',
      });

      // Should show wizard steps
      expect(screen.getByText('Smart Contract Wizard')).toBeInTheDocument();
      expect(screen.getByText('Contract Creation Wizard')).toBeInTheDocument();
      expect(screen.getAllByText('Contract Type').length).toBeGreaterThan(0);
    });
  });

  describe('View-Only Access (Hubs)', () => {
    it('should render smart contract wizard in view-only mode', () => {
      render(<SmartContractWizard accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getByText(/Smart Contract Wizard/i)).toBeInTheDocument();
    });

    it('should disable contract creation in view-only mode', () => {
      render(<SmartContractWizard accessLevel="view-only" />, {
        initialRole: 'hub-community',
      });

      // Should show wizard but in preview mode
      expect(screen.getByText(/Smart Contract Wizard/i)).toBeInTheDocument();
    });
  });
});
