/**
 * Landing Page
 * Beautiful landing page with animations and effects
 * Shown when user is not authenticated
 * Supports both standard and panoramic (desktop) views
 */

import React, { useState, useEffect } from 'react';
import type { RoleId } from '../../types/rbac.types';
import {
  AnimatedBackground,
  ChainOfCustody,
  Cta,
  Footer,
  Header,
  Hero,
  TrustAndGovernance,
  PanoramicLanding,
} from '../components/landing';
import { Capabilities } from '../components/landing/Capabilities';
import { useRole } from '../contexts/RoleContext';

interface LandingProps {
  onRoleSelect: (role: RoleId) => void;
  usePanoramic?: boolean; // Force panoramic view
}

export function Landing({ onRoleSelect, usePanoramic }: LandingProps) {
  const { currentRole } = useRole();
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop/panoramic view
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Use panoramic view if explicitly requested or on desktop
  if (usePanoramic || (isDesktop && !usePanoramic)) {
    return <PanoramicLanding onRoleSelect={onRoleSelect} />;
  }

  // Standard mobile/tablet view
  return (
    <>
      <div className="flex min-h-screen flex-col text-foreground">
        <AnimatedBackground />
        <Header />
        <main className="relative z-10 flex-grow">
          <Hero currentRole={currentRole} onRoleSelect={onRoleSelect} />
          <ChainOfCustody />
          <Capabilities roleId={currentRole} />
          <TrustAndGovernance />
          <Cta />
        </main>
        <Footer />
      </div>
    </>
  );
}
