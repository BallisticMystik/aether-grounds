/**
 * AI Tools Feature Component
 * AI-powered tools dashboard with usage restrictions
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { Brain, Sparkles, Zap, BarChart3, Lock } from 'lucide-react';

const AI_TOOLS = [
  {
    id: 1,
    name: 'Predictive Analytics',
    description: 'Forecast yield and market trends',
    icon: BarChart3,
    available: true,
  },
  {
    id: 2,
    name: 'Quality Assessment',
    description: 'AI-powered coffee quality analysis',
    icon: Sparkles,
    available: true,
  },
  {
    id: 3,
    name: 'Smart Recommendations',
    description: 'Get AI recommendations for operations',
    icon: Brain,
    available: true,
  },
  {
    id: 4,
    name: 'Advanced Modeling',
    description: 'Complex AI models and simulations',
    icon: Zap,
    available: false, // Requires full access
  },
];

export function AITools({ accessLevel, className = '' }: FeatureComponentProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const isFullAccess = accessLevel === 'full';
  const isPartialAccess = accessLevel === 'partial';
  const canUse = isFullAccess || isPartialAccess;

  return (
    <FeatureWrapper featureId="ai-tools" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8" />
            AI Tools
          </h2>
          <p className="text-muted-foreground mt-2">
            {isPartialAccess
              ? 'AI tools with limited functionality'
              : 'Access powerful AI tools and analytics'}
          </p>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Tools</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {AI_TOOLS.filter((t) => isFullAccess || t.available).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {isPartialAccess ? '12' : '48'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quota Remaining</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {isPartialAccess ? '88/100' : 'Unlimited'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Access Level</CardTitle>
              <Sparkles className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {isFullAccess ? 'Full' : 'Partial'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tool Grid */}
        {canUse && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AI_TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isAvailable = isFullAccess || tool.available;
              const isLocked = !isAvailable;

              return (
                <Card
                  key={tool.id}
                  className={isLocked ? 'opacity-60' : 'cursor-pointer hover:border-primary'}
                  onClick={() => !isLocked && setSelectedTool(tool.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6" />
                      {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <CardTitle className="mt-2">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    {isLocked ? (
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        Requires Full Access
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        Use Tool
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Selected Tool Interface */}
        {selectedTool && canUse && (
          <Card>
            <CardHeader>
              <CardTitle>
                {AI_TOOLS.find((t) => t.id === selectedTool)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {AI_TOOLS.find((t) => t.id === selectedTool)?.description}
                </p>
                {isPartialAccess && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-600">
                      ⚠️ Limited functionality available with partial access. Upgrade to full
                      access for advanced features.
                    </p>
                  </div>
                )}
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Tool interface would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
