/**
 * Main Application Entry Point
 * Handles authentication and provides the layout shell
 */

import React, { useState } from 'react';
import { RoleProvider, useRole } from './contexts/RoleContext';
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout';
import { Landing } from './pages/Landing';
import type { RoleId } from '../types/rbac.types';

/**
 * Authentication Guard Component
 * Determines if user sees Landing page or Authenticated Layout
 */
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentRole, setCurrentRole } = useRole();

  // For development: allow role selection without full auth
  const handleRoleSelect = (role: RoleId) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  // If not authenticated, show landing page
  if (!isAuthenticated) {
    return <Landing onRoleSelect={handleRoleSelect} />;
  }

  // If authenticated, show the authenticated layout
  return <AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />;
}

/**
 * Root App Component
 * Wraps everything in RoleProvider
 */
export default function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}
