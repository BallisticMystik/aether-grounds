/**
 * ProtectedRoute Component
 * Route wrapper that enforces RBAC permissions
 */

import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRole } from '../../contexts/RoleContext';
import { useFeatureAccess } from '../../hooks/useRBAC';
import { AccessBadge } from '../ui/AccessBadge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { FeatureId, AccessLevel } from '../../../types/rbac.types';

interface ProtectedRouteProps {
  featureId: FeatureId;
  children: React.ReactNode;
  requiredAccessLevel?: AccessLevel;
  redirectTo?: string;
}

export function ProtectedRoute({
  featureId,
  children,
  requiredAccessLevel = 'view-only',
  redirectTo = '/unauthorized',
}: ProtectedRouteProps) {
  const { currentRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const permission = useFeatureAccess(featureId);

  // Handle role switching - if role changes and user loses access, redirect
  React.useEffect(() => {
    if (permission && !permission.allowed && currentRole) {
      // Role was switched and user no longer has access
      navigate(redirectTo, { 
        state: { 
          from: location, 
          featureId, 
          reason: 'role-switch-denied' 
        },
        replace: true 
      });
    }
  }, [permission, currentRole, featureId, navigate, redirectTo, location]);

  // Loading state - RBAC config is being loaded
  if (!permission) {
    return <LoadingSpinner size="md" message="Loading permissions..." className="min-h-screen" />;
  }

  // No access - redirect to unauthorized
  if (!permission.allowed) {
    return <Navigate to={redirectTo} state={{ from: location, featureId }} replace />;
  }

  // Check if access level meets requirement
  const accessLevels: AccessLevel[] = ['no', 'view-only', 'partial', 'full'];
  const userLevel = accessLevels.indexOf(permission.accessLevel);
  const requiredLevel = accessLevels.indexOf(requiredAccessLevel);

  if (userLevel < requiredLevel) {
    return <Navigate to={redirectTo} state={{ from: location, featureId, reason: 'insufficient-access' }} replace />;
  }

  // Access granted - render children with access badge if needed
  return (
    <div className="protected-route" data-feature-id={featureId} data-access-level={permission.accessLevel}>
      {permission.accessLevel !== 'full' && (
        <div className="mb-4 px-4">
          <AccessBadge accessLevel={permission.accessLevel} />
        </div>
      )}
      {children}
    </div>
  );
}
