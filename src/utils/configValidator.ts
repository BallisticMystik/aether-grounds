/**
 * RBAC Config Validator
 * Validates RBACConfig structure for completeness and correctness
 */

import type { RBACConfig, AccessLevel, ConnectionType } from '../../types/rbac.types';

/**
 * Result of configuration validation
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Valid access levels
 */
const VALID_ACCESS_LEVELS: AccessLevel[] = ['full', 'partial', 'view-only', 'no'];

/**
 * Valid connection types
 */
const VALID_CONNECTION_TYPES: ConnectionType[] = ['pink', 'purple'];

/**
 * Required access levels that should be defined
 */
const REQUIRED_ACCESS_LEVELS: AccessLevel[] = ['full', 'partial', 'view-only', 'no'];

/**
 * Validate an RBAC configuration
 * @param config - The configuration to validate
 * @returns ValidationResult with valid flag and errors array
 */
export function validateRBACConfig(config: RBACConfig): ValidationResult {
  const errors: string[] = [];

  // Check for null/undefined
  if (config === null || config === undefined) {
    return {
      valid: false,
      errors: ['Configuration is null or undefined'],
    };
  }

  // Validate metadata
  validateMetadata(config, errors);

  // Validate roles array exists and is not empty
  validateRolesArray(config, errors);

  // Validate features array exists and is not empty
  validateFeaturesArray(config, errors);

  // Validate access levels
  validateAccessLevels(config, errors);

  // Validate categories
  validateCategories(config, errors);

  // Validate connection types
  validateConnectionTypes(config, errors);

  // Validate references and uniqueness (only if basic structure is valid)
  if (errors.length === 0 || allArraysExist(config)) {
    validateUniqueIds(config, errors);
    validateReferences(config, errors);
    validateRoleFeatures(config, errors);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if all required arrays exist
 */
function allArraysExist(config: RBACConfig): boolean {
  return (
    Array.isArray(config.roles) &&
    Array.isArray(config.features) &&
    Array.isArray(config.accessLevels) &&
    Array.isArray(config.categories) &&
    Array.isArray(config.connectionTypes)
  );
}

/**
 * Validate metadata section
 */
function validateMetadata(config: RBACConfig, errors: string[]): void {
  if (!config.metadata) {
    errors.push('Missing required field: metadata');
    return;
  }

  if (!config.metadata.name) {
    errors.push('Missing required field: metadata.name');
  }

  if (!config.metadata.version) {
    errors.push('Missing required field: metadata.version');
  }

  if (!config.metadata.description) {
    errors.push('Missing required field: metadata.description');
  }
}

/**
 * Validate roles array
 */
function validateRolesArray(config: RBACConfig, errors: string[]): void {
  if (!config.roles) {
    errors.push('Missing required field: roles');
    return;
  }

  if (!Array.isArray(config.roles)) {
    errors.push('roles must be an array');
    return;
  }

  if (config.roles.length === 0) {
    errors.push('Configuration must have at least one role');
  }

  // Validate individual roles
  config.roles.forEach((role, index) => {
    if (!role.id || role.id.trim() === '') {
      errors.push(`Role at index ${index} has empty or missing ID`);
    }

    if (!role.name) {
      errors.push(`Role '${role.id || index}' is missing name`);
    }

    if (!VALID_CONNECTION_TYPES.includes(role.connectionType as ConnectionType)) {
      errors.push(`Role '${role.id}' has invalid connection type: '${role.connectionType}'`);
    }
  });
}

/**
 * Validate features array
 */
function validateFeaturesArray(config: RBACConfig, errors: string[]): void {
  if (!config.features) {
    errors.push('Missing required field: features');
    return;
  }

  if (!Array.isArray(config.features)) {
    errors.push('features must be an array');
    return;
  }

  if (config.features.length === 0) {
    errors.push('Configuration must have at least one feature in the catalog');
  }

  // Validate individual features
  config.features.forEach((feature, index) => {
    if (!feature.id || feature.id.trim() === '') {
      errors.push(`Feature at index ${index} has empty or missing ID`);
    }

    if (!feature.name) {
      errors.push(`Feature '${feature.id || index}' is missing name`);
    }
  });
}

/**
 * Validate access levels
 */
function validateAccessLevels(config: RBACConfig, errors: string[]): void {
  if (!config.accessLevels) {
    errors.push('Missing required field: accessLevels');
    return;
  }

  if (!Array.isArray(config.accessLevels)) {
    errors.push('accessLevels must be an array');
    return;
  }

  if (config.accessLevels.length === 0) {
    errors.push('Configuration must have at least one access level');
    return;
  }

  // Check for required access levels
  const definedLevels = config.accessLevels.map(a => a.id);
  REQUIRED_ACCESS_LEVELS.forEach(required => {
    if (!definedLevels.includes(required)) {
      errors.push(`Missing required access level: '${required}'`);
    }
  });
}

/**
 * Validate categories
 */
function validateCategories(config: RBACConfig, errors: string[]): void {
  if (!config.categories) {
    errors.push('Missing required field: categories');
    return;
  }

  if (!Array.isArray(config.categories)) {
    errors.push('categories must be an array');
    return;
  }

  // Categories can be empty, but we'll validate if present
  config.categories.forEach((category, index) => {
    if (!category.id || category.id.trim() === '') {
      errors.push(`Category at index ${index} has empty or missing ID`);
    }
  });
}

/**
 * Validate connection types
 */
function validateConnectionTypes(config: RBACConfig, errors: string[]): void {
  if (!config.connectionTypes) {
    errors.push('Missing required field: connectionTypes');
    return;
  }

  if (!Array.isArray(config.connectionTypes)) {
    errors.push('connectionTypes must be an array');
    return;
  }
}

/**
 * Validate unique IDs across all sections
 */
function validateUniqueIds(config: RBACConfig, errors: string[]): void {
  // Check role IDs
  if (config.roles) {
    const roleIds = config.roles.map(r => r.id);
    const duplicateRoles = findDuplicates(roleIds);
    duplicateRoles.forEach(id => {
      errors.push(`Duplicate role ID: '${id}'`);
    });
  }

  // Check feature IDs
  if (config.features) {
    const featureIds = config.features.map(f => f.id);
    const duplicateFeatures = findDuplicates(featureIds);
    duplicateFeatures.forEach(id => {
      errors.push(`Duplicate feature ID in catalog: '${id}'`);
    });
  }

  // Check access level IDs
  if (config.accessLevels) {
    const accessLevelIds = config.accessLevels.map(a => a.id);
    const duplicateAccessLevels = findDuplicates(accessLevelIds);
    duplicateAccessLevels.forEach(id => {
      errors.push(`Duplicate access level ID: '${id}'`);
    });
  }

  // Check category IDs
  if (config.categories) {
    const categoryIds = config.categories.map(c => c.id);
    const duplicateCategories = findDuplicates(categoryIds);
    duplicateCategories.forEach(id => {
      errors.push(`Duplicate category ID: '${id}'`);
    });
  }

  // Check connection type IDs
  if (config.connectionTypes) {
    const connectionTypeIds = config.connectionTypes.map(c => c.id);
    const duplicateConnectionTypes = findDuplicates(connectionTypeIds);
    duplicateConnectionTypes.forEach(id => {
      errors.push(`Duplicate connection type ID: '${id}'`);
    });
  }
}

/**
 * Validate references between sections
 */
function validateReferences(config: RBACConfig, errors: string[]): void {
  if (!config.features || !config.categories) return;

  const categoryIds = config.categories.map(c => c.id);

  // Check that feature categories exist
  config.features.forEach(feature => {
    if (feature.category && !categoryIds.includes(feature.category)) {
      errors.push(`Feature '${feature.id}' references unknown category: '${feature.category}'`);
    }
  });
}

/**
 * Validate role features
 */
function validateRoleFeatures(config: RBACConfig, errors: string[]): void {
  if (!config.roles || !config.features) return;

  const catalogFeatureIds = config.features.map(f => f.id);

  config.roles.forEach(role => {
    if (!role.features) return;

    // Check for duplicate features within role
    const roleFeatureIds = role.features.map(f => f.id);
    const duplicates = findDuplicates(roleFeatureIds);
    duplicates.forEach(id => {
      errors.push(`Role '${role.id}' has duplicate feature ID: '${id}'`);
    });

    // Check each feature
    role.features.forEach(feature => {
      // Check feature exists in catalog
      if (!catalogFeatureIds.includes(feature.id)) {
        errors.push(`Role '${role.id}' references unknown feature: '${feature.id}'`);
      }

      // Check access level is valid
      if (!VALID_ACCESS_LEVELS.includes(feature.accessLevel as AccessLevel)) {
        errors.push(`Role '${role.id}' feature '${feature.id}' has invalid access level: '${feature.accessLevel}'`);
      }
    });
  });
}

/**
 * Find duplicate values in an array
 */
function findDuplicates(arr: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  arr.forEach(item => {
    if (seen.has(item)) {
      duplicates.add(item);
    }
    seen.add(item);
  });

  return Array.from(duplicates);
}

/**
 * Quick validation - returns true/false without collecting all errors
 */
export function isValidRBACConfig(config: RBACConfig): boolean {
  return validateRBACConfig(config).valid;
}
