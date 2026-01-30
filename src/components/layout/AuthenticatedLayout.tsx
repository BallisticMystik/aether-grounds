/**
 * Authenticated Layout Component
 * Provides the main shell with sidebar and content area
 */

import React from 'react';
import { Sidebar } from './Sidebar';
import { useRole } from '../../contexts/RoleContext';

interface AuthenticatedLayoutProps {
  onLogout: () => void;
}

export function AuthenticatedLayout({ onLogout }: AuthenticatedLayoutProps) {
  const { currentRole } = useRole();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Persistent navigation */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Content will be rendered here by router */}
            {currentRole && (
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {currentRole.replace('-', ' ')}
                </h1>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
