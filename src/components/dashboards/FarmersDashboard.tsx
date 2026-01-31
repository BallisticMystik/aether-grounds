/**
 * Farmers Dashboard
 * Role-specific dashboard for Farmers
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Tractor, 
  Radio, 
  BarChart3, 
  CreditCard,
  ArrowRight,
} from 'lucide-react';

export function FarmersDashboard() {
  const quickAccessFeatures = [
    {
      title: 'Farm Management',
      description: 'Manage your farms and operations',
      path: '/farm-management',
      icon: Tractor,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    {
      title: 'IoT Devices',
      description: 'Monitor and manage IoT devices',
      path: '/iot-devices',
      icon: Radio,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Analytics',
      description: 'View farm analytics and insights',
      path: '/analytics',
      icon: BarChart3,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Transactions',
      description: 'View transaction history',
      path: '/transactions',
      icon: CreditCard,
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Farmers Dashboard</h2>
        <p className="text-muted-foreground mt-2">Manage your farms, devices, and analytics</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">Total Farms</h3>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">Active Devices</h3>
          <p className="text-3xl font-bold text-primary">48</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">This Month's Yield</h3>
          <p className="text-3xl font-bold text-primary">2.4T</p>
        </div>
      </div>

      {/* Quick Access Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="bg-card border border-border p-6 rounded-lg shadow hover:shadow-lg transition-all hover:border-primary group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
