# Coffee Platform RBAC - Quick Reference

## Role IDs
- `farmers` - Farmers
- `roasters-retailers` - Roasters/Retailers
- `hub-community` - Hubs - Community
- `affiliates-distributors` - Affiliates/Distributors

## Feature IDs

### Core Features
- `profile` - Profile
- `role-dash` - Role Dashboard
- `aether-iq` - AetherIQ
- `coffee-studio` - Coffee Studio
- `shop-mint` - Shop/Mint
- `transactions` - Transactions

### Farm Operations
- `farm-management` - Farm Management
- `iot-devices` - IoT Devices

### Production & Contracts
- `smart-contract-wizard` - Smart Contract Wizard
- `roast-profile` - Roast Profile
- `roasting-profiler` - Roasting Profiler
- `roasting-contracts` - Roasting Contracts
- `blockchain-tools` - Blockchain Tools

### Certification & Traceability
- `qr-certs` - QR Certs
- `traceability` - Traceability
- `supply-chain` - Supply Chain

### Analytics & AI
- `analytics` - Analytics
- `farm-analytics` - All Farm Analytics
- `ai-tools` - AI Tools

## Access Levels
- `full` - Full Access (create, read, update, delete)
- `partial` - Partial Access (limited with restrictions)
- `view-only` - View Only (read-only)
- `no` - No Access

## Quick Permission Matrix

| Feature | Farmers | Roasters/Retailers | Hubs | Affiliates/Distributors |
|---------|---------|-------------------|------|------------------------|
| Profile | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Role Dashboard | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| AetherIQ | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Coffee Studio | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Shop/Mint | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Farm Management | ✅ Full | ⚠️ Partial | ✅ Full | ❌ No |
| IoT Devices | ✅ Full | ❌ No | ⚠️ Partial | ❌ No |
| Smart Contract Wizard | ✅ Full | ✅ Full | ✅ Full | ⚠️ Partial |
| Roast Profile | ✅ Full | - | - | - |
| Roasting Profiler | - | ✅ Full | ⚠️ Partial | ❌ No |
| Roasting Contracts | ⚠️ Partial | ✅ Full | ✅ Full | ✅ Full |
| QR Certs | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Traceability | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Supply Chain | ⚠️ Partial | ✅ Full | ✅ Full | ✅ Full |
| Analytics | ✅ Full | ✅ Full | ✅ Full | ❌ No |
| All Farm Analytics | ✅ Full | ⚠️ Partial | ✅ Full | ❌ No |
| AI Tools | ⚠️ Partial | ✅ Full | ✅ Full | ✅ Full |
| Blockchain Tools | ⚠️ Partial | ⚠️ Partial | ✅ Full | ✅ Full |
| Transactions | ✅ Full | ✅ Full | ✅ Full | ❌ No |

**Legend:**
- ✅ Full = Full Access
- ⚠️ Partial = Partial Access
- 👁️ View = View Only
- ❌ No = No Access

## Usage Examples

### TypeScript
```typescript
import { RBAC, RoleId, FeatureId } from './types/rbac.types';

const rbac = new RBAC(config);

// Check access
const permission = rbac.hasAccess('farmers', 'farm-management');
if (permission.allowed) {
  // Allow access
}

// Check full access
if (rbac.hasFullAccess('roasters-retailers', 'roasting-contracts')) {
  // Allow full operations
}

// Get all features for a role
const features = rbac.getRoleFeatures('hub-community');
```

### API Middleware
```typescript
import { createRBACMiddleware } from './utils/rbac-middleware.example';

app.get('/api/farm-management',
  createRBACMiddleware(rbac, 'farm-management', 'full'),
  farmManagementController
);
```

### React Component
```typescript
import { useFeatureAccess } from './utils/rbac-middleware.example';

function MyComponent({ userRole }) {
  const { canAccess, canWrite } = useFeatureAccess(rbac, userRole, 'analytics');
  
  if (!canAccess) return <div>Access Denied</div>;
  
  return (
    <div>
      {canWrite && <button>Edit</button>}
      <AnalyticsView />
    </div>
  );
}
```

## Connection Types
- **Purple**: Farmers, Roasters/Retailers
- **Pink**: Hubs - Community, Affiliates/Distributors
