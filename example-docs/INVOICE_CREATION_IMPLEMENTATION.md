# Invoice Creation Implementation Plan

## 🎯 **Feature Overview**

**Status**: APPROVED - Ready for Implementation  
**Estimated Timeline**: 21 hours (7 phases + architecture review)  
**Dependencies**: Estimate Generation (complete), Stripe Billing (Phase 1-3), Email Service Integration

Professional invoice creation with flexible payment processing, retainage support, and comprehensive legal boilerplate management. Integrates seamlessly with existing project/estimate workflow.

---

## 📋 **Phase Breakdown**

### **Phase 1: Database Foundation (3 hours)**
- Invoice core tables and relationships
- Payment tracking tables
- Legal boilerplate management
- Payment processor abstraction layer

### **Phase 2: Invoice Creation Logic (2.5 hours)**
- Invoice type handling (deposit, progress, change order, final, retainage)
- Amount calculation (flat, percentage, line items)
- Estimate versioning and change detection
- Validation and business rules

### **Phase 3: Manual Payment Processing (2.5 hours)**
- Manual payment logging (check, cash, ACH, etc.)
- Payment reconciliation logic
- Refund/credit tracking

### **Phase 4: Invoice PDF Generation (2.5 hours)**
- Invoice PDF templates with versioning
- Dynamic boilerplate insertion
- File storage and retrieval

### **Phase 5: Legal Boilerplate System (2.5 hours)**
- Default template management with watermarking
- User customization interface
- Legal acknowledgment tracking
- Version control and reset functionality

### **Phase 6: Stripe Connect Integration (4.5 hours)**
- Stripe Connect Standard setup
- Account onboarding and verification
- Payment intent creation
- Webhook handling with security

### **Phase 7: Frontend Interface (3 hours)**
- Invoice creation forms
- Payment tracking interface
- Settings and configuration pages

### **Pre-Phase 6 Task: Stripe Connect Architecture Review (1 hour)**
**Required before Phase 6 implementation:**
- Account onboarding flow UX wireframes
- Connected account verification requirements
- Webhook endpoint security architecture per connected account
- Payment intent flow with application fees structure
- Error handling for rejected/suspended accounts
- Payout timing and fee structure user communication
- Client payment page security and UX design
- Invoice email template specifications
- Payment processing race condition prevention
- Client payment page complete wireframes and error flows

---

## 🗄️ **Database Schema**

### **Core Invoice Tables**

```sql
-- Global invoice number sequence (company prefixes added in application logic)
CREATE SEQUENCE invoice_numbers_seq START WITH 1000;

-- Main invoice table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    estimate_id INTEGER REFERENCES estimates(id) ON DELETE RESTRICT,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('deposit', 'progress', 'change_order', 'final', 'retainage')),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'partial', 'overdue', 'cancelled')),
    can_be_modified BOOLEAN NOT NULL DEFAULT true, -- False after sending
    
    -- Currency and tax integration
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    tax_rate NUMERIC(6,6),
    tax_amount NUMERIC(10,2),
    tax_exempt BOOLEAN NOT NULL DEFAULT false,
    
    -- Amount configuration
    amount_type VARCHAR(20) NOT NULL CHECK (amount_type IN ('flat', 'percentage', 'line_items')),
    flat_amount NUMERIC(10,2),
    percentage_amount NUMERIC(5,2),
    total_amount NUMERIC(10,2) NOT NULL,
    
    -- Payment terms
    due_date DATE NOT NULL,
    payment_terms INTEGER NOT NULL DEFAULT 30, -- days
    late_fee_type VARCHAR(10) CHECK (late_fee_type IN ('percentage', 'flat')),
    late_fee_amount NUMERIC(10,2),
    
    -- Retainage
    retainage_withheld NUMERIC(10,2) DEFAULT 0,
    retainage_percentage NUMERIC(5,2),
    
    -- Metadata
    notes TEXT,
    boilerplate_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP,
    viewed_at TIMESTAMP,
    
    -- Audit and client access
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    pdf_path VARCHAR(255),
    client_payment_token VARCHAR(64) UNIQUE, -- For anonymous client access
    payment_token_expires_at TIMESTAMP NOT NULL, -- Always set, 30-day default
    payment_attempts INTEGER DEFAULT 0,
    max_payment_attempts INTEGER DEFAULT 3,
    payment_locked_until TIMESTAMP,
    
    INDEX idx_project_id (project_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date),
    INDEX idx_client_payment_token (client_payment_token),
    INDEX idx_payment_token_expires_at (payment_token_expires_at),
    
    -- Business rule constraints
    CONSTRAINT chk_one_final_per_project EXCLUDE (project_id WITH =) WHERE (type = 'final' AND status NOT IN ('cancelled', 'draft')),
    CONSTRAINT chk_positive_amounts CHECK (total_amount >= 0),
    CONSTRAINT chk_valid_percentage CHECK (percentage_amount IS NULL OR (percentage_amount >= 0 AND percentage_amount <= 200)),
    CONSTRAINT chk_payment_token_expiry CHECK (payment_token_expires_at > created_at)
);

-- Invoice line items (optional)
CREATE TABLE invoice_line_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    quantity NUMERIC(10,2) NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    is_taxable BOOLEAN NOT NULL DEFAULT true,
    tax_amount NUMERIC(10,2) DEFAULT 0,
    category VARCHAR(50), -- 'material', 'labor', 'permit', 'other', 'processing_fee', 'convenience_fee'
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_invoice_id (invoice_id),
    
    -- Ensure processing fees don't exceed 4% of invoice total
    CONSTRAINT chk_processing_fee_limit CHECK (
        category NOT IN ('processing_fee', 'convenience_fee') OR 
        total_amount <= (SELECT SUM(total_amount) * 0.04 FROM invoice_line_items WHERE invoice_id = invoice_line_items.invoice_id)
    )
);

-- Invoice versioning and estimate tracking
CREATE TABLE invoice_estimate_snapshots (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    estimate_total NUMERIC(10,2) NOT NULL,
    estimate_hash VARCHAR(64) NOT NULL,
    estimate_signed_at TIMESTAMP,
    snapshot_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_invoice_id (invoice_id)
);

-- Payment tracking
CREATE TABLE invoice_payments (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'stripe', 'check', 'ach', 'zelle', 'cash', 'other'
    payment_date DATE NOT NULL,
    
    -- Stripe integration
    stripe_payment_intent_id VARCHAR(255),
    stripe_charge_id VARCHAR(255),
    stripe_fee_amount NUMERIC(10,2),
    
    -- Manual payment details
    reference_number VARCHAR(100),
    notes TEXT,
    refund_reason TEXT, -- Required for refunds/negative amounts
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL REFERENCES users(id),
    
    INDEX idx_invoice_id (invoice_id),
    INDEX idx_payment_date (payment_date),
    INDEX idx_stripe_payment_intent_id (stripe_payment_intent_id)
);

-- Legal boilerplate management
CREATE TABLE legal_boilerplate_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('invoice', 'estimate')),
    content TEXT NOT NULL,
    version VARCHAR(20) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(name, type, version)
);

-- User customized boilerplate
CREATE TABLE user_boilerplates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('invoice', 'estimate')),
    content TEXT NOT NULL,
    based_on_version VARCHAR(20),
    legal_acknowledged_at TIMESTAMP,
    watermark_removed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, type)
);

-- Retainage tracking per project (OPT-IN BETA FEATURE)
CREATE TABLE project_retainage (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id),
    total_withheld NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_released NUMERIC(10,2) NOT NULL DEFAULT 0,
    percentage NUMERIC(5,2) NOT NULL DEFAULT 5.00,
    is_enabled BOOLEAN NOT NULL DEFAULT false,
    legal_acknowledged_at TIMESTAMP,
    beta_feature_accepted BOOLEAN NOT NULL DEFAULT false,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(project_id)
);

-- Invoice status audit trail with cancellation support
CREATE TABLE invoice_status_history (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    cancellation_reason TEXT, -- Required when new_status = 'cancelled'
    ip_address INET,
    user_agent TEXT,
    
    INDEX idx_invoice_id (invoice_id),
    INDEX idx_changed_at (changed_at)
);

-- Email delivery tracking with provider webhook support
CREATE TABLE invoice_email_deliveries (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    email_address VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    bounce_reason TEXT,
    email_provider VARCHAR(50), -- 'sendgrid', 'resend', etc.
    webhook_event_id VARCHAR(255),
    provider_message_id VARCHAR(255),
    
    INDEX idx_invoice_id (invoice_id),
    INDEX idx_sent_at (sent_at),
    INDEX idx_email_address (email_address)
);

-- Payment processing locks with automatic cleanup
CREATE TABLE payment_processing_locks (
    invoice_id INTEGER PRIMARY KEY REFERENCES invoices(id) ON DELETE CASCADE,
    locked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    locked_by VARCHAR(100) NOT NULL, -- payment processor session ID
    expires_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 minutes'),
    payment_intent_id VARCHAR(255),
    process_id VARCHAR(100), -- For cleanup identification
    
    INDEX idx_expires_at (expires_at),
    CHECK (expires_at > locked_at)
);

-- Email templates with template variables
CREATE TABLE invoice_email_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'invoice_sent', 'payment_received', 'overdue_reminder', 'payment_failed'
    subject_template TEXT NOT NULL,
    body_template TEXT NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    template_variables JSONB, -- Available variables for template
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(type, is_default) WHERE is_default = true
);

-- Change order tracking for change_order invoice types
CREATE TABLE invoice_change_orders (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    change_order_description TEXT NOT NULL,
    original_estimate_amount NUMERIC(10,2) NOT NULL,
    change_amount NUMERIC(10,2) NOT NULL, -- Can be positive or negative
    change_reason TEXT,
    approved_by INTEGER REFERENCES users(id),
    approved_at TIMESTAMP,
    
    INDEX idx_invoice_id (invoice_id)
);

-- Retainage release tracking
CREATE TABLE retainage_releases (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    release_invoice_id INTEGER REFERENCES invoices(id),
    amount_released NUMERIC(10,2) NOT NULL,
    release_reason VARCHAR(100) NOT NULL, -- 'completion', 'milestone', 'manual'
    milestone_description TEXT,
    released_by INTEGER NOT NULL REFERENCES users(id),
    released_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_project_id (project_id)
);
```

### **Extended Company Settings**

```sql
-- Add invoice-related settings to companies table
ALTER TABLE companies ADD COLUMN is_invoicing_enabled BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE companies ADD COLUMN is_stripe_enabled BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE companies ADD COLUMN stripe_account_id VARCHAR(255);
ALTER TABLE companies ADD COLUMN default_payment_terms INTEGER NOT NULL DEFAULT 30;
ALTER TABLE companies ADD COLUMN default_late_fee_type VARCHAR(10) DEFAULT 'percentage';
ALTER TABLE companies ADD COLUMN default_late_fee_amount NUMERIC(10,2) DEFAULT 1.5;
ALTER TABLE companies ADD COLUMN default_retainage_percentage NUMERIC(5,2) DEFAULT 5.00;
ALTER TABLE companies ADD COLUMN invoice_number_prefix VARCHAR(10) DEFAULT 'INV';
-- Note: Removed next_invoice_number column - using database sequence instead
```

---

## 🔌 **API Endpoints**

### **Invoice Management**
```python
# Invoice CRUD
POST   /api/invoices/                    # Create new invoice
GET    /api/invoices/{id}/               # Get invoice details
PUT    /api/invoices/{id}/               # Update invoice
DELETE /api/invoices/{id}/               # Delete draft invoice
GET    /api/projects/{id}/invoices/      # List project invoices

# Invoice actions
POST   /api/invoices/{id}/send/          # Send invoice to client
POST   /api/invoices/{id}/mark-viewed/   # Mark as viewed (internal)
POST   /api/invoices/{id}/cancel/        # Cancel invoice with reason
GET    /api/invoices/{id}/pdf/           # Generate/download PDF
GET    /api/invoices/{id}/estimate-changes/ # View estimate changes since invoice creation

# Payment processing
POST   /api/invoices/{id}/payments/      # Record payment
GET    /api/invoices/{id}/payments/      # List payments
PUT    /api/payments/{id}/               # Update payment record

# Stripe integration
POST   /api/stripe/connect/              # Connect Stripe account
GET    /api/stripe/status/               # Check connection status
POST   /api/stripe/create-payment-intent/ # Create payment intent
POST   /api/stripe/webhook/              # Webhook handler

# Client payment access (anonymous)
GET    /api/client/invoice/{token}/      # Client view invoice (track view)
POST   /api/client/invoice/{token}/pay/  # Client payment submission
GET    /api/client/invoice/{token}/pdf/  # Client download invoice PDF
```

### **Legal Boilerplate Management**
```python
GET    /api/legal-boilerplate/templates/     # List default templates
GET    /api/legal-boilerplate/user/          # Get user customizations
PUT    /api/legal-boilerplate/user/          # Update user boilerplate
POST   /api/legal-boilerplate/reset/         # Reset to default
```

---

## 🏗️ **Backend Implementation**

### **Invoice Service**
```python
# app/services/invoice_service.py
class InvoiceService:
    def create_invoice(self, project_id: int, invoice_data: dict) -> Invoice:
        """Create new invoice with proper validation"""
        
    def calculate_total_amount(self, invoice: Invoice) -> Decimal:
        """Calculate total based on amount_type"""
        
    def generate_invoice_number(self, company_id: int) -> str:
        """Generate unique invoice number using database sequence"""
        
    def send_invoice(self, invoice_id: int) -> bool:
        """Send invoice to client via email"""
        
    def record_payment(self, invoice_id: int, payment_data: dict) -> Payment:
        """Record payment and update invoice status"""
        
    def check_overdue_invoices(self) -> List[Invoice]:
        """Find overdue invoices for automated processing"""
        
    def check_estimate_changes(self, invoice: Invoice) -> bool:
        """Check if linked estimate has changed since invoice creation"""
        
    def create_estimate_snapshot(self, invoice: Invoice, estimate: Estimate):
        """Create snapshot of estimate data for version tracking"""
```

### **Payment Processing Service**
```python
# app/services/payment_service.py
class PaymentProcessor:
    """Abstract payment processor interface"""
    def create_payment_intent(self, amount: Decimal, invoice: Invoice) -> str:
        raise NotImplementedError
    def verify_webhook(self, payload: str, signature: str) -> bool:
        raise NotImplementedError
    def process_payment(self, payment_intent_id: str) -> dict:
        raise NotImplementedError

class StripePaymentProcessor(PaymentProcessor):
    """Stripe-specific implementation"""
    def create_payment_intent(self, amount: Decimal, invoice: Invoice) -> str:
        # Stripe Connect implementation
        pass
    
class PaymentService:
    def __init__(self, processor: PaymentProcessor):
        self.processor = processor
        
    def process_payment(self, invoice_id: int, payment_intent_id: str):
        """Process payment using configured processor"""
        
    def record_manual_payment(self, invoice_id: int, payment_data: dict):
        """Record manual payment (check, cash, etc.)"""
        
    def calculate_payment_status(self, invoice: Invoice) -> str:
        """Determine invoice payment status using state machine"""
        rules = {
            'paid': lambda inv: inv.total_payments >= inv.total_amount,
            'partial': lambda inv: 0 < inv.total_payments < inv.total_amount,
            'overdue': lambda inv: inv.due_date < date.today() and inv.total_payments < inv.total_amount
        }
        
    def record_refund(self, invoice_id: int, refund_data: dict):
        """Record refund as negative payment"""
```

### **Retainage Service (OPT-IN BETA)**
```python
# app/services/retainage_service.py
class RetainageService:
    def calculate_retainage(self, invoice: Invoice) -> Decimal:
        """Calculate retainage amount for invoice (keep simple)"""
        
    def create_retainage_release(self, project_id: int, amount: Decimal):
        """Create retainage release invoice"""
        
    def get_project_retainage_balance(self, project_id: int) -> Decimal:
        """Get current retainage balance for project"""
        
    def require_legal_acknowledgment(self, user_id: int) -> bool:
        """Check if user has acknowledged retainage legal risks"""
        
    def is_beta_feature_enabled(self, company_id: int) -> bool:
        """Check if company has opted into retainage beta"""
```

---

## 🎨 **Frontend Implementation**

### **Invoice Creation Form**
```typescript
// Invoice creation with dynamic amount calculation
interface InvoiceFormData {
  type: 'deposit' | 'progress' | 'change_order' | 'final' | 'retainage'
  amountType: 'flat' | 'percentage' | 'line_items'
  flatAmount?: number
  percentageAmount?: number
  lineItems?: InvoiceLineItem[]
  dueDate: Date
  paymentTerms: number
  notes?: string
  retainagePercentage?: number
}

// Smart amount calculation based on type
const calculateInvoiceAmount = (formData: InvoiceFormData, estimate: Estimate) => {
  switch (formData.amountType) {
    case 'flat':
      return formData.flatAmount || 0
    case 'percentage':
      return (estimate.total_amount * (formData.percentageAmount || 0)) / 100
    case 'line_items':
      return formData.lineItems?.reduce((sum, item) => sum + item.total_amount, 0) || 0
  }
}
```

### **Payment Tracking Interface**
```typescript
// Payment recording with Stripe integration
interface PaymentFormData {
  amount: number
  paymentMethod: 'stripe' | 'check' | 'ach' | 'zelle' | 'cash' | 'other'
  paymentDate: Date
  referenceNumber?: string
  notes?: string
}

// Stripe payment component
const StripePaymentForm = ({ invoice, onSuccess }: Props) => {
  const [processing, setProcessing] = useState(false)
  
  const handleStripePayment = async (paymentMethodId: string) => {
    setProcessing(true)
    try {
      const { data } = await api.post(`/invoices/${invoice.id}/stripe-payment/`, {
        payment_method_id: paymentMethodId,
        amount: invoice.balance_due
      })
      onSuccess(data)
    } catch (error) {
      // Handle error
    } finally {
      setProcessing(false)
    }
  }
}
```

---

## 📄 **Legal Boilerplate System**

### **Default Templates**
```python
# Seed default boilerplate templates with enhanced disclaimers
DEFAULT_INVOICE_BOILERPLATE = """
**Scope of Work & Changes**
This invoice is based on the work previously agreed upon in the signed estimate. Any work not included in that estimate will require a separate, signed change order. Verbal agreements will not be considered valid for additional work.

**Payment Terms**
Payment is due according to the terms specified on this invoice. A late fee of 1.5% per month (18% annualized) or $25, whichever is greater, may be applied to past-due balances. All balances must be paid in full before final completion is considered delivered.

**Taxes & Ownership**
The client is responsible for all applicable local, state, and federal taxes. All materials and equipment remain the property of the contractor until full payment has been received.

**Retainage (if applicable)**
Any retainage held by the client may be released within 30 days of substantial completion, unless otherwise agreed in writing. Retainage laws vary by state - you are responsible for compliance.

**Liability & Warranty**
The contractor's liability is limited to the cost of labor and materials provided under this agreement. No warranties are expressed or implied beyond what is required by law or separately agreed upon in writing.

**Dispute Resolution**
In the event of a dispute, both parties agree to pursue mediation before initiating legal action. Any legal proceedings shall be governed by the laws of the state in which the work was performed.

**⚠️ Legal Disclaimer - Provided by BuildCraftPro**
This boilerplate text is provided for convenience only and does not constitute legal advice. Users are solely responsible for the legal enforceability of their invoice terms. Consult your attorney for jurisdiction-specific requirements.
"""
```

### **User Customization Interface**
```typescript
// Legal boilerplate editor
const BoilerplateEditor = () => {
  const [content, setContent] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  
  const resetToDefault = async () => {
    const { data } = await api.get('/legal-boilerplate/templates/?type=invoice&default=true')
    setContent(data.content)
    setHasChanges(true)
  }
  
  const saveChanges = async () => {
    await api.put('/legal-boilerplate/user/', {
      type: 'invoice',
      content: content
    })
    setHasChanges(false)
  }
}
```

---

## 🔒 **Security & Validation**

### **Access Control**
- Invoice creation requires project ownership
- Payment recording requires appropriate permissions
- Stripe webhook endpoints properly secured
- Sensitive financial data properly encrypted

### **Input Validation**
```python
# Comprehensive validation schemas
class InvoiceCreateSchema(BaseModel):
    project_id: int
    estimate_id: Optional[int]
    type: InvoiceType
    amount_type: AmountType
    flat_amount: Optional[Decimal] = Field(ge=0, le=1000000)
    percentage_amount: Optional[Decimal] = Field(ge=0, le=100)
    due_date: date
    payment_terms: int = Field(ge=0, le=365)
    notes: Optional[str] = Field(max_length=1000)
    
    @validator('flat_amount')
    def validate_flat_amount(cls, v, values):
        if values.get('amount_type') == 'flat' and v is None:
            raise ValueError('Flat amount required for flat amount type')
        return v
    
    @validator('percentage_amount')
    def validate_over_invoicing(cls, v, values):
        # Warning for over-invoicing, but don't block
        if values.get('amount_type') == 'percentage' and v and v > 110:
            logger.warning(f"Invoice percentage {v}% exceeds 110% of estimate")
        return v
        
    def validate_estimate_integrity(cls, values):
        # Check if estimate has changed since last invoice
        if values.get('estimate_id'):
            estimate = get_estimate(values['estimate_id'])
            if estimate.updated_at > last_invoice_date:
                logger.warning("Estimate has been revised since last invoice")
```

---

## 🧪 **Testing Strategy**

### **Unit Tests**
- Invoice calculation logic
- Payment processing workflows
- Retainage calculations
- Stripe webhook handling
- Legal boilerplate management

### **Integration Tests**
- Complete invoice-to-payment workflows
- Stripe Connect integration
- PDF generation with boilerplate
- Email delivery systems

### **End-to-End Tests**
- Invoice creation from estimate
- Payment processing (mock Stripe)
- Retainage release workflow
- User boilerplate customization

---

## 🚀 **Deployment & Configuration**

### **Environment Variables**
```bash
# Stripe configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# Invoice settings
INVOICE_PDF_STORAGE_PATH=/app/invoices/
INVOICE_EMAIL_FROM=noreply@buildcraftpro.com
INVOICE_SEQUENCE_NAME=invoice_numbers_seq

# Legal and risk management
RETAINAGE_BETA_ENABLED=true
LEGAL_WATERMARK_REQUIRED=true
```

### **Database Migrations**
```python
# Migration sequence
1. Create invoice tables with versioning
2. Add company settings columns
3. Create legal boilerplate tables with audit fields
4. Create database sequence for invoice numbers
5. Seed default templates with watermarks
6. Add indexes and constraints
7. Create payment processor abstraction tables
```

---

## ✅ **Success Criteria**

### **Phase 1-2: Core Functionality**
- [ ] Create invoices of all types (deposit, progress, final, etc.)
- [ ] Calculate amounts via flat, percentage, or line items
- [ ] Generate unique invoice numbers using database sequence
- [ ] Track invoice status transitions with state machine
- [ ] Estimate change detection and versioning

### **Phase 3-4: Manual Payments & PDF Generation**
- [ ] Record manual payments with refund support
- [ ] Invoice PDF generation with templates
- [ ] File storage following estimate pattern
- [ ] Payment reconciliation logic

### **Phase 5-6: Legal & Stripe Integration**
- [ ] Legal boilerplate system with watermarking
- [ ] User customization with legal acknowledgment
- [ ] Stripe Connect Standard integration
- [ ] Webhook handling with security validation
- [ ] Retainage as opt-in beta feature

### **Phase 7: Frontend Interface**
- [ ] Complete frontend invoice management
- [ ] Payment tracking interface
- [ ] Company settings configuration
- [ ] Over-invoicing warnings and validations

---

## 🔄 **Future Enhancements**

### **Post-MVP Features (V1.5-V2)**
- Client portal for invoice viewing
- Automated payment reminders
- Recurring invoice templates
- Advanced reporting and analytics
- Integration with accounting software
- **System-wide branding integration**: Apply Company Branding & Customization System to invoices
- **Estimate change diff UI**: Visual comparison of estimate versions with highlighting
- **Enhanced refund workflows**: Improved audit requirements and approval processes
- **Multi-currency support**: Invoice currency conversion and display
- **Advanced email integration**: Rich text templates with company branding

### **Business Intelligence & Analytics**
- Payment timing analysis
- Customer payment behavior tracking
- Cash flow forecasting
- Retainage management reporting
- Invoice performance metrics (view-to-pay conversion rates)
- Payment method effectiveness analysis

### **Enterprise Features (V3+)**
- Role-based invoice approval workflows
- Bulk invoice operations and batch processing
- Custom invoice number formats per company
- Advanced tax compliance reporting
- API integrations with accounting platforms (QuickBooks, Xero)
- White-label client payment portal (powered by Company Branding & Customization System)
- Advanced dispute resolution workflows

---

## 📊 **Technical Debt Considerations**

### **Scalability Concerns**
- Invoice number generation (solved with database sequence)
- Payment processing queue management
- Large PDF generation performance
- Stripe webhook processing reliability and per-account management
- Connected account verification and capability checks

### **Code Organization**
- Invoice service complexity management
- Payment processor abstraction layer (built from day one)
- Legal template version control with audit trails
- Email notification service integration
- Estimate versioning and change detection
- Retainage as optional beta feature module

---

**Implementation Status**: FULLY READY - All critical gaps closed, business rules defined, security vulnerabilities addressed, and technical specifications complete.

**Key Risk Mitigations Implemented**:
- Payment processor abstraction layer from day one
- Enhanced legal disclaimers with watermarking
- Retainage as opt-in beta with explicit warnings
- Estimate versioning and change detection
- Database sequence for race-condition-free invoice numbering
- Stripe Connect complexity properly scoped with mandatory architecture review
- Invoice modification restrictions after sending
- Processing fee validation and limits (4% maximum)
- Client payment access via secure tokens with 30-day expiry
- Comprehensive status and email delivery audit trails
- Payment processing locks to prevent concurrent payments
- Tax calculation integration with existing project tax system
- Email template system for consistent client communication
- Database constraints for data integrity and business rule enforcement
- Automatic cleanup of expired payment processing locks
- Change order invoice workflow with proper tracking
- Retainage release workflow with milestone tracking
- Complete client payment error handling matrix

**Critical Dependencies Resolved**:
- Email service integration with delivery tracking and provider webhooks
- File storage naming conventions with temporary vs permanent strategy
- Client payment access flow with complete security controls and error handling
- Invoice status state machine with comprehensive audit trail
- Late fee calculation timing (30 days after due date)
- Payment token security with 30-day expiration and extension capability
- Tax calculation integration with existing project tax system
- Change order invoice workflow with proper change tracking
- Payment processing concurrency control with automatic lock cleanup
- Email template system with defined variables for all client communications
- Database constraints, referential integrity, and business rule enforcement
- Invoice PDF template data model specification
- Business rules for invoice types per project (one final invoice limit)
- Retainage release workflow with milestone and completion triggers
- Processing fee compliance with 4% maximum and legal disclaimers

**Next Steps**: Begin Phase 1 implementation with comprehensive database foundation including business rule constraints.