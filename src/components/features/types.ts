/**
 * Feature Component Types
 * Types for feature components and access levels
 */

import type { AccessLevel, FeatureId } from '../../../types/rbac.types';

export interface FeatureWrapperProps {
  featureId: FeatureId;
  accessLevel: AccessLevel;
  children: React.ReactNode;
  className?: string;
}

export interface FeatureComponentProps {
  accessLevel: AccessLevel;
  className?: string;
}

export interface AccessLevelConfig {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
  showLimitedUI: boolean;
}

/**
 * Get access level configuration
 */
export function getAccessLevelConfig(accessLevel: AccessLevel): AccessLevelConfig {
  switch (accessLevel) {
    case 'full':
      return {
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canView: true,
        showLimitedUI: false,
      };
    case 'partial':
      return {
        canCreate: false,
        canEdit: true,
        canDelete: false,
        canView: true,
        showLimitedUI: true,
      };
    case 'view-only':
      return {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canView: true,
        showLimitedUI: false,
      };
    case 'no':
      return {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canView: false,
        showLimitedUI: false,
      };
  }
}
