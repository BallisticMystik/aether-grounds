/**
 * Roasters Dashboard
 * Role-specific dashboard for Roasters
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Thermometer, 
  BarChart3, 
  Search,
  ArrowRight,
} from 'lucide-react';

export function RoastersDashboard() {
  const quickAccessFeatures = [
    {
      title: 'Roasting Contracts',
      description: 'Manage your roasting contracts',
      path: '/roasting-contracts',
      icon: FileText,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Roasting Profiler',
      description: 'Configure and monitor roasting profiles',
      path: '/roasting-profiler',
      icon: Thermometer,
      color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    {
      title: 'Analytics',
      description: 'View roasting analytics and performance',
      path: '/analytics',
      icon: BarChart3,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Traceability',
      description: 'Track coffee from farm to cup',
      path: '/traceability',
      icon: Search,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Roasters Dashboard</h2>
        <p className="text-muted-foreground mt-2">Manage roasting operations and contracts</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">Active Contracts</h3>
          <p className="text-3xl font-bold text-primary">8</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">Roasts This Month</h3>
          <p className="text-3xl font-bold text-primary">156</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">Quality Score</h3>
          <p className="text-3xl font-bold text-primary">94%</p>
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
