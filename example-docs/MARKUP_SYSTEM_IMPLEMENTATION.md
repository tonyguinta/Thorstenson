# Markup System Implementation: Phased Development Plan

## **Overview**
This document outlines the complete implementation plan for markup and discount functionality, broken into 6 bite-sized phases with clear success criteria and approval gates.

## **✅ IMPLEMENTATION STATUS: COMPLETED**
**Completion Date**: July 2025  
**All 6 phases successfully implemented and tested**

## **Implementation Rules**
- ✅ **Stop at the end of each phase** to verify success criteria
- ✅ **Get positive affirmation** before proceeding to next phase
- ✅ **Test thoroughly** at each phase boundary
- ✅ **COMMIT ONLY AFTER USER VERIFICATION** - Never commit untested code
- ✅ **Ask for approval** - err on the side of too much rather than too little

## **Commit & Push Protocol**
1. **Code & Request Testing**: Complete implementation work and ask user to test/verify
2. **User Testing**: User tests functionality and reports results
3. **Commit After Verification**: Only commit once user confirms implementation works
4. **Push When Ordered**: Only push to staging/production when explicitly requested

**CRITICAL**: Never commit code that hasn't been user-tested. Keep commit history clean with verified, working implementations only.

---

## **Phase 1: Database Foundation** ⏱️ *45-60 mins*
**Goal**: Add markup/discount models and run migration safely

### **Tasks:**

#### **1A: Add Company Markup Defaults** *(20 mins)*
- Add to existing `CompanySettings` model in `backend/app/models/models.py`:
  - `default_material_markup_percent` - NUMERIC(7,4), default=0.0
  - `default_labor_markup_percent` - NUMERIC(7,4), default=0.0

#### **1B: Add Project Markup/Discount Fields** *(30 mins)*  
- Add to existing `Project` model in `models.py`:
  - `material_markup_type` - VARCHAR(10), default='percent'
  - `material_markup_percent` - NUMERIC(7,4), default=0.0
  - `material_markup_flat` - NUMERIC(10,2), default=0.0
  - `labor_markup_type` - VARCHAR(10), default='percent'
  - `labor_markup_percent` - NUMERIC(7,4), default=0.0
  - `labor_markup_flat` - NUMERIC(10,2), default=0.0
  - `material_discount_type` - VARCHAR(10), default='percent'
  - `material_discount_percent` - NUMERIC(7,4), default=0.0
  - `material_discount_flat` - NUMERIC(10,2), default=0.0
  - `labor_discount_type` - VARCHAR(10), default='percent'
  - `labor_discount_percent` - NUMERIC(7,4), default=0.0
  - `labor_discount_flat` - NUMERIC(10,2), default=0.0
  - `project_discount_type` - VARCHAR(10), default='percent'
  - `project_discount_percent` - NUMERIC(7,4), default=0.0
  - `project_discount_flat` - NUMERIC(10,2), default=0.0
  - **`material_discount_reason` - VARCHAR(500), nullable (required when discount > 0)**
  - **`labor_discount_reason` - VARCHAR(500), nullable (required when discount > 0)**
  - **`project_discount_reason` - VARCHAR(500), nullable (required when discount > 0)**

**Note**: Using separate columns ensures proper precision - NUMERIC(7,4) for percentages, NUMERIC(10,2) for currency. Only one value field should be non-zero based on type setting. Discount reasons are nullable at database level but required at application level when discount amount > 0.

#### **1C: Create Markup Changes Audit Table** *(15 mins)*
- Create new `MarkupChange` model:
  - `id` - SERIAL PRIMARY KEY
  - `project_id` - INTEGER REFERENCES projects(id) ON DELETE CASCADE
  - `user_id` - INTEGER REFERENCES users(id) ON DELETE SET NULL
  - `field_changed` - VARCHAR(50) NOT NULL (e.g., 'material_markup_percent')
  - `old_value` - VARCHAR(20) (display format: '20%', '$200.00')
  - `new_value` - VARCHAR(20) NOT NULL (display format: '20%', '$200.00')
  - `change_reason` - TEXT (optional user explanation)
  - `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### **Testing Steps:**
1. Run `python3 run.py` locally
2. Check database migration runs without errors
3. Visit `/docs` to verify new fields don't appear yet (no schema updates)
4. Test existing project API calls still work

### **✅ Phase 1 Success Criteria:**
- [ ] Local database migrated without errors
- [ ] Project model has all 15 markup/discount fields with correct types:
  - 5 type fields (VARCHAR(10), default='percent') 
  - 5 percent fields (NUMERIC(7,4), default=0.0)
  - 5 flat fields (NUMERIC(10,2), default=0.0)
- [ ] CompanySettings model has 2 new markup default fields (NUMERIC(7,4))
- [ ] All existing projects have default markup/discount values (0.0)
- [ ] `markup_changes` table created with correct schema (6 fields)
- [ ] New fields do NOT appear in `/docs` API documentation (no schema updates yet)
- [ ] No breaking changes to existing functionality
- [ ] Can still create/edit projects without markup fields

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 2**

---

## **Phase 2: Schema & API Foundation** ⏱️ *50-65 mins*
**Goal**: Update schemas and add basic API support

### **Tasks:**

#### **2A: Update Schemas** *(35 mins)*
- Update `backend/app/schemas/schemas.py`:
  - Add all 15 markup/discount fields to `Project`, `ProjectCreate`, `ProjectUpdate`
  - Include proper Optional typing for percent/flat fields
  - Add company markup defaults to `CompanySettings`, `CompanySettingsUpdate`
  - Create `MarkupChange` schemas
  - Add validation to ensure type/value consistency

#### **2B: Update Company Settings API** *(15 mins)*
- Modify existing company settings endpoints to include markup defaults
- Ensure proper validation for markup percentages (0-300%)

#### **2C: Add Validation Helper & Change Tracking** *(20 mins)*
- Create validation helper to ensure only one value field is set based on type:
  ```python
  def validate_markup_discount_fields(data):
      # If type='percent', flat field must be 0
      # If type='flat', percent field must be 0
  ```
- Create helper function to log markup changes
- Integration points identified (will implement in Phase 3)

### **Testing Steps:**
1. Check `/docs` shows all 15 markup/discount fields with correct types
2. Test GET `/company/settings` includes markup defaults
3. Test PUT `/company/settings` with markup defaults
4. Verify schema validation works (negative values rejected)
5. Test type/value consistency validation
6. Verify proper Optional typing for all fields

### **✅ Phase 2 Success Criteria:**
- [ ] All 15 markup/discount fields visible in API documentation with correct types
- [ ] Company settings API includes markup defaults (percent only)
- [ ] Schema validation prevents invalid values (negatives, out of range)
- [ ] Type/value consistency validation working (only one value field set)
- [ ] Markup change tracking helper function created
- [ ] No breaking changes to existing API calls

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 3**

---

## **Phase 3: Calculation Logic** ⏱️ *65-80 mins*
**Goal**: Implement markup/discount calculations

### **Tasks:**

#### **3A: Update Project Calculation Helper** *(50 mins)*
- Modify existing `calculate_project_totals()` function in `utils/calculations.py`
- New calculation order: Base Cost → Markup → Discount → Tax → Total
- Handle markup/discount using appropriate fields based on type:
  ```python
  if project.material_markup_type == 'percent':
      markup = base_cost * (project.material_markup_percent / 100)
  else:
      markup = project.material_markup_flat
  ```
- Add proper decimal arithmetic for accuracy (round only at final total)
- Include markup change logging with immutable audit trail
- Validate type/value consistency before calculations

#### **3B: Integrate with Project Update API** *(15 mins)*
- Ensure markup calculations trigger on project updates
- Log markup changes when values are modified
- Validate markup limits (warning at 100%, cap at 300%)

#### **3C: Default Markup Inheritance** *(15 mins)*
- When creating new projects, fetch company default markups
- Apply to new projects automatically
- Fall back to 0.0 if no company settings exist

### **Testing Steps:**
1. Create test project with known values
2. Verify percent calculation: $1000 base + 20% markup (using percent field)
3. Verify flat calculation: $1000 base + $200 markup (using flat field)
4. Test mixed combinations (percent markup + flat discount, etc.)
5. Verify only appropriate field is used based on type setting
6. Test markup change logging captures field changes correctly
7. Test company default inheritance for new projects

### **✅ Phase 3 Success Criteria:**
- [ ] Markup/discount calculations work correctly: base → markup → discount → tax → total
- [ ] Percent calculations use _percent fields, flat use _flat fields exclusively
- [ ] Type/value validation prevents using wrong field
- [ ] Both percent and flat calculations accurate to the penny
- [ ] Markup change audit trail captures all 15 fields properly
- [ ] New projects inherit company default markups (percent fields only)
- [ ] Markup validation warnings/limits work
- [ ] All calculations use proper decimal arithmetic

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 4**

---

## **Phase 4: Frontend Company Settings** ⏱️ *60-90 mins* ✅ **COMPLETE**
**Goal**: Add markup defaults to company settings page

### **Tasks:**

#### **4A: Update Company Settings Page** *(45 mins)*
- Modify existing `frontend/src/pages/CompanySettings.tsx`
- Add tabbed interface for better organization (General, Tax, Markup)
- Add markup default inputs for Materials and Labor (percent only)
- Percentage format with % suffix, 0.01% minimum validation
- Include tooltips about markup vs discount visibility
- Smart defaults: 20% materials, 15% labor as suggested starting points

#### **4B: Enhanced Form Validation** *(30 mins)*
- Stepped validation: 0.01% minimum, warning at 100%, hard cap at 300%
- Convert percentage input (20%) to decimal (0.2000) for API
- Visual warning badges for values >100%
- Override workflow for values >300% with confirmation dialog
- Real-time feedback with color-coded validation states

#### **4C: Default Inheritance Testing** *(15 mins)*
- Verify company defaults save and persist
- Test that new projects inherit these defaults

### **Testing Steps:**
1. Access company settings page
2. Test markup default inputs with valid values (0%, 20%, 100%, 150%)
3. Test validation (negative values, >300%)
4. Test warning display for >100%
5. Create new project and verify markup inheritance

### **✅ Phase 4 Success Criteria:**
- [x] Company settings page includes markup default inputs
- [x] Markup inputs accept percentage format (with % suffix)
- [x] Input validation prevents invalid markups (0-300% range)
- [x] Warning indicator appears for markups >100%
- [x] Company defaults save successfully and persist
- [x] New projects inherit company markup defaults
- [x] Tooltips explain markup behavior clearly

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 5**

---

## **Phase 5: Frontend Project Markup Interface** ⏱️ *105-135 mins*
**Goal**: Add markup/discount controls to project editing

### **Tasks:**

#### **5A: Update Project Modal** *(85 mins)*
- Add tabbed markup section to `ProjectModal.tsx` (Costs, Markup, Discounts)
- Separate inputs for Materials and Labor markup with type selectors
- Type selector (percent/flat) per category using appropriate precision fields
- Show only relevant input field based on type selection (percent or flat)
- Discount section with per-category and project-level discounts
- **REQUIRED: Discount reason text inputs for each discount type**
  - Material discount reason (required when material discount > 0)
  - Labor discount reason (required when labor discount > 0)  
  - Project discount reason (required when project discount > 0)
  - Validation: 3-500 characters when discount applied
- Real-time calculation preview with backend verification
- Immutable calculation history display

#### **5B: Advanced Validation & Warnings** *(45 mins)*
- Stepped markup validation (0.01% min, 100% warning, 300% cap with override)
- Discount warnings when > project total with clear messaging
- **Discount reason validation:**
  - Required when discount amount > 0 (any type)
  - Minimum 3 characters, maximum 500 characters
  - Real-time validation with clear error messages
  - Placeholder text: "Reason for discount (e.g., repeat customer, bulk order)"
- Visual warning badges with color-coded severity levels
- Override confirmation dialogs for extreme values
- Clear visual separation: markup (internal-only) vs discount (client-facing)
- Type/value consistency enforcement: only one field editable per type
- Minimum value validation for both percent (0.01%) and flat ($0.01)

#### **5C: Update Project Display** *(40 mins)*
- Modify `CostSummary.tsx` to show markup/discount breakdown
- Internal view: Show markups and discounts separately
- **Display discount reasons with amounts:**
  - Format: "Material Discount (10% - repeat customer): -$100.00"
  - Show reason in both internal and client-facing views
  - Truncate long reasons with ellipsis (...) and tooltip
- Hide markup from any client-facing displays
- Update project detail pages with markup information

### **Testing Steps:**
1. Edit project - verify markup/discount inputs appear in tabbed interface
2. Test type switching (percent ↔ flat) shows/hides appropriate input fields
3. Test that only one value field is editable based on type selection
4. **Test discount reason validation:**
   - Apply discount without reason → error appears
   - Enter reason < 3 chars → validation error
   - Enter reason > 500 chars → validation error
   - Valid reason with discount → form submits successfully
5. Test real-time calculation updates
6. Verify warnings appear for high markups and excessive discounts
7. Test markup override capability (>300%) with confirmation dialog
8. Verify type/value consistency is enforced
9. Verify markup is hidden from client-facing views
10. **Verify discount reasons display correctly in project details**

### **✅ Phase 5 Success Criteria:**
- [ ] Project edit modal includes tabbed markup/discount sections
- [ ] Separate markup controls for Materials and Labor
- [ ] Type selector (percent/flat) switches between appropriate input fields
- [ ] Only relevant field (percent or flat) is editable based on type selection
- [ ] Other field is disabled/hidden when not applicable
- [ ] Project-level discount controls function properly
- [ ] **Discount reason inputs appear for each discount type**
- [ ] **Discount reason validation works (required when discount > 0, 3-500 chars)**
- [ ] **Discount reasons display with amounts in project details**
- [ ] Real-time calculation updates work smoothly
- [ ] Validation warnings appear appropriately
- [ ] Type/value consistency enforced in UI
- [ ] Markup override capability functions (>300%) with confirmation
- [ ] Client-facing views hide markup, show discount with reason
- [ ] Form inherits company defaults for new projects (percent fields only)

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 6**

---

## **Phase 6: Integration Testing & Polish** ⏱️ *45-60 mins*
**Goal**: End-to-end verification and staging deployment

### **Tasks:**

#### **6A: Complete Workflow Testing** *(30 mins)*
- Test complete user workflow:
  1. Set company default markups (20% materials, 15% labor)
  2. Create new project (should inherit defaults)
  3. Override project markups (different values)
  4. Add project discount (property damage scenario)
  5. Verify calculation chain throughout
  6. Test audit trail functionality

#### **6B: Edge Case Testing** *(15 mins)*
- Test discount > project total (warning appears)
- Test markup at limits (100% warning, 300% cap)
- Test percent vs flat combinations
- Verify rounding accuracy

#### **6C: User Verification & Deployment** *(15 mins)*
- Request user testing of complete workflow
- **Only after user confirmation**: Commit all changes with descriptive messages
- **Only when user requests**: Deploy to staging environment
- **Only when user requests**: Deploy to production environment

### **Testing Steps:**
1. Complete workflow testing locally
2. Test all validation scenarios
3. Verify audit trail captures all changes
4. Check calculation accuracy across different scenarios
5. **Request user verification of all functionality**
6. **Only after user approval**: Deploy to staging and retest key workflows

### **✅ Phase 6 Success Criteria:**
- [ ] Complete markup workflow functional end-to-end
- [ ] Company default markup inheritance works
- [ ] Project-level markup override works
- [ ] Discount system works correctly with warnings
- [ ] Audit trail captures all markup changes
- [ ] All calculations accurate across different scenarios
- [ ] **USER HAS TESTED AND VERIFIED ALL FUNCTIONALITY**
- [ ] No regressions in existing functionality
- [ ] **User has approved deployment to staging/production**

### **🛑 APPROVAL GATE: Wait for positive confirmation before marking complete**

---

## **Success Scenario Testing Matrix**

| Scenario | Expected Result |
|----------|----------------|
| New user, no company markup defaults | Projects default to 0% markup |
| Set company defaults: 20% materials, 15% labor | New projects inherit these values |
| Project: $1000 materials + 20% markup | Materials total: $1,200.00 (using percent field) |
| Project: $2000 labor + 15% markup | Labor total: $2,300.00 (using percent field) |
| Combined + 10% project discount | Subtotal: $3,500.00, Discount: $350.00, Total: $3,150.00 |
| Add 8.75% tax to final total | Final total: $3,425.63 (rounded to nearest cent) |
| Flat markup: $100 materials, $50 labor | Direct addition: $1,100 + $2,050 = $3,150.00 (using flat fields) |
| Mixed: 10% materials, $200 labor flat | Materials: $1,100, Labor: $2,200, Total: $3,300.00 |
| Type validation | If type='percent', flat field = 0; if type='flat', percent field = 0 |
| Field usage | Calculations only use field matching the type setting |
| Markup >100% | Shows warning but allows |
| Markup >300% | Requires override confirmation |
| Discount > project total | Shows warning but allows (credit scenario) |
| Markup change | Logged in audit trail with specific field names |

---

## **Rollback Plan**
If any phase fails its success criteria:
1. **Stop immediately** - do not proceed to next phase
2. **Identify the issue** - review error logs and testing results
3. **Fix the problem** - address the specific failure
4. **Re-test the phase** - verify success criteria are met
5. **Get approval** - confirm resolution before continuing

## **Deployment Notes**
- All phases can be tested locally before staging deployment
- Phase 6 includes staging deployment and verification
- Production deployment only after successful staging verification and final approval

**REMEMBER: 
- Ask for explicit approval at every approval gate! 🛑
- NEVER commit without user testing and verification! ⚠️
- NEVER push without explicit user request! 🚨**

---

## **Architecture Notes**

### **Integration with Existing Systems**
- Builds on existing `calculate_project_totals()` function
- Extends current tax calculation system
- Reuses company settings infrastructure
- Maintains existing cost calculation patterns

### **Data Migration Strategy**
- All new fields have safe defaults (0.0)
- No recalculation of existing projects during migration
- Recalculation only occurs on next project save/edit
- Backwards compatible with existing cost structure

### **Future Extensibility**
- Schema supports additional markup types if needed
- Audit trail can track any field changes
- Company defaults easily extendable to other categories
- Calculation order designed for future additions

---

## **🔧 Addendum: Separate Column Architecture**

After evaluation, we selected the **separate column approach** over single-value columns for better data integrity and financial accuracy.

---

### **✅ Architecture Decision: Why Separate Columns?**

**Pros of Separate Column Approach:**
1. **Precision-appropriate data types**
   - NUMERIC(7,4) for percents → Supports up to 999.9999%
   - NUMERIC(10,2) for flat values → Matches currency formatting expectations
   - Avoids "one-size-fits-all" precision that's not ideal for either use case

2. **Data integrity / semantic clarity**
   - Each field has a single purpose
   - Immediately obvious what the value represents
   - Reduces risk of misinterpreting values in analytics or reporting pipelines

3. **Cleaner backend calculations**
   ```python
   if type == 'percent':
       use *_percent
   else:
       use *_flat
   ```
   - No parsing or type-based casting needed

4. **API & frontend clarity**
   - UI logic becomes straightforward: Show one input, send value to one field
   - Backend can enforce that only one of the two fields is non-zero for a given type

**Tradeoffs:**
- Slightly higher schema complexity (15 fields instead of 5)
- Extra validation logic needed
- Worth it for financial data integrity and long-term maintainability

### **✅ Enhanced Database Schema Design**

**Separate Fields for Maximum Precision:**
```sql
-- Project markup fields (separate columns for proper precision)
material_markup_type VARCHAR(10) DEFAULT 'percent' -- 'percent' or 'flat'
material_markup_percent NUMERIC(7,4) DEFAULT 0.0    -- Percentage values
material_markup_flat NUMERIC(10,2) DEFAULT 0.0      -- Currency values
labor_markup_type VARCHAR(10) DEFAULT 'percent'
labor_markup_percent NUMERIC(7,4) DEFAULT 0.0
labor_markup_flat NUMERIC(10,2) DEFAULT 0.0

-- Discount fields with same precision approach
material_discount_type VARCHAR(10) DEFAULT 'percent'
material_discount_percent NUMERIC(7,4) DEFAULT 0.0
material_discount_flat NUMERIC(10,2) DEFAULT 0.0
labor_discount_type VARCHAR(10) DEFAULT 'percent' 
labor_discount_percent NUMERIC(7,4) DEFAULT 0.0
labor_discount_flat NUMERIC(10,2) DEFAULT 0.0
project_discount_type VARCHAR(10) DEFAULT 'percent'
project_discount_percent NUMERIC(7,4) DEFAULT 0.0
project_discount_flat NUMERIC(10,2) DEFAULT 0.0
```

**Rationale**: Separate fields ensure proper precision for each data type - percentages get 4 decimal places, currency gets 2 decimal places.

### **✅ Enhanced Validation Rules**

**Stepped Validation Approach:**
- **Minimum values**: 0.01% for percentages, $0.01 for flat amounts
- **Warning threshold**: 100% markup (unusual but allowed)
- **Hard cap**: 300% markup (requires override confirmation)
- **Override workflow**: Clear confirmation dialog with business justification

**Smart Company Defaults:**
- Materials: 20% (industry standard for material markup)
- Labor: 15% (typical labor markup range)
- Reduces initial configuration burden for new users

### **✅ Calculation Architecture**

**Immutable Audit Trail:**
- Every calculation stored with timestamp and user
- Calculation history preserved for disputes/compliance
- Real-time preview with backend verification

**Precision Handling:**
- All intermediate calculations use full decimal precision
- Final rounding only at project total level
- Prevents compound rounding errors

### **✅ User Interface Enhancements**

**Tabbed Interface Design:**
- **Company Settings**: General → Tax → Markup tabs
- **Project Modal**: Costs → Markup → Discounts tabs
- Reduces cognitive load and improves organization

**Advanced Warning System:**
- **Color-coded badges**: Green (normal), Yellow (warning), Red (requires override)
- **Contextual messages**: "Markup >100% is unusual - confirm intentional"
- **Override confirmations**: Clear business justification required

### **✅ Implementation Priority Updates**

**Phase 1 Enhancements:**
- Use separate precision fields in database schema (15 total fields)
- Add smart company defaults (20%/15%) in percent fields only
- Enhanced audit trail table tracking all field changes
- Validation to ensure type/value consistency

**Phase 4-5 Enhancements:**
- Tabbed interface implementation for better organization
- Advanced warning badge system with color coding
- Override confirmation workflows for extreme values
- Type-aware field switching (show/hide based on selection)

**Testing Matrix Additions:**
| Scenario | Expected Result |
|----------|----------------|
| Flat markup: $100 materials, $50 labor | Direct addition: $1,100 + $2,050 = $3,150.00 |
| Mixed: 10% materials, $200 labor flat | Materials: $1,100, Labor: $2,200, Total: $3,300.00 |
| Override >300% markup | Confirmation dialog → Audit log entry |
| Minimum validation | 0.01% and $0.01 enforced |
| Type consistency | Only matching value field has non-zero value |
| Precision verification | Percent fields: 4 decimals, Flat fields: 2 decimals |
| Field switching | UI shows only relevant input based on type selection |

---

---

## **📋 Discount Reason Feature - Acceptance Criteria**

### **Database Requirements:**
- [ ] Project model includes 3 new VARCHAR(500) fields: `material_discount_reason`, `labor_discount_reason`, `project_discount_reason`
- [ ] Fields are nullable at database level (existing projects won't break)
- [ ] Schema migration runs successfully without data loss

### **API Requirements:**
- [ ] Project schemas include discount reason fields (optional)
- [ ] API accepts and returns discount reason data
- [ ] API validation enforces reason requirement when discount > 0
- [ ] Reason validation: 3-500 characters when discount applied

### **Frontend Requirements:**
- [ ] Discount reason text inputs appear below each discount amount in ProjectModal
- [ ] Inputs are conditionally required (only when discount > 0)
- [ ] Real-time validation with clear error messages
- [ ] Placeholder text guides user input
- [ ] Form submission includes discount reasons
- [ ] Discount reasons display in project details with amounts

### **Display Requirements:**
- [ ] Format: "Material Discount (10% - repeat customer): -$100.00"
- [ ] Show reasons in both internal and client-facing views
- [ ] Long reasons truncated with ellipsis and tooltip
- [ ] Reasons persist across project editing sessions

---

## **🧪 Unit Tests Required**

### **ProjectModal Tests** *(Add 8 new tests)*
```typescript
describe('Discount Reason Functionality', () => {
  it('should show discount reason inputs when discounts are applied')
  it('should require reason when material discount > 0')
  it('should require reason when labor discount > 0') 
  it('should require reason when project discount > 0')
  it('should validate reason minimum length (3 chars)')
  it('should validate reason maximum length (500 chars)')
  it('should not require reason when discount is 0 or removed')
  it('should submit discount reasons with form data')
})
```

### **CostSummary Tests** *(Add 6 new tests)*
```typescript
describe('Discount Reason Display', () => {
  it('should display discount with reason in breakdown view')
  it('should format discount reason correctly with amount')
  it('should show discount reason in client view')
  it('should truncate long reasons with ellipsis')
  it('should handle empty/missing reasons gracefully')
  it('should display multiple discount reasons simultaneously')
})
```

### **Validation Tests** *(Add 4 new tests)*
```typescript
describe('Discount Reason Validation', () => {
  it('should accept valid reason (3-500 chars) with discount')
  it('should reject empty reason when discount applied')
  it('should reject reason under 3 characters')
  it('should reject reason over 500 characters')
})
```

### **Integration Tests** *(Add 3 new tests)*
```typescript
describe('End-to-End Discount Reason Flow', () => {
  it('should persist discount reasons across project edits')
  it('should display saved discount reasons in project details')
  it('should handle discount reason updates correctly')
})
```

**Total New Tests: 21 tests covering discount reason functionality**

---

**NEXT STEP: Begin Phase 1 - Database Foundation with Enhanced Schema** 🚀