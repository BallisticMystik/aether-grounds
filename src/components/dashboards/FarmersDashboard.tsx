/**
 * Farmers Dashboard
 * Role-specific dashboard for Farmers
 */

import React, { useState } from 'react';
import { Tabs } from '../ui/Tabs';

export function FarmersDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'farm-management', label: 'Farm Management', icon: '🚜' },
    { id: 'iot-devices', label: 'IoT Devices', icon: '📡' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'transactions', label: 'Transactions', icon: '💰' }
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Farmers Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage your farms, devices, and analytics</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Farms</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Active Devices</h3>
              <p className="text-3xl font-bold text-green-600">48</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">This Month's Yield</h3>
              <p className="text-3xl font-bold text-purple-600">2.4T</p>
            </div>
          </div>
        )}

        {activeTab === 'farm-management' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Farm Management</h3>
            <p className="text-gray-600">Farm management tools and controls</p>
          </div>
        )}

        {activeTab === 'iot-devices' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">IoT Devices</h3>
            <p className="text-gray-600">Monitor and manage IoT devices</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-600">View farm analytics and insights</p>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Transactions</h3>
            <p className="text-gray-600">View transaction history</p>
          </div>
        )}
      </div>
    </div>
  );
}
