/**
 * Supply Chain Context
 * Provides current stage and stage-based access control
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { SupplyChainStage } from '../types/supply-chain.types';
import { useRole } from './RoleContext';

interface SupplyChainContextType {
  currentStage: SupplyChainStage | null;
  setCurrentStage: (stage: SupplyChainStage) => void;
  availableStages: SupplyChainStage[];
  hasStageAccess: (stage: SupplyChainStage) => boolean;
  canEditStage: (stage: SupplyChainStage) => boolean;
  canVerifyStage: (stage: SupplyChainStage) => boolean;
}

const SupplyChainContext = createContext<SupplyChainContextType | undefined>(undefined);

export function SupplyChainProvider({
  children,
  initialStage,
}: {
  children: ReactNode;
  initialStage?: SupplyChainStage;
}) {
  const { currentRole } = useRole();
  const [currentStage, setCurrentStage] = useState<SupplyChainStage | null>(
    initialStage || null
  );

  const hasStageAccess = (stage: SupplyChainStage): boolean => {
    if (!currentRole) return false;
    // Import and use the supply chain access functions
    // For now, return true for all stages (will be implemented with actual matrix)
    return true;
  };

  const canEditStage = (stage: SupplyChainStage): boolean => {
    if (!currentRole) return false;
    // Check if role has write-edit access to stage
    return hasStageAccess(stage); // Simplified for now
  };

  const canVerifyStage = (stage: SupplyChainStage): boolean => {
    if (!currentRole) return false;
    // Check if role has view-verify or write-edit access
    return hasStageAccess(stage); // Simplified for now
  };

  const availableStages: SupplyChainStage[] = [
    'farm',
    'crop',
    'bean',
    'roast',
    'brew',
    'retail',
  ];

  const value: SupplyChainContextType = {
    currentStage,
    setCurrentStage,
    availableStages,
    hasStageAccess,
    canEditStage,
    canVerifyStage,
  };

  return (
    <SupplyChainContext.Provider value={value}>{children}</SupplyChainContext.Provider>
  );
}

export function useSupplyChain(): SupplyChainContextType {
  const context = useContext(SupplyChainContext);
  if (context === undefined) {
    throw new Error('useSupplyChain must be used within a SupplyChainProvider');
  }
  return context;
}
