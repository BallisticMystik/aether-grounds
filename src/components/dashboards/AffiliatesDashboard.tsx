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
        <h2 className="text-3xl font-bold text-gray-900">Affiliates/Distributors Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage supply chain and distribution</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Active Distributions</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Supply Partners</h3>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">This Month Volume</h3>
              <p className="text-3xl font-bold text-purple-600">5.2T</p>
            </div>
          </div>
        )}

        {activeTab === 'supply-chain' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Supply Chain</h3>
            <p className="text-gray-600">Manage supply chain operations</p>
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Traceability</h3>
            <p className="text-gray-600">Track products through the supply chain</p>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Contracts</h3>
            <p className="text-gray-600">Manage distribution contracts</p>
          </div>
        )}
      </div>
    </div>
  );
}
