/**
 * Hub - Community Dashboard
 * Role-specific dashboard for Hubs/Community
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BarChart3,
  ShoppingBag,
  Tractor,
  ArrowRight,
} from 'lucide-react';

export function HubDashboard() {
  const quickAccessFeatures = [
    {
      title: 'Farm Analytics',
      description: 'View farm analytics and insights (View Only)',
      path: '/farm-analytics',
      icon: Tractor,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    {
      title: 'Analytics',
      description: 'View platform analytics and insights',
      path: '/analytics',
      icon: BarChart3,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Shop/Mint',
      description: 'Browse and shop in the marketplace',
      path: '/shop-mint',
      icon: ShoppingBag,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Traceability',
      description: 'Track products through the supply chain',
      path: '/traceability',
      icon: Users,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Hub - Community Dashboard</h2>
        <p className="text-muted-foreground mt-2">Community hub with view access to platform analytics</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
