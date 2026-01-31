/**
 * Authenticated Layout Component
 * Provides the main shell with sidebar and content area
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from '../navigation/Breadcrumbs';
import { RouteTransition } from '../routing/RouteTransition';
import { useRole } from '../../contexts/RoleContext';
import { useAuth } from '../../contexts/AuthContext';

interface AuthenticatedLayoutProps {
  onLogout: () => void;
}

export function AuthenticatedLayout({ onLogout }: AuthenticatedLayoutProps) {
  const { currentRole } = useRole();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Persistent navigation */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            {currentRole && (
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome, {currentRole.replace('-', ' ')}
                </h1>
              </div>
            )}
            {/* Nested routes render here with transition */}
            <RouteTransition>
              <Outlet />
            </RouteTransition>
          </div>
        </div>
      </main>
    </div>
  );
}
