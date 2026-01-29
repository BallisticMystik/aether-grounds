/**
 * RBAC Test Fixtures
 * Mock data for testing RBAC functionality
 */

import type {
  RBACConfig,
  Role,
  Feature,
  AccessLevelDefinition,
  Category,
  ConnectionTypeDefinition,
  RoleId,
  FeatureId,
  AccessLevel,
  CategoryId,
  ConnectionType
} from '../../types/rbac.types';

/**
 * Mock access level definitions
 */
export const mockAccessLevels: AccessLevelDefinition[] = [
  {
    id: 'full',
    name: 'Full Access',
    description: 'Complete access to create, read, update, and delete'
  },
  {
    id: 'partial',
    name: 'Partial Access',
    description: 'Limited access with restrictions'
  },
  {
    id: 'view-only',
    name: 'View Only',
    description: 'Read-only access, no modifications allowed'
  },
  {
    id: 'no',
    name: 'No Access',
    description: 'Feature not accessible to this role'
  }
];

/**
 * Mock categories
 */
export const mockCategories: Category[] = [
  {
    id: 'core',
    name: 'Core',
    description: 'Essential platform features available to all roles'
  },
  {
    id: 'farm-operations',
    name: 'Farm Operations',
    description: 'Features specific to farm management'
  },
  {
    id: 'production-contracts',
    name: 'Production & Contracts',
    description: 'Production and contract management features'
  },
  {
    id: 'certification-traceability',
    name: 'Certification & Traceability',
    description: 'Certification and supply chain traceability'
  },
  {
    id: 'analytics-ai',
    name: 'Analytics & AI',
    description: 'Analytics and artificial intelligence tools'
  }
];

/**
 * Mock connection types
 */
export const mockConnectionTypes: ConnectionTypeDefinition[] = [
  {
    id: 'pink',
    name: 'Pink Connection',
    description: 'Connects to left-side roles (Hubs - Community, Affiliates/Distributors)'
  },
  {
    id: 'purple',
    name: 'Purple Connection',
    description: 'Connects to right-side roles (Farmers, Roasters/Retailers)'
  }
];

/**
 * Mock features (subset for testing)
 */
export const mockFeatures: Feature[] = [
  {
    id: 'profile',
    name: 'Profile',
    category: 'core'
  },
  {
    id: 'role-dash',
    name: 'Role Dashboard',
    category: 'core'
  },
  {
    id: 'farm-management',
    name: 'Farm Management',
    category: 'farm-operations'
  },
  {
    id: 'smart-contract-wizard',
    name: 'Smart Contract Wizard',
    category: 'production-contracts'
  },
  {
    id: 'qr-certs',
    name: 'QR Certs',
    category: 'certification-traceability',
    description: 'cert suite'
  }
];

/**
 * Mock role: Farmers (simplified for testing)
 */
export const mockFarmerRole: Role = {
  id: 'farmers',
  name: 'Farmers',
  connectionType: 'purple',
  features: [
    { id: 'profile', name: 'Profile', accessLevel: 'full' },
    { id: 'role-dash', name: 'Role Dashboard', accessLevel: 'full' },
    { id: 'farm-management', name: 'Farm Management', accessLevel: 'full' },
    { id: 'smart-contract-wizard', name: 'Smart Contract Wizard', accessLevel: 'full' },
    { id: 'qr-certs', name: 'QR Certs', accessLevel: 'full', description: 'cert suite' }
  ]
};

/**
 * Mock role: Roasters/Retailers (simplified for testing)
 */
export const mockRoasterRole: Role = {
  id: 'roasters-retailers',
  name: 'Roasters/Retailers',
  connectionType: 'purple',
  features: [
    { id: 'profile', name: 'Profile', accessLevel: 'full' },
    { id: 'role-dash', name: 'Role Dashboard', accessLevel: 'full' },
    { id: 'farm-management', name: 'Farm Management', accessLevel: 'partial' },
    { id: 'smart-contract-wizard', name: 'Smart Contract Wizard', accessLevel: 'full' },
    { id: 'qr-certs', name: 'QR Certs', accessLevel: 'full' }
  ]
};

/**
 * Mock role: Hubs - Community (simplified for testing)
 */
export const mockHubRole: Role = {
  id: 'hub-community',
  name: 'Hubs - Community',
  connectionType: 'pink',
  features: [
    { id: 'profile', name: 'Profile', accessLevel: 'full' },
    { id: 'role-dash', name: 'Role Dashboard', accessLevel: 'full' },
    { id: 'farm-management', name: 'Farm Management', accessLevel: 'full' },
    { id: 'smart-contract-wizard', name: 'Smart Contract Wizard', accessLevel: 'full' },
    { id: 'qr-certs', name: 'QR Certs', accessLevel: 'full' }
  ]
};

/**
 * Mock role: Affiliates/Distributors (simplified for testing)
 */
export const mockAffiliateRole: Role = {
  id: 'affiliates-distributors',
  name: 'Affiliates/Distributors',
  connectionType: 'pink',
  features: [
    { id: 'profile', name: 'Profile', accessLevel: 'full' },
    { id: 'role-dash', name: 'Role Dashboard', accessLevel: 'full' },
    { id: 'farm-management', name: 'Farm Management', accessLevel: 'no' },
    { id: 'smart-contract-wizard', name: 'Smart Contract Wizard', accessLevel: 'partial' },
    { id: 'qr-certs', name: 'QR Certs', accessLevel: 'full' }
  ]
};

/**
 * Complete mock RBAC configuration
 */
export const mockRBACConfig: RBACConfig = {
  metadata: {
    name: 'Coffee Platform Roles',
    description: 'Role-based access control framework for Coffee Platform',
    version: '1.0'
  },
  roles: [mockFarmerRole, mockRoasterRole, mockHubRole, mockAffiliateRole],
  features: mockFeatures,
  accessLevels: mockAccessLevels,
  categories: mockCategories,
  connectionTypes: mockConnectionTypes
};

/**
 * Invalid config examples for error testing
 */
export const invalidConfigs = {
  /**
   * Missing required fields
   */
  missingMetadata: {
    roles: [],
    features: [],
    accessLevels: [],
    categories: [],
    connectionTypes: []
  } as Partial<RBACConfig>,

  /**
   * Invalid access level
   */
  invalidAccessLevel: {
    ...mockRBACConfig,
    roles: [
      {
        ...mockFarmerRole,
        features: [
          { id: 'profile', name: 'Profile', accessLevel: 'invalid' as AccessLevel }
        ]
      }
    ]
  } as RBACConfig,

  /**
   * Invalid role ID
   */
  invalidRoleId: {
    ...mockRBACConfig,
    roles: [
      { ...mockFarmerRole, id: 'invalid-role' as RoleId }
    ]
  } as RBACConfig,

  /**
   * Invalid feature ID
   */
  invalidFeatureId: {
    ...mockRBACConfig,
    roles: [
      {
        ...mockFarmerRole,
        features: [
          { id: 'invalid-feature' as FeatureId, name: 'Invalid', accessLevel: 'full' }
        ]
      }
    ]
  } as RBACConfig
};

/**
 * Mock XML data (simplified)
 */
export const mockXMLData = `<?xml version="1.0" encoding="UTF-8"?>
<coffee-platform>
  <metadata>
    <name>Coffee Platform Roles</name>
    <description>Test RBAC configuration</description>
    <version>1.0</version>
  </metadata>
  <roles>
    <role id="farmers" name="Farmers" connection-type="purple">
      <features>
        <feature id="profile" name="Profile" access-level="full"/>
        <feature id="farm-management" name="Farm Management" access-level="full"/>
      </features>
    </role>
  </roles>
</coffee-platform>`;
