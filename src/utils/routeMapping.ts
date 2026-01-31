/**
 * Route Mapping Utilities
 * Maps route paths to FeatureIds, components, and access requirements
 */

import { getRouteConfig as getRouteConfigFromRoutes, getRouteByFeatureId } from '../routes/index';
import type { FeatureId } from '../../types/rbac.types';
import type { RouteConfig } from '../routes/types';

/**
 * Get route configuration for a given path
 */
export function getRouteConfig(path: string): RouteConfig | undefined {
  return getRouteConfigFromRoutes(path);
}

/**
 * Get FeatureId from route path
 */
export function getFeatureFromPath(path: string): FeatureId | undefined {
  const route = getRouteConfig(path);
  return route?.featureId;
}

/**
 * Get component import path for a route
 */
export function getComponentForRoute(path: string): string | undefined {
  const route = getRouteConfig(path);
  return route?.component;
}

/**
 * Get route path for a FeatureId
 */
export function getPathForFeature(featureId: FeatureId): string | undefined {
  const route = getRouteByFeatureId(featureId);
  return route?.path;
}

/**
 * Check if a path is a valid route
 */
export function isValidRoute(path: string): boolean {
  return getRouteConfig(path) !== undefined;
}

/**
 * Get all routes for a specific role (based on COMPONENT_REFERENCE.MD)
 * This is a helper that maps routes to roles based on the reference documentation
 */
export function getRoutesForRole(roleId: string): RouteConfig[] {
  // This will be enhanced when we integrate with actual RBAC checking
  // For now, return all routes - filtering will happen in ProtectedRoute
  const allRoutes = require('../routes/index').routes;
  return allRoutes;
}

/**
 * Map route path to component lazy import
 * Returns a function that can be used with React.lazy
 */
export function getLazyComponentForRoute(path: string): (() => Promise<{ default: React.ComponentType }>) | undefined {
  const componentPath = getComponentForRoute(path);
  if (!componentPath) return undefined;

  // Convert src/components/features/Profile to dynamic import
  // This will be used with React.lazy
  return () => import(`../${componentPath.replace('src/', '')}`);
}

/**
 * Get route metadata (title, description) for a path
 */
export function getRouteMetadata(path: string): { title?: string; description?: string } | undefined {
  const route = getRouteConfig(path);
  if (!route) return undefined;

  return {
    title: route.title,
    description: route.description,
  };
}
