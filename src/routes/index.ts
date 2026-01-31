/**
 * Route Configuration
 * Centralized route definitions mapping paths to components and RBAC requirements
 */

import type { RouteConfig, RouteGroup } from './types';
import type { FeatureId } from '../../types/rbac.types';

// Route configuration array
export const routes: RouteConfig[] = [
  // Dashboard
  {
    path: '/dashboard',
    featureId: 'role-dash',
    component: 'src/pages/Dashboard',
    title: 'Dashboard',
  },
  // Core Features
  {
    path: '/profile',
    featureId: 'profile',
    component: 'src/components/features/Profile',
    title: 'Profile',
  },
  {
    path: '/aether-iq',
    featureId: 'aether-iq',
    component: 'src/components/features/AetherIQ',
    title: 'AetherIQ',
  },
  {
    path: '/coffee-studio',
    featureId: 'coffee-studio',
    component: 'src/components/features/CoffeeStudio',
    title: 'Coffee Studio',
  },
  {
    path: '/shop-mint',
    featureId: 'shop-mint',
    component: 'src/components/features/ShopMint',
    title: 'Shop/Mint',
  },
  // Farm Operations
  {
    path: '/farm-management',
    featureId: 'farm-management',
    component: 'src/components/features/FarmManagement',
    title: 'Farm Management',
  },
  {
    path: '/iot-devices',
    featureId: 'iot-devices',
    component: 'src/components/features/IoTDevices',
    title: 'IoT Devices',
  },
  {
    path: '/farm-analytics',
    featureId: 'farm-analytics',
    component: 'src/components/features/AllFarmAnalytics',
    title: 'All Farm Analytics',
  },
  // Production Features
  {
    path: '/smart-contract-wizard',
    featureId: 'smart-contract-wizard',
    component: 'src/components/features/SmartContractWizard',
    title: 'Smart Contract Wizard',
  },
  {
    path: '/roast-profile',
    featureId: 'roast-profile',
    component: 'src/components/features/RoastProfile',
    title: 'Roast Profile',
  },
  {
    path: '/roasting-contracts',
    featureId: 'roasting-contracts',
    component: 'src/components/features/RoastingContracts',
    title: 'Roasting Contracts',
  },
  {
    path: '/roasting-profiler',
    featureId: 'roasting-profiler',
    component: 'src/components/features/RoastingProfiler',
    title: 'Roasting Profiler',
  },
  // Certification Features
  {
    path: '/qr-certs',
    featureId: 'qr-certs',
    component: 'src/components/features/QRCerts',
    title: 'QR Certs',
  },
  {
    path: '/traceability',
    featureId: 'traceability',
    component: 'src/components/features/Traceability',
    title: 'Traceability',
  },
  {
    path: '/supply-chain',
    featureId: 'supply-chain',
    component: 'src/components/features/SupplyChain',
    title: 'Supply Chain',
  },
  // Analytics Features
  {
    path: '/analytics',
    featureId: 'analytics',
    component: 'src/components/features/Analytics',
    title: 'Analytics',
  },
  {
    path: '/ai-tools',
    featureId: 'ai-tools',
    component: 'src/components/features/AITools',
    title: 'AI Tools',
  },
  {
    path: '/blockchain-tools',
    featureId: 'blockchain-tools',
    component: 'src/components/features/BlockchainTools',
    title: 'Blockchain Tools',
  },
  // Commerce Features
  {
    path: '/transactions',
    featureId: 'transactions',
    component: 'src/components/features/Transactions',
    title: 'Transactions',
  },
];

/**
 * Get route configuration by path
 */
export function getRouteConfig(path: string): RouteConfig | undefined {
  return routes.find((route) => route.path === path);
}

/**
 * Get route configuration by feature ID
 */
export function getRouteByFeatureId(featureId: FeatureId): RouteConfig | undefined {
  return routes.find((route) => route.featureId === featureId);
}

/**
 * Get all routes for a specific feature category
 */
export function getRoutesByCategory(category: string): RouteConfig[] {
  // This will be enhanced when we add category mapping
  return routes.filter((route) => (route as RouteConfig & { category?: string }).category === category);
}

/**
 * Validate route configuration
 */
export function validateRouteConfig(route: RouteConfig): boolean {
  return !!(
    route.path &&
    route.featureId &&
    route.component &&
    route.path.startsWith('/')
  );
}

/**
 * Get all valid routes
 */
export function getValidRoutes(): RouteConfig[] {
  return routes.filter(validateRouteConfig);
}
