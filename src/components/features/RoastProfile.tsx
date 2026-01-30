/**
 * Roast Profile Feature Component
 * Roast profile management and creation (Farmers only)
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Coffee, Plus, Edit, Thermometer, Clock } from 'lucide-react';

export function RoastProfile({ accessLevel, className = '' }: FeatureComponentProps) {
  const [profiles] = useState([
    {
      id: 1,
      name: 'Light Roast Profile',
      temperature: '180°C',
      duration: '8 min',
      beanType: 'Ethiopian Yirgacheffe',
    },
    {
      id: 2,
      name: 'Medium Roast Profile',
      temperature: '200°C',
      duration: '12 min',
      beanType: 'Colombian Supremo',
    },
    {
      id: 3,
      name: 'Dark Roast Profile',
      temperature: '220°C',
      duration: '15 min',
      beanType: 'Sumatran Mandheling',
    },
  ]);

  const canCreate = accessLevel === 'full';
  const canEdit = accessLevel === 'full';

  return (
    <FeatureWrapper featureId="roast-profile" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Coffee className="h-8 w-8" />
              Roast Profile
            </h2>
            <p className="text-muted-foreground mt-2">
              Manage roast profiles and parameters
            </p>
          </div>
          {canCreate && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Profile
            </Button>
          )}
        </div>

        {/* Profile List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                  {canEdit && (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Creation Form */}
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
                    <label className="text-sm font-medium">Temperature</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="e.g., 200°C"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="e.g., 12 min"
                    />
                  </div>
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
