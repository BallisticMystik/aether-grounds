/**
 * Sidebar Component
 * Persistent navigation that dynamically renders links based on active role
 * Shows appropriate pages for each role based on RBAC permissions
 */

import React from 'react';
import { useRole } from '../../contexts/RoleContext';
import type { RoleId } from '../../../types/rbac.types';
import { RoleSelector } from './RoleSelector';
import {
  LayoutDashboard,
  User,
  Brain,
  Coffee,
  ShoppingBag,
  Tractor,
  Cpu,
  FileText,
  Flame,
  QrCode,
  Search,
  Network,
  Sparkles,
  Link,
  FileCheck,
  BarChart3,
  TrendingUp,
  CreditCard,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onLogout: () => void;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: RoleId[];
  category?: string;
  section?: string; // Section grouping for wireframe structure
}

// Navigation items organized by wireframe sections, based on RBAC permissions
// Only features with Full or Partial access are shown (No Access features are excluded)
const navigationItems: NavigationItem[] = [
  // Dashboard - Always first
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'core',
    section: 'dashboard',
  },

  // FARMERS SECTIONS
  // Core Section (Farmers)
  {
    label: 'Profile',
    path: '/profile',
    icon: User,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'core',
    section: 'core-farmers',
  },
  {
    label: 'AetherIQ',
    path: '/aether-iq',
    icon: Brain,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'core',
    section: 'core-farmers',
  },
  {
    label: 'Coffee Studio',
    path: '/coffee-studio',
    icon: Coffee,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'core',
    section: 'core-farmers',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    roles: ['farmers', 'roasters-retailers', 'hub-community'],
    category: 'core',
    section: 'core-farmers',
  },

  // Farm Operations Section
  {
    label: 'Farm Management',
    path: '/farm-management',
    icon: Tractor,
    roles: ['farmers', 'hub-community'],
    category: 'farm-operations',
    section: 'farm-operations',
  },
  {
    label: 'IoT Devices',
    path: '/iot-devices',
    icon: Cpu,
    roles: ['farmers', 'hub-community'],
    category: 'farm-operations',
    section: 'farm-operations',
  },
  {
    label: 'All Farm Analytics',
    path: '/farm-analytics',
    icon: TrendingUp,
    roles: ['farmers', 'roasters-retailers', 'hub-community'],
    category: 'farm-operations',
    section: 'farm-operations',
  },

  // Production Section (Farmers)
  {
    label: 'Smart Contract Wizard',
    path: '/smart-contract-wizard',
    icon: FileText,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'production',
    section: 'production-farmers',
  },
  {
    label: 'Roast Profile',
    path: '/roast-profile',
    icon: Flame,
    roles: ['farmers'],
    category: 'production',
    section: 'production-farmers',
  },

  // Certification Section (Farmers)
  {
    label: 'QR Certs',
    path: '/qr-certs',
    icon: QrCode,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'traceability',
    section: 'certification-farmers',
  },
  {
    label: 'Traceability',
    path: '/traceability',
    icon: Search,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'traceability',
    section: 'certification-farmers',
  },
  {
    label: 'Supply Chain',
    path: '/supply-chain',
    icon: Network,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'traceability',
    section: 'certification-farmers',
  },

  // Commerce Section (Farmers)
  {
    label: 'Transactions',
    path: '/transactions',
    icon: CreditCard,
    roles: ['farmers', 'roasters-retailers', 'hub-community'],
    category: 'core',
    section: 'commerce-farmers',
  },
  {
    label: 'AI Tools',
    path: '/ai-tools',
    icon: Sparkles,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'analytics',
    section: 'commerce-farmers',
  },
  {
    label: 'Shop/Mint',
    path: '/shop-mint',
    icon: ShoppingBag,
    roles: ['farmers', 'roasters-retailers', 'hub-community', 'affiliates-distributors'],
    category: 'core',
    section: 'commerce-farmers',
  },

  // ROASTERS/RETAILERS SECTIONS
  // Core Section (Roasters)
  {
    label: 'Profile',
    path: '/profile',
    icon: User,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'core-roasters',
  },
  {
    label: 'AetherIQ',
    path: '/aether-iq',
    icon: Brain,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'core-roasters',
  },
  {
    label: 'Coffee Studio',
    path: '/coffee-studio',
    icon: Coffee,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'core-roasters',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'core-roasters',
  },

  // Production Section (Roasters)
  {
    label: 'Smart Contract Wizard',
    path: '/smart-contract-wizard',
    icon: FileText,
    roles: ['roasters-retailers'],
    category: 'production',
    section: 'production-roasters',
  },
  {
    label: 'Roasting Contracts',
    path: '/roasting-contracts',
    icon: FileCheck,
    roles: ['roasters-retailers'],
    category: 'production',
    section: 'production-roasters',
  },
  {
    label: 'Roasting Profiler',
    path: '/roasting-profiler',
    icon: Flame,
    roles: ['roasters-retailers'],
    category: 'production',
    section: 'production-roasters',
  },

  // Certification Section (Roasters)
  {
    label: 'QR Certs',
    path: '/qr-certs',
    icon: QrCode,
    roles: ['roasters-retailers'],
    category: 'traceability',
    section: 'certification-roasters',
  },
  {
    label: 'Traceability',
    path: '/traceability',
    icon: Search,
    roles: ['roasters-retailers'],
    category: 'traceability',
    section: 'certification-roasters',
  },
  {
    label: 'Supply Chain',
    path: '/supply-chain',
    icon: Network,
    roles: ['roasters-retailers'],
    category: 'traceability',
    section: 'certification-roasters',
  },

  // Roast Section (Roasters)
  {
    label: 'AetherIQ',
    path: '/aether-iq',
    icon: Brain,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'roast-roasters',
  },
  {
    label: 'Coffee Studio',
    path: '/coffee-studio',
    icon: Coffee,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'roast-roasters',
  },
  {
    label: 'Shop/Mint',
    path: '/shop-mint',
    icon: ShoppingBag,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'roast-roasters',
  },
  {
    label: 'AI Tools',
    path: '/ai-tools',
    icon: Sparkles,
    roles: ['roasters-retailers'],
    category: 'analytics',
    section: 'roast-roasters',
  },
  {
    label: 'Transactions',
    path: '/transactions',
    icon: CreditCard,
    roles: ['roasters-retailers'],
    category: 'core',
    section: 'roast-roasters',
  },

  // HUBS/COMMUNITY SECTIONS
  // Core Section (Hubs)
  {
    label: 'Profile',
    path: '/profile',
    icon: User,
    roles: ['hub-community'],
    category: 'core',
    section: 'core-hubs',
  },
  {
    label: 'AetherIQ',
    path: '/aether-iq',
    icon: Brain,
    roles: ['hub-community'],
    category: 'core',
    section: 'core-hubs',
  },
  {
    label: 'Coffee Studio',
    path: '/coffee-studio',
    icon: Coffee,
    roles: ['hub-community'],
    category: 'core',
    section: 'core-hubs',
  },
  {
    label: 'Shop/Mint',
    path: '/shop-mint',
    icon: ShoppingBag,
    roles: ['hub-community'],
    category: 'core',
    section: 'core-hubs',
  },

  // View Only Section (Hubs)
  {
    label: 'All Farm Analytics',
    path: '/farm-analytics',
    icon: TrendingUp,
    roles: ['hub-community'],
    category: 'farm-operations',
    section: 'view-only-hubs',
  },
  {
    label: 'Smart Contract Wizard',
    path: '/smart-contract-wizard',
    icon: FileText,
    roles: ['hub-community'],
    category: 'production',
    section: 'view-only-hubs',
  },
  {
    label: 'QR Certs',
    path: '/qr-certs',
    icon: QrCode,
    roles: ['hub-community'],
    category: 'traceability',
    section: 'view-only-hubs',
  },
  {
    label: 'Farm Management',
    path: '/farm-management',
    icon: Tractor,
    roles: ['hub-community'],
    category: 'farm-operations',
    section: 'view-only-hubs',
  },
  {
    label: 'IoT Devices',
    path: '/iot-devices',
    icon: Cpu,
    roles: ['hub-community'],
    category: 'farm-operations',
    section: 'view-only-hubs',
  },
  {
    label: 'Roasting Contracts',
    path: '/roasting-contracts',
    icon: FileCheck,
    roles: ['hub-community'],
    category: 'production',
    section: 'view-only-hubs',
  },
  {
    label: 'Roasting Profiler',
    path: '/roasting-profiler',
    icon: Flame,
    roles: ['hub-community'],
    category: 'production',
    section: 'view-only-hubs',
  },
  {
    label: 'Traceability',
    path: '/traceability',
    icon: Search,
    roles: ['hub-community'],
    category: 'traceability',
    section: 'view-only-hubs',
  },
  {
    label: 'Supply Chain',
    path: '/supply-chain',
    icon: Network,
    roles: ['hub-community'],
    category: 'traceability',
    section: 'view-only-hubs',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    roles: ['hub-community'],
    category: 'analytics',
    section: 'view-only-hubs',
  },
  {
    label: 'AI Tools',
    path: '/ai-tools',
    icon: Sparkles,
    roles: ['hub-community'],
    category: 'analytics',
    section: 'view-only-hubs',
  },
  {
    label: 'Blockchain Tools',
    path: '/blockchain-tools',
    icon: Link,
    roles: ['hub-community'],
    category: 'production',
    section: 'view-only-hubs',
  },
  {
    label: 'Transactions',
    path: '/transactions',
    icon: CreditCard,
    roles: ['hub-community'],
    category: 'core',
    section: 'view-only-hubs',
  },

  // AFFILIATES/DISTRIBUTORS SECTIONS
  {
    label: 'Profile',
    path: '/profile',
    icon: User,
    roles: ['affiliates-distributors'],
    category: 'core',
    section: 'core-affiliates',
  },
  {
    label: 'AetherIQ',
    path: '/aether-iq',
    icon: Brain,
    roles: ['affiliates-distributors'],
    category: 'core',
    section: 'core-affiliates',
  },
  {
    label: 'Coffee Studio',
    path: '/coffee-studio',
    icon: Coffee,
    roles: ['affiliates-distributors'],
    category: 'core',
    section: 'core-affiliates',
  },
  {
    label: 'Shop/Mint',
    path: '/shop-mint',
    icon: ShoppingBag,
    roles: ['affiliates-distributors'],
    category: 'core',
    section: 'core-affiliates',
  },
  {
    label: 'Smart Contract Wizard',
    path: '/smart-contract-wizard',
    icon: FileText,
    roles: ['affiliates-distributors'],
    category: 'production',
    section: 'production-affiliates',
  },
  {
    label: 'Blockchain Tools',
    path: '/blockchain-tools',
    icon: Link,
    roles: ['affiliates-distributors'],
    category: 'production',
    section: 'production-affiliates',
  },
  {
    label: 'Roasting Contracts',
    path: '/roasting-contracts',
    icon: FileCheck,
    roles: ['affiliates-distributors'],
    category: 'production',
    section: 'production-affiliates',
  },
  {
    label: 'QR Certs',
    path: '/qr-certs',
    icon: QrCode,
    roles: ['affiliates-distributors'],
    category: 'traceability',
    section: 'certification-affiliates',
  },
  {
    label: 'Traceability',
    path: '/traceability',
    icon: Search,
    roles: ['affiliates-distributors'],
    category: 'traceability',
    section: 'certification-affiliates',
  },
  {
    label: 'Supply Chain',
    path: '/supply-chain',
    icon: Network,
    roles: ['affiliates-distributors'],
    category: 'traceability',
    section: 'certification-affiliates',
  },
  {
    label: 'AI Tools',
    path: '/ai-tools',
    icon: Sparkles,
    roles: ['affiliates-distributors'],
    category: 'analytics',
    section: 'analytics-affiliates',
  },
];

// Section labels for wireframe structure
const sectionLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  'core-farmers': 'Core Section',
  'farm-operations': 'Farm Operations Section',
  'production-farmers': 'Production Section',
  'certification-farmers': 'Certification Section',
  'commerce-farmers': 'Commerce Section',
  'core-roasters': 'Core Section',
  'production-roasters': 'Production Section',
  'certification-roasters': 'Certification Section',
  'roast-roasters': 'Roast Section',
  'core-hubs': 'Core Section',
  'view-only-hubs': 'View Only Section',
  'core-affiliates': 'Core Section',
  'production-affiliates': 'Production Section',
  'certification-affiliates': 'Certification Section',
  'analytics-affiliates': 'Analytics Section',
};

export function Sidebar({ onLogout }: SidebarProps) {
  const { currentRole } = useRole();
  const [activePath, setActivePath] = React.useState<string>('/dashboard');

  // Filter navigation items based on current role
  const visibleItems = navigationItems.filter(
    (item) => currentRole && item.roles.includes(currentRole)
  );

  // Separate Dashboard from other items
  const dashboardItem = visibleItems.find((item) => item.path === '/dashboard');
  const otherItems = visibleItems.filter((item) => item.path !== '/dashboard');

  // Group items by section (wireframe structure)
  const groupedItems = otherItems.reduce(
    (acc, item) => {
      const section = item.section || 'other';
      if (!acc[section]) {
        acc[section] = [];
      }
      // Avoid duplicates (same path in different sections)
      if (!acc[section].find((i) => i.path === item.path)) {
        acc[section].push(item);
      }
      return acc;
    },
    {} as Record<string, NavigationItem[]>
  );

  // Handle navigation click
  const handleNavClick = (path: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActivePath(path);
    // TODO: Implement actual routing when React Router is added
    console.log('Navigate to:', path);
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Logo/Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Aether Grounds</h1>
        <p className="text-sm text-muted-foreground mt-1">Coffee Platform</p>
      </div>

      {/* Role Selector */}
      <div className="p-4 border-b border-border">
        <RoleSelector />
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Dashboard - Always First */}
        {dashboardItem && (
          <div className="space-y-2 mb-6">
            {(() => {
              const Icon = dashboardItem.icon;
              const isActive = activePath === dashboardItem.path;
              return (
                <a
                  href={dashboardItem.path}
                  onClick={(e) => handleNavClick(dashboardItem.path, e)}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{dashboardItem.label}</span>
                </a>
              );
            })()}
          </div>
        )}

        {/* Other Navigation Items - Grouped by Section (Wireframe Structure) */}
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="space-y-2">
            {section !== 'other' && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                {sectionLabels[section] || section}
              </h3>
            )}
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.path;
              return (
                <a
                  key={`${section}-${item.path}`}
                  href={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer/Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
