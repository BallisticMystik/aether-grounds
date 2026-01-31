/**
 * Route Types
 * Type definitions for route configuration
 */

import type { FeatureId, RoleId, AccessLevel } from '../../types/rbac.types';

export interface RouteConfig {
  path: string;
  featureId: FeatureId;
  component: string; // Component import path
  requiredRoles?: RoleId[];
  requiredAccessLevel?: AccessLevel;
  title?: string;
  description?: string;
}

export interface RouteGroup {
  name: string;
  routes: RouteConfig[];
  category?: string;
}
