/**
 * QR Certs Feature Component
 * QR code certificate generation and management (Farmers only)
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { QrCode, Download, Plus, Eye } from 'lucide-react';

export function QRCerts({ accessLevel, className = '' }: FeatureComponentProps) {
  const [certificates] = useState([
    {
      id: 1,
      name: 'Highland Farm Certificate',
      batch: 'BATCH-2024-001',
      date: '2024-01-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Mountain View Certificate',
      batch: 'BATCH-2024-002',
      date: '2024-01-20',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Valley Farm Certificate',
      batch: 'BATCH-2024-003',
      date: '2024-01-25',
      status: 'Expired',
    },
  ]);

  const canGenerate = accessLevel === 'full';
  const canView = accessLevel !== 'no';

  return (
    <FeatureWrapper featureId="qr-certs" accessLevel={accessLevel} className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <QrCode className="h-8 w-8" />
              QR Certs
            </h2>
            <p className="text-muted-foreground mt-2">
              Generate and manage QR code certificates
            </p>
          </div>
          {canGenerate && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Certificate
            </Button>
          )}
        </div>

        {/* Certificate Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificates.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <QrCode className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {certificates.filter((c) => c.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired</CardTitle>
              <QrCode className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {certificates.filter((c) => c.status === 'Expired').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">24</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate List */}
        {canView && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        cert.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Batch: </span>
                      <span className="text-muted-foreground">{cert.batch}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Date: </span>
                      <span className="text-muted-foreground">{cert.date}</span>
                    </div>
                    {/* QR Code Preview */}
                    <div className="h-32 w-32 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                      <QrCode className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      {canGenerate && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Generation Form */}
        {canGenerate && (
          <Card>
            <CardHeader>
              <CardTitle>Generate New Certificate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Certificate Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter certificate name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Batch Number</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter batch number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
                <Button>Generate Certificate</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
