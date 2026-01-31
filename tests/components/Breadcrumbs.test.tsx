/**
 * Breadcrumbs Component Tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from '../../src/components/navigation/Breadcrumbs';

describe('Breadcrumbs', () => {
  it('should not render on home page', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render on dashboard', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render breadcrumbs for feature routes', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('should show Home link', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')?.getAttribute('href')).toBe('/');
  });

  it('should highlight current page', () => {
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    const currentPage = screen.getByText('Analytics');
    expect(currentPage.className).toContain('font-medium');
    expect(currentPage.tagName).toBe('SPAN'); // Not a link
  });

  it('should handle nested paths', () => {
    render(
      <MemoryRouter initialEntries={['/farm-management']}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText(/farm management/i)).toBeInTheDocument();
  });
});
