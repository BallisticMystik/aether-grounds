/**
 * Role Dashboard Feature Component
 * Displays role-specific dashboard with key metrics and overview
 */

import React from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRole } from '../../contexts/RoleContext';
import type { FeatureComponentProps } from './types';
import { LayoutDashboard, TrendingUp, Activity, DollarSign } from 'lucide-react';

export function RoleDashboard({ accessLevel, className = '' }: FeatureComponentProps) {
  const { currentRole } = useRole();

  // Role-specific metrics (mock data - would come from API)
  const getRoleMetrics = () => {
    switch (currentRole) {
      case 'farmers':
        return {
          title: 'Farmers Dashboard',
          metrics: [
            { label: 'Total Farms', value: '12', icon: Activity, color: 'text-blue-600' },
            { label: 'Active Devices', value: '48', icon: Activity, color: 'text-green-600' },
            { label: 'Monthly Yield', value: '2.4T', icon: TrendingUp, color: 'text-purple-600' },
            { label: 'Revenue', value: '$45.2K', icon: DollarSign, color: 'text-yellow-600' },
          ],
        };
      case 'roasters':
        return {
          title: 'Roasters Dashboard',
          metrics: [
            { label: 'Active Contracts', value: '8', icon: Activity, color: 'text-blue-600' },
            { label: 'Roasts This Month', value: '156', icon: TrendingUp, color: 'text-green-600' },
            { label: 'Revenue', value: '$89.5K', icon: DollarSign, color: 'text-purple-600' },
            { label: 'Customers', value: '234', icon: Activity, color: 'text-yellow-600' },
          ],
        };
      case 'retailers':
        return {
          title: 'Retailers Dashboard',
          metrics: [
            { label: 'Total Sales', value: '$45.2K', icon: DollarSign, color: 'text-blue-600' },
            { label: 'Products Listed', value: '127', icon: Activity, color: 'text-green-600' },
            { label: 'This Month Orders', value: '342', icon: TrendingUp, color: 'text-purple-600' },
            { label: 'Active Customers', value: '189', icon: Activity, color: 'text-yellow-600' },
          ],
        };
      case 'hub-community':
        return {
          title: 'Hub - Community Dashboard',
          metrics: [
            { label: 'Community Members', value: '1.2K', icon: Activity, color: 'text-blue-600' },
            { label: 'Active Projects', value: '24', icon: TrendingUp, color: 'text-green-600' },
            { label: 'Transactions', value: '456', icon: DollarSign, color: 'text-purple-600' },
            { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-yellow-600' },
          ],
        };
      case 'affiliates-distributors':
        return {
          title: 'Affiliates/Distributors Dashboard',
          metrics: [
            { label: 'Distribution Points', value: '18', icon: Activity, color: 'text-blue-600' },
            { label: 'Products Shipped', value: '892', icon: TrendingUp, color: 'text-green-600' },
            { label: 'Revenue', value: '$125.3K', icon: DollarSign, color: 'text-purple-600' },
            { label: 'Partners', value: '67', icon: Activity, color: 'text-yellow-600' },
          ],
        };
      default:
        return {
          title: 'Dashboard',
          metrics: [],
        };
    }
  };

  const { title, metrics } = getRoleMetrics();

  return (
    <FeatureWrapper featureId="role-dash" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8" />
            {title}
          </h2>
          <p className="text-muted-foreground mt-2">
            Overview and key metrics for your role
          </p>
        </div>

        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.label}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dashboard activity and updates will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </FeatureWrapper>
  );
}
