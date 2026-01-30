/**
 * FeatureWrapper Component
 * Handles access level checking and renders children with appropriate restrictions
 */

import React from 'react';
import type { FeatureWrapperProps } from './types';
import { getAccessLevelConfig } from './types';
import { AccessBadge } from '../ui/AccessBadge';

export function FeatureWrapper({
  featureId,
  accessLevel,
  children,
  className = '',
}: FeatureWrapperProps) {
  const config = getAccessLevelConfig(accessLevel);

  // No access - show access denied message
  if (accessLevel === 'no') {
    return (
      <div
        className={`flex items-center justify-center p-8 bg-muted/50 rounded-lg border border-destructive/20 ${className}`}
        data-feature-id={featureId}
        data-access-level={accessLevel}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Access Denied
          </h3>
          <p className="text-sm text-muted-foreground">
            You do not have access to this feature.
          </p>
        </div>
      </div>
    );
  }

  // View-only or partial access - disable interactive elements
  const isReadOnly = accessLevel === 'view-only';
  const isPartial = accessLevel === 'partial';

  return (
    <div
      className={`feature-wrapper ${className}`}
      data-feature-id={featureId}
      data-access-level={accessLevel}
    >
      {(isReadOnly || isPartial) && (
        <div className="mb-4">
          <AccessBadge accessLevel={accessLevel} />
        </div>
      )}
      <div
        className={isReadOnly ? 'pointer-events-none select-none' : ''}
        style={
          isReadOnly
            ? {
                opacity: 0.8,
              }
            : undefined
        }
      >
        {isReadOnly
          ? React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // Disable all inputs and buttons in view-only mode
                const props: any = {
                  disabled: true,
                  readOnly: true,
                  'aria-disabled': true,
                };
                return React.cloneElement(child as React.ReactElement<any>, props);
              }
              return child;
            })
          : children}
      </div>
    </div>
  );
}
