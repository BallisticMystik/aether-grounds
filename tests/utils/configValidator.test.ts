import { describe, it, expect } from 'vitest';
import { validateRBACConfig, ValidationResult } from '../../src/utils/configValidator';
import type { RBACConfig, Role, Feature, AccessLevelDefinition, Category, ConnectionTypeDefinition } from '../../types/rbac.types';

// Helper to create a valid base config
function createValidConfig(): RBACConfig {
  return {
    metadata: {
      name: 'Test Platform',
      description: 'Test Description',
      version: '1.0',
    },
    roles: [
      {
        id: 'farmers',
        name: 'Farmers',
        connectionType: 'purple',
        features: [
          { id: 'profile', name: 'Profile', accessLevel: 'full' },
        ],
      },
    ],
    features: [
      { id: 'profile', name: 'Profile', category: 'core' },
    ],
    accessLevels: [
      { id: 'full', name: 'Full Access', description: 'Full access' },
      { id: 'partial', name: 'Partial Access', description: 'Partial access' },
      { id: 'view-only', name: 'View Only', description: 'View only' },
      { id: 'no', name: 'No Access', description: 'No access' },
    ],
    categories: [
      { id: 'core', name: 'Core', description: 'Core features' },
    ],
    connectionTypes: [
      { id: 'purple', name: 'Purple', description: 'Purple connection' },
      { id: 'pink', name: 'Pink', description: 'Pink connection' },
    ],
  };
}

describe('configValidator', () => {
  describe('validateRBACConfig', () => {
    describe('Valid configurations', () => {
      it('should return valid for a correct minimal config', () => {
        const config = createValidConfig();
        const result = validateRBACConfig(config);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('should return valid for config with multiple roles', () => {
        const config = createValidConfig();
        config.roles.push({
          id: 'roasters',
          name: 'Roasters',
          connectionType: 'purple',
          features: [
            { id: 'profile', name: 'Profile', accessLevel: 'full' },
          ],
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(true);
      });

      it('should return valid for config with all access levels used', () => {
        const config = createValidConfig();
        config.features.push(
          { id: 'feature2', name: 'Feature 2', category: 'core' },
          { id: 'feature3', name: 'Feature 3', category: 'core' },
          { id: 'feature4', name: 'Feature 4', category: 'core' }
        );
        config.roles[0].features = [
          { id: 'profile', name: 'Profile', accessLevel: 'full' },
          { id: 'feature2', name: 'Feature 2', accessLevel: 'partial' },
          { id: 'feature3', name: 'Feature 3', accessLevel: 'view-only' },
          { id: 'feature4', name: 'Feature 4', accessLevel: 'no' },
        ];

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(true);
      });
    });

    describe('Missing required fields', () => {
      it('should fail if metadata is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.metadata;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('metadata'));
      });

      it('should fail if metadata.name is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.metadata.name;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('metadata.name'));
      });

      it('should fail if roles array is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.roles;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('roles'));
      });

      it('should fail if features array is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.features;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('features'));
      });

      it('should fail if accessLevels array is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.accessLevels;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('accessLevels'));
      });

      it('should fail if categories array is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.categories;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('categories'));
      });

      it('should fail if connectionTypes array is missing', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing missing field
        delete config.connectionTypes;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('connectionTypes'));
      });
    });

    describe('Empty arrays', () => {
      it('should fail if roles array is empty', () => {
        const config = createValidConfig();
        config.roles = [];

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('at least one role'));
      });

      it('should fail if features array is empty', () => {
        const config = createValidConfig();
        config.features = [];

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('at least one feature'));
      });

      it('should fail if accessLevels array is empty', () => {
        const config = createValidConfig();
        config.accessLevels = [];

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('at least one access level'));
      });
    });

    describe('Duplicate IDs', () => {
      it('should fail if there are duplicate role IDs', () => {
        const config = createValidConfig();
        config.roles.push({
          id: 'farmers', // Duplicate
          name: 'Farmers Copy',
          connectionType: 'purple',
          features: [],
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('Duplicate role ID'));
      });

      it('should fail if there are duplicate feature IDs in catalog', () => {
        const config = createValidConfig();
        config.features.push({
          id: 'profile', // Duplicate
          name: 'Profile Copy',
          category: 'core',
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('Duplicate feature ID'));
      });

      it('should fail if there are duplicate access level IDs', () => {
        const config = createValidConfig();
        config.accessLevels.push({
          id: 'full', // Duplicate
          name: 'Full Copy',
          description: 'Full copy',
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('Duplicate access level ID'));
      });

      it('should fail if there are duplicate category IDs', () => {
        const config = createValidConfig();
        config.categories.push({
          id: 'core', // Duplicate
          name: 'Core Copy',
          description: 'Core copy',
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('Duplicate category ID'));
      });

      it('should fail if there are duplicate connection type IDs', () => {
        const config = createValidConfig();
        config.connectionTypes.push({
          id: 'purple', // Duplicate
          name: 'Purple Copy',
          description: 'Purple copy',
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('Duplicate connection type ID'));
      });
    });

    describe('Invalid references', () => {
      it('should fail if role feature references non-existent feature ID', () => {
        const config = createValidConfig();
        config.roles[0].features.push({
          id: 'nonexistent',
          name: 'Nonexistent',
          accessLevel: 'full',
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('references unknown feature'));
      });

      it('should fail if role has invalid connection type', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing invalid value
        config.roles[0].connectionType = 'invalid';

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('invalid connection type'));
      });

      it('should fail if role feature has invalid access level', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing invalid value
        config.roles[0].features[0].accessLevel = 'invalid';

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('invalid access level'));
      });

      it('should fail if feature references non-existent category', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing invalid value
        config.features[0].category = 'nonexistent';

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('references unknown category'));
      });
    });

    describe('Invalid RoleId values', () => {
      it('should fail if role has empty ID', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing invalid value
        config.roles[0].id = '';

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('empty'));
      });

      it('should fail if role has missing name', () => {
        const config = createValidConfig();
        // @ts-expect-error - Testing invalid value
        delete config.roles[0].name;

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('missing name'));
      });
    });

    describe('Null and undefined handling', () => {
      it('should fail if config is null', () => {
        // @ts-expect-error - Testing null
        const result = validateRBACConfig(null);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('null or undefined'));
      });

      it('should fail if config is undefined', () => {
        // @ts-expect-error - Testing undefined
        const result = validateRBACConfig(undefined);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('null or undefined'));
      });
    });

    describe('ValidationResult structure', () => {
      it('should return errors array even for valid config', () => {
        const config = createValidConfig();
        const result = validateRBACConfig(config);

        expect(result).toHaveProperty('valid');
        expect(result).toHaveProperty('errors');
        expect(Array.isArray(result.errors)).toBe(true);
      });

      it('should return multiple errors for multiple issues', () => {
        const config = createValidConfig();
        // Create multiple issues
        config.roles.push({
          id: 'farmers', // Duplicate
          name: 'Farmers Copy',
          connectionType: 'purple',
          features: [
            { id: 'nonexistent', name: 'Nonexistent', accessLevel: 'full' },
          ],
        });
        config.features.push({
          id: 'profile', // Duplicate
          name: 'Profile Copy',
          category: 'core',
        });

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(1);
      });
    });

    describe('Required access levels', () => {
      it('should warn if required access levels are missing', () => {
        const config = createValidConfig();
        config.accessLevels = [
          { id: 'full', name: 'Full', description: 'Full' },
          // Missing partial, view-only, no
        ];

        const result = validateRBACConfig(config);
        // This might be a warning rather than error depending on implementation
        // For now, let's make it a validation requirement
        expect(result.valid).toBe(false);
        expect(result.errors.some(e => e.includes('partial') || e.includes('access level'))).toBe(true);
      });
    });

    describe('Role feature uniqueness', () => {
      it('should fail if role has duplicate feature IDs', () => {
        const config = createValidConfig();
        config.features.push({ id: 'feature2', name: 'Feature 2', category: 'core' });
        config.roles[0].features = [
          { id: 'profile', name: 'Profile', accessLevel: 'full' },
          { id: 'profile', name: 'Profile Again', accessLevel: 'partial' }, // Duplicate within role
        ];

        const result = validateRBACConfig(config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('duplicate feature'));
      });
    });
  });
});
