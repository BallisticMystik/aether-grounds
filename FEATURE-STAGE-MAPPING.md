# Feature-to-Stage Mapping Reference

Quick reference guide for mapping features to supply chain stages and recommended UI components.

## Feature by Stage

### FARM Stage
**Features:** Farm Management, Analytics, IoT Devices, All Farm Analytics

| Feature | UI Components | Data Visualization |
|---------|--------------|-------------------|
| **Farm Management** | Map view, Farm cards, Statistics dashboard | Option A: Farm cards with location, size, yield<br>Option B: Map visualization with farm markers<br>Option C: Statistics dashboard (Total farms, hectares, yield) |
| **Analytics** | Line charts, Bar charts, Heatmap | Option A: Revenue trend (Line chart)<br>Option B: Farm comparison (Bar chart)<br>Option C: Geographic performance (Heatmap) |
| **IoT Devices** | Real-time charts, Device cards, Status dashboard | Option A: Device cards (Status, location, values)<br>Option B: Real-time telemetry charts<br>Option C: Device status dashboard |

---

### CROP Stage
**Features:** IoT Devices, Crop Analytics

| Feature | UI Components | Data Visualization |
|---------|--------------|-------------------|
| **IoT Devices** | Sensor charts, Device grid, Alert notifications | Option A: Sensor data over time (Line charts)<br>Option B: Device grid with status indicators<br>Option C: Alert/notification feed |
| **Crop Analytics** | Growth charts, Weather data, Yield predictions | Option A: Growth timeline (Area chart)<br>Option B: Weather integration (Gauge/Thermometer)<br>Option C: Yield predictions (Line chart with forecast) |

---

### BEAN Stage
**Features:** Quality Assessment, Bean Certification, QR Certs, Traceability

| Feature | UI Components | Data Visualization |
|---------|--------------|-------------------|
| **Quality Assessment** | Quality scorecards, Grading forms, Comparison tables | Option A: Quality scorecards (Cards with scores)<br>Option B: Grading form (Form with verification)<br>Option C: Comparison table (Side-by-side quality metrics) |
| **QR Certs** | Certificate cards, QR code display, Batch tracking | Option A: Certificate cards (Name, batch, QR preview)<br>Option B: QR code scanner/viewer<br>Option C: Batch tracking table |
| **Traceability** | Timeline view, Stage indicators, Verification badges | Option A: Timeline (Chronological stages)<br>Option B: Map visualization (Geographic journey)<br>Option C: Stage details table |

---

### ROAST Stage
**Features:** Roasting Profiler, Roast Profile, Coffee Studio, Roasting Contracts

| Feature | UI Components | Data Visualization |
|---------|--------------|-------------------|
| **Roasting Profiler** | Roast curve charts, Profile library, Temperature graphs | Option A: Roast curve (Line chart: Temp vs Time)<br>Option B: Profile library (Card grid)<br>Option C: Profile comparison (Multiple curves) |
| **Roast Profile** | Profile cards, Parameter table, Temperature display | Option A: Profile cards (Name, temp, duration)<br>Option B: Parameter table (Detailed settings)<br>Option C: Temperature gauge/display |
| **Coffee Studio** | Profile gallery, Image carousel, Detail view | Option A: Profile gallery (Grid of coffee profiles)<br>Option B: Image carousel (Profile images)<br>Option C: Detail view (Full profile info) |
| **Roasting Contracts** | Contract cards, Status timeline, Terms display | Option A: Contract cards (Name, party, value, status)<br>Option B: Status timeline (Contract lifecycle)<br>Option C: Terms display (Full contract details) |

---

### BREW Stage
**Features:** Coffee Studio, Brew Recipes, Product Catalog

| Feature | UI Components | Data Visualization |
|---------|--------------|-------------------|
| **Coffee Studio** | Product cards, Recipe display, Method comparison | Option A: Product cards (Coffee profiles)<br>Option B: Recipe display (Step-by-step guide)<br>Option C: Method comparison (Side-by-side) |
| **Brew Recipes** | Recipe cards, Step guide, Video/image display | Option A: Recipe cards (Name, method, steps)<br>Option B: Step-by-step guide (Sequential steps)<br>Option C: Video/image display (Visual guide) |

---

### RETAIL Stage
**Features:** Shop/Mint, Transactions, Customer Data

| Feature | UI Components | Data Visualization |
|---------|--------------|-------------------|
| **Shop/Mint** | Product grid, NFT cards, Marketplace view | Option A: Product grid (Items with price)<br>Option B: NFT cards (NFT details, price)<br>Option C: Marketplace view (Filtered/sorted products) |
| **Transactions** | Transaction table, Summary cards, Trend charts | Option A: Transaction table (Type, amount, status, date)<br>Option B: Summary cards (Total, incoming, outgoing, net)<br>Option C: Transaction trends (Line/Bar chart) |
| **Customer Data** | Customer table, Purchase history, Analytics | Option A: Customer table (List with details)<br>Option B: Purchase history (Timeline/table)<br>Option C: Customer analytics (Charts, metrics) |

---

## Cross-Stage Features

### Traceability (All Stages)
- **UI Components:** Timeline, Map, Stage cards, Verification badges
- **Data Visualization:**
  - Option A: Timeline view (All 6 stages in sequence)
  - Option B: Map visualization (Geographic journey)
  - Option C: Stage details table (Location, date, status per stage)

### Supply Chain (All Stages)
- **UI Components:** Network graph, Node cards, Connection lines, Stage indicators
- **Data Visualization:**
  - Option A: Network graph (Interactive node visualization)
  - Option B: Stage flow (Sequential stage display with access badges)
  - Option C: Node cards (Farm, Roaster, Hub, Retailer with connections)

### Smart Contract Wizard (All Stages)
- **UI Components:** Wizard steps, Progress indicator, Template cards
- **Data Visualization:**
  - Option A: Step wizard (Contract Type → Parties → Terms → Review)
  - Option B: Template gallery (Contract templates by stage)
  - Option C: Deployment status (Pending, Deployed, Failed)

### AetherIQ (All Stages)
- **UI Components:** Query interface, Insight cards, Charts
- **Data Visualization:**
  - Option A: Insight cards (AI-generated insights per stage)
  - Option B: Interactive charts (Stage-specific analysis)
  - Option C: Recommendation list (Action items by stage)

### Analytics (All Stages)
- **UI Components:** Line charts, Bar charts, Pie charts, Heatmaps
- **Data Visualization:**
  - Option A: Revenue trend (Line chart across stages)
  - Option B: Stage distribution (Pie chart: transactions by stage)
  - Option C: Performance heatmap (Stage vs Metric matrix)

---

## Access Level Indicators

### Visual Indicators by Access Level

- **Write/Edit (Full Access):**
  - Green badge/indicator
  - Edit buttons enabled
  - Create/Delete actions available

- **View/Verify:**
  - Yellow badge/indicator
  - Verify button available
  - Can add comments/verification
  - Cannot edit original data

- **View Only:**
  - Blue badge/indicator
  - All edit buttons disabled
  - Read-only mode
  - "VIEW ONLY" badge visible

- **No Access:**
  - Red/gray indicator
  - Feature hidden or shows "Access Denied"
  - No data displayed

---

## Implementation Checklist

- [ ] Add stage context provider
- [ ] Update feature components with stage awareness
- [ ] Add stage-based access checks
- [ ] Implement stage navigation component
- [ ] Add stage indicators to UI
- [ ] Create stage transition validation
- [ ] Add data flow visualization
- [ ] Implement stage filtering for features
- [ ] Add stage badges to feature cards
- [ ] Create stage-based feature lists
