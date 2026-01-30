/**
 * Farm Management Feature Component
 * Farm list, creation, editing, and management tools (Farmers only)
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Tractor, Plus, Edit, MapPin, TrendingUp } from 'lucide-react';

export function FarmManagement({ accessLevel, className = '' }: FeatureComponentProps) {
  const [farms] = useState([
    {
      id: 1,
      name: 'Highland Farm',
      location: 'Ethiopia, Yirgacheffe',
      size: '12 hectares',
      status: 'Active',
      yield: '2.4T',
    },
    {
      id: 2,
      name: 'Mountain View Farm',
      location: 'Colombia, Huila',
      size: '8 hectares',
      status: 'Active',
      yield: '1.8T',
    },
    {
      id: 3,
      name: 'Valley Farm',
      location: 'Guatemala, Antigua',
      size: '15 hectares',
      status: 'Harvesting',
      yield: '3.1T',
    },
  ]);

  const canCreate = accessLevel === 'full';
  const canEdit = accessLevel === 'full';

  return (
    <FeatureWrapper featureId="farm-management" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Tractor className="h-8 w-8" />
              Farm Management
            </h2>
            <p className="text-muted-foreground mt-2">
              Manage your farms, locations, and operations
            </p>
          </div>
          {canCreate && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Farm
            </Button>
          )}
        </div>

        {/* Farm Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
              <Tractor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farms.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Farms</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {farms.filter((f) => f.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hectares</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">7.3T</div>
            </CardContent>
          </Card>
        </div>

        {/* Farm List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <Card key={farm.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{farm.name}</CardTitle>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      farm.status === 'Active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {farm.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{farm.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Size: </span>
                    <span className="text-muted-foreground">{farm.size}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Yield: </span>
                    <span className="text-muted-foreground">{farm.yield}</span>
                  </div>
                  {canEdit && (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Farm
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
              <CardTitle>Create New Farm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Farm Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter farm name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Size (hectares)</label>
                  <input
                    type="number"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter size"
                  />
                </div>
                <Button>Create Farm</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
