# Technical Debt & Architecture Concerns

This document tracks known technical debt, architecture concerns, and improvement opportunities for BuildCraftPro.

## High Priority Issues

### Integration Dependencies for Estimate Generation
- **Billing System Phase 1-3**: Database schema, core APIs, and subscription-based access control must be complete before estimate generation implementation
- **User Role System**: Need to add "estimator" role during billing system implementation
- **Email Integration**: SendGrid/Resend setup required for estimate notifications

### Database Architecture
- **Single-file models/schemas approach** - `models.py` and `schemas.py` will become unwieldy as the app grows. Consider splitting by domain when we hit ~15+ models.

### Frontend Performance & UX
- **Race condition risk in cost calculations** - Real-time cost calculations with debounced API calls could create race conditions or stale data if users edit quickly across multiple subprojects. Current pattern looks solid but needs monitoring.
- **No offline capabilities** - Contractors often work in areas with poor connectivity. Consider service worker implementation for critical features.
- **CSS class bloat potential** - BuildCraftPro design system is well-defined but could lead to CSS maintenance issues as features expand.

## Medium Priority Issues

### UX Improvements
- **Currency Formatting** - Format all dollar amounts with consistent decimal places (e.g., $1,234.00) across forms, displays, and reports using `Intl.NumberFormat`
- **Date Validation** - Prevent project end date from being set before start date with real-time validation and helpful error messages
- **Material Library Management** - User-maintained material_entries with full CRUD capabilities (moved to FEATURE_PLANNING.md)
- **Navigation Enhancement** - Back-arrow/Dashboard links for easier navigation (moved to FEATURE_PLANNING.md)
- **Inline Client Creation** - Create clients within Project modal (moved to FEATURE_PLANNING.md)

### Code Quality

#### **CRITICAL: TypeScript & Linting Cleanup (72 warnings)**
**Status**: Must be addressed - zero warnings policy going forward

**TypeScript `any` Usage (66 warnings)**:
- `src/api/client.ts` - Error handling and API responses
- `src/api/costUpdateQueue.ts` - Queue management types  
- `src/components/` - Form handlers, error callbacks, modal props
- `src/context/` - AuthContext, CostCalculationContext type definitions
- `src/pages/` - Component error handlers and form submissions
- Test files - Mock object configurations

**React Fast Refresh Issues (6 warnings)**:
- `AuthContext.tsx` - Mixed component/utility exports
- `CostCalculationContext.tsx` - Mixed component/utility exports  
- `test/utils.tsx` - Test utilities mixed with components

**Required Actions**:
1. Replace all `any` types with proper TypeScript interfaces
2. Separate utility functions from component files
3. Add strict TypeScript configuration to prevent future `any` usage
4. Implement pre-commit hooks that fail on any warnings

- **API error handling standardization** - Ensure consistent error response formats across all endpoints
- **Frontend loading state patterns** - Standardize loading spinner usage and error boundaries

### Deployment & Infrastructure
- **Duplicate requirements.txt files** - Currently maintaining both `/requirements.txt` and `/backend/requirements.txt` for Railway compatibility. Root file is used for deployment while backend file is logically correct. Need to either:
  1. Configure Railway to use backend/requirements.txt properly, or
  2. Standardize on root requirements.txt and document the architectural trade-off
- **Railway configuration complexity** - Failed attempt at custom nixpacks.toml showed that Railway auto-detection is more reliable than custom build configurations. Document when to use auto-detection vs custom configs.

## Low Priority / Future Considerations

### Performance Monitoring
- **Cost calculation performance tracking** - Monitor real-world performance of cascading calculations (items → subprojects → projects)
- **Database query optimization** - Profile common queries as data volume grows
- **Bundle size optimization** - Monitor frontend bundle size as component library expands

### Security Hardening
- **JWT token refresh strategy** - Currently using simple localStorage, consider refresh token pattern for production
- **Input sanitization review** - Ensure all user inputs are properly validated and sanitized
- **CORS configuration review** - Verify production CORS settings are appropriately restrictive

### Architecture Refactoring Triggers
- **Models split**: When `models.py` exceeds 15 models or 500 lines
- **API versioning**: When breaking changes are needed for mobile app support
- **Microservices consideration**: If team grows beyond 5 developers or performance bottlenecks emerge

## Resolved Issues

### ✅ Completed Features (Moved to FEATURE_PLANNING.md)
- **Enhanced Login UX** - Persistent error messages with registration suggestions
- **Form Privacy Enhancement** - Browser auto-complete disabled on business forms
- **Phone Number Formatting** - Auto-format phone numbers on registration page
- **Cost Breakdown Field Removal** - Removed obsolete project-level cost fields

### ✅ Completed Technical Improvements
- **Sales Tax Implementation** - Complete 6-phase implementation with company/project settings
- **Database Precision** - Fixed tax rate precision from NUMERIC(5,4) to NUMERIC(6,6)
- **Login Error UX** - Replace fast-disappearing toasts with persistent error display

---

**Note**: This document should be reviewed monthly and updated as issues are discovered or resolved. Reference from CLAUDE.md ensures future development partners are aware of these concerns.