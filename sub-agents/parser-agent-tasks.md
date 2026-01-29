# Parser Agent - Task Assignment

## Agent Profile
- **Name**: Parser Agent
- **Expertise**: XML parsing, data transformation, file I/O, data validation
- **Primary Goal**: Parse and transform XML configuration into usable data structures

## Assigned Tasks

### Task 1: Create XML Parser with Tests
**Priority**: HIGH (Required for data layer)
**Dependencies**: Testing Agent - Task 1
**Estimated Time**: 45 minutes

#### Instructions
Using TDD approach, create XML parser that reads `coffee-platform-roles.xml` and converts it to TypeScript-friendly structure.

#### Steps

**Step 1: Write Tests First (TDD)**
Create `tests/unit/parsers/xml-parser.test.ts` with tests for:
- XML structure validation
- Role extraction (all 4 roles)
- Feature extraction (all features)
- Access level parsing (full, partial, view-only, no)
- Category mapping
- Error handling for:
  - Invalid XML format
  - Missing required fields
  - Malformed structure
  - File not found

**Step 2: Implement Parser**
Create `src/parsers/xml-parser.ts`:
- Use `xml2js` to parse XML
- Transform XML structure to match `RBACConfig` type from `types/rbac.types.ts`
- Handle all XML elements:
  - `<metadata>`
  - `<roles><role>` with features
  - `<feature-catalog><feature>`
  - `<access-levels><access-level>`
  - `<categories><category>`
  - `<connection-types><connection-type>`

**Step 3: Create Types**
Create `src/parsers/types.ts`:
- Types for XML structure
- Types for parsed output
- Type guards for validation

#### Expected Outputs
- [ ] `tests/unit/parsers/xml-parser.test.ts` (comprehensive tests)
- [ ] `src/parsers/xml-parser.ts` (implementation)
- [ ] `src/parsers/types.ts` (type definitions)

#### Test Coverage Requirements
- ✅ Parse valid XML successfully
- ✅ Extract all roles correctly
- ✅ Extract all features correctly
- ✅ Map access levels correctly
- ✅ Map categories correctly
- ✅ Handle invalid XML gracefully
- ✅ Handle missing file gracefully
- ✅ Validate structure matches RBACConfig type

#### Validation
```bash
# Run parser tests
bun test tests/unit/parsers/xml-parser.test.ts

# Verify parser works with actual XML
bun run src/parsers/xml-parser.ts
```

#### Success Criteria
- ✅ All parser tests pass
- ✅ Parser correctly extracts all roles from XML
- ✅ Parser correctly extracts all features from XML
- ✅ Parser correctly maps all access levels
- ✅ Parser handles errors gracefully
- ✅ Output matches RBACConfig type structure
- ✅ TypeScript types are correct

#### Reference Files
- Source XML: `coffee-platform-roles.xml`
- Type definitions: `types/rbac.types.ts`
- Test fixtures: `tests/helpers/fixtures.ts`

---

## Status
- [ ] Task 1: Not Started
- [ ] Validation: Not Started

## Completion Report
_Report here when task is complete_
