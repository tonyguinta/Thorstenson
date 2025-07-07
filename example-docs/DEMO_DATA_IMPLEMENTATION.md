# Demo Data Reset Implementation Guide

## Overview
This document outlines the implementation of a demo data reset endpoint that creates a complete demo environment on-demand for showcasing BuildCraftPro to prospects.

## Business Requirements
- **Purpose**: Allow prospects to explore a fully-populated BuildCraftPro account without signup
- **Endpoint**: POST `/api/demo/reset` (public, no auth required)
- **Demo Credentials**: demo@buildcraftpro.com / DemoPass123!
- **Behavior**: Delete and recreate all demo user data with realistic construction industry examples
- **Security**: Rate-limited, isolated to demo account only

## Technical Architecture

### Database Considerations
- Demo user identified by email: `demo@buildcraftpro.com`
- Cascade deletes ensure complete cleanup
- All data creation respects existing business rules and relationships
- Use bulk inserts for performance (100+ records created)
- Wrap entire operation in database transaction for atomicity

### Performance Optimizations
- Use `bulk_insert_mappings()` for cost items (materials, labor, permits)
- Pre-compile material library data for reuse
- Target < 3 second total execution time

### Data Structure
```
Demo User (demo@buildcraftpro.com)
├── Company Settings
│   ├── Default tax rate: 7.875% (MN + local)
│   ├── Materials markup: 20%
│   └── Labor markup: 35%
├── 5 Clients
│   ├── Smith Residence (Residential)
│   ├── Johnson Commercial (Commercial) 
│   ├── Davis Properties (Residential)
│   ├── Miller Home (Residential)
│   └── Wilson Builders (Commercial)
└── 9 Projects (varied states and complexity)
    └── 25+ Subprojects with cost data
```

## Implementation Phases

### Phase 1: API Endpoint & Security (45-60 minutes)
**Goal**: Create secure demo reset endpoint with rate limiting

**Tasks**:
1. Create `/api/demo/reset` endpoint in new `demo.py` router
2. Implement rate limiting (1 request per minute per IP)
3. Add security checks (only affects demo@buildcraftpro.com)
4. Create response schema with credentials and success message

**Success Criteria**:
- [ ] Endpoint accessible without authentication
- [ ] Rate limiting prevents abuse (429 response on excessive requests)
- [ ] Endpoint only affects demo user data
- [ ] Returns demo credentials in response

### Phase 2: Demo Data Factory (60-75 minutes)
**Goal**: Create comprehensive demo data generation logic

**Tasks**:
1. Create demo user with hashed password
2. Set company settings with realistic defaults
3. Generate 5 diverse clients (mix of residential/commercial)
4. Create variety of project states:
   - 2 completed projects (with full cost history)
   - 3 active projects (in progress)
   - 4 planning projects (estimates only)
5. Populate MaterialEntry table with 50+ common construction materials:
   - Lumber (2x4, 2x6, plywood sheets)
   - Drywall and finishing materials
   - Plumbing fixtures and supplies
   - Electrical components
   - Hardware and fasteners

**Success Criteria**:
- [ ] Demo user can log in with credentials
- [ ] Company settings include tax and markup defaults
- [ ] Projects show variety of construction types
- [ ] Data feels realistic and comprehensive

### Phase 3: Subproject & Cost Data Generation (75-90 minutes)
**Goal**: Populate projects with detailed cost tracking data

**Tasks**:
1. Create 2-5 subprojects per project with descriptive names:
   - Kitchen Remodel, Master Bathroom, Deck Addition, etc.
2. Add materials with realistic construction items:
   - Lumber, drywall, fixtures, hardware, etc.
3. Add labor entries with trade categories:
   - Carpenter, electrician, plumber, general labor
4. Add permits where appropriate:
   - Building permits, electrical permits, plumbing permits
5. Include other costs:
   - Dumpster rental, equipment rental, delivery fees

**Success Criteria**:
- [ ] Each project has comprehensive cost breakdown
- [ ] Costs reflect realistic construction industry values
- [ ] Mix of cost states (some complete, some in-progress)
- [ ] Total project costs calculate correctly

### Phase 4: Additional Demo Features (45-60 minutes)
**Goal**: Showcase advanced features with demo data

**Tasks**:
1. Create tasks for active projects
2. Generate 2-3 invoices in various states:
   - Draft invoice
   - Sent invoice
   - Paid invoice
3. Apply tax exemption to one commercial client
4. Add project-specific markup overrides to showcase flexibility

**Success Criteria**:
- [ ] Tasks demonstrate project management features
- [ ] Invoices show billing workflow
- [ ] Tax and markup features are demonstrated
- [ ] Dashboard shows meaningful metrics

### Phase 5: Testing & Error Handling (45-60 minutes)
**Goal**: Ensure robust operation and proper error handling

**Tasks**:
1. Write comprehensive unit tests:
   - Test endpoint security and rate limiting
   - Test data creation completeness
   - Test idempotency (multiple resets work)
   - Test cascade deletion
2. Add error handling:
   - Database transaction rollback on failure
   - Meaningful error messages
   - Logging for monitoring

**Test Coverage Required**:
- [ ] test_demo_reset_creates_user
- [ ] test_demo_reset_deletes_existing_data  
- [ ] test_demo_reset_rate_limiting
- [ ] test_demo_reset_only_affects_demo_user
- [ ] test_demo_reset_creates_complete_data_structure
- [ ] test_demo_reset_transaction_rollback
- [ ] test_demo_reset_cleans_dirty_data
- [ ] test_demo_reset_after_modifications

**Success Criteria**:
- [ ] All tests passing
- [ ] Endpoint handles errors gracefully
- [ ] No partial data states possible
- [ ] Performance under 5 seconds

### Phase 6: Frontend Integration & Documentation (30-45 minutes)
**Goal**: Create hidden admin route for demo reset functionality

**Tasks**:
1. Create `/demo-reset` frontend route (React page)
2. Simple page design:
   - Title: "Demo Environment Reset"
   - Single prominent button: "Reset Demo Environment"
   - Loading state during reset (3-5 seconds)
   - Success display with demo credentials
   - Error handling for rate limits and server issues
3. Basic styling consistent with app design system
4. Success state shows:
   - Demo email and password clearly
   - Optional login link for immediate access
5. Update API documentation for demo endpoint

**Success Criteria**:
- [ ] `/demo-reset` route accessible and functional
- [ ] Clean, simple interface for internal use
- [ ] Success state clearly displays demo credentials
- [ ] Error handling for rate limits and failures
- [ ] Ready for sales team and internal demo usage

## Sample Demo Data Specifications

### Clients
1. **Smith Residence** (Residential)
   - Contact: John Smith
   - Active kitchen remodel project
   - Completed deck addition

2. **Johnson Commercial** (Commercial, tax-exempt)
   - Contact: Sarah Johnson  
   - Office renovation (active)
   - Warehouse expansion (planning)
   - Retail buildout (completed)

3. **Davis Properties** (Residential)
   - Contact: Michael Davis
   - Bathroom remodel (completed with invoice)

4. **Miller Home** (Residential)
   - Contact: Emily Miller
   - Whole house renovation (active)
   - Garage addition (planning)

5. **Wilson Builders** (Commercial)
   - Contact: Robert Wilson
   - Restaurant buildout (active)

### Project Examples

**Kitchen Remodel (Active)**
- Subprojects: Demolition, Cabinets, Countertops, Appliances
- Materials: Cabinets ($8,500), Granite ($3,200), Fixtures ($1,800)
- Labor: 120 hours carpentry, 40 hours plumbing, 30 hours electrical
- Permits: Building permit ($350)

**Office Renovation (Active)**  
- Subprojects: Framing, Electrical, HVAC, Finishes
- Comprehensive cost tracking across all categories
- Tax-exempt status applied

## API Response Schema

```json
{
  "success": true,
  "message": "Demo environment reset successfully",
  "credentials": {
    "email": "demo@buildcraftpro.com",
    "password": "DemoPass123!",
    "note": "This demo account resets periodically. Create your own account to save your data."
  },
  "stats": {
    "clients_created": 5,
    "projects_created": 9,
    "subprojects_created": 28,
    "total_demo_value": "$487,650.00"
  }
}
```

## Security Implementation

### Rate Limiting
```python
# Use in-memory store for simplicity
from collections import defaultdict
from datetime import datetime, timedelta

rate_limit_store = defaultdict(lambda: datetime.min)

def check_rate_limit(ip_address: str) -> bool:
    last_reset = rate_limit_store[ip_address]
    now = datetime.now()
    if now - last_reset < timedelta(minutes=1):
        return False
    rate_limit_store[ip_address] = now
    return True
```

### Demo User Isolation
```python
DEMO_USER_EMAIL = "demo@buildcraftpro.com"

# Only delete data for demo user
existing_user = db.query(User).filter(User.email == DEMO_USER_EMAIL).first()
if existing_user:
    db.delete(existing_user)  # Cascades to all related data
```

### Transaction Management
```python
from sqlalchemy.orm import Session
from contextlib import contextmanager

@contextmanager
def demo_reset_transaction(db: Session):
    """Ensures all-or-nothing demo reset"""
    try:
        yield db
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Demo reset failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Demo reset failed. Please try again."
        )
```

### Analytics Logging
```python
from datetime import datetime
import logging

demo_logger = logging.getLogger("demo_analytics")

def log_demo_reset(ip_address: str):
    demo_logger.info(f"Demo reset - IP: {ip_address}, Time: {datetime.utcnow()}")
```

## Testing Strategy

### Unit Tests Required
1. **Security Tests**
   - Rate limiting enforcement
   - Demo user isolation
   - No auth required

2. **Data Integrity Tests**
   - Complete data structure created
   - Calculations are correct
   - Relationships properly established

3. **Idempotency Tests**
   - Multiple resets work correctly
   - No orphaned data
   
4. **Dirty Data Tests**
   - Modify demo data (add/edit/delete clients, projects, costs)
   - Run reset and verify pristine state restored
   - Test scenarios:
     - User adds 10 new projects
     - User deletes all clients
     - User modifies company settings
     - User creates invoices and marks them paid
     - User changes project costs and markups

5. **Error Handling Tests**
   - Transaction rollback on failure
   - Proper error messages

## Success Metrics
- Demo reset completes in under 5 seconds
- 100% success rate (no partial failures)
- Comprehensive data showcases all major features
- Intuitive demo flow from login page

## Future Enhancements
- Multiple demo scenarios (small contractor vs large firm)
- Industry-specific demos (residential vs commercial focus)
- Guided tour integration
- Analytics on demo usage patterns