/**
 * Traceability Feature Component
 * Product traceability chain visualization and tracking
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { FeatureComponentProps } from './types';
import { Search, MapPin, ArrowRight, Package, CheckCircle2 } from 'lucide-react';
import { useRole } from '../../contexts/RoleContext';
import type { SupplyChainStage } from '../../types/supply-chain.types';

export function Traceability({ accessLevel, className = '' }: FeatureComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const canSearch = accessLevel === 'full' || accessLevel === 'partial';
  const canView = accessLevel !== 'no';

  const { currentRole } = useRole();

  // Supply chain stages aligned with matrix
  const traceChain = [
    {
      id: 1,
      stage: 'Farm',
      supplyChainStage: 'farm' as const,
      location: 'Ethiopia, Yirgacheffe',
      date: '2024-01-10',
      status: 'completed',
      details: 'Harvested from Highland Farm',
      dataFlow: 'analytics-data',
    },
    {
      id: 2,
      stage: 'Crop',
      supplyChainStage: 'crop' as const,
      location: 'Local Processing Center',
      date: '2024-01-12',
      status: 'completed',
      details: 'Washed and dried',
      dataFlow: 'iot-sensor-data',
    },
    {
      id: 3,
      stage: 'Bean',
      supplyChainStage: 'bean' as const,
      location: 'Quality Center',
      date: '2024-01-13',
      status: 'completed',
      details: 'Quality graded and certified',
      dataFlow: 'quality-grading',
    },
    {
      id: 4,
      stage: 'Roast',
      supplyChainStage: 'roast' as const,
      location: 'Roastery Facility',
      date: '2024-01-15',
      status: 'completed',
      details: 'Light roast profile applied',
      dataFlow: 'roast-profiles',
    },
    {
      id: 5,
      stage: 'Brew',
      supplyChainStage: 'brew' as const,
      location: 'Brew Lab',
      date: '2024-01-18',
      status: 'in-transit',
      details: 'Brew methods documented',
      dataFlow: 'brew-methods',
    },
    {
      id: 6,
      stage: 'Retail',
      supplyChainStage: 'retail' as const,
      location: 'Coffee Shop',
      date: '2024-01-20',
      status: 'pending',
      details: 'Ready for sale',
      dataFlow: undefined,
    },
  ];

  // Get access level for each stage
  const getStageAccess = (stage: string) => {
    if (!currentRole) return 'no-access';
    // This would use the actual supply chain matrix
    // For now, return based on role
    if (stage === 'farm' && currentRole === 'farmers') return 'write-edit';
    if (stage === 'roast' && currentRole === 'roasters') return 'write-edit';
    return 'view-only';
  };

  return (
    <FeatureWrapper
      featureId="traceability"
      accessLevel={accessLevel}
      className={className}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-8 w-8" />
            Traceability
          </h2>
          <p className="text-muted-foreground mt-2">
            Track products through the supply chain
          </p>
        </div>

        {/* Search Interface */}
        {canSearch && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter batch number, QR code, or product ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Traceability Chain */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle>Product Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {traceChain.map((step, index) => {
                  const stageAccess = getStageAccess(step.supplyChainStage);
                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            step.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : step.status === 'in-transit'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Package className="h-5 w-5" />
                          )}
                        </div>
                        {index < traceChain.length - 1 && (
                          <div className="w-0.5 h-12 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{step.stage}</h3>
                              {stageAccess === 'write-edit' && (
                                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                                  Edit
                                </span>
                              )}
                              {stageAccess === 'view-verify' && (
                                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                                  Verify
                                </span>
                              )}
                              {stageAccess === 'view-only' && (
                                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                  View
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {step.location}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">{step.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{step.details}</p>
                        {step.dataFlow && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Data: {step.dataFlow.replace('-', ' ')}
                          </p>
                        )}
                        <span
                          className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                            step.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : step.status === 'in-transit'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Traceability Map */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Interactive supply chain map would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
