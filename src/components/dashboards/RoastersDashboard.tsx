/**
 * Roasters/Retailers Dashboard
 * Role-specific dashboard for Roasters and Retailers
 */

import React, { useState } from 'react';
import { Tabs } from '../ui/Tabs';

export function RoastersDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'roasting-contracts', label: 'Roasting Contracts', icon: '☕' },
    { id: 'roasting-profiler', label: 'Roasting Profiler', icon: '🌡️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'traceability', label: 'Traceability', icon: '🔍' }
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Roasters/Retailers Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage roasting operations and contracts</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Active Contracts</h3>
              <p className="text-3xl font-bold text-blue-600">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Roasts This Month</h3>
              <p className="text-3xl font-bold text-green-600">156</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Quality Score</h3>
              <p className="text-3xl font-bold text-purple-600">94%</p>
            </div>
          </div>
        )}

        {activeTab === 'roasting-contracts' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Roasting Contracts</h3>
            <p className="text-gray-600">Manage your roasting contracts</p>
          </div>
        )}

        {activeTab === 'roasting-profiler' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Roasting Profiler</h3>
            <p className="text-gray-600">Configure and monitor roasting profiles</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-600">View roasting analytics and performance</p>
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Traceability</h3>
            <p className="text-gray-600">Track coffee from farm to cup</p>
          </div>
        )}
      </div>
    </div>
  );
}
