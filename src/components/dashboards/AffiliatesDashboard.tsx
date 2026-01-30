/**
 * Affiliates/Distributors Dashboard
 * Role-specific dashboard for Affiliates and Distributors
 */

import React, { useState } from 'react';
import { Tabs } from '../ui/Tabs';

export function AffiliatesDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'supply-chain', label: 'Supply Chain', icon: '📦' },
    { id: 'traceability', label: 'Traceability', icon: '🔍' },
    { id: 'contracts', label: 'Contracts', icon: '📄' }
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Affiliates/Distributors Dashboard</h2>
        <p className="text-muted-foreground mt-2">Manage supply chain and distribution</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Active Distributions</h3>
              <p className="text-3xl font-bold text-primary">24</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Supply Partners</h3>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">This Month Volume</h3>
              <p className="text-3xl font-bold text-primary">5.2T</p>
            </div>
          </div>
        )}

        {activeTab === 'supply-chain' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Supply Chain</h3>
            <p className="text-muted-foreground">Manage supply chain operations</p>
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Traceability</h3>
            <p className="text-muted-foreground">Track products through the supply chain</p>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Contracts</h3>
            <p className="text-muted-foreground">Manage distribution contracts</p>
          </div>
        )}
      </div>
    </div>
  );
}
