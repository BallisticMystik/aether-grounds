/**
 * Blockchain Tools Feature Component
 * Blockchain transaction and smart contract tools
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import {
  Link,
  Wallet,
  FileCode,
  Shield,
  Lock,
  CheckCircle2,
  ArrowRightLeft,
} from 'lucide-react';

const BLOCKCHAIN_TOOLS = [
  {
    id: 1,
    name: 'Wallet Integration',
    description: 'Connect and manage blockchain wallets',
    icon: Wallet,
    available: true,
  },
  {
    id: 2,
    name: 'Transaction Tools',
    description: 'Send and receive blockchain transactions',
    icon: ArrowRightLeft,
    available: true,
  },
  {
    id: 3,
    name: 'Smart Contract Tools',
    description: 'Deploy and interact with smart contracts',
    icon: FileCode,
    available: false, // Requires full access
  },
  {
    id: 4,
    name: 'Verification Tools',
    description: 'Verify transactions and certificates',
    icon: Shield,
    available: true,
  },
  {
    id: 5,
    name: 'Advanced Analytics',
    description: 'Blockchain data analytics and insights',
    icon: Link,
    available: false, // Requires full access
  },
];

export function BlockchainTools({ accessLevel, className = '' }: FeatureComponentProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const isFullAccess = accessLevel === 'full';
  const canUse = accessLevel === 'full' || accessLevel === 'partial';

  return (
    <FeatureWrapper
      featureId="blockchain-tools"
      accessLevel={accessLevel}
      className={className}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Link className="h-8 w-8" />
            Blockchain Tools
          </h2>
          <p className="text-muted-foreground mt-2">
            {isFullAccess
              ? 'Full access to blockchain tools and smart contracts'
              : 'Limited blockchain tools access'}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Tools</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {BLOCKCHAIN_TOOLS.filter((t) => isFullAccess || t.available).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">156</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
              <FileCode className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {isFullAccess ? '12' : 'N/A'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">89%</div>
            </CardContent>
          </Card>
        </div>

        {/* Tool Grid */}
        {canUse && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {BLOCKCHAIN_TOOLS.map((tool) => {
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
                    <CardTitle className="mt-2 text-base">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">{tool.description}</p>
                    {isLocked ? (
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        Full Access
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
                {BLOCKCHAIN_TOOLS.find((t) => t.id === selectedTool)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {BLOCKCHAIN_TOOLS.find((t) => t.id === selectedTool)?.description}
                </p>
                {!isFullAccess && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-600">
                      ⚠️ Some features require full access. Upgrade for complete functionality.
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

        {/* Transaction History */}
        {canUse && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, type: 'Transfer', amount: '0.5 ETH', status: 'Confirmed' },
                  { id: 2, type: 'Contract', amount: 'Smart Contract', status: 'Pending' },
                  { id: 3, type: 'Verification', amount: 'Certificate', status: 'Confirmed' },
                ].map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{tx.amount}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 'Confirmed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
