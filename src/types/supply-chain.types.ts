/**
 * Supply Chain Types
 * Defines supply chain stages, data flow, and access patterns
 */

export type SupplyChainStage = 'farm' | 'crop' | 'bean' | 'roast' | 'brew' | 'retail';

export type StageDataFlow =
  | 'analytics-data' // FARM → CROP
  | 'iot-sensor-data' // CROP → BEAN
  | 'quality-grading' // BEAN → ROAST
  | 'roast-profiles' // ROAST → BREW
  | 'brew-methods'; // BREW → RETAIL

export type StageAccessLevel = 'write-edit' | 'view-only' | 'view-verify' | 'no-access';

export interface StageAccessMatrix {
  stage: SupplyChainStage;
  dataFlow?: {
    from?: SupplyChainStage;
    to?: SupplyChainStage;
    type: StageDataFlow;
  };
  roleAccess: {
    farmers: StageAccessLevel;
    roasters: StageAccessLevel;
    affiliates: StageAccessLevel;
    hubs: StageAccessLevel;
  };
  features: string[]; // Feature IDs available at this stage
}

export const SUPPLY_CHAIN_STAGES: SupplyChainStage[] = [
  'farm',
  'crop',
  'bean',
  'roast',
  'brew',
  'retail',
];

export const SUPPLY_CHAIN_MATRIX: StageAccessMatrix[] = [
  {
    stage: 'farm',
    dataFlow: {
      from: undefined,
      to: 'crop',
      type: 'analytics-data',
    },
    roleAccess: {
      farmers: 'write-edit',
      roasters: 'view-only',
      affiliates: 'no-access',
      hubs: 'view-only',
    },
    features: ['farm-management', 'analytics', 'iot-devices', 'farm-analytics'],
  },
  {
    stage: 'crop',
    dataFlow: {
      from: 'farm',
      to: 'bean',
      type: 'iot-sensor-data',
    },
    roleAccess: {
      farmers: 'write-edit',
      roasters: 'no-access',
      affiliates: 'no-access',
      hubs: 'view-only',
    },
    features: ['iot-devices', 'crop-analytics'],
  },
  {
    stage: 'bean',
    dataFlow: {
      from: 'crop',
      to: 'roast',
      type: 'quality-grading',
    },
    roleAccess: {
      farmers: 'write-edit',
      roasters: 'view-verify',
      affiliates: 'view-verify',
      hubs: 'view-only',
    },
    features: ['quality-assessment', 'bean-certification', 'qr-certs', 'traceability'],
  },
  {
    stage: 'roast',
    dataFlow: {
      from: 'bean',
      to: 'brew',
      type: 'roast-profiles',
    },
    roleAccess: {
      farmers: 'view-only',
      roasters: 'write-edit',
      affiliates: 'view-verify',
      hubs: 'view-verify',
    },
    features: [
      'roasting-profiler',
      'roast-profile',
      'coffee-studio',
      'roasting-contracts',
    ],
  },
  {
    stage: 'brew',
    dataFlow: {
      from: 'roast',
      to: 'retail',
      type: 'brew-methods',
    },
    roleAccess: {
      farmers: 'no-access',
      roasters: 'write-edit',
      affiliates: 'view-verify',
      hubs: 'view-only',
    },
    features: ['coffee-studio', 'brew-recipes', 'product-catalog'],
  },
  {
    stage: 'retail',
    dataFlow: {
      from: 'brew',
      to: undefined,
      type: 'brew-methods',
    },
    roleAccess: {
      farmers: 'view-only',
      roasters: 'write-edit',
      affiliates: 'write-edit',
      hubs: 'view-only',
    },
    features: ['shop-mint', 'transactions', 'customer-data'],
  },
];

/**
 * Get stage access level for a role
 */
export function getStageAccess(
  stage: SupplyChainStage,
  role: 'farmers' | 'roasters' | 'affiliates' | 'hubs'
): StageAccessLevel {
  const stageConfig = SUPPLY_CHAIN_MATRIX.find((s) => s.stage === stage);
  if (!stageConfig) return 'no-access';
  return stageConfig.roleAccess[role];
}

/**
 * Check if role has access to stage
 */
export function hasStageAccess(
  stage: SupplyChainStage,
  role: 'farmers' | 'roasters' | 'affiliates' | 'hubs',
  requiredLevel: StageAccessLevel = 'view-only'
): boolean {
  const access = getStageAccess(stage, role);
  if (access === 'no-access') return false;
  if (requiredLevel === 'view-only') return true;
  if (requiredLevel === 'view-verify') {
    return access === 'view-verify' || access === 'write-edit';
  }
  if (requiredLevel === 'write-edit') {
    return access === 'write-edit';
  }
  return false;
}

/**
 * Get features available at a stage for a role
 */
export function getStageFeatures(
  stage: SupplyChainStage,
  role: 'farmers' | 'roasters' | 'affiliates' | 'hubs'
): string[] {
  const stageConfig = SUPPLY_CHAIN_MATRIX.find((s) => s.stage === stage);
  if (!stageConfig) return [];
  const access = stageConfig.roleAccess[role];
  if (access === 'no-access') return [];
  return stageConfig.features;
}

/**
 * Get next stage in supply chain
 */
export function getNextStage(stage: SupplyChainStage): SupplyChainStage | null {
  const index = SUPPLY_CHAIN_STAGES.indexOf(stage);
  if (index === -1 || index === SUPPLY_CHAIN_STAGES.length - 1) return null;
  return SUPPLY_CHAIN_STAGES[index + 1];
}

/**
 * Get previous stage in supply chain
 */
export function getPreviousStage(stage: SupplyChainStage): SupplyChainStage | null {
  const index = SUPPLY_CHAIN_STAGES.indexOf(stage);
  if (index <= 0) return null;
  return SUPPLY_CHAIN_STAGES[index - 1];
}

/**
 * Validate stage transition
 */
export function canTransitionToStage(
  fromStage: SupplyChainStage,
  toStage: SupplyChainStage,
  role: 'farmers' | 'roasters' | 'affiliates' | 'hubs'
): boolean {
  const nextStage = getNextStage(fromStage);
  if (nextStage !== toStage) return false;
  return hasStageAccess(toStage, role, 'write-edit');
}
