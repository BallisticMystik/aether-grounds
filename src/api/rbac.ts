/**
 * RBAC API Routes
 * Provides REST endpoints for RBAC configuration and permission checking
 */

import express, { Router, Request, Response } from 'express';
import { RBACLoaderService } from '../services/RBACLoaderService';
import { validateRBACConfig } from '../utils/configValidator';
import { authenticateToken } from './auth';
import { createRbacMiddleware } from '../middleware/express-rbac';
import type { RoleId, FeatureId } from '../../types/rbac.types';

/**
 * Create RBAC router with all endpoints
 */
export function createRBACRouter(): Router {
  const router = express.Router();
  const loaderService = RBACLoaderService.getInstance();

  // Ensure config is loaded
  const ensureConfigLoaded = async () => {
    if (!loaderService.isLoaded()) {
      await loaderService.loadConfig();
    }
  };

  /**
   * GET /api/rbac/config
   * Returns the full parsed RBAC configuration
   */
  router.get('/config', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      res.json(config);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/config/validate
   * Validates the current configuration
   */
  router.get('/config/validate', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      const result = validateRBACConfig(config);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/roles
   * Returns list of all roles
   */
  router.get('/roles', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      res.json(config.roles);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/roles/:roleId
   * Returns details of a specific role
   */
  router.get('/roles/:roleId', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      const role = config.roles.find(r => r.id === req.params.roleId);

      if (!role) {
        return res.status(404).json({ error: `Role '${req.params.roleId}' not found` });
      }

      res.json(role);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/features
   * Returns list of all features in the catalog
   */
  router.get('/features', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      res.json(config.features);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/features/:featureId
   * Returns details of a specific feature
   */
  router.get('/features/:featureId', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      const feature = config.features.find(f => f.id === req.params.featureId);

      if (!feature) {
        return res.status(404).json({ error: `Feature '${req.params.featureId}' not found` });
      }

      res.json(feature);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/access-levels
   * Returns list of all access levels
   */
  router.get('/access-levels', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      res.json(config.accessLevels);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/categories
   * Returns list of all categories
   */
  router.get('/categories', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const config = loaderService.getConfig();

      if (!config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      res.json(config.categories);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/check/:roleId/:featureId
   * Check if a role has access to a feature
   */
  router.get('/check/:roleId/:featureId', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const rbac = loaderService.getRBACInstance();
      const config = loaderService.getConfig();

      if (!rbac || !config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      const { roleId, featureId } = req.params;

      // Validate role exists
      const role = config.roles.find(r => r.id === roleId);
      if (!role) {
        return res.status(404).json({ error: `Role '${roleId}' not found` });
      }

      // Check access
      const result = rbac.hasAccess(roleId as RoleId, featureId as FeatureId);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * GET /api/rbac/roles/:roleId/features
   * Get all features for a specific role
   */
  router.get('/roles/:roleId/features', async (req: Request, res: Response) => {
    try {
      await ensureConfigLoaded();
      const rbac = loaderService.getRBACInstance();
      const config = loaderService.getConfig();

      if (!rbac || !config) {
        return res.status(500).json({ error: 'Failed to load configuration' });
      }

      const { roleId } = req.params;

      // Validate role exists
      const role = config.roles.find(r => r.id === roleId);
      if (!role) {
        return res.status(404).json({ error: `Role '${roleId}' not found` });
      }

      const features = rbac.getRoleFeatures(roleId as RoleId);
      res.json(features);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });

  /**
   * Protected demo route: requires auth + RBAC access to 'profile'.
   * GET /api/rbac/protected-demo with Authorization: Bearer <token>
   */
  router.get(
    '/protected-demo',
    authenticateToken,
    createRbacMiddleware('profile'),
    (req: Request, res: Response) => {
      const user = (req as import('../middleware/express-rbac').RbacRequest).user;
      res.json({ message: 'Access granted', user });
    }
  );

  return router;
}

// Export default router instance
const router = createRBACRouter();
export default router;
