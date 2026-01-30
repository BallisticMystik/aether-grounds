/**
 * Test Utilities
 * Helper functions for testing React components
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { RoleProvider } from '../../src/contexts/RoleContext';
import type { RoleId } from '../../types/rbac.types';

interface AllTheProvidersProps {
  children: React.ReactNode;
  initialRole?: RoleId;
}

function AllTheProviders({ children, initialRole }: AllTheProvidersProps) {
  return <RoleProvider initialRole={initialRole}>{children}</RoleProvider>;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRole?: RoleId;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { initialRole, ...renderOptions }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <AllTheProviders initialRole={initialRole}>{children}</AllTheProviders>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { renderWithProviders as render };
