/**
 * Retailers Dashboard
 * Role-specific dashboard for Retailers
 */

import React, { useState } from 'react';
import { Tabs } from '../ui/Tabs';

export function RetailersDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'shop-mint', label: 'Shop/Mint', icon: '🛒' },
    { id: 'traceability', label: 'Traceability', icon: '🔍' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'transactions', label: 'Transactions', icon: '💰' }
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Retailers Dashboard</h2>
        <p className="text-muted-foreground mt-2">Manage retail operations and sales</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Total Sales</h3>
              <p className="text-3xl font-bold text-primary">$45.2K</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Products Listed</h3>
              <p className="text-3xl font-bold text-primary">127</p>
            </div>
            <div className="bg-card border border-border p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">This Month Orders</h3>
              <p className="text-3xl font-bold text-primary">342</p>
            </div>
          </div>
        )}

        {activeTab === 'shop-mint' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Shop/Mint</h3>
            <p className="text-muted-foreground">Browse and manage products in the marketplace</p>
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Traceability</h3>
            <p className="text-muted-foreground">Track products from source to customer</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Analytics</h3>
            <p className="text-muted-foreground">View sales analytics and performance metrics</p>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-card border border-border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Transactions</h3>
            <p className="text-muted-foreground">View transaction history and payments</p>
          </div>
        )}
      </div>
    </div>
  );
}
