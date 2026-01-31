/**
 * Unauthorized Access Page
 * Shown when user tries to access a feature they don't have permission for
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function Unauthorized() {
  const location = useLocation();
  const state = location.state as { featureId?: string; reason?: string; from?: Location } | null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this feature.
          </p>
          {state?.featureId && (
            <p className="text-sm text-muted-foreground">
              Feature: <span className="font-mono">{state.featureId}</span>
            </p>
          )}
          {state?.reason === 'insufficient-access' && (
            <p className="text-sm text-muted-foreground">
              Your access level is insufficient for this feature.
            </p>
          )}
          <div className="pt-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
