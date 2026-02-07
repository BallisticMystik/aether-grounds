import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { XMLParser, xmlParser } from '../../../src/parsers/xml-parser';
import { isRawXMLCoffeePlatform, isValidAccessLevel, isValidConnectionType } from '../../../src/parsers/types';
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

  describe('XMLParser Instance', () => {
    it('should create a new instance', () => {
      const newParser = new XMLParser();
      expect(newParser).toBeInstanceOf(XMLParser);
    });

    it('should export a default singleton instance', () => {
      expect(xmlParser).toBeInstanceOf(XMLParser);
    });
  });

  describe('parseFile', () => {
    it('should parse valid XML file successfully', async () => {
      const result = await parser.parseFile(xmlPath);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should return error for non-existent file', async () => {
      const result = await parser.parseFile('/nonexistent/path/file.xml');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to read file');
    });

    it('should return error for invalid path type', async () => {
      const result = await parser.parseFile('');
      expect(result.success).toBe(false);
    });
  });

  describe('parseString', () => {
    it('should parse valid XML string successfully', async () => {
      const validXml = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata>
            <name>Test</name>
            <description>Test Description</description>
            <version>1.0</version>
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

      const result = await parser.parseString(validXml);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should return error for empty string', async () => {
      const result = await parser.parseString('');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Empty XML string provided');
    });

    it('should return error for whitespace-only string', async () => {
      const result = await parser.parseString('   \n\t  ');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Empty XML string provided');
    });

    it('should return error for invalid XML format', async () => {
      const result = await parser.parseString('<invalid><xml>');
      expect(result.success).toBe(false);
      expect(result.error).toContain('XML parsing error');
    });

    it('should return error for non-coffee-platform document', async () => {
      const result = await parser.parseString('<other-document><data>test</data></other-document>');
      expect(result.success).toBe(false);
      expect(result.error).toContain('not a valid coffee-platform document');
    });

    it('should return error for missing metadata', async () => {
      const result = await parser.parseString(`
        <coffee-platform>
          <roles><role id="test" name="Test" connection-type="purple"><features></features></role></roles>
        </coffee-platform>`);
      expect(result.success).toBe(false);
      // Type guard catches this before detailed validation
      expect(result.error).toContain('not a valid coffee-platform document');
    });

    it('should return error for missing roles', async () => {
      const result = await parser.parseString(`
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
        </coffee-platform>`);
      expect(result.success).toBe(false);
      // Type guard catches this before detailed validation
      expect(result.error).toContain('not a valid coffee-platform document');
    });

    it('should return error for missing feature-catalog', async () => {
      const result = await parser.parseString(`
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles><role id="test" name="Test" connection-type="purple"><features><feature id="f1" name="F1" access-level="full"/></features></role></roles>
        </coffee-platform>`);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Missing required section: feature-catalog');
    });

    it('should return error for missing access-levels', async () => {
      const result = await parser.parseString(`
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles><role id="test" name="Test" connection-type="purple"><features><feature id="f1" name="F1" access-level="full"/></features></role></roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
        </coffee-platform>`);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Missing required section: access-levels');
    });

    it('should return error for missing categories', async () => {
      const result = await parser.parseString(`
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles><role id="test" name="Test" connection-type="purple"><features><feature id="f1" name="F1" access-level="full"/></features></role></roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full access"/></access-levels>
        </coffee-platform>`);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Missing required section: categories');
    });

    it('should return error for missing connection-types', async () => {
      const result = await parser.parseString(`
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles><role id="test" name="Test" connection-type="purple"><features><feature id="f1" name="F1" access-level="full"/></features></role></roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full access"/></access-levels>
          <categories><category id="core" name="Core" description="Core features"/></categories>
        </coffee-platform>`);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Missing required section: connection-types');
    });
  });

  describe('Metadata Parsing', () => {
    it('should parse metadata correctly', () => {
      expect(config.metadata).toBeDefined();
      expect(config.metadata.name).toBe('Coffee Platform Roles');
      expect(config.metadata.description).toBe('Role-based access control framework for Coffee Platform');
      expect(config.metadata.version).toBe('1.0');
    });

    it('should have all metadata fields as strings', () => {
      expect(typeof config.metadata.name).toBe('string');
      expect(typeof config.metadata.description).toBe('string');
      expect(typeof config.metadata.version).toBe('string');
    });
  });

  describe('Role Extraction', () => {
    it('should extract all 5 roles', () => {
      expect(config.roles).toHaveLength(5);
    });

    it('should extract farmers role correctly', () => {
      const farmers = config.roles.find(r => r.id === 'farmers');
      expect(farmers).toBeDefined();
      expect(farmers?.name).toBe('Farmers');
      expect(farmers?.connectionType).toBe('purple');
      expect(farmers?.features.length).toBeGreaterThan(0);
    });

    it('should extract roasters role correctly', () => {
      const roasters = config.roles.find(r => r.id === 'roasters');
      expect(roasters).toBeDefined();
      expect(roasters?.name).toBe('Roasters');
      expect(roasters?.connectionType).toBe('purple');
    });

    it('should extract retailers role correctly', () => {
      const retailers = config.roles.find(r => r.id === 'retailers');
      expect(retailers).toBeDefined();
      expect(retailers?.name).toBe('Retailers');
      expect(retailers?.connectionType).toBe('purple');
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
        expect(Array.isArray(role.features)).toBe(true);
        expect(role.features.length).toBeGreaterThan(0);
      });
    });

    it('should have valid role IDs', () => {
      const validRoleIds = ['farmers', 'roasters', 'retailers', 'hub-community', 'affiliates-distributors'];
      config.roles.forEach(role => {
        expect(validRoleIds).toContain(role.id);
      });
    });
  });

  describe('Role Features Parsing', () => {
    it('should parse feature access levels correctly', () => {
      const farmers = config.roles.find(r => r.id === 'farmers');

      const profileFeature = farmers?.features.find(f => f.id === 'profile');
      expect(profileFeature?.accessLevel).toBe('full');

      const supplyChain = farmers?.features.find(f => f.id === 'supply-chain');
      expect(supplyChain?.accessLevel).toBe('partial');
    });

    it('should parse feature descriptions when present', () => {
      const farmers = config.roles.find(r => r.id === 'farmers');
      const qrCerts = farmers?.features.find(f => f.id === 'qr-certs');
      expect(qrCerts?.description).toBe('cert suite');
    });

    it('should handle features without descriptions', () => {
      const farmers = config.roles.find(r => r.id === 'farmers');
      const profile = farmers?.features.find(f => f.id === 'profile');
      expect(profile?.description).toBeUndefined();
    });

    it('should parse no access level correctly', () => {
      const roasters = config.roles.find(r => r.id === 'roasters');
      const iotDevices = roasters?.features.find(f => f.id === 'iot-devices');
      expect(iotDevices?.accessLevel).toBe('no');
    });

    it('should handle role with mixed access levels', () => {
      const affiliates = config.roles.find(r => r.id === 'affiliates-distributors');

      // Full access
      const profile = affiliates?.features.find(f => f.id === 'profile');
      expect(profile?.accessLevel).toBe('full');

      // Partial access
      const smartContract = affiliates?.features.find(f => f.id === 'smart-contract-wizard');
      expect(smartContract?.accessLevel).toBe('partial');

      // No access
      const farmMgmt = affiliates?.features.find(f => f.id === 'farm-management');
      expect(farmMgmt?.accessLevel).toBe('no');
    });
  });

  describe('Feature Catalog Extraction', () => {
    it('should extract all features from catalog', () => {
      expect(config.features.length).toBeGreaterThan(0);
      expect(config.features.length).toBe(19); // 19 features in catalog
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

    it('should include production-contracts features', () => {
      const roastProfile = config.features.find(f => f.id === 'roast-profile');
      expect(roastProfile).toBeDefined();
      expect(roastProfile?.category).toBe('production-contracts');
    });

    it('should include certification-traceability features', () => {
      const traceability = config.features.find(f => f.id === 'traceability');
      expect(traceability).toBeDefined();
      expect(traceability?.category).toBe('certification-traceability');
    });

    it('should include analytics-ai features', () => {
      const analytics = config.features.find(f => f.id === 'analytics');
      expect(analytics).toBeDefined();
      expect(analytics?.category).toBe('analytics-ai');
    });

    it('should include features with descriptions', () => {
      const qrCerts = config.features.find(f => f.id === 'qr-certs');
      expect(qrCerts).toBeDefined();
      expect(qrCerts?.description).toBe('cert suite');
    });

    it('should have valid category for all features', () => {
      const validCategories = ['core', 'farm-operations', 'production-contracts', 'certification-traceability', 'analytics-ai'];
      config.features.forEach(feature => {
        expect(validCategories).toContain(feature.category);
      });
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
      expect(full?.description).toContain('create, read, update, and delete');
    });

    it('should have partial access level', () => {
      const partial = config.accessLevels.find(a => a.id === 'partial');
      expect(partial).toBeDefined();
      expect(partial?.name).toBe('Partial Access');
      expect(partial?.description).toContain('Limited access');
    });

    it('should have view-only access level', () => {
      const viewOnly = config.accessLevels.find(a => a.id === 'view-only');
      expect(viewOnly).toBeDefined();
      expect(viewOnly?.name).toBe('View Only');
      expect(viewOnly?.description).toContain('Read-only');
    });

    it('should have no access level', () => {
      const no = config.accessLevels.find(a => a.id === 'no');
      expect(no).toBeDefined();
      expect(no?.name).toBe('No Access');
      expect(no?.description).toContain('not accessible');
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
      expect(core?.description).toContain('Essential');
    });

    it('should have farm-operations category', () => {
      const farmOps = config.categories.find(c => c.id === 'farm-operations');
      expect(farmOps).toBeDefined();
      expect(farmOps?.name).toBe('Farm Operations');
    });

    it('should have production-contracts category', () => {
      const prodContracts = config.categories.find(c => c.id === 'production-contracts');
      expect(prodContracts).toBeDefined();
      expect(prodContracts?.name).toBe('Production and Contracts');
    });

    it('should have certification-traceability category', () => {
      const certTrace = config.categories.find(c => c.id === 'certification-traceability');
      expect(certTrace).toBeDefined();
      expect(certTrace?.name).toBe('Certification and Traceability');
    });

    it('should have analytics-ai category', () => {
      const analyticsAi = config.categories.find(c => c.id === 'analytics-ai');
      expect(analyticsAi).toBeDefined();
      expect(analyticsAi?.name).toBe('Analytics and AI');
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
      expect(pink?.description).toContain('Hubs');
    });

    it('should have purple connection type', () => {
      const purple = config.connectionTypes.find(c => c.id === 'purple');
      expect(purple).toBeDefined();
      expect(purple?.name).toBe('Purple Connection');
      expect(purple?.description).toContain('Farmers');
    });
  });

  describe('Type Guards', () => {
    it('isRawXMLCoffeePlatform should return true for valid structure', () => {
      const valid = {
        'coffee-platform': {
          metadata: [{}],
          roles: [{}]
        }
      };
      expect(isRawXMLCoffeePlatform(valid)).toBe(true);
    });

    it('isRawXMLCoffeePlatform should return false for null', () => {
      expect(isRawXMLCoffeePlatform(null)).toBe(false);
    });

    it('isRawXMLCoffeePlatform should return false for undefined', () => {
      expect(isRawXMLCoffeePlatform(undefined)).toBe(false);
    });

    it('isRawXMLCoffeePlatform should return false for non-object', () => {
      expect(isRawXMLCoffeePlatform('string')).toBe(false);
      expect(isRawXMLCoffeePlatform(123)).toBe(false);
      expect(isRawXMLCoffeePlatform([])).toBe(false);
    });

    it('isRawXMLCoffeePlatform should return false for missing coffee-platform key', () => {
      expect(isRawXMLCoffeePlatform({ other: {} })).toBe(false);
    });

    it('isValidAccessLevel should return true for valid levels', () => {
      expect(isValidAccessLevel('full')).toBe(true);
      expect(isValidAccessLevel('partial')).toBe(true);
      expect(isValidAccessLevel('view-only')).toBe(true);
      expect(isValidAccessLevel('no')).toBe(true);
    });

    it('isValidAccessLevel should return false for invalid levels', () => {
      expect(isValidAccessLevel('invalid')).toBe(false);
      expect(isValidAccessLevel('')).toBe(false);
      expect(isValidAccessLevel('FULL')).toBe(false);
    });

    it('isValidConnectionType should return true for valid types', () => {
      expect(isValidConnectionType('pink')).toBe(true);
      expect(isValidConnectionType('purple')).toBe(true);
    });

    it('isValidConnectionType should return false for invalid types', () => {
      expect(isValidConnectionType('invalid')).toBe(false);
      expect(isValidConnectionType('')).toBe(false);
      expect(isValidConnectionType('PINK')).toBe(false);
    });
  });

  describe('Type Validation', () => {
    it('should output valid RBACConfig structure', () => {
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

    it('should have valid feature catalog structure', () => {
      config.features.forEach(feature => {
        expect(typeof feature.id).toBe('string');
        expect(typeof feature.name).toBe('string');
        expect(typeof feature.category).toBe('string');
      });
    });

    it('should have valid access level structure', () => {
      config.accessLevels.forEach(level => {
        expect(typeof level.id).toBe('string');
        expect(typeof level.name).toBe('string');
        expect(typeof level.description).toBe('string');
      });
    });

    it('should have valid category structure', () => {
      config.categories.forEach(category => {
        expect(typeof category.id).toBe('string');
        expect(typeof category.name).toBe('string');
        expect(typeof category.description).toBe('string');
      });
    });

    it('should have valid connection type structure', () => {
      config.connectionTypes.forEach(type => {
        expect(typeof type.id).toBe('string');
        expect(typeof type.name).toBe('string');
        expect(typeof type.description).toBe('string');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle role with empty features array gracefully', async () => {
      const xmlWithEmptyFeatures = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles>
            <role id="test" name="Test" connection-type="purple">
              <features></features>
            </role>
          </roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full"/></access-levels>
          <categories><category id="core" name="Core" description="Core"/></categories>
          <connection-types><connection-type id="purple" name="Purple" description="Purple"/></connection-types>
        </coffee-platform>`;

      const result = await parser.parseString(xmlWithEmptyFeatures);
      expect(result.success).toBe(true);
      expect(result.data?.roles[0].features).toEqual([]);
    });

    it('should default invalid access level to "no"', async () => {
      const xmlWithInvalidAccessLevel = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles>
            <role id="test" name="Test" connection-type="purple">
              <features>
                <feature id="f1" name="F1" access-level="invalid-level"/>
              </features>
            </role>
          </roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full"/></access-levels>
          <categories><category id="core" name="Core" description="Core"/></categories>
          <connection-types><connection-type id="purple" name="Purple" description="Purple"/></connection-types>
        </coffee-platform>`;

      const result = await parser.parseString(xmlWithInvalidAccessLevel);
      expect(result.success).toBe(true);
      expect(result.data?.roles[0].features[0].accessLevel).toBe('no');
    });

    it('should default invalid connection type to "purple"', async () => {
      const xmlWithInvalidConnectionType = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles>
            <role id="test" name="Test" connection-type="invalid-type">
              <features>
                <feature id="f1" name="F1" access-level="full"/>
              </features>
            </role>
          </roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full"/></access-levels>
          <categories><category id="core" name="Core" description="Core"/></categories>
          <connection-types><connection-type id="purple" name="Purple" description="Purple"/></connection-types>
        </coffee-platform>`;

      const result = await parser.parseString(xmlWithInvalidConnectionType);
      expect(result.success).toBe(true);
      expect(result.data?.roles[0].connectionType).toBe('purple');
    });

    it('should handle feature without access-level attribute (default to "no")', async () => {
      const xmlWithMissingAccessLevel = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles>
            <role id="test" name="Test" connection-type="purple">
              <features>
                <feature id="f1" name="F1"/>
              </features>
            </role>
          </roles>
          <feature-catalog><feature id="f1" name="F1" category="core"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full"/></access-levels>
          <categories><category id="core" name="Core" description="Core"/></categories>
          <connection-types><connection-type id="purple" name="Purple" description="Purple"/></connection-types>
        </coffee-platform>`;

      const result = await parser.parseString(xmlWithMissingAccessLevel);
      expect(result.success).toBe(true);
      expect(result.data?.roles[0].features[0].accessLevel).toBe('no');
    });

    it('should handle catalog feature without category (default to "core")', async () => {
      const xmlWithMissingCategory = `<?xml version="1.0" encoding="UTF-8"?>
        <coffee-platform>
          <metadata><name>Test</name><description>Test</description><version>1.0</version></metadata>
          <roles>
            <role id="test" name="Test" connection-type="purple">
              <features>
                <feature id="f1" name="F1" access-level="full"/>
              </features>
            </role>
          </roles>
          <feature-catalog><feature id="f1" name="F1"/></feature-catalog>
          <access-levels><access-level id="full" name="Full" description="Full"/></access-levels>
          <categories><category id="core" name="Core" description="Core"/></categories>
          <connection-types><connection-type id="purple" name="Purple" description="Purple"/></connection-types>
        </coffee-platform>`;

      const result = await parser.parseString(xmlWithMissingCategory);
      expect(result.success).toBe(true);
      expect(result.data?.features[0].category).toBe('core');
    });
  });

  describe('Data Integrity', () => {
    it('should have unique role IDs', () => {
      const roleIds = config.roles.map(r => r.id);
      const uniqueIds = [...new Set(roleIds)];
      expect(roleIds.length).toBe(uniqueIds.length);
    });

    it('should have unique feature IDs in catalog', () => {
      const featureIds = config.features.map(f => f.id);
      const uniqueIds = [...new Set(featureIds)];
      expect(featureIds.length).toBe(uniqueIds.length);
    });

    it('should have unique access level IDs', () => {
      const accessLevelIds = config.accessLevels.map(a => a.id);
      const uniqueIds = [...new Set(accessLevelIds)];
      expect(accessLevelIds.length).toBe(uniqueIds.length);
    });

    it('should have unique category IDs', () => {
      const categoryIds = config.categories.map(c => c.id);
      const uniqueIds = [...new Set(categoryIds)];
      expect(categoryIds.length).toBe(uniqueIds.length);
    });

    it('should have unique connection type IDs', () => {
      const typeIds = config.connectionTypes.map(t => t.id);
      const uniqueIds = [...new Set(typeIds)];
      expect(typeIds.length).toBe(uniqueIds.length);
    });

    it('should have role features that reference valid feature IDs from catalog', () => {
      const catalogFeatureIds = config.features.map(f => f.id);

      config.roles.forEach(role => {
        role.features.forEach(feature => {
          expect(catalogFeatureIds).toContain(feature.id);
        });
      });
    });
  });
});
