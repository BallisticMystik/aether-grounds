/**
 * AccessBadge Component
 * Visual indicator for access levels
 */

import React from 'react';
import type { AccessLevel } from '../../../types/rbac.types';
import { cn } from '@/lib/utils';

interface AccessBadgeProps {
  accessLevel: AccessLevel;
  className?: string;
}

const accessLevelConfig: Record<AccessLevel, { label: string; className: string }> = {
  full: {
    label: 'Full Access',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  partial: {
    label: 'Partial Access',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  'view-only': {
    label: 'View Only',
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  no: {
    label: 'No Access',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
};

export function AccessBadge({ accessLevel, className }: AccessBadgeProps) {
  const config = accessLevelConfig[accessLevel];

  if (accessLevel === 'no') {
    return null; // Don't show badge for no access (already shows access denied)
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
