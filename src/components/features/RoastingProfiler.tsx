/**
 * Roasting Profiler Feature Component
 * Roast profile creation and management with curve visualization
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Coffee, Plus, Edit, TrendingUp, Thermometer, Clock } from 'lucide-react';

export function RoastingProfiler({ accessLevel, className = '' }: FeatureComponentProps) {
  const [profiles] = useState([
    {
      id: 1,
      name: 'Light Roast - Ethiopian',
      temperature: '180-200°C',
      duration: '8-10 min',
      beanType: 'Ethiopian Yirgacheffe',
      curve: 'gentle',
    },
    {
      id: 2,
      name: 'Medium Roast - Colombian',
      temperature: '200-220°C',
      duration: '12-14 min',
      beanType: 'Colombian Supremo',
      curve: 'moderate',
    },
    {
      id: 3,
      name: 'Dark Roast - Sumatran',
      temperature: '220-240°C',
      duration: '15-18 min',
      beanType: 'Sumatran Mandheling',
      curve: 'aggressive',
    },
  ]);

  const canCreate = accessLevel === 'full';
  const canEdit = accessLevel === 'full' || accessLevel === 'partial';
  const canView = accessLevel !== 'no';

  return (
    <FeatureWrapper
      featureId="roasting-profiler"
      accessLevel={accessLevel}
      className={className}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Coffee className="h-8 w-8" />
              Roasting Profiler
            </h2>
            <p className="text-muted-foreground mt-2">
              {canCreate
                ? 'Create and manage roast profiles with curve visualization'
                : 'View roast profiles (Limited editing)'}
            </p>
          </div>
          {canCreate && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Profile
            </Button>
          )}
        </div>

        {/* Profile Library */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id}>
                <CardHeader>
                  <CardTitle>{profile.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Temperature: </span>
                      <span className="text-muted-foreground">{profile.temperature}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Duration: </span>
                      <span className="text-muted-foreground">{profile.duration}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Bean Type: </span>
                      <span className="text-muted-foreground">{profile.beanType}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Curve: </span>
                      <span className="text-muted-foreground capitalize">{profile.curve}</span>
                    </div>
                    {/* Roast Curve Preview */}
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    {canEdit && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                    {!canEdit && (
                      <p className="text-xs text-muted-foreground text-center">
                        View only
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Roast Curve Visualization */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle>Roast Curve Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Interactive roast curve chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Creation Form */}
        {canCreate && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Roast Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Profile Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter profile name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Temperature</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="e.g., 180°C"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Temperature</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="e.g., 220°C"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration Range</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="e.g., 12-14 min"
                  />
                </div>
                <Button>Create Profile</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
