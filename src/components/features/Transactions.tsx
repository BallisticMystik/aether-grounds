/**
 * Transactions Feature Component
 * Transaction management and history
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { FeatureComponentProps } from './types';
import { DollarSign, Download, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Transactions({ accessLevel, className = '' }: FeatureComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions] = useState([
    {
      id: 1,
      type: 'Payment',
      amount: '$1,250.00',
      status: 'Completed',
      date: '2024-01-25',
      direction: 'incoming',
      party: 'Roastery Central',
    },
    {
      id: 2,
      type: 'Purchase',
      amount: '$450.00',
      status: 'Pending',
      date: '2024-01-24',
      direction: 'outgoing',
      party: 'Equipment Supplier',
    },
    {
      id: 3,
      type: 'Refund',
      amount: '$125.00',
      status: 'Completed',
      date: '2024-01-23',
      direction: 'outgoing',
      party: 'Customer',
    },
    {
      id: 4,
      type: 'Payment',
      amount: '$2,100.00',
      status: 'Completed',
      date: '2024-01-22',
      direction: 'incoming',
      party: 'Premium Roasters',
    },
  ]);

  const canExport = accessLevel === 'full';
  const canView = accessLevel !== 'no';

  return (
    <FeatureWrapper featureId="transactions" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="h-8 w-8" />
              Transactions
            </h2>
            <p className="text-muted-foreground mt-2">
              Transaction history and management
            </p>
          </div>
          {canExport && (
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>

        {/* Summary Cards */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{transactions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Incoming</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$3,350.00</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Outgoing</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">$575.00</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">$2,775.00</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction List */}
        {canView && (
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {tx.direction === 'incoming' ? (
                        <ArrowDownRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">{tx.party}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          tx.direction === 'incoming' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {tx.direction === 'incoming' ? '+' : '-'}
                        {tx.amount}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                          tx.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
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
