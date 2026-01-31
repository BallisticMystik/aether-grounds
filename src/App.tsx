/**
 * Main Application Entry Point
 * Handles authentication and provides the layout shell with React Router
 */

import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider, useRole } from './contexts/RoleContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Landing } from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import type { RoleId } from '../types/rbac.types';

// Import all feature components
import {
  Profile,
  AetherIQ,
  CoffeeStudio,
  ShopMint,
  FarmManagement,
  IoTDevices,
  AllFarmAnalytics,
  SmartContractWizard,
  RoastProfile,
  RoastingContracts,
  RoastingProfiler,
  QRCerts,
  Traceability,
  SupplyChain,
  Analytics,
  AITools,
  BlockchainTools,
  Transactions,
} from './components/features';

// Store auth state in a way that persists across renders
let globalAuthState = {
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {
    globalAuthState.isAuthenticated = value;
  },
};

/**
 * Authentication Guard Component
 * Determines if user sees Landing page or Authenticated Layout
 */
export function AppContent() {
  const { isAuthenticated, user, loading } = useAuth();
  const { currentRole, setCurrentRole } = useRole();

  // Sync role from auth user
  useEffect(() => {
    if (user && user.roleId) {
      setCurrentRole(user.roleId);
    }
  }, [user, setCurrentRole]);

  // For development: allow role selection without full auth (fallback)
  const handleRoleSelect = (role: RoleId) => {
    setCurrentRole(role);
    // This is a fallback for demo purposes - real auth should use database
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" message="Loading..." />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Landing onRoleSelect={handleRoleSelect} />
          )
        }
      />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      {/* Authenticated routes - all nested under AuthenticatedLayout */}
      {isAuthenticated && (
        <>
          <Route
            path="/dashboard"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route 
              index 
              element={
                <Suspense fallback={<LoadingSpinner size="lg" message="Loading dashboard..." />}>
                  <Dashboard />
                </Suspense>
              } 
            />
          </Route>

          {/* Core Features */}
          <Route
            path="/profile"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="profile">
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/aether-iq"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="aether-iq">
                  <AetherIQ />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/coffee-studio"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="coffee-studio">
                  <CoffeeStudio />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/shop-mint"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="shop-mint">
                  <ShopMint />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Farm Operations Features */}
          <Route
            path="/farm-management"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="farm-management">
                  <FarmManagement />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/iot-devices"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="iot-devices">
                  <IoTDevices />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/farm-analytics"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="farm-analytics">
                  <AllFarmAnalytics />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Production Features */}
          <Route
            path="/smart-contract-wizard"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="smart-contract-wizard">
                  <SmartContractWizard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/roast-profile"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="roast-profile">
                  <RoastProfile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/roasting-contracts"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="roasting-contracts">
                  <RoastingContracts />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/roasting-profiler"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="roasting-profiler">
                  <RoastingProfiler />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Certification Features */}
          <Route
            path="/qr-certs"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="qr-certs">
                  <QRCerts />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/traceability"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="traceability">
                  <Traceability />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/supply-chain"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="supply-chain">
                  <SupplyChain />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Analytics Features */}
          <Route
            path="/analytics"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="analytics">
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/ai-tools"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="ai-tools">
                  <AITools />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/blockchain-tools"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="blockchain-tools">
                  <BlockchainTools />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Commerce Features */}
          <Route
            path="/transactions"
            element={<AuthenticatedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route
              index
              element={
                <ProtectedRoute featureId="transactions">
                  <Transactions />
                </ProtectedRoute>
              }
            />
          </Route>
        </>
      )}

      {/* Unauthorized page - accessible without auth */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * Root App Component
 * Wraps everything in AuthProvider, RoleProvider and BrowserRouter
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <AppContent />
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
