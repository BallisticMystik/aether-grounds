/**
 * Coffee Studio Feature Component
 * Coffee profile management and creation tools
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Coffee, Plus, Edit, Image as ImageIcon } from 'lucide-react';

export function CoffeeStudio({ accessLevel, className = '' }: FeatureComponentProps) {
  const [profiles] = useState([
    { id: 1, name: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', roast: 'Light' },
    { id: 2, name: 'Colombian Supremo', origin: 'Colombia', roast: 'Medium' },
    { id: 3, name: 'Sumatran Mandheling', origin: 'Indonesia', roast: 'Dark' },
  ]);

  const canCreate = accessLevel === 'full';
  const canEdit = accessLevel === 'full' || accessLevel === 'partial';

  return (
    <FeatureWrapper featureId="coffee-studio" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Coffee className="h-8 w-8" />
              Coffee Studio
            </h2>
            <p className="text-muted-foreground mt-2">
              Manage and create coffee profiles
            </p>
          </div>
          {canCreate && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Profile
            </Button>
          )}
        </div>

        {/* Profile Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Origin: </span>
                    <span className="text-muted-foreground">{profile.origin}</span>
                  </div>
                  <div>
                    <span className="font-medium">Roast: </span>
                    <span className="text-muted-foreground">{profile.roast}</span>
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

        {/* Creation Form (if full access) */}
        {canCreate && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Coffee Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Coffee Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter coffee name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Origin</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter origin"
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
