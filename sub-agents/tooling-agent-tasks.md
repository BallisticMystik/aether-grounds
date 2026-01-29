# Tooling Agent - Task Assignment

## Agent Profile
- **Name**: Tooling Agent
- **Expertise**: CLI tools, code generation, build scripts, database schemas
- **Primary Goal**: Create developer tools and automation

## Assigned Tasks

### Task 1: Create Config Generator
**Priority**: MEDIUM (Developer tool)
**Dependencies**: Parser Agent - Task 1
**Estimated Time**: 40 minutes

#### Instructions
Enhance the config generator to convert XML to various formats.

#### Steps

**Step 1: Write Tests**
Create `tests/unit/scripts/generate-rbac-config.test.ts`:
- Parses XML correctly
- Generates TypeScript constants
- Generates JSON config
- Generates type definitions
- Validates output

**Step 2: Enhance Generator**
Enhance `scripts/generate-rbac-config.ts`:
- Parse XML using xml-parser
- Generate TypeScript constant file
- Generate JSON config file
- Generate type definitions
- Validate output
- CLI interface using commander

#### Expected Outputs
- [ ] `scripts/generate-rbac-config.ts` (enhanced)
- [ ] `tests/unit/scripts/generate-rbac-config.test.ts`
- [ ] `src/cli/generate.ts`

#### Success Criteria
- ✅ Generator works correctly
- ✅ Output is valid and usable
- ✅ Tests pass

---

### Task 2: Create CLI Tools
**Priority**: MEDIUM (Developer experience)
**Dependencies**: Task 1 (Config Generator)
**Estimated Time**: 45 minutes

#### Instructions
Create comprehensive CLI tool for RBAC management.

#### Steps

**Step 1: Write Tests**
Create `tests/integration/cli/cli.test.ts`:
- `validate` command works
- `generate` command works
- `check` command works
- `list` command works
- Error handling
- Help text

**Step 2: Implement CLI**
Create `src/cli/index.ts`:
- `validate` - validate XML config
- `generate` - generate code from XML
- `check` - check permissions for role/feature
- `list` - list all roles/features
- Use commander.js
- Add to package.json scripts

#### Expected Outputs
- [ ] `src/cli/index.ts`
- [ ] `src/cli/commands/` (directory with commands)
- [ ] `tests/integration/cli/cli.test.ts`

#### Success Criteria
- ✅ All CLI commands work
- ✅ Tests pass
- ✅ Help text is clear

---

### Task 3: Create Database Migration Scripts
**Priority**: MEDIUM (Database integration)
**Dependencies**: Parser Agent - Task 1
**Estimated Time**: 50 minutes

#### Instructions
Generate SQL schema and seed data from XML.

#### Steps

**Step 1: Write Tests**
Create `tests/unit/scripts/database/generate-schema.test.ts`:
- Generates valid SQL
- Creates all required tables
- Generates seed data
- PostgreSQL compatible
- SQLite compatible

**Step 2: Implement Generator**
Create `scripts/database/generate-schema.ts`:
- Read coffee-platform-roles.xml
- Generate SQL schema:
  - `roles` table
  - `features` table
  - `categories` table
  - `access_levels` table
  - `role_feature_access` junction table
- Generate seed data from XML
- Output migration-ready SQL files

#### Expected Outputs
- [ ] `scripts/database/generate-schema.ts`
- [ ] `scripts/database/schema.sql`
- [ ] `scripts/database/seed.sql`
- [ ] `tests/unit/scripts/database/generate-schema.test.ts`

#### Success Criteria
- ✅ Generated SQL is valid
- ✅ Schema matches ERD
- ✅ Seed data is correct
- ✅ Tests pass

---

## Status
- [ ] Task 1: Not Started
- [ ] Task 2: Not Started
- [ ] Task 3: Not Started
- [ ] Validation: Not Started

## Completion Report
_Report here when tasks are complete_
