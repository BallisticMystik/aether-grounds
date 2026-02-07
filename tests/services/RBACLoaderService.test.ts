import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as path from 'path';

// We'll import the service after it's created
// import { RBACLoaderService } from '../../src/services/RBACLoaderService';

describe('RBACLoaderService', () => {
  const xmlPath = path.resolve(process.cwd(), 'coffee-platform-roles.xml');

  // Reset singleton between tests
  beforeEach(() => {
    // Will reset the singleton instance
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance when getInstance is called multiple times', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const instance1 = RBACLoaderService.getInstance();
      const instance2 = RBACLoaderService.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should enforce singleton pattern via TypeScript private constructor', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      // TypeScript's private constructor is enforced at compile-time
      // At runtime, we verify getInstance always returns the same instance
      const instance1 = RBACLoaderService.getInstance();
      const instance2 = RBACLoaderService.getInstance();
      expect(instance1).toBe(instance2);
      // Both should have the same methods
      expect(typeof instance1.loadConfig).toBe('function');
      expect(typeof instance2.loadConfig).toBe('function');
    });
  });

  describe('loadConfig', () => {
    it('should load config from default path', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();
      const config = await service.loadConfig();

      expect(config).toBeDefined();
      expect(config.metadata).toBeDefined();
      expect(config.metadata.name).toBe('Coffee Platform Roles');
    });

    it('should load config from custom path', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();
      const config = await service.loadConfig(xmlPath);

      expect(config).toBeDefined();
      expect(config.roles).toHaveLength(5);
    });

    it('should cache the config after first load', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      const config1 = await service.loadConfig(xmlPath);
      const config2 = await service.loadConfig(xmlPath);

      expect(config1).toBe(config2); // Same reference
    });

    it('should throw error for non-existent file', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await expect(service.loadConfig('/nonexistent/path.xml')).rejects.toThrow();
    });

    it('should throw error for invalid XML', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      // Create a mock for invalid XML
      const invalidPath = path.resolve(process.cwd(), 'tests/fixtures/invalid.xml');
      await expect(service.loadConfig(invalidPath)).rejects.toThrow();
    });
  });

  describe('getConfig', () => {
    it('should return null if config not loaded', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      expect(service.getConfig()).toBeNull();
    });

    it('should return config after loading', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await service.loadConfig(xmlPath);
      const config = service.getConfig();

      expect(config).toBeDefined();
      expect(config?.metadata.name).toBe('Coffee Platform Roles');
    });
  });

  describe('isLoaded', () => {
    it('should return false before loading', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      expect(service.isLoaded()).toBe(false);
    });

    it('should return true after loading', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await service.loadConfig(xmlPath);
      expect(service.isLoaded()).toBe(true);
    });
  });

  describe('reload', () => {
    it('should reload config from file', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      // First load
      const config1 = await service.loadConfig(xmlPath);

      // Reload
      const config2 = await service.reload();

      expect(config2).toBeDefined();
      expect(config2.metadata.name).toBe('Coffee Platform Roles');
      // After reload, should be a new object (not same reference)
      expect(config1).not.toBe(config2);
    });

    it('should throw error if no path was previously loaded', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await expect(service.reload()).rejects.toThrow('No config path set');
    });
  });

  describe('loadConfigFromString', () => {
    it('should load config from XML string', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata>
            <name>Test Platform</name>
            <description>Test Description</description>
            <version>2.0</version>
          </metadata>
          <roles>
            <role id="test" name="Test Role" connection-type="purple">
              <features>
                <feature id="profile" name="Profile" access-level="full"/>
              </features>
            </role>
          </roles>
          <feature-catalog>
            <feature id="profile" name="Profile" category="core"/>
          </feature-catalog>
          <access-levels>
            <access-level id="full" name="Full Access" description="Full access"/>
          </access-levels>
          <categories>
            <category id="core" name="Core" description="Core features"/>
          </categories>
          <connection-types>
            <connection-type id="purple" name="Purple" description="Purple connection"/>
          </connection-types>
        </coffee-platform>`;

      const config = await service.loadConfigFromString(xmlString);

      expect(config).toBeDefined();
      expect(config.metadata.name).toBe('Test Platform');
      expect(config.metadata.version).toBe('2.0');
    });

    it('should throw error for invalid XML string', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await expect(service.loadConfigFromString('<invalid>')).rejects.toThrow();
    });
  });

  describe('reset', () => {
    it('should clear cached config', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await service.loadConfig(xmlPath);
      expect(service.isLoaded()).toBe(true);

      service.reset();
      expect(service.isLoaded()).toBe(false);
      expect(service.getConfig()).toBeNull();
    });
  });

  describe('getRBACInstance', () => {
    it('should return RBAC instance after loading config', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await service.loadConfig(xmlPath);
      const rbac = service.getRBACInstance();

      expect(rbac).toBeDefined();
      expect(typeof rbac?.hasAccess).toBe('function');
    });

    it('should return null if config not loaded', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      expect(service.getRBACInstance()).toBeNull();
    });

    it('should return working RBAC instance', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      await service.loadConfig(xmlPath);
      const rbac = service.getRBACInstance();

      // Test actual RBAC functionality
      const result = rbac?.hasAccess('farmers', 'profile');
      expect(result?.allowed).toBe(true);
      expect(result?.accessLevel).toBe('full');
    });
  });

  describe('Configuration Data', () => {
    it('should have all 5 roles after loading', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      const config = await service.loadConfig(xmlPath);
      expect(config.roles).toHaveLength(5);

      const roleIds = config.roles.map(r => r.id);
      expect(roleIds).toContain('farmers');
      expect(roleIds).toContain('roasters');
      expect(roleIds).toContain('retailers');
      expect(roleIds).toContain('hub-community');
      expect(roleIds).toContain('affiliates-distributors');
    });

    it('should have all features in catalog', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      const config = await service.loadConfig(xmlPath);
      expect(config.features.length).toBe(19);
    });

    it('should have all access levels', async () => {
      const { RBACLoaderService } = await import('../../src/services/RBACLoaderService');
      const service = RBACLoaderService.getInstance();

      const config = await service.loadConfig(xmlPath);
      expect(config.accessLevels).toHaveLength(4);
    });
  });
});
