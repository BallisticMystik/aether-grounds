# Role Features Implementation Sidechain

## Usage
When you want to implement all role-based features, use:
```
cursor_sidechain implement-role-features
```

## What It Does
This sidechain will:
1. Load the task list from `ROLE-FEATURES-TASKS.md`
2. Load the JSON prompt chain from `ROLE-FEATURES-PROMPTS.json`
3. Execute all 43 tasks in sequence following TDD principles
4. Implement all features for all 4 roles based on the Coffee Platform Roles mind map
5. Validate access levels match XML configuration
6. Generate complete feature components with tests, documentation, and examples

## Execution Flow

### Phase 1: Core Feature Components & Tests (Tasks 1-6)
- Create feature component structure
- Implement shared features: Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint

### Phase 2: Farmers-Specific Features (Tasks 7-19)
- Implement all 15 features for Farmers role
- Include partial access features: Supply Chain, AI Tools, Blockchain Tools, Roasting Contracts

### Phase 3: Roasters/Retailers Features (Tasks 20-22)
- Implement Roasting Profiler
- Update Roasters Dashboard with all 12 features
- Implement access level restrictions

### Phase 4: Hubs - Community Features (Tasks 23-24)
- Update Hub Dashboard with all 8 features
- Implement view-only access restrictions and UI indicators
- 3 features marked as VIEW ONLY: All Farm Analytics, Smart Contract Wizard, QR Certs

### Phase 5: Affiliates/Distributors Features (Tasks 25)
- Update Affiliates Dashboard with all 12 features
- Implement access restrictions (no access to: Farm Management, IoT Devices, Roasting Profiler, Analytics)

### Phase 6: Dashboard Integration & RBAC (Tasks 26-30)
- Create feature mapping utility from XML to components
- Integrate RBAC access level checking
- Update all dashboards to dynamically show features
- Implement feature access indicators (badges)
- Add feature-level permission checks

### Phase 7: UI/UX Enhancements (Tasks 31-34)
- Create feature icon mapping
- Implement feature grouping/categorization
- Add feature search/filter functionality
- Implement responsive layouts

### Phase 8: Testing & Validation (Tasks 35-39)
- Write integration tests for role-based feature access
- Write E2E tests for feature navigation
- Validate all access levels match XML configuration
- Test feature visibility based on role switching
- Performance testing

### Phase 9: Documentation (Tasks 40-43)
- Document feature component API
- Create feature usage examples per role
- Update architecture documentation
- Create feature access matrix visualization

## Features by Role

### Farmers (Purple Connection) - 15 Features
- Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint
- Farm Management, IoT Devices, Smart Contract Wizard, Roast Profile
- QR Certs (cert suite), Traceability
- Supply Chain (partial), AI Tools (partial), Blockchain Tools (partial), Roasting Contracts (partial)
- Analytics, All Farm Analytics, Transactions

### Roasters/Retailers (Purple Connection) - 12 Features
- Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint
- Smart Contract Wizard, Roasting Contracts, Roasting Profiler
- QR Certs, Traceability, Supply Chain, AI Tools
- Analytics, Transactions
- All Farm Analytics (partial), Farm Management (partial), Blockchain Tools (partial)
- IoT Devices (no access)

### Hubs - Community (Pink Connection) - 8 Features
- Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint
- All Farm Analytics (VIEW ONLY)
- Smart Contract Wizard (VIEW ONLY)
- QR Certs (VIEW ONLY)

### Affiliates/Distributors (Pink Connection) - 12 Features
- Profile, Role Dashboard, Smart Contract Wizard, Blockchain Tools
- Roasting Contracts, QR Certs, Traceability, Supply Chain
- AI Tools, AetherIQ, Coffee Studio, Shop/Mint
- Farm Management (no access), IoT Devices (no access)
- Roasting Profiler (no access), Analytics (no access)

## Task Execution Rules
- ✅ Each task must have tests written first (TDD)
- ✅ All tests must pass before proceeding
- ✅ Access levels must match coffee-platform-roles.xml
- ✅ Components must be reusable and type-safe
- ✅ Follow existing dashboard tab pattern
- ✅ Maintain >80% test coverage
- ✅ View-only features must have clear UI indicators
- ✅ Partial access features must show limited functionality

## Output
Upon completion, you'll have:
- Complete feature components for all roles
- Full test suite (>80% coverage)
- RBAC-integrated access control
- Dynamic dashboard generation
- Feature access indicators
- Comprehensive documentation
- Usage examples per role
- Feature access matrix
- Production-ready code

## Quick Start
```bash
# Review the tasks
cat ROLE-FEATURES-TASKS.md

# Review the prompts
cat ROLE-FEATURES-PROMPTS.json

# Execute (after approval)
# The system will process each task in sequence
```

## Access Levels
- **Full**: Complete access, can create/edit/delete
- **Partial**: Limited access, some actions restricted
- **View Only**: Read-only access, no editing capabilities
- **No**: Feature not accessible to role

## Notes
- All features are defined in `coffee-platform-roles.xml`
- Feature components use `FeatureWrapper` for access control
- Dashboards dynamically generate tabs based on role
- Access levels are enforced at component level
- View-only features show clear visual indicators
