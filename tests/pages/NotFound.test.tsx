/**
 * NotFound Page Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../src/pages/NotFound';

describe('NotFound Page', () => {
  it('should render 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should show links to home and dashboard', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Go Home');
    const dashboardLink = screen.getByText('Go to Dashboard');

    expect(homeLink).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
    expect(homeLink.closest('a')?.getAttribute('href')).toBe('/');
    expect(dashboardLink.closest('a')?.getAttribute('href')).toBe('/dashboard');
  });
});
