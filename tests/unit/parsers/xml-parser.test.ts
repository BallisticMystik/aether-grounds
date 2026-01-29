import { describe, it, expect, beforeAll } from 'vitest';
import { XMLParser } from '../../../src/parsers/xml-parser';
import type { RBACConfig } from '../../../types/rbac.types';
import * as path from 'path';

describe('XMLParser', () => {
  let parser: XMLParser;
  let config: RBACConfig;
  const xmlPath = path.resolve(process.cwd(), 'coffee-platform-roles.xml');

  beforeAll(async () => {
    parser = new XMLParser();
    const result = await parser.parseFile(xmlPath);
    if (!result.success || !result.data) {
      throw new Error(`Failed to parse XML: ${result.error}`);
    }
    config = result.data;
  });

  describe('XML Structure Validation', () => {
    it('should parse valid XML successfully', () => {
      expect(config).toBeDefined();
    });

    it('should have metadata', () => {
      expect(config.metadata).toBeDefined();
      expect(config.metadata.name).toBe('Coffee Platform Roles');
      expect(config.metadata.version).toBe('1.0');
    });

    it('should have all required sections', () => {
      expect(config.roles).toBeDefined();
      expect(config.features).toBeDefined();
      expect(config.accessLevels).toBeDefined();
      expect(config.categories).toBeDefined();
      expect(config.connectionTypes).toBeDefined();
    });
  });

  describe('Role Extraction', () => {
    it('should extract all 4 roles', () => {
      expect(config.roles).toHaveLength(4);
    });

    it('should extract farmers role correctly', () => {
      const farmers = config.roles.find(r => r.id === 'farmers');
      expect(farmers).toBeDefined();
      expect(farmers?.name).toBe('Farmers');
      expect(farmers?.connectionType).toBe('purple');
    });

    it('should extract roasters-retailers role correctly', () => {
      const roasters = config.roles.find(r => r.id === 'roasters-retailers');
      expect(roasters).toBeDefined();
      expect(roasters?.name).toBe('Roasters/Retailers');
      expect(roasters?.connectionType).toBe('purple');
    });

    it('should extract hub-community role correctly', () => {
      const hubs = config.roles.find(r => r.id === 'hub-community');
      expect(hubs).toBeDefined();
      expect(hubs?.name).toBe('Hubs - Community');
      expect(hubs?.connectionType).toBe('pink');
    });

    it('should extract affiliates-distributors role correctly', () => {
      const affiliates = config.roles.find(r => r.id === 'affiliates-distributors');
      expect(affiliates).toBeDefined();
      expect(affiliates?.name).toBe('Affiliates/Distributors');
      expect(affiliates?.connectionType).toBe('pink');
    });

    it('should extract features for each role', () => {
      config.roles.forEach(role => {
        expect(role.features).toBeDefined();
        expect(role.features.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Feature Extraction', () => {
    it('should extract all features from catalog', () => {
      expect(config.features.length).toBeGreaterThan(0);
    });

    it('should include core features', () => {
      const profileFeature = config.features.find(f => f.id === 'profile');
      expect(profileFeature).toBeDefined();
      expect(profileFeature?.name).toBe('Profile');
      expect(profileFeature?.category).toBe('core');
    });

    it('should include farm-operations features', () => {
      const farmMgmt = config.features.find(f => f.id === 'farm-management');
      expect(farmMgmt).toBeDefined();
      expect(farmMgmt?.category).toBe('farm-operations');
    });

    it('should include features with descriptions', () => {
      const qrCerts = config.features.find(f => f.id === 'qr-certs');
      expect(qrCerts).toBeDefined();
      expect(qrCerts?.description).toBe('cert suite');
    });
  });

  describe('Access Level Parsing', () => {
    it('should extract all 4 access levels', () => {
      expect(config.accessLevels).toHaveLength(4);
    });

    it('should have full access level', () => {
      const full = config.accessLevels.find(a => a.id === 'full');
      expect(full).toBeDefined();
      expect(full?.name).toBe('Full Access');
    });

    it('should have partial access level', () => {
      const partial = config.accessLevels.find(a => a.id === 'partial');
      expect(partial).toBeDefined();
      expect(partial?.name).toBe('Partial Access');
    });

    it('should have view-only access level', () => {
      const viewOnly = config.accessLevels.find(a => a.id === 'view-only');
      expect(viewOnly).toBeDefined();
      expect(viewOnly?.name).toBe('View Only');
    });

    it('should have no access level', () => {
      const no = config.accessLevels.find(a => a.id === 'no');
      expect(no).toBeDefined();
      expect(no?.name).toBe('No Access');
    });

    it('should correctly map access levels in role features', () => {
      const farmers = config.roles.find(r => r.id === 'farmers');
      const profileFeature = farmers?.features.find(f => f.id === 'profile');
      expect(profileFeature?.accessLevel).toBe('full');

      const supplyChain = farmers?.features.find(f => f.id === 'supply-chain');
      expect(supplyChain?.accessLevel).toBe('partial');
    });
  });

  describe('Category Mapping', () => {
    it('should extract all 5 categories', () => {
      expect(config.categories).toHaveLength(5);
    });

    it('should have core category', () => {
      const core = config.categories.find(c => c.id === 'core');
      expect(core).toBeDefined();
      expect(core?.name).toBe('Core');
    });

    it('should have farm-operations category', () => {
      const farmOps = config.categories.find(c => c.id === 'farm-operations');
      expect(farmOps).toBeDefined();
    });

    it('should have production-contracts category', () => {
      const prodContracts = config.categories.find(c => c.id === 'production-contracts');
      expect(prodContracts).toBeDefined();
    });

    it('should have certification-traceability category', () => {
      const certTrace = config.categories.find(c => c.id === 'certification-traceability');
      expect(certTrace).toBeDefined();
    });

    it('should have analytics-ai category', () => {
      const analyticsAi = config.categories.find(c => c.id === 'analytics-ai');
      expect(analyticsAi).toBeDefined();
    });
  });

  describe('Connection Types', () => {
    it('should extract all 2 connection types', () => {
      expect(config.connectionTypes).toHaveLength(2);
    });

    it('should have pink connection type', () => {
      const pink = config.connectionTypes.find(c => c.id === 'pink');
      expect(pink).toBeDefined();
      expect(pink?.name).toBe('Pink Connection');
    });

    it('should have purple connection type', () => {
      const purple = config.connectionTypes.find(c => c.id === 'purple');
      expect(purple).toBeDefined();
      expect(purple?.name).toBe('Purple Connection');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid XML format', async () => {
      const result = await parser.parseString('<invalid><xml>');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle missing required fields', async () => {
      const result = await parser.parseString('<coffee-platform></coffee-platform>');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle file not found', async () => {
      const result = await parser.parseFile('/nonexistent/path/file.xml');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle empty XML', async () => {
      const result = await parser.parseString('');
      expect(result.success).toBe(false);
    });
  });

  describe('Type Validation', () => {
    it('should output valid RBACConfig structure', () => {
      // Verify all required properties exist with correct types
      expect(typeof config.metadata.name).toBe('string');
      expect(typeof config.metadata.description).toBe('string');
      expect(typeof config.metadata.version).toBe('string');
      expect(Array.isArray(config.roles)).toBe(true);
      expect(Array.isArray(config.features)).toBe(true);
      expect(Array.isArray(config.accessLevels)).toBe(true);
      expect(Array.isArray(config.categories)).toBe(true);
      expect(Array.isArray(config.connectionTypes)).toBe(true);
    });

    it('should have valid role structure', () => {
      config.roles.forEach(role => {
        expect(typeof role.id).toBe('string');
        expect(typeof role.name).toBe('string');
        expect(['pink', 'purple']).toContain(role.connectionType);
        expect(Array.isArray(role.features)).toBe(true);
      });
    });

    it('should have valid feature structure in roles', () => {
      config.roles.forEach(role => {
        role.features.forEach(feature => {
          expect(typeof feature.id).toBe('string');
          expect(typeof feature.name).toBe('string');
          expect(['full', 'partial', 'view-only', 'no']).toContain(feature.accessLevel);
        });
      });
    });
  });
});
