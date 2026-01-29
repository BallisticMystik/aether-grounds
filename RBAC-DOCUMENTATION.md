# Coffee Platform RBAC Documentation

## Overview
This documentation describes the Role-Based Access Control (RBAC) framework for the Coffee Platform, including XML configuration and Mermaid ERD diagrams.

## Files

### 1. `coffee-platform-roles.xml`
The main XML configuration file that defines:
- **Roles**: Farmers, Roasters/Retailers, Hubs - Community, Affiliates/Distributors
- **Features**: All platform features organized by category
- **Access Levels**: Full Access, Partial Access, View Only, No Access
- **Categories**: Core, Farm Operations, Production & Contracts, Certification & Traceability, Analytics & AI
- **Connection Types**: Pink (left-side roles) and Purple (right-side roles)

### 2. `coffee-platform-rbac-erd.mmd`
A traditional Entity-Relationship Diagram (ERD) showing the database structure:
- **Entities**: ROLES, FEATURES, CATEGORIES, ACCESS_LEVELS, CONNECTION_TYPES
- **Relationships**: Many-to-many relationship between ROLES and FEATURES through ROLE_FEATURE_ACCESS junction table
- **Foreign Keys**: Properly defined relationships between all entities

### 3. `coffee-platform-access-matrix.mmd`
A visual access matrix diagram showing:
- All roles and their connection types (color-coded)
- All features organized by category (color-coded)
- Access level relationships between roles and features
- Visual representation of the complete RBAC matrix

## Access Levels

| Access Level | Description |
|-------------|-------------|
| **Full Access** | Complete access to create, read, update, and delete |
| **Partial Access** | Limited access with restrictions |
| **View Only** | Read-only access, no modifications allowed |
| **No Access** | Feature not accessible to this role |

## Feature Categories

1. **Core** - Essential platform features available to all roles
   - Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint, Transactions

2. **Farm Operations** - Features specific to farm management
   - Farm Management, IoT Devices

3. **Production & Contracts** - Production and contract management
   - Smart Contract Wizard, Roast Profile, Roasting Profiler, Roasting Contracts, Blockchain Tools

4. **Certification & Traceability** - Certification and supply chain
   - QR Certs, Traceability, Supply Chain

5. **Analytics & AI** - Analytics and artificial intelligence tools
   - Analytics, All Farm Analytics, AI Tools

## Role Summary

### Farmers (Purple Connection)
- **Full Access**: Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint, Farm Management, IoT Devices, Smart Contract Wizard, Roast Profile, QR Certs, Traceability, Analytics, All Farm Analytics, Transactions
- **Partial Access**: Supply Chain, AI Tools, Blockchain Tools, Roasting Contracts

### Roasters/Retailers (Purple Connection)
- **Full Access**: Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint, Smart Contract Wizard, Roasting Profiler, Roasting Contracts, QR Certs, Traceability, Supply Chain, AI Tools, Analytics, Transactions
- **Partial Access**: Farm Management, All Farm Analytics, Blockchain Tools
- **No Access**: IoT Devices

### Hubs - Community (Pink Connection)
- **Full Access**: Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint, Roasting Contracts, QR Certs, Traceability, Supply Chain, AI Tools, Blockchain Tools, Smart Contract Wizard, Analytics, All Farm Analytics, Transactions, Farm Management
- **Partial Access**: IoT Devices, Roasting Profiler

### Affiliates/Distributors (Pink Connection)
- **Full Access**: Profile, Role Dashboard, AetherIQ, Coffee Studio, Shop/Mint, Roasting Contracts, QR Certs, Traceability, Supply Chain, AI Tools, Blockchain Tools
- **Partial Access**: Smart Contract Wizard
- **No Access**: Farm Management, IoT Devices, Roasting Profiler, Analytics, All Farm Analytics, Transactions

## Using the Diagrams

### Viewing Mermaid Diagrams
1. Use a Mermaid-compatible viewer:
   - [Mermaid Live Editor](https://mermaid.live/)
   - VS Code with Mermaid extension
   - GitHub/GitLab (renders automatically in markdown)

### ERD Diagram (`coffee-platform-rbac-erd.mmd`)
Use this for:
- Database schema design
- Understanding entity relationships
- SQL table creation
- Data modeling

### Access Matrix Diagram (`coffee-platform-access-matrix.mmd`)
Use this for:
- Visual access control overview
- Role-based feature visibility
- Quick reference for permissions
- Presentation and documentation

## XML Structure

The XML follows this hierarchy:
```xml
<coffee-platform>
    <metadata>...</metadata>
    <roles>
        <role>
            <features>
                <feature access-level="..."/>
            </features>
        </role>
    </roles>
    <feature-catalog>...</feature-catalog>
    <access-levels>...</access-levels>
    <categories>...</categories>
    <connection-types>...</connection-types>
</coffee-platform>
```

## Additional Files

### 4. `types/rbac.types.ts`
TypeScript type definitions for the RBAC system:
- Type-safe role, feature, and access level definitions
- `RBAC` utility class with permission checking methods
- Full IntelliSense support for all RBAC operations

### 5. `schemas/rbac.schema.json`
JSON Schema for validating XML structure:
- Validates role definitions
- Validates feature access levels
- Ensures data consistency

### 6. `utils/rbac-middleware.example.ts`
Example middleware implementations:
- Express.js middleware for API route protection
- React hooks for frontend permission checks
- Component wrappers for feature access control
- Multi-feature permission checking utilities

### 7. `RBAC-QUICK-REFERENCE.md`
Quick reference guide with:
- All role and feature IDs
- Permission matrix table
- Usage examples
- Connection type reference

### 8. `scripts/generate-rbac-config.ts`
Script to convert XML to other formats:
- Parse XML to TypeScript-friendly JSON
- Generate TypeScript constants
- Export JSON configuration
- Useful for build-time code generation

### 9. `examples/rbac-usage.example.ts`
Complete usage examples:
- Basic permission checks
- Role-based feature access
- API route protection patterns
- Frontend component examples

## Integration

These files can be used to:
1. Generate database schemas
2. Create API authorization middleware
3. Build UI permission components
4. Generate documentation
5. Validate access control rules
6. Create test fixtures
7. Type-safe permission checking in TypeScript
8. Automated code generation from XML
9. Frontend and backend permission enforcement
10. Quick reference during development