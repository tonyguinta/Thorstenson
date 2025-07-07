# BuildCraftPro Design System

## Color Palette

Use these colors consistently throughout the application:

- **Primary (Navy Blueprint)**: `#15446C` - headers, navigation, key UI
- **Accent (Construction Amber)**: `#E58C30` - CTAs, interactive highlights  
- **Success (Builder Green)**: `#2E7D32` - success states
- **Warning (Jobsite Yellow)**: `#FFB100` - warnings
- **Error (Safety Red)**: `#D32F2F` - errors

## UI Components

### Custom CSS Classes
```css
/* Use these custom CSS classes defined in index.css */
.btn-primary        /* Navy Blueprint background */
.btn-accent         /* Construction Amber background */
.btn-secondary      /* Neutral gray background */
.btn-outline-primary /* Navy Blueprint border */
.btn-outline-accent  /* Construction Amber border */
.card               /* Consistent card styling */
.text-primary       /* Navy Blueprint text color */
.text-accent        /* Construction Amber text color */
.text-success       /* Builder Green text */
.text-warning       /* Jobsite Yellow text */
.text-error         /* Safety Red text */
```

### Button Usage Examples
```tsx
// Primary actions (Navy Blueprint)
<button className="btn-primary">Save Changes</button>

// Call-to-action (Construction Amber)
<button className="btn-accent">Create Project</button>

// Secondary actions
<button className="btn-secondary">Cancel</button>

// Outline variants
<button className="btn-outline-primary">View Details</button>
<button className="btn-outline-accent">Learn More</button>
```

### Logo Usage
```tsx
// Dark backgrounds (navy sidebar)
<img src="/images/logos/logo.png" alt="BuildCraftPro" className="h-12 w-auto" />

// Light backgrounds (login, register, main content)
<img src="/images/logos/logo-dark-mode.png" alt="BuildCraftPro" className="h-20 w-auto" />
```

### Status Messages
```tsx
// Success messages
<p className="text-success">Client created successfully!</p>

// Warning messages  
<p className="text-warning">Please review the project details.</p>

// Error messages
<p className="text-error">Failed to save changes.</p>
```

## Frontend Development Standards

### Cost Tracking System
- **Mobile-first click-to-edit interface** with simplified table layouts
- **Optimistic UI updates** with server sync and conflict resolution
- Real-time frontend calculations with periodic backend persistence
- Material autocomplete using global MaterialEntry table for reusability
- Debounced API calls (300ms) to prevent excessive server requests
- Four cost categories per subproject: Materials, Labor, Permits, Other Costs
- Cascade calculations: items → subproject totals → project totals

### Table Display Rules
- **Right-align all numeric columns** in tables (currency, quantities, calculations)
- Use **TanStack Table** for complex editable data tables
- **Green "Taxable"** vs **Gray "Tax Exempt"** indicators for tax status

### Mobile-First Editable Tables Pattern

**Standard Implementation for Cost Tracking Tables (Materials, Labor, Permits, Other Costs):**

#### Architecture Components
- **Modal Component**: `{Type}Modal.tsx` - Full-featured editing with autocomplete
- **Table Component**: `{Type}Table.tsx` - Click-to-edit interface with simplified columns  
- **Column Definitions**: `{type}-columns.tsx` - Separate original/simplified column definitions
- **Context Integration**: Use `CostCalculationContext` for optimistic UI updates

#### Feature Flags for Rollback Safety
```typescript
const USE_MODAL_EDITING = true      // Enable modal-based editing
const USE_SIMPLIFIED_COLUMNS = true // Enable 3-column mobile layout
```

#### Mobile-First Table Design
- **3-column layout**: Description (with details), Quantity (with unit), Total (with unit cost)
- **Click-to-edit rows**: Full row clickable with hover effects (`hover:bg-blue-50 cursor-pointer`)
- **No action buttons**: Delete moved to modal for cleaner mobile interface
- **Consolidated info**: Show quantity, unit, category in description column subtitle

#### Modal Editing Standards
- **Autocomplete prevention**: Set `lastSelectedValue` when editing existing items
- **Form validation**: React Hook Form with inline error display
- **Button text**: Keep simple - "Delete", "Update", "Cancel" (no "Material", "Labor", etc.)
- **Browser autocomplete**: Disable with `autoComplete="off"` on all business forms
- **Delete confirmation**: Inline confirmation within modal (no separate modal)

#### Optimistic UI Integration
```typescript
// Standard pattern for cost updates
const { updateCost, getCost, isPending } = useCostCalculation()

// Update immediately on item changes
useEffect(() => {
  const totalCost = items.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0)
  updateCost(subproject.id.toString(), costType, totalCost, [])
}, [items, subproject.id, updateCost])
```

#### Implementation Checklist
- [ ] Create modal component with autocomplete (copy MaterialModal pattern)
- [ ] Create simplified column definitions (copy materials-columns.tsx pattern)  
- [ ] Update table component with feature flags and click-to-edit
- [ ] Integrate with CostCalculationContext for optimistic updates
- [ ] Test autocomplete, editing, deletion, and cost calculations
- [ ] Verify mobile responsiveness and accessibility

The MaterialsTable implementation serves as the reference for all other cost tracking tables.

## Demo System Usage

**Sales Demo Preparation:**
1. Visit `/demo-reset` route (hidden admin URL)
2. Click "Reset Demo Environment" button
3. Wait 3-5 seconds for complete data generation
4. Use displayed credentials: `demo@buildcraftpro.com` / `DemoPass123!`
5. Demo account contains realistic construction data (5 clients, 9 projects, 12 subprojects)

**Rate Limiting:** 1 reset per minute per IP address to prevent abuse
**Data Created:** Complete project hierarchy with materials, labor, permits, tasks, and invoices
**Perfect For:** Sales calls, trade shows, prospect demos, internal training