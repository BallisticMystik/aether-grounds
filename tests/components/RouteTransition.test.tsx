/**
 * RouteTransition Component Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RouteTransition } from '../../src/components/routing/RouteTransition';

describe('RouteTransition', () => {
  it('should render children', () => {
    render(
      <MemoryRouter>
        <RouteTransition>
          <div data-testid="content">Test Content</div>
        </RouteTransition>
      </MemoryRouter>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should apply fade-in animation on mount', () => {
    const { container } = render(
      <MemoryRouter>
        <RouteTransition>
          <div>Content</div>
        </RouteTransition>
      </MemoryRouter>
    );

    const transitionDiv = container.querySelector('.route-transition');
    expect(transitionDiv).toBeInTheDocument();
    expect(transitionDiv?.className).toContain('fadeIn');
  });

  it('should handle route changes', async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <RouteTransition>
          <div data-testid="content">Dashboard</div>
        </RouteTransition>
      </MemoryRouter>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Simulate route change
    rerender(
      <MemoryRouter initialEntries={['/profile']}>
        <RouteTransition>
          <div data-testid="content">Profile</div>
        </RouteTransition>
      </MemoryRouter>
    );

    // Content should still be visible
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
