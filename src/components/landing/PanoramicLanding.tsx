/**
 * Panoramic Landing Page
 * Desktop-optimized landing page with horizontal layouts
 * Mirrors mobile design but adapted for wide screens
 * Includes all lower sections: Chain of Custody, Capabilities, Trust & Governance, CTA
 */

import React from 'react';
import type { RoleId } from '../../types/rbac.types';
import { PanoramicHero } from './PanoramicHero';
import { AnimatedBackground } from './AnimatedBackground';
import { Footer } from './Footer';
import { ChainOfCustody } from './ChainOfCustody';
import { Capabilities } from './Capabilities';
import { TrustAndGovernance } from './TrustAndGovernance';
import { Cta } from './Cta';
import { useRole } from '../../contexts/RoleContext';

interface PanoramicLandingProps {
  onRoleSelect: (role: RoleId) => void;
}

export function PanoramicLanding({ onRoleSelect }: PanoramicLandingProps) {
  const { currentRole } = useRole();

  return (
    <div className="relative min-h-screen flex flex-col text-foreground overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col">
        <PanoramicHero onRoleSelect={onRoleSelect} currentRole={currentRole} />
        <main className="relative z-10">
          <ChainOfCustody />
          <Capabilities roleId={currentRole} />
          <TrustAndGovernance />
          <Cta />
        </main>
      </div>
      <Footer />
    </div>
  );
}
