/**
 * Unauthorized Page Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Unauthorized from '../../src/pages/Unauthorized';

describe('Unauthorized Page', () => {
  it('should render access denied message', () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText(/don't have permission/i)).toBeInTheDocument();
  });

  it('should show link to dashboard', () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText('Return to Dashboard');
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink.closest('a')?.getAttribute('href')).toBe('/dashboard');
  });

  it('should handle missing state gracefully', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/unauthorized' }]}>
        <Unauthorized />
      </MemoryRouter>
    );

    // Should still render without errors
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });
});
