# Application Architecture

This document outlines the structural pattern used for the Coffee Platform RBAC role-based dashboard system and navigation.

## Directory Structure

```
src/
├── contexts/           # Global state management
│   └── RoleContext.tsx # Centralized role state
├── pages/              # Main route components
│   ├── Landing.tsx     # Authentication/role selection
│   └── Dashboard.tsx   # Dynamic dashboard switcher
├── components/
│   ├── layout/         # Layout components
│   │   ├── AuthenticatedLayout.tsx
│   │   └── Sidebar.tsx
│   ├── dashboards/     # Role-specific dashboards
│   │   ├── FarmersDashboard.tsx
│   │   ├── RoastersDashboard.tsx
│   │   ├── HubDashboard.tsx
│   │   └── AffiliatesDashboard.tsx
│   └── ui/             # Reusable atomic components
│       ├── Tabs.tsx
│       ├── Card.tsx
│       └── Button.tsx
├── core/               # RBAC core logic
├── parsers/            # XML parsing
├── middleware/         # Express middleware
├── services/           # Service layer
├── validators/         # Validation utilities
└── App.tsx             # Main entry point
```

## 1. Core State Management (`/src/contexts/RoleContext.tsx`)

The application uses a centralized context to manage the active user role. This allows for real-time UI switching and consistent permission checking.

```typescript
interface RoleContext {
  currentRole: RoleId | null;     // farmers | roasters-retailers | hub-community | affiliates-distributors
  setCurrentRole: (role: RoleId) => void;
  availableRoles: RoleId[];
  hasRole: (role: RoleId) => boolean;
}
```

**Features:**
- Type-safe role management using `RoleId` from RBAC types
- Provides `useRole()` hook for easy access
- Manages available roles from coffee platform configuration

## 2. Layout & Routing Structure (`/src/App.tsx`)

The main entry point handles authentication and provides the layout shell.

- **Authentication Guard**: Determines if the user sees the `Landing` page or the `Authenticated Layout`.
- **Role Provider**: Wraps the internal routes to provide role context.
- **Sidebar**: A persistent navigation component that dynamically renders links based on the active role.
- **Main Content Area**: A scrollable container with consistent padding (`p-4 md:p-6`) and a max-width wrapper (`max-w-7xl`).

## 3. Dynamic Dashboard Switcher (`/src/pages/Dashboard.tsx`)

The root dashboard route acts as a traffic controller, injecting the appropriate sub-dashboard based on the role.

```tsx
export default function Dashboard() {
  const { currentRole } = useRole();

  switch (currentRole) {
    case 'farmers':
      return <FarmersDashboard />;
    case 'roasters-retailers':
      return <RoastersDashboard />;
    case 'hub-community':
      return <HubDashboard />;
    case 'affiliates-distributors':
      return <AffiliatesDashboard />;
  }
}
```

## 4. Sub-Navigation (Breadcrumbed Tabs)

Within each dashboard, a secondary navigation layer is implemented using a Tab system. This organizes domain-specific tools into logical categories.

**Tab Pattern:**
- **Overview/Primary**: Key metrics and status
- **Data/Analytics**: Specialized charts or lists
- **Management/Tools**: Action-oriented interfaces
- **External/Integrations**: Third-party data or marketplace views

**Example (Farmers Dashboard):**
- Overview: Key metrics (Total Farms, Active Devices, Yield)
- Farm Management: Farm management tools
- IoT Devices: Device monitoring
- Analytics: Farm analytics
- Transactions: Transaction history

## 5. Role-Specific Dashboards

Each role has its own dashboard component in `/src/components/dashboards/`:

### Farmers Dashboard
- Overview, Farm Management, IoT Devices, Analytics, Transactions
- Full access to farm operations

### Roasters/Retailers Dashboard
- Overview, Roasting Contracts, Roasting Profiler, Analytics, Traceability
- Full access to roasting operations

### Hub - Community Dashboard
- Overview, Community, Analytics (View Only), Marketplace
- View-only access to analytics

### Affiliates/Distributors Dashboard
- Overview, Supply Chain, Traceability, Contracts
- Full access to distribution operations

## 6. Directory Mapping

- `/src/contexts/`: Global state (Role, Theme, Auth)
- `/src/pages/`: Main route components
- `/src/components/dashboards/`: Role-specific dashboard implementations
- `/src/components/ui/`: Reusable atomic components (Tabs, Cards, Buttons)
- `/src/components/layout/`: Layout components (Sidebar, AuthenticatedLayout)
- `/src/core/`: RBAC core logic
- `/src/parsers/`: XML parsing utilities
- `/src/middleware/`: Express middleware
- `/src/services/`: Service layer
- `/src/validators/`: Validation utilities

## Integration with RBAC Framework

The frontend architecture integrates with the RBAC framework:

1. **Role Context** uses `RoleId` types from `types/rbac.types.ts`
2. **Sidebar** filters navigation based on role permissions
3. **Dashboards** are role-specific and can check permissions using RBAC hooks
4. **Future**: Will integrate with RBAC middleware for API calls

## Next Steps

- [ ] Add React Router for proper routing
- [ ] Integrate RBAC hooks (`useRBAC`, `useFeatureAccess`) from frontend agent
- [ ] Add ProtectedRoute component for route-level permissions
- [ ] Connect dashboards to backend API with RBAC middleware
- [ ] Add Tailwind CSS or similar for styling
- [ ] Implement proper authentication flow
