# Supply Chain Matrix & Feature Access Guidelines

This document defines the supply chain stages, data flow, and enforceable entity relationships with role-based access control.

## Supply Chain Stages

The coffee supply chain flows through six primary stages:

```
FARM → CROP → BEAN → ROAST → BREW → RETAIL
```

### Stage Flow & Data Types

1. **FARM** → **CROP**
   - Data Flow: Analytics data
   - Features: Farm Management, Analytics, IoT Devices

2. **CROP** → **BEAN**
   - Data Flow: IoT sensor data
   - Features: IoT Devices, Quality Assessment, Crop Analytics

3. **BEAN** → **ROAST**
   - Data Flow: Quality grading
   - Features: Quality Assessment, Traceability, Bean Certification

4. **ROAST** → **BREW**
   - Data Flow: Roast profiles
   - Features: Roasting Profiler, Roast Profile, Coffee Studio

5. **BREW** → **RETAIL**
   - Data Flow: Brew methods
   - Features: Coffee Studio, Product Catalog, Brew Recipes

6. **RETAIL** (Final Stage)
   - Features: Shop/Mint, Transactions, Customer Data

---

## Role-Based Access Matrix by Stage

### FARM Stage

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Farmers** | Write/Edit | Full access to farm data, analytics, IoT devices |
| **Roasters** | View Only | Can view farm analytics and data |
| **Affiliates** | No Access | Cannot access farm stage data |
| **Hubs** | View Only | Can view aggregated farm data |

**Features Available:**
- Farm Management (Farmers: Full, Roasters: View, Hubs: View, Affiliates: No)
- Analytics (Farmers: Full, Roasters: View, Hubs: View, Affiliates: No)
- IoT Devices (Farmers: Full, Others: View/No)
- All Farm Analytics (Farmers: Full, Roasters: Partial, Hubs: View, Affiliates: No)

---

### CROP Stage

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Farmers** | Write/Edit | Full access to crop data, IoT sensor data |
| **Roasters** | No Access | Cannot access crop stage data |
| **Affiliates** | No Access | Cannot access crop stage data |
| **Hubs** | View Only | Can view crop data for community insights |

**Features Available:**
- IoT Devices (Farmers: Full, Hubs: View, Others: No)
- Crop Analytics (Farmers: Full, Hubs: View, Others: No)
- Sensor Data Management (Farmers: Full, Others: View/No)

---

### BEAN Stage

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Farmers** | Write/Edit | Can create and edit bean quality data |
| **Roasters** | View/Verify | Can view and verify bean quality |
| **Affiliates** | View/Verify | Can view and verify bean quality |
| **Hubs** | View Only | Can view bean quality data |

**Features Available:**
- Quality Assessment (Farmers: Full, Roasters: Verify, Affiliates: Verify, Hubs: View)
- Bean Certification (Farmers: Full, Roasters: Verify, Affiliates: Verify, Hubs: View)
- Traceability (All: View, Farmers: Edit)
- QR Certs (Farmers: Full, Roasters: Verify, Affiliates: Verify, Hubs: View)

---

### ROAST Stage

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Farmers** | View Only | Can view roast profiles and data |
| **Roasters** | Write/Edit | Full access to roast profiles and roasting data |
| **Affiliates** | View/Verify | Can view and verify roast profiles |
| **Hubs** | View/Verify | Can view and verify roast profiles |

**Features Available:**
- Roasting Profiler (Roasters: Full, Hubs: Partial, Farmers: View, Affiliates: View)
- Roast Profile (Roasters: Full, Others: View/Partial)
- Coffee Studio (Roasters: Full, Others: View/Partial)
- Roasting Contracts (Roasters: Full, Farmers: Partial, Others: View)

---

### BREW Stage

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Farmers** | No Access | Cannot access brew stage data |
| **Roasters** | Write/Edit | Full access to brew methods and recipes |
| **Affiliates** | View/Edit | Can view and edit brew methods |
| **Hubs** | View Only | Can view brew methods |

**Features Available:**
- Coffee Studio (Roasters: Full, Affiliates: Partial, Hubs: View, Farmers: No)
- Brew Recipes (Roasters: Full, Affiliates: Edit, Hubs: View, Farmers: No)
- Product Catalog (Roasters: Full, Affiliates: Edit, Hubs: View, Farmers: No)

---

### RETAIL Stage

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Farmers** | View Only | Can view retail data and sales |
| **Roasters** | Write/Edit | Full access to retail operations |
| **Affiliates** | Write/Edit | Full access to retail operations |
| **Hubs** | View Only | Can view retail data |

**Features Available:**
- Shop/Mint (Roasters: Full, Affiliates: Full, Farmers: View, Hubs: View)
- Transactions (All: Full except Farmers: View)
- Customer Data (Roasters: Full, Affiliates: Full, Others: View/No)

---

## Enforceable Entity Relationships

### Data Flow Rules

1. **Analytics Data (FARM → CROP)**
   - Only Farmers can create/edit
   - Roasters and Hubs can view
   - Affiliates cannot access

2. **IoT Sensor Data (CROP → BEAN)**
   - Only Farmers can create/edit
   - Hubs can view for community insights
   - Roasters and Affiliates cannot access

3. **Quality Grading (BEAN → ROAST)**
   - Farmers can create/edit
   - Roasters and Affiliates can verify
   - Hubs can view

4. **Roast Profiles (ROAST → BREW)**
   - Roasters can create/edit
   - Farmers can view
   - Affiliates and Hubs can verify

5. **Brew Methods (BREW → RETAIL)**
   - Roasters can create/edit
   - Affiliates can edit
   - Hubs can view
   - Farmers cannot access

### Cross-Stage Access Rules

- **Traceability**: All roles can view the full chain, but only stage owners can edit their stage data
- **Supply Chain Network**: View access based on role, edit access limited to stage owners
- **Smart Contracts**: Can span multiple stages, access based on contract parties
- **Blockchain Tools**: Full access for Hubs/Affiliates, partial for Farmers/Roasters

---

## Feature-to-Stage Mapping

### Stage-Specific Features

| Stage | Primary Features | Secondary Features |
|-------|-----------------|-------------------|
| **FARM** | Farm Management, Analytics, IoT Devices | All Farm Analytics, Transactions |
| **CROP** | IoT Devices, Crop Analytics | Sensor Data Management |
| **BEAN** | Quality Assessment, Bean Certification, QR Certs | Traceability, Blockchain Verification |
| **ROAST** | Roasting Profiler, Roast Profile, Coffee Studio | Roasting Contracts, Quality Control |
| **BREW** | Coffee Studio, Brew Recipes, Product Catalog | AetherIQ (Brew Analysis) |
| **RETAIL** | Shop/Mint, Transactions, Customer Data | Analytics, Sales Reports |

### Cross-Stage Features

These features span multiple stages:

- **Traceability**: FARM → RETAIL (all stages)
- **Supply Chain**: All stages (network visualization)
- **Smart Contract Wizard**: Can create contracts for any stage
- **AetherIQ**: AI insights across all stages
- **Analytics**: Aggregated data across stages
- **Blockchain Tools**: Verification and transactions across stages

---

## Implementation Guidelines

### Access Level Enforcement

1. **Stage-Based Access Control**
   - Check current supply chain stage
   - Verify role permissions for that stage
   - Enforce read/write restrictions

2. **Data Flow Validation**
   - Validate data can flow from previous stage
   - Ensure role has permission to create/edit at current stage
   - Block unauthorized stage transitions

3. **Feature Visibility**
   - Show features only if role has access to relevant stage
   - Hide features for stages with "No Access"
   - Display "View Only" indicators for restricted access

4. **Entity Relationships**
   - Enforce parent-child relationships (e.g., Farm → Crop → Bean)
   - Validate ownership before allowing edits
   - Maintain audit trail of stage transitions

### UI Component Recommendations by Stage

#### FARM Stage
- **Farm Management**: Map view, Farm cards, Statistics dashboard
- **Analytics**: Line charts (yield trends), Bar charts (farm comparison), Heatmap (geographic)
- **IoT Devices**: Real-time charts, Device status cards, Telemetry dashboard

#### CROP Stage
- **IoT Devices**: Sensor data charts, Device grid, Alert notifications
- **Crop Analytics**: Growth charts, Weather data, Yield predictions

#### BEAN Stage
- **Quality Assessment**: Quality score cards, Grading forms, Comparison tables
- **QR Certs**: Certificate cards, QR code display, Batch tracking
- **Traceability**: Timeline view, Stage indicators, Verification badges

#### ROAST Stage
- **Roasting Profiler**: Roast curve charts, Profile library, Temperature graphs
- **Coffee Studio**: Profile cards, Image gallery, Comparison view
- **Roasting Contracts**: Contract cards, Status timeline, Terms display

#### BREW Stage
- **Coffee Studio**: Product cards, Recipe display, Method comparison
- **Brew Recipes**: Recipe cards, Step-by-step guide, Video/image display

#### RETAIL Stage
- **Shop/Mint**: Product grid, NFT cards, Marketplace view
- **Transactions**: Transaction table, Summary cards, Trend charts
- **Customer Data**: Customer table, Purchase history, Analytics dashboard

---

## Data Access Patterns

### Read Patterns
- **View Only**: Display data with no edit capabilities
- **View/Verify**: Can view and add verification/comments
- **View/Edit**: Can view and make limited edits

### Write Patterns
- **Write/Edit**: Full create, update, delete capabilities
- **Verify Only**: Can add verification but not edit original data
- **No Access**: Feature hidden or shows access denied

---

## Next Steps

1. **Update Feature Components**
   - Add stage-based access checks
   - Implement stage context provider
   - Add stage indicators to UI

2. **Create Stage Navigation**
   - Stage selector component
   - Stage-based feature filtering
   - Stage transition validation

3. **Implement Data Flow Validation**
   - Validate stage transitions
   - Enforce data flow rules
   - Add audit logging

4. **Update RBAC System**
   - Add stage-based permissions
   - Integrate with existing access levels
   - Create stage permission matrix

5. **Build Stage-Specific UI Components**
   - Stage indicators
   - Stage transition buttons
   - Stage-based feature lists
