/**
 * Example RBAC Middleware for API Authorization
 * Use this as a template for implementing role-based access control
 */

import { RoleId, FeatureId, AccessLevel } from '../types/rbac.types';

/**
 * Express.js middleware example
 */
export function createRBACMiddleware(
  rbac: any, // Replace with your RBAC instance
  requiredFeature: FeatureId,
  requiredAccessLevel: AccessLevel = 'full'
) {
  return (req: any, res: any, next: any) => {
    // Extract role from request (adjust based on your auth system)
    const userRole = req.user?.role as RoleId;
    
    if (!userRole) {
      return res.status(401).json({ error: 'Unauthorized: No role found' });
    }

    // Check access
    const permission = rbac.hasAccess(userRole, requiredFeature);
    
    if (!permission.allowed) {
      return res.status(403).json({
        error: 'Forbidden',
        reason: permission.reason,
        feature: requiredFeature,
        role: userRole,
      });
    }

    // Check if access level meets requirement
    const accessLevels: AccessLevel[] = ['no', 'view-only', 'partial', 'full'];
    const userLevel = accessLevels.indexOf(permission.accessLevel);
    const requiredLevel = accessLevels.indexOf(requiredAccessLevel);
    
    if (userLevel < requiredLevel) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient access level',
        required: requiredAccessLevel,
        current: permission.accessLevel,
        feature: requiredFeature,
        role: userRole,
      });
    }

    // Attach permission info to request
    req.permission = permission;
    next();
  };
}

/**
 * React Hook example for frontend permission checks
 */
export function useFeatureAccess(
  rbac: any, // Replace with your RBAC instance
  userRole: RoleId,
  featureId: FeatureId
) {
  const permission = rbac.hasAccess(userRole, featureId);
  
  return {
    canAccess: permission.allowed,
    canRead: permission.allowed,
    canWrite: permission.accessLevel === 'full' || permission.accessLevel === 'partial',
    canFullAccess: permission.accessLevel === 'full',
    accessLevel: permission.accessLevel,
  };
}

/**
 * Component wrapper example for React
 */
export function withFeatureAccess<P extends object>(
  Component: React.ComponentType<P>,
  featureId: FeatureId,
  requiredAccess: AccessLevel = 'full'
) {
  return function FeatureProtectedComponent(props: P & { userRole: RoleId; rbac: any }) {
    const { userRole, rbac, ...restProps } = props;
    const permission = rbac.hasAccess(userRole, featureId);
    
    if (!permission.allowed) {
      return <div>Access Denied: You don't have permission to view this feature.</div>;
    }

    const accessLevels: AccessLevel[] = ['no', 'view-only', 'partial', 'full'];
    const userLevel = accessLevels.indexOf(permission.accessLevel);
    const requiredLevel = accessLevels.indexOf(requiredAccess);
    
    if (userLevel < requiredLevel) {
      return <div>Insufficient Access: This feature requires {requiredAccess} access.</div>;
    }

    return <Component {...(restProps as P)} />;
  };
}

/**
 * Utility function to check multiple features
 */
export function checkMultipleFeatures(
  rbac: any,
  roleId: RoleId,
  features: FeatureId[],
  requireAll: boolean = true
): { allowed: boolean; results: Array<{ feature: FeatureId; allowed: boolean }> } {
  const results = features.map(featureId => ({
    feature: featureId,
    allowed: rbac.hasAccess(roleId, featureId).allowed,
  }));

  const allowed = requireAll
    ? results.every(r => r.allowed)
    : results.some(r => r.allowed);

  return { allowed, results };
}
