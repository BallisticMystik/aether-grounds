/**
 * Express RBAC Middleware
 * Protects routes by feature and optional minimum access level.
 * Requires req.user.roleId to be set (e.g. by auth middleware such as authenticateToken).
 */

import { Request, Response, NextFunction } from 'express';
import { RBACLoaderService } from '../services/RBACLoaderService';
import type { RoleId, FeatureId, AccessLevel } from '../../types/rbac.types';

export interface RbacRequest extends Request {
  user?: {
    id: string;
    email: string;
    roleId: RoleId;
  };
}

const ORDERED_ACCESS: AccessLevel[] = ['no', 'view-only', 'partial', 'full'];

function levelRank(level: AccessLevel): number {
  const i = ORDERED_ACCESS.indexOf(level);
  return i === -1 ? 0 : i;
}

/**
 * Create middleware that requires access to a feature, optionally at a minimum access level.
 * Use after auth middleware so req.user.roleId is set.
 *
 * @param featureId - Required feature (e.g. 'profile', 'farm-management')
 * @param minAccessLevel - Optional minimum level: 'view-only' | 'partial' | 'full'. Default: any non-no.
 */
export function createRbacMiddleware(
  featureId: FeatureId,
  minAccessLevel?: AccessLevel
) {
  return async (req: RbacRequest, res: Response, next: NextFunction): Promise<void> => {
    const roleId = req.user?.roleId;

    if (!roleId) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'Ensure req.user.roleId is set by auth middleware (e.g. authenticateToken).',
      });
      return;
    }

    const loader = RBACLoaderService.getInstance();
    if (!loader.isLoaded()) {
      try {
        await loader.loadConfig();
      } catch (err) {
        res.status(500).json({
          error: 'RBAC configuration not loaded',
          message: err instanceof Error ? err.message : 'Unknown error',
        });
        return;
      }
    }

    const rbac = loader.getRBACInstance();
    if (!rbac) {
      res.status(500).json({ error: 'RBAC instance not available' });
      return;
    }

    const result = rbac.hasAccess(roleId, featureId);

    if (!result.allowed) {
      res.status(403).json({
        error: 'Forbidden',
        message: result.reason || 'Insufficient permissions for this resource',
        featureId,
        roleId,
      });
      return;
    }

    if (minAccessLevel && minAccessLevel !== 'no') {
      const requiredRank = levelRank(minAccessLevel);
      const actualRank = levelRank(result.accessLevel);
      if (actualRank < requiredRank) {
        res.status(403).json({
          error: 'Forbidden',
          message: `Required access level: ${minAccessLevel}. Your access: ${result.accessLevel}.`,
          featureId,
          roleId,
        });
        return;
      }
    }

    next();
  };
}
