/**
 * IoT Devices Feature Component
 * Device monitoring and management (Farmers only)
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Radio, Activity, Wifi, WifiOff, Settings } from 'lucide-react';

export function IoTDevices({ accessLevel, className = '' }: FeatureComponentProps) {
  const [devices] = useState([
    {
      id: 1,
      name: 'Soil Sensor 01',
      type: 'Soil Moisture',
      status: 'online',
      location: 'Highland Farm - Field A',
      lastUpdate: '2 min ago',
      value: '45%',
    },
    {
      id: 2,
      name: 'Weather Station 01',
      type: 'Weather',
      status: 'online',
      location: 'Highland Farm - Center',
      lastUpdate: '1 min ago',
      value: '22°C',
    },
    {
      id: 3,
      name: 'Irrigation Controller 01',
      type: 'Irrigation',
      status: 'offline',
      location: 'Mountain View Farm',
      lastUpdate: '15 min ago',
      value: 'Inactive',
    },
    {
      id: 4,
      name: 'Temperature Sensor 01',
      type: 'Temperature',
      status: 'online',
      location: 'Valley Farm',
      lastUpdate: '30 sec ago',
      value: '24°C',
    },
  ]);

  const canManage = accessLevel === 'full';

  return (
    <FeatureWrapper featureId="iot-devices" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Radio className="h-8 w-8" />
            IoT Devices
          </h2>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your IoT devices
          </p>
        </div>

        {/* Device Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
              <Radio className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
              <Wifi className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {devices.filter((d) => d.status === 'online').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
              <WifiOff className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {devices.filter((d) => d.status === 'offline').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Monitoring</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {devices.filter((d) => d.status === 'online').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="h-5 w-5" />
                    {device.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {device.status === 'online' ? (
                      <Wifi className="h-4 w-4 text-green-600" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        device.status === 'online'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {device.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Type: </span>
                    <span className="text-muted-foreground">{device.type}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Location: </span>
                    <span className="text-muted-foreground">{device.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Current Value: </span>
                    <span className="text-muted-foreground">{device.value}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Last Update: </span>
                    <span className="text-muted-foreground">{device.lastUpdate}</span>
                  </div>
                  {canManage && (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Device
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real-time Telemetry Dashboard */}
        {canManage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Real-time device telemetry charts would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
