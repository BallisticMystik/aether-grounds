/**
 * Example usage of the RBAC system
 * This demonstrates how to use the RBAC types and utilities
 */

import { RBAC, RoleId, FeatureId } from '../types/rbac.types';

// Example RBAC configuration (in production, load from XML or JSON)
const exampleConfig = {
  metadata: {
    name: 'Coffee Platform Roles',
    description: 'Role-based access control framework',
    version: '1.0',
  },
  roles: [
    {
      id: 'farmers' as RoleId,
      name: 'Farmers',
      connectionType: 'purple' as const,
      features: [
        { id: 'profile' as FeatureId, name: 'Profile', accessLevel: 'full' as const },
        { id: 'farm-management' as FeatureId, name: 'Farm Management', accessLevel: 'full' as const },
        // ... more features
      ],
    },
    // ... more roles
  ],
  features: [
    { id: 'profile' as FeatureId, name: 'Profile', category: 'core' as const },
    { id: 'farm-management' as FeatureId, name: 'Farm Management', category: 'farm-operations' as const },
    // ... more features
  ],
  accessLevels: [
    { id: 'full' as const, name: 'Full Access', description: 'Complete access' },
    { id: 'partial' as const, name: 'Partial Access', description: 'Limited access' },
    { id: 'view-only' as const, name: 'View Only', description: 'Read-only access' },
    { id: 'no' as const, name: 'No Access', description: 'No access' },
  ],
  categories: [
    { id: 'core' as const, name: 'Core', description: 'Essential features' },
    { id: 'farm-operations' as const, name: 'Farm Operations', description: 'Farm management' },
    // ... more categories
  ],
  connectionTypes: [
    { id: 'purple' as const, name: 'Purple Connection', description: 'Right-side roles' },
    { id: 'pink' as const, name: 'Pink Connection', description: 'Left-side roles' },
  ],
};

// Initialize RBAC
const rbac = new RBAC(exampleConfig);

// Example 1: Check if a farmer can access farm management
const farmerAccess = rbac.hasAccess('farmers', 'farm-management');
console.log('Farmer farm management access:', farmerAccess);
// Output: { allowed: true, accessLevel: 'full' }

// Example 2: Check if roaster can access IoT devices
const roasterIoT = rbac.hasAccess('roasters-retailers', 'iot-devices');
console.log('Roaster IoT access:', roasterIoT);
// Output: { allowed: false, accessLevel: 'no', reason: 'Access denied' }

// Example 3: Check full access
const canEdit = rbac.hasFullAccess('hub-community', 'analytics');
if (canEdit) {
  console.log('User can fully edit analytics');
}

// Example 4: Check write permission
const canWrite = rbac.canWrite('affiliates-distributors', 'smart-contract-wizard');
if (canWrite) {
  console.log('User can write to smart contract wizard');
}

// Example 5: Get all features for a role
const hubFeatures = rbac.getRoleFeatures('hub-community');
console.log('Hub features:', hubFeatures.length);

// Example 6: Get all roles that can access a feature
const analyticsRoles = rbac.getFeatureRoles('analytics');
console.log('Roles with analytics access:', analyticsRoles);

// Example 7: Get features by category
const coreFeatures = rbac.getFeaturesByCategory('farmers', 'core');
console.log('Core features for farmers:', coreFeatures);

// Example 8: Permission check in a function
function canAccessFarmManagement(userRole: RoleId): boolean {
  return rbac.hasFullAccess(userRole, 'farm-management');
}

// Example 9: Conditional rendering logic
function renderFeature(userRole: RoleId, featureId: FeatureId) {
  const permission = rbac.hasAccess(userRole, featureId);
  
  if (!permission.allowed) {
    return <div>Access Denied</div>;
  }
  
  if (permission.accessLevel === 'view-only') {
    return <ReadOnlyComponent />;
  }
  
  return <FullAccessComponent />;
}

// Example 10: API route protection logic
function protectRoute(userRole: RoleId, featureId: FeatureId, requiredLevel: 'full' | 'partial' = 'full') {
  const permission = rbac.hasAccess(userRole, featureId);
  
  if (!permission.allowed) {
    throw new Error(`Access denied to ${featureId}`);
  }
  
  if (requiredLevel === 'full' && permission.accessLevel !== 'full') {
    throw new Error(`Full access required for ${featureId}`);
  }
  
  return true;
}

// Example usage in API handler
try {
  protectRoute('farmers', 'farm-management', 'full');
  // Proceed with farm management operations
} catch (error) {
  // Return 403 Forbidden
}
