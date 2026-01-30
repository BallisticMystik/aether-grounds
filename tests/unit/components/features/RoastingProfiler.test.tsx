/**
 * Roasting Profiler Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { RoastingProfiler } from '../../../../src/components/features/RoastingProfiler';

describe('Roasting Profiler Feature Component', () => {
  describe('Full Access (Roasters Only)', () => {
    it('should render roasting profiler with full access', () => {
      render(<RoastingProfiler accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      expect(screen.getByText('Roasting Profiler')).toBeInTheDocument();
    });

    it('should display roast curves', () => {
      render(<RoastingProfiler accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      // Should show roast curve visualization
      expect(screen.getByText('Roasting Profiler')).toBeInTheDocument();
      expect(screen.getByText('Roast Curve Visualization')).toBeInTheDocument();
    });

    it('should allow profile creation', () => {
      render(<RoastingProfiler accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      // Should have creation functionality
      const createButton = screen.queryByRole('button', { name: /New Profile/i });
      expect(createButton).toBeInTheDocument();
      expect(createButton).not.toBeDisabled();
    });

    it('should allow profile editing', () => {
      render(<RoastingProfiler accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      // Should have editing functionality
      expect(screen.getByText('Roasting Profiler')).toBeInTheDocument();
      expect(screen.getAllByText('Edit Profile').length).toBeGreaterThan(0);
    });

    it('should show profile library', () => {
      render(<RoastingProfiler accessLevel="full" />, {
        initialRole: 'roasters-retailers',
      });

      // Should show profile library
      expect(screen.getByText('Roasting Profiler')).toBeInTheDocument();
      expect(screen.getByText('Light Roast - Ethiopian')).toBeInTheDocument();
    });
  });

  describe('Partial Access (Hubs)', () => {
    it('should render roasting profiler with partial access', () => {
      render(<RoastingProfiler accessLevel="partial" />, {
        initialRole: 'hub-community',
      });

      expect(screen.getByText('Roasting Profiler')).toBeInTheDocument();
    });

    it('should show limited functionality with partial access', () => {
      render(<RoastingProfiler accessLevel="partial" />, {
        initialRole: 'hub-community',
      });

      // Should show profiler but with restrictions
      expect(screen.getByText('Roasting Profiler')).toBeInTheDocument();
      // With partial access, canEdit is true, so Edit Profile buttons should appear
      expect(screen.getByText('Light Roast - Ethiopian')).toBeInTheDocument();
      expect(screen.getAllByText('Edit Profile').length).toBeGreaterThan(0);
    });
  });
});
