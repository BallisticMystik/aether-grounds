/**
 * All Farm Analytics Feature Component
 * Aggregated analytics across all farms
 */

import React from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { FeatureComponentProps } from './types';
import { BarChart3, TrendingUp, MapPin, Activity } from 'lucide-react';

export function AllFarmAnalytics({ accessLevel, className = '' }: FeatureComponentProps) {
  const isViewOnly = accessLevel === 'view-only';
  const canView = accessLevel !== 'no';

  return (
    <FeatureWrapper
      featureId="farm-analytics"
      accessLevel={accessLevel}
      className={className}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            All Farm Analytics
            {isViewOnly && (
              <span className="ml-2 px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                VIEW ONLY
              </span>
            )}
          </h2>
          <p className="text-muted-foreground mt-2">
            {isViewOnly
              ? 'Aggregated analytics across all farms (View Only)'
              : 'Comprehensive analytics across all your farms'}
          </p>
        </div>

        {/* Aggregated Metrics */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Active farms</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">45.2T</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Yield</CardTitle>
                <Activity className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1.88T</div>
                <p className="text-xs text-muted-foreground">Per farm</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">+18.5%</div>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Visualizations */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Comparative bar chart would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Yield Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Distribution chart would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Geographic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Heatmap visualization would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Trend line chart would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </FeatureWrapper>
  );
}
