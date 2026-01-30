/**
 * Role Context - Centralized state management for user roles
 * Manages the active user role and provides role-based functionality
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { RoleId } from '../../types/rbac.types';

interface RoleContextType {
  currentRole: RoleId | null;
  setCurrentRole: (role: RoleId) => void;
  availableRoles: RoleId[];
  hasRole: (role: RoleId) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Available roles from coffee platform
const AVAILABLE_ROLES: RoleId[] = [
  'farmers',
  'roasters-retailers',
  'hub-community',
  'affiliates-distributors'
];

interface RoleProviderProps {
  children: ReactNode;
  initialRole?: RoleId;
}

export function RoleProvider({ children, initialRole }: RoleProviderProps) {
  const [currentRole, setCurrentRole] = useState<RoleId | null>(initialRole || null);

  const hasRole = (role: RoleId): boolean => {
    return currentRole === role;
  };

  const value: RoleContextType = {
    currentRole,
    setCurrentRole,
    availableRoles: AVAILABLE_ROLES,
    hasRole
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
