# Feature Planning & Requirements Documentation

## **Priority Roadmap Consensus**

### **🔴 High Priority (Revenue Management Core)**
1. **~~Taxable Line Items (Phase 4)~~** - ✅ **UI COMPLETE** Individual line-item tax control
2. **Taxable Line Items (Phases 5-8)** - 🚧 **IN PROGRESS** Company defaults + tax calculation integration (see TAXABLE_LINE_ITEMS_COMPLETION.md)
3. **~~Estimate Generation~~** - ✅ **COMPLETE** Client-facing PDF estimates with signatures
4. **Invoice Creation** - Professional invoice generation with payment processing
5. **Change Order System** - Track estimate modifications and approvals

### **🟡 Medium Priority (UX & Standards)**
6. **Marketing Website & Landing Pages** - Professional www.buildcraftpro.com with product demos, pricing, testimonials, and conversion funnels
7. **User Workflow Optimization** - Comprehensive UX assessment of common contractor workflows to minimize clicks and streamline task completion
8. **Company Setup Wizard** - Optional guided setup for new users with company settings, defaults, and configuration (skippable with sensible defaults)
9. **Standardized API Error Format** - Consistent error handling
10. **Phone Number & Currency Formatting** - Professional data display
11. **Trip Charge Functionality** - Additional revenue line item
12. **Legal Boilerplate Templates** - Estimate/invoice legal text
13. **Demo User System** - Sales and testing capabilities
14. **AI Material Estimation** - GPT-assisted quantity prediction
15. **Material Library Management** - User-maintained material_entries with full CRUD
16. **Navigation Enhancement** - Back-arrow/Dashboard links for easier navigation
17. **Inline Client Creation** - Create clients within Project modal without navigation

### **🟠 System-Wide Enhancement Features (Post-MVP)**
18. **Company Branding & Customization System** - Logo upload, color themes, and consistent branding across estimates, invoices, emails, and client portals
19. **Advanced Email Template System** - Rich text editor with preview functionality for all communications
20. **Multi-Currency Support** - Currency conversion and display for invoices, estimates, and reporting

### **🟡 Invoice-Specific Enhancements**
21. **Estimate Change Diff UI** - Visual comparison of estimate versions with highlighting
22. **Enhanced Refund Workflows** - Improved audit requirements and approval processes
23. **Invoice Performance Analytics** - View-to-pay conversion rates and payment timing analysis

### **🟢 Low Priority (Technical Debt)**
24. **Staging Static Asset 401 Bug** - Cosmetic issue fix

### **📋 Post-Revenue Management Cleanup Milestone**
- **Refactor models.py/schemas.py** - Domain-based file separation (planned after invoice generation features complete)
- **Advanced Trip Charge Features** - GPS/distance integration based on user feedback
- **Third-party E-Signature Integration** - DocuSign/HelloSign API for full compliance
- **Company Branding System Implementation** - Comprehensive branding across all customer touchpoints

## **✅ Completed Features**

### **✅ 1. Project-Level Sales Tax - COMPLETE**

**🎆 Implementation Status: PRODUCTION READY**
- ✅ All requirements fulfilled and tested
- ✅ Real-time tax calculations with full precision
- ✅ Company defaults with project-level overrides
- ✅ Tax exempt functionality
- ✅ Consistent UX across all forms
- ✅ Database migrations completed
- ✅ Production deployment verified

**Key Technical Achievements:**
- NUMERIC(6,6) precision supporting rates up to 99.9999%
- Real-time calculation updates across subproject changes
- Clean architecture without redundant cost fields
- Comprehensive error handling and validation

### **✅ 2. Taxable Line Items (Phase 4) - UI COMPLETE**

**🎆 Implementation Status: UI LAYER COMPLETE**
- ✅ Individual line-item tax control checkboxes in all modals
- ✅ Visual tax status indicators in all table columns  
- ✅ Database schema with `is_taxable` field on all cost items
- ✅ API endpoints updated to handle tax field
- ✅ 27 comprehensive unit tests covering tax control functionality
- ✅ Frontend user testing verified working correctly

**Key Technical Achievements:**
- Mobile-first click-to-edit tables with tax status indicators
- React Hook Form integration with persistent tax settings
- TanStack Table columns showing "Taxable" (green) vs "Tax Exempt" (gray)
- Comprehensive test coverage for all tax control scenarios

**🚨 CRITICAL: Business Logic Integration Still Required**
- ❌ Project tax calculation still uses old "all-or-nothing" logic
- ❌ Company-level tax defaults not implemented (hardcoded to all true)
- ❌ Demo data doesn't reflect realistic tax scenarios
- ❌ Individual line-item settings don't affect actual project tax amounts

**Next Steps**: Complete Phases 5-8 (see TAXABLE_LINE_ITEMS_COMPLETION.md)

### **✅ 3. Markup System (Labor & Materials) - COMPLETE**

**🎆 Implementation Status: PRODUCTION READY**
- ✅ Per-category markups for Materials and Labor
- ✅ Company defaults with project-level overrides  
- ✅ Discount system with reason tracking
- ✅ Real-time calculations with proper order (Base → Markup → Discount → Tax)
- ✅ Comprehensive test coverage (36 backend + 43 frontend tests)
- ✅ Production deployment verified

**Key Technical Achievements:**
- Separate percent/flat fields for data integrity
- NUMERIC(7,4) precision for percentages up to 999.9999%
- Discount reason fields for audit trail
- Smart UI showing only relevant inputs based on type
- Warning system for high markups and excessive discounts

---

## **Detailed Feature Specifications**

### **1. Taxable Line Items**

**✅ READY FOR IMPLEMENTATION - See TAXABLE_ITEMS_IMPLEMENTATION.md**

**Core Business Logic:**
- **Per-item tax control**: Mark individual materials, labor, permits, and other costs as taxable/non-taxable
- **Smart defaults**: Company-level defaults by category (materials typically taxable, labor/permits typically not)
- **Clean data model**: Remove stored totals, calculate on-the-fly for data integrity
- **Notes field**: Add notes to each line item for documentation

**Implementation Approach:**
- **Phase 0**: Technical debt cleanup - remove stored totals
- **Phase 1**: Database foundation - add taxability fields and defaults
- **Phase 2**: Backend calculation updates
- **Phase 3**: Frontend taxability controls  
- **Phase 4**: Notes implementation
- **Phase 5**: Testing and refinement

**Key Benefits:**
- Accurate tax calculations for estimates
- Regulatory compliance with varying tax rules
- Professional estimates with proper breakdowns
- Foundation for estimate generation feature

---

### **2. Estimate Generation**

**✅ IMPLEMENTATION READY - See ESTIMATE_GENERATION_IMPLEMENTATION.md**

**🎆 Specification Status: PRODUCTION-GRADE COMPLETE**
- ✅ Comprehensive 6-phase implementation plan (14 hours total)
- ✅ Complete database schema with audit trails and versioning
- ✅ Legal compliance with electronic signature validation
- ✅ Security hardening with HMAC signature integrity verification
- ✅ Mobile-first client experience with touch signature capture
- ✅ Professional PDF generation with WeasyPrint integration
- ✅ Complete business logic for estimate lifecycle management

**Key Technical Achievements:**
- Manual versioning with superseding relationship structure
- Cost snapshot immutability at signature time for legal compliance
- Comprehensive access control with role-based permissions ("estimator" role)
- Email notification system with company-configurable preferences
- File storage strategy with permanent signed PDFs and temporary draft cache
- Change order foundation and approval workflow architecture

**Implementation Dependencies:**
- **Billing System**: Requires Phase 1-3 completion for subscription-based access control
- **User Role System**: Needs "estimator" role addition during billing implementation
- **Email Integration**: SendGrid/Resend setup for estimate notifications

**Business Value:**
- Professional client-facing estimates that win more contracts
- Legal protection with compliant electronic signatures and audit trails
- Foundation for change orders, approvals, and advanced workflow features
- Integration with existing project cost tracking for accurate estimates

**Implementation Sequence:**
1. **Billing System Phase 1-3** (Database, core APIs, access control)
2. **Estimate Generation Phase 1-6** (Complete estimate system)
3. **Invoice Creation Phase 1-7** (Professional invoicing with payment processing)
4. **Change Orders** (Building on estimate and invoice foundations)

---

### **3. Invoice Creation**

**✅ IMPLEMENTATION READY - See INVOICE_CREATION_IMPLEMENTATION.md**

**🎆 Specification Status: PRODUCTION-GRADE COMPLETE**
- ✅ Comprehensive 7-phase implementation plan (21 hours total)
- ✅ Complete database schema with business rule constraints and audit trails
- ✅ Payment processing abstraction layer with Stripe Connect integration
- ✅ Security hardening with payment locks and token expiry management
- ✅ Legal compliance with comprehensive boilerplate and audit systems
- ✅ Professional PDF generation with email delivery tracking
- ✅ Complete business logic for invoice lifecycle and payment processing

**Key Technical Achievements:**
- Invoice type constraints with business rule enforcement (one final per project)
- Payment processing race condition prevention with automatic lock cleanup
- Comprehensive client payment access with secure anonymous tokens
- Tax calculation integration with existing project tax system
- Change order invoice workflow with proper change tracking
- Retainage management with milestone and completion workflows
- Email template system with provider webhook integration
- Complete audit trails for financial compliance and dispute resolution

**Implementation Dependencies:**
- **Estimate Generation**: Must be complete for invoice-estimate integration
- **Email Service Integration**: Required for invoice delivery and tracking
- **Stripe Connect Setup**: Account verification and payment processing

**Business Value:**
- Professional invoice generation that improves cash flow
- Automated payment processing reducing administrative overhead
- Legal protection with comprehensive audit trails and compliance
- Foundation for advanced financial features (recurring billing, analytics)
- Integration with existing project cost tracking for accurate invoicing

**Implementation Sequence:**
1. **Database Foundation** (Invoice tables, constraints, audit systems)
2. **Core Invoice Logic** (Creation, validation, business rules)
3. **Manual Payment Processing** (Check, cash, ACH tracking)
4. **PDF Generation** (Professional invoice templates)
5. **Legal Boilerplate System** (Templates, customization, compliance)
6. **Stripe Connect Integration** (After mandatory architecture review)
7. **Frontend Interface** (Invoice management, payment tracking)

---

### **4. Marketing Website & Landing Pages**

**📋 SPECIFICATION READY - Business Development Priority**

**🎯 Website Overview:**
Professional marketing website at www.buildcraftpro.com to drive product awareness, lead generation, and customer conversion with clear separation from the application at app.buildcraftpro.com.

**Site Architecture:**
```
www.buildcraftpro.com (Marketing Site)
├── / (Homepage)
├── /features (Product Features)
├── /pricing (Plans & Pricing)
├── /demo (Interactive Demo)
├── /testimonials (Customer Stories)
├── /resources (Blog/Documentation)
├── /about (Company Info)
├── /contact (Contact/Support)
├── /login (Redirect to app.buildcraftpro.com)
└── /signup (Conversion Landing)

app.buildcraftpro.com (Application)
├── /dashboard (Main App)
├── /login (Authentication)
├── /register (Account Creation)
└── [All App Routes]
```

**Key Pages & Content:**

**1. Homepage** (Primary Conversion Page)
- **Hero Section**: "Professional Construction Estimates & Invoices Made Simple"
- **Value Proposition**: Save 10+ hours per week on project administration
- **Feature Highlights**: Tax control, PDF generation, payment processing, mobile-friendly
- **Social Proof**: Customer testimonials and success metrics
- **Clear CTA**: "Start Free Trial" → app.buildcraftpro.com/register

**2. Features Page** (Product Education)
- **Project Management**: Cost tracking, subproject organization
- **Estimate Generation**: Professional PDFs with e-signatures
- **Invoice Processing**: Stripe integration, payment tracking
- **Tax Control**: Individual line-item tax management
- **Mobile Experience**: On-site cost entry and project updates
- **Integrations**: QuickBooks, tax reporting, email notifications

**3. Pricing Page** (Conversion Optimization)
- **Basic Plan**: $39/month or $390/year (save 17%)
- **Pro Plan**: $89/month or $890/year (save 17%)
- **14-Day Free Trial**: Full access, no credit card required initially
- **Feature Comparison**: Clear matrix of Basic vs Pro capabilities
- **ROI Calculator**: Time savings and cost benefits calculator

**4. Interactive Demo** (Product Showcase)
- **Guided Product Tour**: Step-by-step walkthrough of key features
- **Sample Project**: Real construction project with actual costs
- **Live Calculations**: Show real-time tax, markup, and total calculations
- **PDF Preview**: Generate sample estimate and invoice
- **No Registration Required**: Immediate value demonstration

**5. Customer Testimonials** (Trust Building)
- **Case Studies**: Detailed success stories with metrics
- **Video Testimonials**: Contractor interviews and recommendations
- **Before/After**: Time savings and efficiency improvements
- **Industry Validation**: Recognition and awards
- **Customer Logos**: Professional contractor company representations

**Technical Implementation:**

**Tech Stack Recommendation:**
```typescript
// Static Site Generator (Fast, SEO-optimized)
Framework: Next.js with Static Generation
Hosting: Vercel or Netlify
CMS: Contentful or Sanity (for blog/testimonials)
Analytics: Google Analytics 4 + Hotjar
SEO: Next.js built-in SEO optimization

// Key Libraries
- Framer Motion (animations)
- Tailwind CSS (styling consistency with app)
- React Hook Form (contact forms)
- Stripe Elements (pricing display)
- Calendly (demo scheduling)
```

**SEO Strategy:**
- **Target Keywords**: "construction estimating software", "contractor invoicing", "construction project management"
- **Local SEO**: Target major construction markets (Texas, California, Florida)
- **Content Marketing**: Blog with contractor tips, tax guidance, project management best practices
- **Technical SEO**: Page speed optimization, mobile responsiveness, structured data

**Conversion Optimization:**

**A/B Testing Focus Areas:**
- Hero section messaging and CTA placement
- Pricing page layout and plan positioning
- Demo vs trial as primary CTA
- Testimonial placement and format
- Feature descriptions and benefits

**Lead Capture Strategy:**
- **Primary CTA**: "Start Free Trial" (high-intent)
- **Secondary CTA**: "Watch Demo" (education phase)
- **Content Gates**: "Construction Tax Guide" for email capture
- **Exit Intent**: Special offer popup for leaving visitors

**Integration Requirements:**

**Marketing Tools:**
```typescript
// Analytics and Tracking
interface MarketingIntegrations {
  google_analytics: GoogleAnalytics4Config
  facebook_pixel: FacebookPixelConfig
  linkedin_insight: LinkedInConfig
  hotjar_heatmaps: HotjarConfig
}

// Lead Management
interface LeadCapture {
  email_provider: 'ConvertKit' | 'Mailchimp' | 'SendGrid'
  crm_integration: 'HubSpot' | 'Pipedrive'
  demo_scheduling: 'Calendly' | 'ScheduleOnce'
}
```

**Content Management:**
- **Blog System**: SEO-optimized articles for contractor education
- **Case Study Templates**: Standardized success story format
- **Resource Library**: Downloadable guides, templates, checklists
- **FAQ System**: Searchable help documentation

**Performance Requirements:**
- **Page Load Speed**: <2 seconds first contentful paint
- **Mobile Performance**: 95+ Lighthouse mobile score
- **SEO Score**: 95+ Lighthouse SEO score
- **Accessibility**: WCAG 2.1 AA compliance
- **Uptime**: 99.9% availability SLA

**Business Value:**
- **Lead Generation**: Professional presence for inbound marketing
- **Conversion Optimization**: Dedicated funnel for trial signups
- **Brand Authority**: Establishes BuildCraftPro as industry leader
- **SEO Benefits**: Organic traffic and search visibility
- **Sales Support**: Resource for demos and customer education

**Implementation Dependencies:**
- **Domain Setup**: www.buildcraftpro.com DNS configuration
- **Brand Assets**: Logo, color scheme, typography guidelines
- **Content Creation**: Copywriting, photography, video production
- **Analytics Setup**: Tracking and conversion measurement
- **Legal Pages**: Privacy policy, terms of service, GDPR compliance

**Success Metrics:**
- **Traffic Growth**: Organic search traffic increase
- **Conversion Rate**: Visitor-to-trial conversion percentage
- **Trial Quality**: Trial-to-paid conversion rate
- **SEO Rankings**: Target keyword positioning
- **Page Performance**: Core Web Vitals scores

**Planned Implementation:** Post-Invoice Creation (V1.5)

---

### **5. User Workflow Optimization**

**📋 SPECIFICATION READY - High UX Impact Priority**

**🎯 Assessment Overview:**
Comprehensive analysis and optimization of contractor workflows to minimize friction and maximize efficiency in common tasks.

**Primary Workflows to Analyze:**
- **New Project Creation**: Client selection → Project setup → Subproject creation → Cost entry
- **Cost Entry & Estimation**: Material/labor/permit entry → Markup application → Tax calculation → Final review
- **Estimate Generation**: Project completion → PDF creation → Client sending → Signature tracking
- **Invoice Processing**: Project-to-invoice conversion → Payment processing → Status tracking
- **Change Order Management**: Scope changes → Estimate updates → Client approval

**Optimization Targets:**
- **Reduce clicks by 40%** for common task completion
- **Eliminate redundant navigation** between related forms
- **Streamline data entry** with smart defaults and autocomplete
- **Batch operations** for repetitive tasks
- **Contextual actions** based on current workflow state

**Technical Implementation Areas:**
```typescript
// Workflow optimization examples
interface WorkflowMetrics {
  task_name: string
  current_clicks: number
  target_clicks: number
  current_time_seconds: number
  target_time_seconds: number
  pain_points: string[]
  proposed_solutions: string[]
}

// Smart defaults and context awareness
interface ContextualDefaults {
  last_used_client: Client
  common_materials: Material[]
  typical_markup_rates: MarkupRates
  preferred_settings: UserPreferences
}
```

**Key Optimization Strategies:**
- **Inline editing**: Edit costs directly in tables without modal dialogs
- **Bulk operations**: Select multiple items for markup/tax changes
- **Smart navigation**: Contextual "Next Step" suggestions
- **Keyboard shortcuts**: Power user acceleration
- **Mobile optimization**: Touch-friendly interactions for on-site use

**Success Metrics:**
- Task completion time reduction (measured in user testing)
- Click count reduction for common workflows
- User satisfaction scores (task ease ratings)
- Feature adoption rates for optimization improvements

**Business Value:**
- Improved user productivity and satisfaction
- Reduced learning curve for new users
- Competitive advantage through superior UX
- Foundation for mobile app user experience

**Planned Implementation:** Post-Invoice Creation (V1.5)

---

### **5. Company Setup Wizard**

**📋 SPECIFICATION READY - Onboarding Enhancement**

**🎯 Wizard Overview:**
Optional guided setup experience for new users to configure company settings, defaults, and preferences with ability to skip and use sensible defaults.

**Wizard Flow Design:**
1. **Welcome & Introduction** (30 seconds)
   - Overview of BuildCraftPro features
   - Option to "Skip Setup" or "Customize Settings"

2. **Company Information** (60 seconds)
   - Company name, address, phone, email
   - Logo upload (optional)
   - Industry type selection for smart defaults

3. **Financial Defaults** (90 seconds)
   - Default markup rates (materials/labor)
   - Tax settings (rate, exempt categories)
   - Payment terms and late fee preferences
   - Currency and number formatting

4. **Project Preferences** (60 seconds)
   - Default project categories
   - Common material/labor types
   - Invoicing preferences

5. **Legal & Compliance** (45 seconds)
   - Legal boilerplate preferences
   - Retainage settings (if applicable)
   - Electronic signature preferences

6. **Review & Confirmation** (30 seconds)
   - Summary of all settings
   - Option to modify any section
   - "Start Using BuildCraftPro" completion

**Technical Implementation:**
```typescript
interface SetupWizardState {
  currentStep: number
  totalSteps: number
  completedSteps: WizardStep[]
  canSkip: boolean
  hasChanges: boolean
}

interface WizardStep {
  id: string
  title: string
  description: string
  component: React.Component
  validation: ValidationSchema
  defaultValues: any
  isOptional: boolean
}

// Smart defaults based on industry/company size
interface IndustryDefaults {
  construction_type: 'residential' | 'commercial' | 'mixed'
  typical_markup_rates: MarkupRates
  common_tax_exempt_items: string[]
  standard_payment_terms: number
}
```

**Key Features:**
- **Progress indicator**: Clear visual progress through steps
- **Skip individual sections**: Users can skip non-essential steps
- **Smart defaults**: Industry-appropriate defaults pre-selected
- **Save and continue later**: Incomplete wizard can be resumed
- **Settings preview**: Show how choices affect the application
- **Quick setup option**: Express path with minimal configuration

**Skip Strategy:**
- **Sensible defaults**: Carefully chosen defaults that work for 80% of users
- **Progressive disclosure**: Additional settings available later in app
- **One-click setup**: "Use recommended settings" option
- **Post-setup prompts**: Gentle reminders to complete setup later

**Business Value:**
- Reduced time-to-value for new users
- Higher feature adoption through guided discovery
- Reduced support requests for basic configuration
- Professional onboarding experience

**Implementation Dependencies:**
- **Company settings system**: Core settings must be complete
- **Default templates**: Legal boilerplate and email templates
- **User preferences system**: Storage for wizard completion state

**Planned Implementation:** Post-User Workflow Optimization (V2)

---

### **6. Company Branding & Customization System**

**📋 SPECIFICATION READY - Post-MVP Priority**

**🎯 System Overview:**
Comprehensive branding system providing consistent company identity across all customer-facing documents, interfaces, and communications.

**Core Capabilities:**
- **Logo Management**: Upload, resize, and position company logos
- **Color Scheme Customization**: Primary/secondary colors, accent colors
- **Document Templates**: Branded headers/footers for estimates, invoices, change orders
- **Email Branding**: Custom signatures, headers, and styling
- **Client Portal Themes**: Branded payment pages and document viewing
- **Typography Control**: Font selections for professional document output

**Technical Implementation:**
```sql
-- Company branding settings
CREATE TABLE company_branding (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id),
    logo_url VARCHAR(255),
    logo_position VARCHAR(20) DEFAULT 'top-left', -- 'top-left', 'top-center', 'top-right'
    primary_color VARCHAR(7), -- Hex color code
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    font_family VARCHAR(50) DEFAULT 'Inter',
    custom_css TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id)
);

-- Document template customization
CREATE TABLE document_templates (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies(id),
    template_type VARCHAR(50) NOT NULL, -- 'invoice', 'estimate', 'change_order'
    header_template TEXT,
    footer_template TEXT,
    custom_fields JSONB, -- Additional company info fields
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, template_type)
);
```

**Affected Systems:**
- **PDF Generation**: Estimates, invoices, change orders with branded styling
- **Email Communications**: Branded templates and signatures
- **Client Payment Pages**: Consistent theme and logo placement
- **Client Portal**: Future portal branding (V2+)
- **Legal Documents**: Branded legal boilerplate and disclaimers

**Business Value:**
- Professional brand consistency across all customer interactions
- Improved brand recognition and trust
- Reduced design/customization requests from customers
- Foundation for white-label solutions (Enterprise)

**Implementation Dependencies:**
- **File Upload System**: Logo and asset management
- **CSS/Styling Engine**: Dynamic theme application
- **PDF Generation System**: Template integration with branding
- **Email Service**: Template customization capability

**Planned Implementation:** Post-Revenue Management Core (V1.5)

---

### **5. Change Order System**

**Implementation Dependencies:**
- **Estimate Generation**: Must be complete first (change orders build on estimate foundation)
- **Approval Workflows**: Database schema already planned in estimate system
- **Version Control**: Superseding relationship architecture ready

**Business Logic:**
- Change orders as new estimates with `parent_estimate_id` relationship
- Cost modifications (additive, subtractive, or scope changes)
- Client approval workflow with signature capture
- Audit trail of all project changes and their approval status

## **Medium Priority Features**

### **4. Standardized API Error Format**

**Current Issues:**
- Inconsistent error message formats across API endpoints
- Frontend handling difficult due to varying error structures
- No standard validation error format
- Missing error codes for proper client-side handling

**Agreed Requirements:**
- Standardized error response format across all endpoints
- Consistent field validation error structure
- Proper HTTP status codes with meaningful error messages
- Error code system for frontend localization support

### **5. Legal Boilerplate Templates**

**Agreed Requirements:**
- Editable boilerplate templates for estimates/invoices  
- Project-level and company-level customization
- Common construction industry clauses

**Technical Implementation:**
- Store templates in database with versioning
- Support rich text editing (not just plain text)
- Include merge fields for dynamic data (project name, dates, amounts)
- **CRITICAL**: Clear disclaimer that this is convenience only, not legal advice

**Standard Clauses to Include:**
- Scope of work definition
- Payment terms (due dates, late fees)
- Permitting responsibilities
- Dispute resolution process
- Warranty and liability disclaimers
- Change order process agreement

**Questions to Answer Before Implementation:**
- Should we provide industry-standard templates out of the box?
- How do we handle template versioning for legal compliance?
- What merge fields are most important?
- Should we integrate with legal document services?

---

### **5. Phone Number & Currency Formatting**

**✅ PARTIALLY COMPLETE - Phone Formatting Done**
- ✅ Registration page phone formatting: (XXX) XXX-XXXX as user types
- 🔄 Currency formatting: Still needs `Intl.NumberFormat` implementation
- 📋 Remaining: Client/user phone fields, currency display standardization

**Technical Approach:**
- Frontend: `libphonenumber-js` for phone validation/formatting  
- Currency: `Intl.NumberFormat` for consistent display
- Backend: Sanitization and validation

**Implementation Details:**
- Store phone numbers in E.164 format
- Display formatting based on user locale
- Consistent currency display across all components

---

### **6. Material Library Management**

**Agreed Requirements:**
- User-maintained material_entries with full CRUD capabilities
- Global material library for autocomplete across projects
- Bulk import/export functionality
- Category organization and search
- Price history tracking

**Technical Implementation:**
- New page: `/materials` with full table management
- Enhanced autocomplete with better search
- Material reuse tracking across projects
- Export to CSV for external price updates

**Priority:** Low - Nice-to-have feature for power users

---

### **7. Navigation Enhancement**

**Agreed Requirements:**
- Add back-arrow or Dashboard links to major app areas
- Improve navigation between Clients, Projects, Tasks, Invoices, Company Settings
- Breadcrumb navigation for deep pages
- Mobile-friendly navigation improvements

**Technical Implementation:**
- Add navigation components to page headers
- Consistent breadcrumb patterns
- Improve mobile sidebar experience
- Quick access to common actions

**Priority:** Medium - Improves user experience significantly

---

### **8. Inline Client Creation**

**Agreed Requirements:**
- Create new clients within Project modal
- Avoid navigation away from project creation flow
- Seamless client creation and selection
- Form validation and error handling

**Technical Implementation:**
- Modal-within-modal or expandable form section
- Immediate client selection after creation
- Integration with existing client validation
- Consistent UX patterns

**Priority:** Medium - Improves project creation workflow

---

### **9. Trip Charge Functionality**

**MVP Approach (Simplified Implementation):**
- Manual trip charge entry per project
- Dropdown options: Flat Fee, Per Visit, Per Mile (manual input)
- Simple integration with existing cost structure
- Apply markup and tax to trip charges like other costs

**Advanced Features (Future Phase):**
- GPS/distance-based calculation
- Integration with project scheduling
- Different rates for different service types

**Questions to Answer Before Implementation:**
- Should trip charges be per-project or per-invoice?
- How do trip charges interact with markup and tax calculation order?
- What are common contractor patterns for trip charge billing?

---

## **Technical Architecture Decisions**

### **Database Schema Strategy**
**RESOLVED - Compromise Approach:**
- **Current Phase**: Maintain single-file structure for `models.py` and `schemas.py`
- **Post-Estimate Milestone**: Plan deliberate refactor after core financial features complete
- **Rationale**: Avoid premature optimization while acknowledging future complexity will require cleanup

**Implementation Plan:**
- Continue with current structure through sales tax, markup, and estimate features
- Create cleanup milestone once financial feature complexity grows
- Domain-based separation: `user.py`, `project.py`, `invoice.py`, `estimate.py`

### **PDF Generation Strategy**
**RESOLVED - Server-side Approach:**
- **Recommended**: `WeasyPrint` (excellent CSS support) or `pdfkit` (HTML-based)
- **Rationale**: Server-side generation for legally-sensitive documents provides better control and consistency
- **Future Consideration**: Third-party services (Docmosis, PDFMonkey) if layout complexity grows significantly

**Implementation Benefits:**
- Full control over PDF rendering
- Consistent output across environments  
- Better security for sensitive financial documents
- Professional layout capabilities with CSS

---

## **Pre-Implementation Checklist**

### **Before Starting Any Feature:**
1. ✅ Review this document for feature-specific questions
2. ✅ Make final decisions on open technical questions
3. ✅ Document any changes to requirements
4. ✅ Plan database migration strategy if needed
5. ✅ Consider impact on existing features
6. ✅ Define testing approach for staging environment

### **Sales Tax Implementation:**
- ✅ **COMPLETE - All phases implemented and production ready**
- ✅ Tax rate validation: 0-50% with >25% warning
- ✅ Company settings design: Simple table with default_sales_tax_rate
- ✅ Migration strategy: Safe batch update to 0%, no recalculation
- ✅ Tax-exempt handling: Project-level boolean override
- ✅ All technical specifications finalized
- ✅ NUMERIC(6,6) precision for full tax rate support
- ✅ Real-time calculations across all subproject changes
- ✅ Production deployment and testing complete

### **Markup System Implementation:**
- [ ] Finalize markup storage approach (per-category vs project-wide)
- [ ] Design markup audit trail if needed
- [ ] Plan integration with existing cost calculations
- [ ] Update feature numbering after sales tax completion

### **Estimate Generation Implementation:**
- [ ] Choose PDF generation approach
- [ ] Design client access method (portal vs anonymous)
- [ ] Research electronic signature compliance requirements
- [ ] Plan estimate versioning data structure

### **Change Order System Implementation:**
- [ ] Design approval workflow state machine
- [ ] Plan change diff calculation approach
- [ ] Determine client interaction capabilities

---

## **Audit Trail & Event Logging**

### **Financial Event Tracking**
Track every major financial or legal change with complete audit trail:

```json
{
  "event": "estimate_revision",
  "user": "tony",
  "timestamp": "2025-01-15T10:30:00Z",
  "entity_type": "project", 
  "entity_id": 123,
  "old": { "labor": 5000 },
  "new": { "labor": 6000 },
  "note": "Plumber cost updated after bid",
  "ip_address": "192.168.1.1"
}
```

### **Estimate Lifecycle Events**
**Required State Transitions:**
- `draft` → `sent` → `viewed` → `signed` → `locked`
- Each transition logged with timestamp, user, and context
- Complete traceability for disputes or compliance audits

### **Event Types to Track:**
- Estimate creation, revision, sending, viewing, signing
- Change order creation and approval  
- Markup modifications
- Tax rate changes
- Payment status updates
- Project status changes

---

## **Compliance & Legal Considerations**

### **Electronic Signatures:**
**Phased Compliance Approach:**
1. **Phase 1**: Draw-to-sign + timestamp (simple, familiar UX)
2. **Phase 2**: Typed name + checkbox + IP logging (legally sufficient for most states)
3. **Phase 3**: Third-party integration (DocuSign/HelloSign for full compliance)

**Research Requirements:**
- Construction industry signature requirements by state
- Audit trail and verification standards
- Binding vs non-binding estimate classification

### **Data Retention:**
- Signed estimate storage requirements
- Change order documentation retention
- Legal compliance for financial records

### **Disclaimers Required:**
- Legal boilerplate templates are for convenience only
- Tax calculations may require professional review
- Electronic signatures compliance with local laws
- Warranty and liability limitations

---

## **Success Metrics for Each Feature**

### **Sales Tax:**
- Accurate tax calculations on all estimates/invoices
- Easy per-project tax rate override
- Clear tax breakdown display

### **Markup System:**
- Markup never visible to clients
- Accurate profit margin calculations
- Easy markup configuration per project

### **Estimate Generation:**
- Professional PDF estimates
- Successful signature capture
- Locked estimate integrity

### **Change Orders:**
- Complete audit trail of changes
- Clear approval workflow
- Client-visible change history

## **Key Questions Requiring Clarification**

### **Critical Legal/Business Questions:**
1. ✅ **RESOLVED - Estimate Legal Status**: Formal "offer" that becomes binding upon signature with user-configurable legal stance and disclaimers

2. **What are common contractor patterns for trip charge billing?**
   - Per-project vs per-invoice
   - Distance-based vs flat fee preferences  
   - Integration with existing cost structures

3. **Should markup be per-category (Materials/Labor separate) or project-wide?**
   - Affects database design and calculation complexity
   - Impacts contractor workflow and profitability tracking

### **Technical Implementation Questions:**
1. **How granular should estimate cost breakdowns be?**
   - Category totals only vs detailed line items
   - Client-facing transparency vs internal detail

2. **What happens when estimates expire?**
   - Automatic status changes, notifications
   - Re-approval workflow requirements

---

## **Implementation Readiness Status**

### **✅ Ready to Implement:**
1. **Sales Tax System** - All decisions made, ready to begin
2. **Trip Charges (MVP)** - Manual entry approach confirmed
3. **PDF Generation** - Server-side WeasyPrint approach locked in  
4. **E-Signature (Phase 1)** - Draw-to-sign canvas for MVP

### **🟡 Needs Final Decisions:**
1. **Markup System** - Per-category vs project-wide structure
2. **Estimate Breakdowns** - Granularity level for client-facing documents

### **🔴 Requires Research:**
1. **Trip Charge Patterns** - Industry billing practices
2. **Estimate Expiration** - Workflow and notification requirements

---

**NEXT STEP: Begin Markup System implementation** - Sales tax complete, markup is now the highest priority feature.

This document will be referenced before implementing each feature to ensure all decisions are made and requirements are clear.