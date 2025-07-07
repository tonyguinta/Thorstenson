# 💳 Stripe Subscription Billing Implementation Plan

## 📋 Overview

This implementation adds subscription-based billing to BuildCraftPro using Stripe. It supports monthly/annual billing, multiple tiers (Basic/Pro), trial periods, webhook integration, and comprehensive billing status tracking.

## 🎯 Business Goals

- Support **monthly and annual** subscription plans with 14-day trials
- Offer **Basic** ($39/$390) and **Pro** ($89/$890) tiers
- **Plan-first trial strategy** with payment method required upfront
- Use **Stripe Checkout** for secure subscription signups
- Use **Stripe Webhooks** for real-time billing status updates
- **Complimentary accounts** for beta testers and feedback partners
- Store comprehensive billing metadata with full audit trail
- Implement robust access control for feature gating

## 🔄 Decision Points & Considerations

### **Pricing Strategy**
- **Current**: Basic ($39/$390), Pro ($89/$890)
- **Strategic Rationale**: Professional pricing signals quality and value to general contractors
- **Market Position**: Premium quality at accessible pricing vs competitors ($99-$399/month)
- **Status**: Confirmed pricing strategy - reflects professional-grade software value

### **Trial Strategy**
- **Current**: Plan-first (show pricing → choose plan → enter payment → start trial)
- **Concern**: Plan-first might hurt signup conversion vs trial-first approach
- **Alternative**: Trial-first (start trial → choose plan during → enter payment before end)
- **Status**: Going with plan-first but monitoring conversion rates

### **Trial Length Configuration**
- **Current**: 14 days for all plans
- **Alternative**: Different lengths per plan (Basic: 14 days, Pro: 21 days)
- **Status**: Single length for simplicity but architecture supports per-plan configuration

### **UI Location**
- **Current**: Separate "Billing" section in main navigation
- **Alternative**: Under "User Settings" or "Company Settings"
- **Rationale**: Billing is user-specific initially, but architecture supports company-level billing

### **Team/Company Support**
- **Current**: Single-user model with invisible company foundation
- **Architecture**: 1:1 Company-to-User mapping that enables future team features
- **Future**: Multi-user companies with role-based billing access
- **Status**: Company model included now for zero-refactoring migration path

## 🏗️ Architecture Design

### **Database Schema**

#### **New Tables**
```python
class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_by_user_id = Column(Integer, ForeignKey("users.id"))
    
    # Audit Trail
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    users = relationship("User", back_populates="company")
    created_by = relationship("User", foreign_keys=[created_by_user_id])

class CancellationReason(str, Enum):
    COST = "cost"
    NOT_USING = "not_using"
    MISSING_FEATURES = "missing_features"
    SWITCHING_COMPETITOR = "switching_competitor"
    OTHER = "other"

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Stripe Integration
    stripe_subscription_id = Column(String, unique=True, index=True)
    stripe_customer_id = Column(String, index=True)
    
    # Subscription Details
    plan_tier = Column(String, nullable=False)  # free|basic|pro|complimentary
    billing_cycle = Column(String, nullable=False)  # monthly|annual
    status = Column(String, nullable=False)  # active|canceled|trialing|past_due|unpaid
    
    # Reactivation Tracking
    previous_subscription_id = Column(String)  # Track reactivations
    cancellation_reason = Column(String)  # Why they cancelled
    reactivation_count = Column(Integer, default=0)  # How many times they've come back
    
    # Dates
    subscription_start_date = Column(DateTime(timezone=True))
    subscription_end_date = Column(DateTime(timezone=True))
    trial_start_date = Column(DateTime(timezone=True))
    trial_end_date = Column(DateTime(timezone=True))
    current_period_start = Column(DateTime(timezone=True))
    current_period_end = Column(DateTime(timezone=True))
    
    # Audit Trail
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="subscriptions")

class BillingEvent(Base):
    __tablename__ = "billing_events"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"))
    
    # Event Details
    event_type = Column(String, nullable=False)  # subscription_created|payment_succeeded|payment_failed|etc
    stripe_event_id = Column(String, unique=True, index=True)
    
    # Metadata
    event_data = Column(JSON)  # Store full Stripe event data
    processed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="billing_events")
    subscription = relationship("Subscription", back_populates="billing_events")

class WebhookLog(Base):
    __tablename__ = "webhook_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    stripe_event_id = Column(String, unique=True, index=True)
    event_type = Column(String, nullable=False)
    processed_at = Column(DateTime(timezone=True), server_default=func.now())
    success = Column(Boolean, default=True)
    error_message = Column(Text)
    
    # Retry Logic
    retry_count = Column(Integer, default=0)
    next_retry_at = Column(DateTime(timezone=True))
    is_recoverable = Column(Boolean, default=True)

class AdminAuditLog(Base):
    __tablename__ = "admin_audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    admin_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    target_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Action Details
    action = Column(String, nullable=False)  # grant_complimentary|revoke_complimentary|manual_billing_adjustment
    details = Column(JSON)  # Store action-specific metadata
    
    # Audit Trail
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    admin_user = relationship("User", foreign_keys=[admin_user_id])
    target_user = relationship("User", foreign_keys=[target_user_id])
```

#### **User Model Updates**
```python
# Add to User model
company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
role = Column(String, default="owner")  # owner|admin|member

# Relationships
company = relationship("Company", back_populates="users")
subscriptions = relationship("Subscription", back_populates="user")
billing_events = relationship("BillingEvent", back_populates="user")

# Helper property for current subscription
@property
def current_subscription(self) -> Optional[Subscription]:
    return (
        self.subscriptions
        .filter(Subscription.status.in_(['active', 'trialing']))
        .order_by(Subscription.created_at.desc())
        .first()
    )

# Billing permission checks
@property
def can_manage_billing(self) -> bool:
    return self.role in ["owner", "admin"]

@property
def can_cancel_subscription(self) -> bool:
    return self.role == "owner"
```

### **Configuration Management**
```python
# Environment Variables
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")

# Plan Configuration
STRIPE_PLANS = {
    'basic_monthly': {
        'price_id': 'price_basic_monthly',
        'tier': 'basic',
        'cycle': 'monthly',
        'price': 39.00,
        'trial_days': 14
    },
    'basic_annual': {
        'price_id': 'price_basic_annual',
        'tier': 'basic',
        'cycle': 'annual',
        'price': 390.00,
        'trial_days': 14
    },
    'pro_monthly': {
        'price_id': 'price_pro_monthly',
        'tier': 'pro',
        'cycle': 'monthly',
        'price': 89.00,
        'trial_days': 14
    },
    'pro_annual': {
        'price_id': 'price_pro_annual',
        'tier': 'pro',
        'cycle': 'annual',
        'price': 890.00,
        'trial_days': 14
    }
}
```

### **Feature Access Control**
```python
# Decorator-based access control
def requires_subscription(tier: str = "basic"):
    def decorator(func):
        async def wrapper(*args, current_user: User = Depends(get_current_user), **kwargs):
            if not check_subscription_access(current_user, tier):
                raise HTTPException(
                    status_code=403,
                    detail=f"Active {tier} subscription required"
                )
            return await func(*args, **kwargs)
        return wrapper
    return decorator

def requires_billing_access():
    def decorator(func):
        async def wrapper(*args, current_user: User = Depends(get_current_user), **kwargs):
            if not current_user.can_manage_billing:
                raise HTTPException(
                    status_code=403,
                    detail="Billing management access required"
                )
            return await func(*args, **kwargs)
        return wrapper
    return decorator

def check_subscription_access(user: User, required_tier: str) -> bool:
    subscription = user.current_subscription
    if not subscription:
        return False
    
    if subscription.plan_tier == 'complimentary':
        return True  # Complimentary accounts have full access
    
    if subscription.status not in ['active', 'trialing']:
        return False
    
    tier_hierarchy = {'basic': 1, 'pro': 2}
    user_tier_level = tier_hierarchy.get(subscription.plan_tier, 0)
    required_tier_level = tier_hierarchy.get(required_tier, 0)
    
    return user_tier_level >= required_tier_level
```

## 🚀 Implementation Phases

### **Phase 1: Database Schema & Core Models** (120 minutes)

**Goal**: Set up database foundation for billing system with enterprise-ready architecture

**Tasks**:
1. Create Alembic migration for new tables (Company, Subscription, BillingEvent, WebhookLog, AdminAuditLog)
2. Update User model with company relationship and billing roles
3. Create company automatically for existing users during migration
4. Create Pydantic schemas for all billing-related models
5. Add billing configuration to environment variables
6. Create BillingService class with comprehensive interface

**Success Criteria**:
- [ ] Database migration runs successfully with company auto-creation
- [ ] All models have proper relationships and constraints
- [ ] 1:1 Company-to-User mapping works invisibly
- [ ] User roles and permissions function correctly
- [ ] Pydantic schemas validate correctly
- [ ] BillingService interface supports all core operations
- [ ] Unit tests for all models and basic operations

**BillingService Interface**:
```python
class BillingService:
    def create_stripe_customer(self, user: User) -> str
    def create_checkout_session(self, user: User, plan_key: str) -> str
    def handle_webhook_event(self, event: dict) -> None
    def update_subscription_from_event(self, subscription: Subscription, event: dict) -> None
    def check_subscription_access(self, user: User, required_tier: str) -> bool
    def grant_complimentary_access(self, user: User, granted_by: User) -> None
    def cancel_subscription(self, user: User, reason: CancellationReason) -> None
    def track_reactivation(self, user: User, new_subscription: Subscription) -> None
```

**Deliverables**:
- Database migration file with company auto-creation
- Updated models.py with all new tables and relationships
- Updated schemas.py with billing schemas
- app/services/billing.py with complete BillingService class
- Unit tests for database operations and business logic

---

### **Phase 2: Stripe Integration & Checkout** (120 minutes)

**Goal**: Implement Stripe checkout session creation and plan selection UI

**Tasks**:
1. Install and configure Stripe Python SDK
2. Create Stripe customer for new users
3. Implement checkout session creation endpoint with billing role validation
4. Create billing plan selection UI with pricing tiers
5. Add Stripe checkout redirect flow with proper success handling

**Success Criteria**:
- [ ] Stripe SDK properly configured with test keys
- [ ] Users can select billing plans (Basic/Pro, Monthly/Annual)
- [ ] Checkout sessions created successfully with trial configuration
- [ ] Users redirected to Stripe checkout
- [ ] Success page updates auth context and shows plan confirmation
- [ ] Cancel page provides clear next steps

**Success Page Flow**:
```typescript
// Success page behavior:
1. Pull fresh subscription status from API
2. Update AuthContext with new subscription permissions
3. Show plan confirmation with trial countdown
4. Display welcome message with next steps
5. Redirect to dashboard after 3 seconds
```

**Deliverables**:
- /api/billing/create-checkout-session endpoint with role validation
- Frontend billing plan selection component
- Stripe checkout integration
- Success/cancel page handlers with proper UX flow
- Comprehensive error handling for Stripe API calls

---

### **Phase 3: Webhook System & Event Processing** (180 minutes)

**Goal**: Implement robust webhook handling with retry logic and comprehensive event processing

**Tasks**:
1. Create webhook endpoint with signature verification and rate limiting
2. Implement idempotency checking with WebhookLog
3. Add retry logic with exponential backoff (1min, 5min, 30min, 2hr, 24hr)
4. Create event processors for key webhook events:
   - checkout.session.completed (subscription activation)
   - invoice.payment_succeeded (renewal confirmation)
   - invoice.payment_failed (grace period logic)
   - customer.subscription.updated (plan changes)
   - customer.subscription.deleted (cancellation handling)
5. Add comprehensive error handling and logging
6. Create webhook testing utilities and simulation tools

**Retry Logic Implementation**:
```python
async def process_webhook_with_retry(event_id: str, event_data: dict):
    webhook_log = get_or_create_webhook_log(event_id)
    
    if webhook_log.retry_count >= 5:
        webhook_log.is_recoverable = False
        return
    
    try:
        await process_stripe_event(event_data)
        webhook_log.success = True
    except RecoverableError as e:
        webhook_log.retry_count += 1
        webhook_log.next_retry_at = calculate_next_retry(webhook_log.retry_count)
        webhook_log.error_message = str(e)
    except NonRecoverableError as e:
        webhook_log.is_recoverable = False
        webhook_log.error_message = str(e)
```

**Success Criteria**:
- [ ] Webhook endpoint verifies Stripe signatures
- [ ] Idempotency prevents duplicate processing
- [ ] Retry logic handles transient failures automatically
- [ ] All key events update subscription status correctly
- [ ] Failed webhooks logged with detailed error analysis
- [ ] Webhook processing is atomic (success/failure)
- [ ] Manual retry capability for failed recoverable webhooks

**Deliverables**:
- /webhooks/stripe endpoint with full event handling
- Event processor classes for each webhook type
- Retry logic with exponential backoff
- Idempotency checking system
- Comprehensive logging and error handling
- Webhook testing utilities and simulation tools
- Unit tests for webhook processing and retry logic

---

### **Phase 4: Access Control & Feature Gating** (90 minutes)

**Goal**: Implement subscription-based access control throughout the application

**Tasks**:
1. Create requires_subscription decorator
2. Implement check_subscription_access utility
3. Add subscription checks to key API endpoints
4. Create middleware for automatic subscription validation
5. Add complimentary account support

**Success Criteria**:
- [ ] API endpoints properly gated by subscription tier
- [ ] Complimentary accounts have full access
- [ ] Expired/canceled subscriptions blocked appropriately
- [ ] Clear error messages for insufficient access
- [ ] No breaking changes to existing functionality

**Deliverables**:
- Subscription access control decorators
- Updated API endpoints with subscription checks
- Complimentary account management
- Access control unit tests
- Documentation for feature gating patterns

---

### **Phase 5: Frontend Billing UI** (120 minutes)

**Goal**: Create complete billing management interface

**Tasks**:
1. Create billing dashboard showing current subscription
2. Add plan selection/upgrade interface
3. Integrate Stripe Customer Portal for plan management
4. Create billing history display
5. Add subscription status indicators throughout UI

**Success Criteria**:
- [ ] Users can view current subscription status
- [ ] Plan upgrades/downgrades work correctly
- [ ] Stripe Customer Portal integration functional
- [ ] Billing history displays accurately
- [ ] Trial countdown and expiration warnings shown

**Deliverables**:
- Billing dashboard component
- Plan selection and upgrade flows
- Stripe Customer Portal integration
- Billing history display
- Subscription status indicators

---

### **Phase 6: Testing, Admin Tools & Polish** (150 minutes)

**Goal**: Comprehensive testing, administrative functionality, and churn analytics

**Tasks**:
1. Create comprehensive test suite for all billing flows
2. Add admin interface for managing complimentary accounts with audit trail
3. Implement billing analytics and churn tracking
4. Create billing-related email notifications
5. Add reactivation tracking and win-back campaign foundation
6. Add billing configuration documentation

**Admin Interface Features**:
```python
# Admin actions with full audit trail
- Grant/revoke complimentary access
- View subscription history and status
- Manual billing adjustments (with justification)
- Webhook retry management
- Churn analysis reporting
- Reactivation tracking dashboard
```

**Churn Analytics**:
```python
def get_churn_report(since: datetime, company_id: Optional[int] = None):
    return {
        'cancellation_reasons': get_cancellation_breakdown(),
        'reactivation_rate': calculate_reactivation_rate(),
        'trial_conversion_rate': get_trial_conversion_stats(),
        'churn_by_plan_tier': get_churn_by_tier(),
        'lifetime_value_trends': get_ltv_analysis()
    }
```

**Success Criteria**:
- [ ] All billing flows tested end-to-end
- [ ] Admin can grant/revoke complimentary access with audit logging
- [ ] Billing metrics and churn analytics available
- [ ] Email notifications for billing events
- [ ] Reactivation tracking and win-back campaign foundation
- [ ] Complete documentation for billing system

**Deliverables**:
- Comprehensive test suite
- Admin interface with audit trail for subscription management
- Billing analytics dashboard with churn tracking
- Email notification system
- Reactivation tracking and win-back campaign foundation
- Complete billing documentation with operational procedures

## 🧪 Testing Strategy

### **Test Coverage Requirements**
- **Unit Tests**: All BillingService methods, access control functions
- **Integration Tests**: Stripe API calls, webhook processing
- **End-to-End Tests**: Complete signup → trial → conversion flow
- **Load Tests**: Webhook endpoint under high volume

### **Test Scenarios**
1. **Happy Path**: Signup → Trial → Subscription → Payment success
2. **Payment Failures**: Failed cards, expired cards, insufficient funds
3. **Plan Changes**: Upgrades, downgrades, cancellations
4. **Edge Cases**: Webhook retries, duplicate events, malformed data
5. **Access Control**: Feature gating, tier validation, complimentary accounts

## 🔧 Infrastructure Requirements

### **Environment Variables**
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Billing Configuration
TRIAL_DAYS=14
BILLING_GRACE_PERIOD_DAYS=7
ENABLE_COMPLIMENTARY_ACCOUNTS=true
```

### **Stripe Dashboard Setup**
1. Create products and prices in test mode
2. Configure webhook endpoints for staging/production
3. Enable Customer Portal with appropriate settings
4. Set up billing email notifications

## 📊 Success Metrics

### **Technical Metrics**
- [ ] 100% webhook processing success rate
- [ ] <200ms average API response time for billing endpoints
- [ ] Zero billing-related security vulnerabilities
- [ ] 100% test coverage for billing logic

### **Business Metrics**
- [ ] Trial-to-paid conversion rate tracking
- [ ] Monthly recurring revenue (MRR) calculation
- [ ] Customer lifetime value (CLV) tracking
- [ ] Churn rate by plan tier

## 🚨 Risk Mitigation

### **Technical Risks**
- **Webhook Failures**: Implement retry logic and manual reconciliation
- **Data Consistency**: Use database transactions for all billing operations
- **Security**: Validate all Stripe signatures and sanitize webhook data
- **Performance**: Add caching for subscription status checks

### **Business Risks**
- **Pricing Sensitivity**: Monitor conversion rates and be prepared to adjust
- **Trial Abuse**: Implement fraud detection and email verification
- **Payment Failures**: Clear communication and grace periods for customers

## 📝 Implementation Notes

### **Migration Strategy for Existing Users**
```python
# Automatic company creation during User model migration
def upgrade():
    # Create companies table
    op.create_table('companies', ...)
    
    # Add company_id and role to users table
    op.add_column('users', sa.Column('company_id', sa.Integer()))
    op.add_column('users', sa.Column('role', sa.String(), default='owner'))
    
    # Create company for each existing user
    connection = op.get_bind()
    users = connection.execute("SELECT id, full_name FROM users").fetchall()
    for user in users:
        company_id = connection.execute(
            "INSERT INTO companies (name, created_by_user_id) VALUES (%s, %s) RETURNING id",
            (f"{user.full_name}'s Company", user.id)
        ).scalar()
        connection.execute(
            "UPDATE users SET company_id = %s, role = 'owner' WHERE id = %s",
            (company_id, user.id)
        )
```

### **Reactivation Flow**
```python
# When user signs up again after cancellation
def handle_reactivation(user: User, new_subscription: Subscription):
    # Find previous subscription
    previous_sub = get_last_cancelled_subscription(user)
    if previous_sub:
        new_subscription.previous_subscription_id = previous_sub.stripe_subscription_id
        new_subscription.reactivation_count = previous_sub.reactivation_count + 1
        
    # Log reactivation event
    log_billing_event(user, 'subscription_reactivated', {
        'previous_plan': previous_sub.plan_tier if previous_sub else None,
        'new_plan': new_subscription.plan_tier,
        'reactivation_count': new_subscription.reactivation_count
    })
```

## 📊 Business Intelligence & Analytics

### **Key Metrics Tracking**
- **Trial Conversion Rate**: % of trials that become paid subscriptions
- **Churn Rate by Plan**: Monthly churn broken down by Basic/Pro
- **Reactivation Success**: % of cancelled users who return
- **Lifetime Value (LTV)**: Average revenue per customer over lifetime
- **Cancellation Reason Analysis**: Why customers leave (cost, features, etc.)

### **Win-Back Campaign Foundation**
```python
# Identify win-back candidates
def get_winback_candidates(days_since_cancellation: int = 30):
    return (
        session.query(User)
        .join(Subscription)
        .filter(
            Subscription.status == 'canceled',
            Subscription.cancellation_reason.in_(['cost', 'not_using']),
            Subscription.subscription_end_date >= datetime.now() - timedelta(days=days_since_cancellation)
        )
        .all()
    )
```

## 📝 Notes for Future Enhancements

### **Immediate Future (6-12 months)**
- **Team Management UI**: Role-based access with invite system
- **Company-Level Billing**: One subscription covers multiple team members
- **Advanced Analytics**: Cohort analysis, revenue forecasting
- **Grace Period Automation**: Smart retry logic for failed payments

### **Long-term Vision (12+ months)**
- **Usage-based Billing**: Track project count, client count for tiered pricing
- **Regional Pricing**: Purchasing power parity for global markets
- **Enterprise Features**: SSO, advanced security, custom contracts
- **API Access Tiers**: Different API rate limits by plan

### **Technical Debt Prevention**
- **Database schema supports all future enhancements without migration**
- **Company model enables team features without architectural changes**
- **Audit trails provide full billing history for compliance/debugging**
- **Webhook retry system prevents data inconsistency during outages**

---

*This implementation plan prioritizes quality, extensibility, and robust error handling while building the foundation for a scalable SaaS platform. The architecture decisions made now will support enterprise features without requiring fundamental refactoring.*