/**
 * Dynamic Dashboard Switcher
 * Root dashboard route that injects the appropriate sub-dashboard based on role
 */

import React from 'react';
import { useRole } from '../contexts/RoleContext';
import { FarmersDashboard } from '../components/dashboards/FarmersDashboard';
import { RoastersDashboard } from '../components/dashboards/RoastersDashboard';
import { RetailersDashboard } from '../components/dashboards/RetailersDashboard';
import { HubDashboard } from '../components/dashboards/HubDashboard';
import { AffiliatesDashboard } from '../components/dashboards/AffiliatesDashboard';

export default function Dashboard() {
  const { currentRole } = useRole();

  // Role-based dashboard routing
  if (!currentRole) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please select a role to view your dashboard</p>
      </div>
    );
  }

  switch (currentRole) {
    case 'farmers':
      return <FarmersDashboard />;
    case 'roasters':
      return <RoastersDashboard />;
    case 'retailers':
      return <RetailersDashboard />;
    case 'hub-community':
      return <HubDashboard />;
    case 'affiliates-distributors':
      return <AffiliatesDashboard />;
    default:
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Unknown role: {currentRole}</p>
        </div>
      );
  }
}
