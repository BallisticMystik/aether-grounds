/**
 * Roasting Contracts Feature Component
 * Contract management and creation
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { FileText, Plus, Edit, CheckCircle2, Clock, XCircle } from 'lucide-react';

export function RoastingContracts({ accessLevel, className = '' }: FeatureComponentProps) {
  const [contracts] = useState([
    {
      id: 1,
      name: 'Highland Farm Roasting Contract',
      party: 'Roastery Central',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: '$45,000',
    },
    {
      id: 2,
      name: 'Mountain View Supply Agreement',
      party: 'Premium Roasters',
      status: 'Pending',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      value: '$32,000',
    },
    {
      id: 3,
      name: 'Valley Farm Contract',
      party: 'Artisan Roasters',
      status: 'Expired',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      value: '$28,000',
    },
  ]);

  const canCreate = accessLevel === 'full';
  const canEdit = accessLevel === 'full';
  const canView = accessLevel !== 'no';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Expired':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <FeatureWrapper
      featureId="roasting-contracts"
      accessLevel={accessLevel}
      className={className}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Roasting Contracts
            </h2>
            <p className="text-muted-foreground mt-2">
              {canCreate
                ? 'Manage and create roasting contracts'
                : 'View roasting contracts (Limited editing)'}
            </p>
          </div>
          {canCreate && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Contract
            </Button>
          )}
        </div>

        {/* Contract Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contracts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {contracts.filter((c) => c.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {contracts.filter((c) => c.status === 'Pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">$105K</div>
            </CardContent>
          </Card>
        </div>

        {/* Contract List */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contract.name}</CardTitle>
                    {getStatusIcon(contract.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Party: </span>
                      <span className="text-muted-foreground">{contract.party}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Value: </span>
                      <span className="text-muted-foreground">{contract.value}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Period: </span>
                      <span className="text-muted-foreground">
                        {contract.startDate} - {contract.endDate}
                      </span>
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        contract.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : contract.status === 'Pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {contract.status}
                    </span>
                    {canEdit && (
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Contract
                      </Button>
                    )}
                    {!canEdit && (
                      <p className="text-xs text-muted-foreground mt-4">
                        Limited editing available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Creation Form */}
        {canCreate && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Contract Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter contract name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contracting Party</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter party name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <input type="date" className="w-full mt-1 px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input type="date" className="w-full mt-1 px-3 py-2 border rounded-md" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Contract Value</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter value"
                  />
                </div>
                <Button>Create Contract</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
