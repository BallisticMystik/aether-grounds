/**
 * Hub - Community Dashboard
 * Role-specific dashboard for Hubs/Community
 */

import React, { useState } from 'react';
import { Tabs } from '../ui/Tabs';

export function HubDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'community', label: 'Community', icon: '🏘️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛒' }
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Hub - Community Dashboard</h2>
        <p className="text-muted-foreground mt-2">Community hub with view access to platform analytics</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Community Members</h3>
              <p className="text-3xl font-bold text-primary">1,234</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Active Farms</h3>
              <p className="text-3xl font-bold text-primary">89</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Platform Activity</h3>
              <p className="text-3xl font-bold text-primary">High</p>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Community</h3>
            <p className="text-muted-foreground">Community features and engagement</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Analytics (View Only)</h3>
            <p className="text-muted-foreground">View platform analytics and insights</p>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Marketplace</h3>
            <p className="text-muted-foreground">Browse and shop in the marketplace</p>
          </div>
        )}
      </div>
    </div>
  );
}
