/**
 * Coffee Platform RBAC Type Definitions
 * Generated from coffee-platform-roles.xml
 */

export type AccessLevel = 'full' | 'partial' | 'view-only' | 'no';
export type RoleId = 'farmers' | 'roasters-retailers' | 'hub-community' | 'affiliates-distributors';
export type ConnectionType = 'pink' | 'purple';
export type CategoryId = 'core' | 'farm-operations' | 'production-contracts' | 'certification-traceability' | 'analytics-ai';

export type FeatureId =
  | 'profile'
  | 'role-dash'
  | 'aether-iq'
  | 'coffee-studio'
  | 'shop-mint'
  | 'farm-management'
  | 'iot-devices'
  | 'smart-contract-wizard'
  | 'roast-profile'
  | 'roasting-profiler'
  | 'roasting-contracts'
  | 'qr-certs'
  | 'traceability'
  | 'supply-chain'
  | 'analytics'
  | 'farm-analytics'
  | 'ai-tools'
  | 'blockchain-tools'
  | 'transactions';

export interface AccessLevelDefinition {
  id: AccessLevel;
  name: string;
  description: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface ConnectionTypeDefinition {
  id: ConnectionType;
  name: string;
  description: string;
}

export interface Feature {
  id: FeatureId;
  name: string;
  category: CategoryId;
  description?: string;
}

export interface RoleFeature {
  id: FeatureId;
  name: string;
  accessLevel: AccessLevel;
  description?: string;
}

export interface Role {
  id: RoleId;
  name: string;
  connectionType: ConnectionType;
  features: RoleFeature[];
}

export interface RBACConfig {
  metadata: {
    name: string;
    description: string;
    version: string;
  };
  roles: Role[];
  features: Feature[];
  accessLevels: AccessLevelDefinition[];
  categories: Category[];
  connectionTypes: ConnectionTypeDefinition[];
}

/**
 * Permission check result
 */
export interface PermissionResult {
  allowed: boolean;
  accessLevel: AccessLevel;
  reason?: string;
}

/**
 * Role-based access control utility class
 */
export class RBAC {
  private config: RBACConfig;

  constructor(config: RBACConfig) {
    this.config = config;
  }

  /**
   * Check if a role has access to a feature
   */
  hasAccess(roleId: RoleId, featureId: FeatureId): PermissionResult {
    const role = this.config.roles.find(r => r.id === roleId);
    if (!role) {
      return {
        allowed: false,
        accessLevel: 'no',
        reason: `Role ${roleId} not found`,
      };
    }

    const feature = role.features.find(f => f.id === featureId);
    if (!feature) {
      return {
        allowed: false,
        accessLevel: 'no',
        reason: `Feature ${featureId} not available to role ${roleId}`,
      };
    }

    const allowed = feature.accessLevel !== 'no';
    return {
      allowed,
      accessLevel: feature.accessLevel,
      reason: allowed ? undefined : 'Access denied',
    };
  }

  /**
   * Check if a role has full access to a feature
   */
  hasFullAccess(roleId: RoleId, featureId: FeatureId): boolean {
    const result = this.hasAccess(roleId, featureId);
    return result.allowed && result.accessLevel === 'full';
  }

  /**
   * Check if a role can write (full or partial access)
   */
  canWrite(roleId: RoleId, featureId: FeatureId): boolean {
    const result = this.hasAccess(roleId, featureId);
    return result.allowed && (result.accessLevel === 'full' || result.accessLevel === 'partial');
  }

  /**
   * Check if a role can read (any access except 'no')
   */
  canRead(roleId: RoleId, featureId: FeatureId): boolean {
    const result = this.hasAccess(roleId, featureId);
    return result.allowed;
  }

  /**
   * Get all features accessible to a role
   */
  getRoleFeatures(roleId: RoleId): RoleFeature[] {
    const role = this.config.roles.find(r => r.id === roleId);
    return role?.features || [];
  }

  /**
   * Get all roles that have access to a feature
   */
  getFeatureRoles(featureId: FeatureId): Array<{ roleId: RoleId; accessLevel: AccessLevel }> {
    return this.config.roles
      .map(role => {
        const feature = role.features.find(f => f.id === featureId);
        if (feature && feature.accessLevel !== 'no') {
          return {
            roleId: role.id,
            accessLevel: feature.accessLevel,
          };
        }
        return null;
      })
      .filter((item): item is { roleId: RoleId; accessLevel: AccessLevel } => item !== null);
  }

  /**
   * Get features by category for a role
   */
  getFeaturesByCategory(roleId: RoleId, categoryId: CategoryId): RoleFeature[] {
    const roleFeatures = this.getRoleFeatures(roleId);
    const categoryFeatures = this.config.features
      .filter(f => f.category === categoryId)
      .map(f => f.id);

    return roleFeatures.filter(f => categoryFeatures.includes(f.id));
  }
}
