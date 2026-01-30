/**
 * Supply Chain Feature Component
 * Supply chain network visualization and management
 * Integrates with supply chain matrix for stage-based access
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Network, Edit, Plus, Users, Package, ArrowRight } from 'lucide-react';
import { SUPPLY_CHAIN_STAGES, getStageAccess } from '../../types/supply-chain.types';
import { useRole } from '../../contexts/RoleContext';

export function SupplyChain({ accessLevel, className = '' }: FeatureComponentProps) {
  const { currentRole } = useRole();
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // Supply chain stages with access indicators
  const stages = SUPPLY_CHAIN_STAGES.map((stage) => {
    if (!currentRole) return { stage, access: 'no-access' as const };
    try {
      const stageAccess = getStageAccess(
        stage,
        currentRole as 'farmers' | 'roasters' | 'affiliates' | 'hubs'
      );
      return { stage, access: stageAccess };
    } catch {
      return { stage, access: 'no-access' as const };
    }
  });

  const [nodes] = useState([
    { id: 1, name: 'Highland Farm', type: 'Farm', stage: 'farm', connections: 3 },
    { id: 2, name: 'Crop Processing', type: 'Processor', stage: 'crop', connections: 2 },
    { id: 3, name: 'Bean Quality Center', type: 'Quality', stage: 'bean', connections: 4 },
    { id: 4, name: 'Roastery Central', type: 'Roaster', stage: 'roast', connections: 5 },
    { id: 5, name: 'Brew Lab', type: 'Brewer', stage: 'brew', connections: 3 },
    { id: 6, name: 'Retail Partners', type: 'Retailer', stage: 'retail', connections: 12 },
  ]);

  const canEdit = accessLevel === 'full';
  const canView = accessLevel !== 'no';

  return (
    <FeatureWrapper featureId="supply-chain" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Network className="h-8 w-8" />
              Supply Chain
            </h2>
            <p className="text-muted-foreground mt-2">
              {canEdit
                ? 'Manage your supply chain network'
                : 'View supply chain network (Limited editing)'}
            </p>
          </div>
          {canEdit && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Node
            </Button>
          )}
        </div>

        {/* Network Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nodes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farms</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {nodes.filter((n) => n.type === 'Farm').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Roasters</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {nodes.filter((n) => n.type === 'Roaster').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {nodes.reduce((sum, n) => sum + n.connections, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supply Chain Stages */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 overflow-x-auto pb-4">
                {stages.map((stageInfo, index) => (
                  <React.Fragment key={stageInfo.stage}>
                    <div
                      className={`flex flex-col items-center min-w-[120px] cursor-pointer ${
                        selectedStage === stageInfo.stage ? 'opacity-100' : 'opacity-60'
                      }`}
                      onClick={() => setSelectedStage(stageInfo.stage)}
                    >
                      <div
                        className={`w-20 h-20 rounded-lg flex items-center justify-center border-2 ${
                          stageInfo.access === 'write-edit'
                            ? 'bg-green-500/20 border-green-500'
                            : stageInfo.access === 'view-verify'
                            ? 'bg-yellow-500/20 border-yellow-500'
                            : stageInfo.access === 'view-only'
                            ? 'bg-blue-500/20 border-blue-500'
                            : 'bg-gray-500/20 border-gray-500'
                        }`}
                      >
                        <span className="text-xs font-semibold capitalize">
                          {stageInfo.stage}
                        </span>
                      </div>
                      <p className="text-xs mt-2 text-center capitalize">{stageInfo.stage}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stageInfo.access === 'write-edit'
                          ? 'Edit'
                          : stageInfo.access === 'view-verify'
                          ? 'Verify'
                          : stageInfo.access === 'view-only'
                          ? 'View'
                          : 'No Access'}
                      </p>
                    </div>
                    {index < stages.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Network Visualization */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle>Network Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Interactive network visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Node List */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nodes.map((node) => (
              <Card key={node.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      {node.name}
                    </CardTitle>
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                      {node.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Connections: </span>
                      <span className="text-muted-foreground">{node.connections}</span>
                    </div>
                    {canEdit ? (
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Node
                      </Button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Limited editing available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Management Tools */}
        {canEdit && (
          <Card>
            <CardHeader>
              <CardTitle>Network Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto flex-col py-4">
                  <Network className="h-6 w-6 mb-2" />
                  <span>Add Connection</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Manage Partners</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4">
                  <Package className="h-6 w-6 mb-2" />
                  <span>Analyze Network</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
