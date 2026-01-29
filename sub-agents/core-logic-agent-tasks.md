# Core Logic Agent - Task Assignment

## Agent Profile
- **Name**: Core Logic Agent
- **Expertise**: Business logic, algorithms, data structures, permission systems
- **Primary Goal**: Implement core RBAC permission checking logic

## Assigned Tasks

### Task 1: Create Core RBAC Class with Tests
**Priority**: CRITICAL (Core functionality)
**Dependencies**: Parser Agent - Task 1
**Estimated Time**: 60 minutes

#### Instructions
Using TDD approach, implement the RBAC class with all permission checking methods.

#### Steps

**Step 1: Write Comprehensive Tests**
Create `tests/unit/core/rbac.test.ts` with tests for:

1. **hasAccess() method**:
   - Returns correct result for each access level (full, partial, view-only, no)
   - Returns PermissionResult with correct structure
   - Handles invalid role IDs
   - Handles invalid feature IDs
   - Returns appropriate reason messages

2. **hasFullAccess() method**:
   - Returns true only for 'full' access level
   - Returns false for other access levels
   - Handles invalid inputs

3. **canWrite() method**:
   - Returns true for 'full' and 'partial' access
   - Returns false for 'view-only' and 'no' access
   - Handles edge cases

4. **canRead() method**:
   - Returns true for any access except 'no'
   - Returns false for 'no' access
   - Handles invalid inputs

5. **getRoleFeatures() method**:
   - Returns all features for a role
   - Returns empty array for invalid role
   - Includes access levels for each feature

6. **getFeatureRoles() method**:
   - Returns all roles that have access to a feature
   - Excludes roles with 'no' access
   - Returns correct access levels

7. **getFeaturesByCategory() method**:
   - Returns features filtered by category
   - Only returns features accessible to the role
   - Handles invalid category IDs

8. **Error Handling**:
   - Invalid role IDs
   - Invalid feature IDs
   - Invalid category IDs
   - Null/undefined inputs

**Step 2: Implement RBAC Class**
Create `src/core/rbac.ts`:
- Implement class matching interface from `types/rbac.types.ts`
- All methods must match exactly
- Use parsed XML config as input
- Implement efficient lookup logic
- Add proper error handling

#### Expected Outputs
- [ ] `tests/unit/core/rbac.test.ts` (comprehensive test suite)
- [ ] `src/core/rbac.ts` (full implementation)

#### Test Coverage Requirements
- ✅ >95% code coverage
- ✅ All methods tested
- ✅ Edge cases covered
- ✅ Error cases covered
- ✅ Integration with real XML data

#### Validation
```bash
# Run RBAC tests
bun test tests/unit/core/rbac.test.ts

# Check coverage
bun test --coverage

# Verify with real XML data
bun run tests/integration/core/rbac-integration.test.ts
```

#### Success Criteria
- ✅ All RBAC core tests pass
- ✅ >95% test coverage achieved
- ✅ All methods work correctly with real XML data
- ✅ Performance is acceptable (<10ms per permission check)
- ✅ TypeScript strict mode compliance
- ✅ No linter errors

#### Reference Files
- Type definitions: `types/rbac.types.ts`
- XML source: `coffee-platform-roles.xml`
- Test fixtures: `tests/helpers/fixtures.ts`

---

### Task 2: Create Config Validator with Tests
**Priority**: HIGH (Data integrity)
**Dependencies**: Task 1 (Core RBAC)
**Estimated Time**: 30 minutes

#### Instructions
Create validator that ensures RBAC configuration matches schema.

#### Steps

**Step 1: Write Tests**
Create `tests/unit/validators/config-validator.test.ts`:
- Valid role structure
- Valid feature structure
- Valid access levels
- Valid categories
- Missing required fields
- Invalid enum values
- Type mismatches

**Step 2: Implement Validator**
Create `src/validators/config-validator.ts`:
- Use `ajv` for JSON schema validation
- Validate against `schemas/rbac.schema.json`
- Return detailed validation errors
- Support both strict and lenient modes

#### Expected Outputs
- [ ] `tests/unit/validators/config-validator.test.ts`
- [ ] `src/validators/config-validator.ts`

#### Success Criteria
- ✅ All validation tests pass
- ✅ Correctly identifies valid configs
- ✅ Correctly identifies invalid configs
- ✅ Provides helpful error messages

---

## Status
- [ ] Task 1: Not Started
- [ ] Task 2: Not Started
- [ ] Validation: Not Started

## Completion Report
_Report here when tasks are complete_
