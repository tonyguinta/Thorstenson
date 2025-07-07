# Booking System Architecture: Reusable Component Implementation Plan

## **Overview**
This document outlines the complete architecture and implementation plan for a custom booking system designed as a reusable component for service businesses. Built for Thorstenson Guide Service as the foundation, with expansion to James's contracting business and potential licensing to other developers.

## **✅ IMPLEMENTATION STATUS: ARCHITECTURE READY**
**Timeline**: Months 3-8 (May-October 2025)  
**Strategic Goal**: Create reusable booking platform for multiple service businesses

## **Implementation Rules**
- ✅ **Component-first architecture** - Every feature built as reusable component
- ✅ **Business-agnostic core** - Service-independent functionality in shared modules
- ✅ **6-Phase implementation** for each major component with approval gates
- ✅ **Testing-first approach** - Comprehensive testing for production reliability
- ✅ **Documentation-driven** - Complete guides for template reuse

## **Commit & Push Protocol**
1. **Code & Request Testing**: Complete implementation work and ask user to test/verify
2. **User Testing**: User tests functionality and reports results
3. **Commit After Verification**: Only commit once user confirms implementation works
4. **Push When Ordered**: Only push to staging/production when explicitly requested

**CRITICAL**: Never commit code that hasn't been user-tested. Keep commit history clean with verified, working implementations only.

---

## **Strategic Architecture Overview**

### **Multi-Tier Component Design**

#### **Tier 1: Business-Agnostic Core**
- **Booking Engine**: Calendar management, availability, reservations
- **Payment Processing**: Stripe integration, invoicing, refunds
- **Customer Management**: Profiles, history, preferences
- **Communication System**: Email automation, notifications
- **Admin Dashboard**: Scheduling, analytics, reporting

#### **Tier 2: Industry Adapters**
- **Fishing Guide Adapter**: Trip packages, weather integration, equipment
- **Contracting Adapter**: Project estimation, material lists, timeline management
- **Generic Service Adapter**: Hourly appointments, consultation booking

#### **Tier 3: Business-Specific Customization**
- **Branding**: Colors, logos, terminology
- **Pricing Models**: Package pricing, hourly rates, deposits
- **Policies**: Cancellation rules, weather policies, terms
- **Integrations**: Business-specific third-party services

### **Technology Stack Decision Matrix**

#### **Frontend Architecture**
```typescript
// Component structure for reusability
/src/components/booking/
├── core/                    // Business-agnostic components
│   ├── Calendar/           // Date/time selection
│   ├── CustomerForm/       // Contact information
│   ├── PaymentFlow/        // Stripe integration
│   └── BookingConfirmation/
├── adapters/               // Industry-specific components
│   ├── FishingGuide/      // Trip packages, weather
│   ├── Contracting/       // Project types, estimates
│   └── Generic/           // Standard appointments
└── admin/                 // Management interface
    ├── Dashboard/         // Overview and analytics
    ├── Calendar/          // Availability management
    └── Customers/         // Customer relationship management
```

#### **Backend Architecture**
```typescript
// API structure for multi-business support
/src/api/booking/
├── core/                  // Business-agnostic endpoints
│   ├── calendar.ts       // Availability management
│   ├── bookings.ts       // CRUD operations
│   ├── customers.ts      // Customer management
│   └── payments.ts       // Stripe integration
├── adapters/             // Industry-specific logic
│   ├── fishing-guide.ts  // Trip-specific functionality
│   ├── contracting.ts    // Project-specific features
│   └── generic.ts        // Standard service booking
└── businesses/           // Business configuration
    ├── thorstenson-guide.ts
    ├── thorstenson-contracting.ts
    └── template.ts       // Template for new businesses
```

---

## **Phase 1: Core Database Schema & Models** ⏱️ *80-100 mins*
**Goal**: Establish reusable database foundation supporting multiple business types

### **Tasks:**

#### **1A: Core Entity Models** *(40 mins)*
```typescript
// Core business-agnostic models
interface Business {
  id: string;
  name: string;
  type: 'fishing-guide' | 'contracting' | 'generic';
  domain: string;
  settings: BusinessSettings;
  branding: BrandingConfig;
}

interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  depositRequired: boolean;
  depositAmount?: number;
  maxCapacity: number;
  requiresApproval: boolean;
}

interface Booking {
  id: string;
  businessId: string;
  serviceId: string;
  customerId: string;
  startDateTime: Date;
  endDateTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  depositPaid: boolean;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  notes?: string;
  metadata: Record<string, any>; // Business-specific data
}

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferences: Record<string, any>;
  bookingHistory: Booking[];
}
```

#### **1B: Business Configuration System** *(30 mins)*
```typescript
interface BusinessSettings {
  timezone: string;
  currency: string;
  workingHours: {
    [day: string]: { start: string; end: string; } | null;
  };
  advanceBookingDays: number;
  cancellationPolicy: {
    hours: number;
    refundPercentage: number;
  };
  autoConfirm: boolean;
  requireDeposit: boolean;
}

interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  favicon?: string;
  customDomain?: string;
  emailTemplates: EmailTemplateConfig;
}
```

#### **1C: Migration & Seed Data** *(30 mins)*
- Create Prisma schema with all core entities
- Set up database migrations with proper indexing
- Create seed data for Thorstenson Guide Service
- Add sample data for testing and development

### **Testing Steps:**
1. Database migrations run successfully
2. All models create without foreign key errors
3. Seed data populates correctly
4. Business configuration system functional
5. Core CRUD operations work for all entities

### **✅ Phase 1 Success Criteria:**
- [ ] Database schema supports multiple business types
- [ ] Core entities (Business, Service, Booking, Customer) created with proper relationships
- [ ] Business configuration system enables customization per business
- [ ] Migration system working with rollback capability
- [ ] Seed data includes Thorstenson Guide Service and sample bookings
- [ ] All foreign key constraints properly configured
- [ ] Database indexes optimized for booking queries
- [ ] TypeScript types generated from Prisma schema

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 2**

---

## **Phase 2: Core Booking Engine & Calendar API** ⏱️ *100-120 mins*
**Goal**: Build business-agnostic booking logic and calendar management

### **Tasks:**

#### **2A: Availability Engine** *(50 mins)*
```typescript
// Core availability calculation engine
class AvailabilityEngine {
  async getAvailableSlots(
    businessId: string,
    serviceId: string,
    dateRange: { start: Date; end: Date }
  ): Promise<AvailableSlot[]> {
    // Calculate available time slots based on:
    // - Business working hours
    // - Service duration
    // - Existing bookings
    // - Business-specific blackout dates
    // - Buffer times between bookings
  }
  
  async checkSlotAvailability(
    businessId: string,
    serviceId: string,
    requestedSlot: { start: Date; end: Date }
  ): Promise<{ available: boolean; conflicts?: Booking[] }> {
    // Validate specific slot availability
  }
}
```

#### **2B: Booking Management API** *(40 mins)*
```typescript
// RESTful API endpoints for booking operations
// POST /api/bookings - Create new booking
// GET /api/bookings/:id - Get booking details
// PUT /api/bookings/:id - Update booking
// DELETE /api/bookings/:id - Cancel booking
// GET /api/businesses/:id/availability - Get available slots

interface CreateBookingRequest {
  businessId: string;
  serviceId: string;
  customerId: string;
  startDateTime: string;
  customerNotes?: string;
  metadata?: Record<string, any>;
}

interface BookingResponse {
  booking: Booking;
  paymentIntent?: PaymentIntent; // If deposit required
  confirmationDetails: {
    confirmationNumber: string;
    emailSent: boolean;
  };
}
```

#### **2C: Google Calendar Integration** *(30 mins)*
```typescript
// Two-way sync with Google Calendar
class CalendarIntegration {
  async syncBookingToCalendar(booking: Booking): Promise<void> {
    // Create/update calendar event
    // Add customer details and booking info
    // Set proper timezone and reminders
  }
  
  async handleCalendarWebhook(event: CalendarEvent): Promise<void> {
    // Process external calendar changes
    // Update booking availability
    // Notify of conflicts
  }
}
```

### **Testing Steps:**
1. Availability calculation accurate for various scenarios
2. Booking creation prevents double-booking
3. Calendar integration creates events correctly
4. API endpoints return proper status codes and data
5. Timezone handling works across different regions
6. Concurrent booking requests handled safely

### **✅ Phase 2 Success Criteria:**
- [ ] Availability engine accurately calculates open time slots
- [ ] Booking creation validates availability and prevents conflicts
- [ ] Google Calendar integration creates and updates events correctly
- [ ] API endpoints handle all CRUD operations for bookings
- [ ] Timezone support works for different business locations
- [ ] Concurrent booking requests handled with proper locking
- [ ] Webhook system processes calendar changes from external sources
- [ ] Error handling provides clear feedback for all failure scenarios

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 3**

---

## **Phase 3: Payment Processing & Stripe Integration** ⏱️ *90-110 mins*
**Goal**: Implement secure payment processing with multi-business support

### **Tasks:**

#### **3A: Stripe Connect Architecture** *(50 mins)*
```typescript
// Multi-business payment processing
interface PaymentProcessor {
  async createPaymentIntent(
    booking: Booking,
    amount: number,
    isDeposit: boolean
  ): Promise<PaymentIntent>;
  
  async processRefund(
    booking: Booking,
    amount?: number,
    reason?: string
  ): Promise<Refund>;
  
  async setupBusinessStripeAccount(
    business: Business
  ): Promise<StripeAccount>;
}

// Stripe Connect for multi-business support
class StripeConnectService {
  async createConnectedAccount(business: Business): Promise<string> {
    // Create Stripe Connect account for business
    // Handle onboarding flow
    // Return account ID for future transactions
  }
  
  async processPaymentForBusiness(
    stripeAccountId: string,
    paymentIntentData: PaymentIntentData
  ): Promise<PaymentIntent> {
    // Process payment to business's connected account
    // Handle platform fees if applicable
    // Manage currency conversion if needed
  }
}
```

#### **3B: Invoice Generation System** *(30 mins)*
```typescript
// PDF invoice generation with business branding
interface InvoiceGenerator {
  async generateInvoice(booking: Booking): Promise<{
    pdf: Buffer;
    invoiceNumber: string;
    downloadUrl: string;
  }>;
  
  async sendInvoiceEmail(
    booking: Booking,
    invoice: Invoice
  ): Promise<void>;
}

// Invoice data structure
interface Invoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'overdue';
}
```

#### **3C: Refund & Cancellation Logic** *(30 mins)*
```typescript
// Automated refund processing based on business policies
class RefundProcessor {
  async calculateRefundAmount(
    booking: Booking,
    cancellationTime: Date
  ): Promise<{
    refundAmount: number;
    feeAmount: number;
    policyApplied: CancellationPolicy;
  }> {
    // Apply business-specific cancellation policies
    // Calculate fees and refund amounts
    // Consider weather policies for outdoor businesses
  }
  
  async processAutomaticRefund(
    booking: Booking,
    reason: 'weather' | 'business_cancellation' | 'customer_request'
  ): Promise<RefundResult>;
}
```

### **Testing Steps:**
1. Payment intents create successfully for different amounts
2. Stripe Connect accounts set up correctly for businesses
3. Invoice generation produces proper PDF documents
4. Refund calculations follow business policies accurately
5. Multi-currency support works for international customers
6. Failed payment scenarios handled gracefully

### **✅ Phase 3 Success Criteria:**
- [ ] Stripe Connect integration supports multiple businesses
- [ ] Payment intents create successfully for bookings and deposits
- [ ] Invoice PDF generation includes proper business branding
- [ ] Refund processing follows business-specific cancellation policies
- [ ] Multi-currency support for international customers
- [ ] Failed payment handling with retry mechanisms
- [ ] Webhook processing for payment status updates
- [ ] PCI compliance maintained throughout payment flow

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 4**

---

## **Phase 4: Frontend Booking Components** ⏱️ *120-150 mins*
**Goal**: Create reusable React components for booking workflow

### **Tasks:**

#### **4A: Service Selection Component** *(45 mins)*
```tsx
// Reusable service selection interface
interface ServiceSelectorProps {
  businessId: string;
  onServiceSelect: (service: Service) => void;
  customization?: {
    layout: 'grid' | 'list';
    showPricing: boolean;
    showDuration: boolean;
  };
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  businessId,
  onServiceSelect,
  customization = {}
}) => {
  // Fetch available services for business
  // Display in customizable layout
  // Handle service selection and validation
  // Support filtering and search
};
```

#### **4B: Calendar & Time Selection** *(45 mins)*
```tsx
// Interactive calendar with availability display
interface CalendarSelectorProps {
  businessId: string;
  serviceId: string;
  selectedDate?: Date;
  onDateTimeSelect: (dateTime: Date) => void;
  timeSlotDuration: number;
  blackoutDates?: Date[];
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  businessId,
  serviceId,
  onDateTimeSelect,
  timeSlotDuration
}) => {
  // Display month calendar view
  // Show available/unavailable dates
  // Time slot selection for chosen date
  // Real-time availability checking
  // Mobile-optimized touch interface
};
```

#### **4C: Customer Information Form** *(30 mins)*
```tsx
// Reusable customer data collection
interface CustomerFormProps {
  onCustomerSubmit: (customer: CustomerData) => void;
  requiredFields: ('email' | 'phone' | 'address')[];
  businessCustomFields?: CustomField[];
  validation?: ValidationRules;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address;
  customFields?: Record<string, any>;
  marketingOptIn: boolean;
}
```

### **Testing Steps:**
1. Service selection displays correctly for different business types
2. Calendar shows accurate availability in real-time
3. Customer form validates required fields properly
4. Mobile interface works smoothly on touch devices
5. Components integrate seamlessly with existing site design
6. Form state management preserves data across navigation

### **✅ Phase 4 Success Criteria:**
- [ ] Service selector displays services with proper business branding
- [ ] Calendar component shows real-time availability accurately
- [ ] Time slot selection prevents booking unavailable times
- [ ] Customer form collects required information with validation
- [ ] Mobile-optimized interface works on touch devices
- [ ] Components styled to match existing wilderness theme
- [ ] Form state preserved during multi-step booking process
- [ ] Accessibility standards met for screen readers and keyboard navigation

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 5**

---

## **Phase 5: Admin Dashboard & Management Interface** ⏱️ *100-130 mins*
**Goal**: Build comprehensive admin interface for booking management

### **Tasks:**

#### **5A: Dashboard Overview** *(40 mins)*
```tsx
// Business analytics and overview dashboard
interface DashboardProps {
  businessId: string;
  dateRange: { start: Date; end: Date };
}

const AdminDashboard: React.FC<DashboardProps> = ({ businessId, dateRange }) => {
  return (
    <div className="dashboard-grid">
      <MetricsCards 
        metrics={['total_bookings', 'revenue', 'occupancy_rate', 'customer_count']}
        dateRange={dateRange}
      />
      <RecentBookings limit={10} />
      <UpcomingSchedule days={7} />
      <RevenueChart dateRange={dateRange} />
      <CustomerGrowthChart dateRange={dateRange} />
    </div>
  );
};
```

#### **5B: Calendar Management Interface** *(40 mins)*
```tsx
// Drag-and-drop calendar with booking management
interface AdminCalendarProps {
  businessId: string;
  editable: boolean;
  onBookingUpdate: (booking: Booking) => void;
  onAvailabilityChange: (availability: AvailabilityRule) => void;
}

const AdminCalendar: React.FC<AdminCalendarProps> = ({
  businessId,
  editable,
  onBookingUpdate
}) => {
  // Full calendar view with existing bookings
  // Drag-and-drop rescheduling
  // Click to edit booking details
  // Bulk availability updates
  // Conflict detection and resolution
};
```

#### **5C: Customer Relationship Management** *(50 mins)*
```tsx
// Customer management and communication
interface CustomerManagementProps {
  businessId: string;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ businessId }) => {
  return (
    <div className="customer-management">
      <CustomerList 
        searchable={true}
        filterable={['booking_count', 'total_spent', 'last_visit']}
      />
      <CustomerDetail 
        showBookingHistory={true}
        showCommunicationLog={true}
        allowNotes={true}
      />
      <BulkCommunication 
        templates={['booking_reminder', 'thank_you', 'seasonal_promotion']}
      />
    </div>
  );
};
```

### **Testing Steps:**
1. Dashboard loads quickly and displays accurate metrics
2. Calendar interface allows easy booking management
3. Customer management provides comprehensive CRM functionality
4. Drag-and-drop rescheduling works smoothly
5. Bulk operations process efficiently
6. Search and filtering perform quickly

### **✅ Phase 5 Success Criteria:**
- [ ] Dashboard displays key business metrics accurately
- [ ] Calendar interface supports drag-and-drop booking management
- [ ] Customer management provides full CRM capabilities
- [ ] Search and filtering functions work efficiently
- [ ] Bulk operations handle large datasets without performance issues
- [ ] Real-time updates reflect changes immediately
- [ ] Mobile admin interface functional for on-the-go management
- [ ] Data export capabilities for reporting and analysis

### **🛑 APPROVAL GATE: Wait for positive confirmation before Phase 6**

---

## **Phase 6: Business Adapter Implementation** ⏱️ *80-100 mins*
**Goal**: Create fishing guide and contracting business adapters

### **Tasks:**

#### **6A: Fishing Guide Business Adapter** *(40 mins)*
```typescript
// Fishing guide specific functionality
interface FishingGuideAdapter extends BusinessAdapter {
  services: {
    'half-day': { duration: 480; price: 350; maxCapacity: 2 };
    'full-day': { duration: 960; price: 650; maxCapacity: 2 };
    'multi-day': { duration: 1440; price: 1200; maxCapacity: 2 };
  };
  
  weatherIntegration: {
    checkWeatherCancellation(booking: Booking): Promise<{
      shouldCancel: boolean;
      reason?: string;
      rescheduleOptions?: Date[];
    }>;
    
    getWeatherAlert(date: Date): Promise<WeatherAlert | null>;
  };
  
  equipmentManagement: {
    trackEquipmentUsage(booking: Booking): void;
    getAvailableEquipment(date: Date): Equipment[];
  };
}
```

#### **6B: Contracting Business Adapter** *(40 mins)*
```typescript
// Construction/contracting specific functionality
interface ContractingAdapter extends BusinessAdapter {
  services: {
    'consultation': { duration: 120; price: 150; requiresApproval: true };
    'estimate': { duration: 240; price: 0; followUpRequired: true };
    'project': { duration: 0; price: 0; customPricing: true };
  };
  
  projectManagement: {
    createProjectEstimate(
      consultation: Booking,
      requirements: ProjectRequirements
    ): Promise<ProjectEstimate>;
    
    scheduleProjectPhases(
      project: Project,
      timeline: ProjectTimeline
    ): Promise<Booking[]>;
  };
  
  materialManagement: {
    trackMaterialNeeds(project: Project): MaterialList;
    scheduleDeliveries(materials: MaterialList): DeliverySchedule;
  };
}
```

### **Testing Steps:**
1. Fishing guide adapter handles weather-based cancellations
2. Contracting adapter supports project estimation workflow
3. Business-specific features integrate with core booking system
4. Industry terminology and workflows properly implemented
5. Adapter switching works seamlessly for multi-business accounts

### **✅ Phase 6 Success Criteria:**
- [ ] Fishing guide adapter supports trip-specific functionality
- [ ] Weather integration provides cancellation recommendations
- [ ] Contracting adapter handles consultation-to-project workflow
- [ ] Project estimation system integrated with booking flow
- [ ] Business adapters work seamlessly with core booking engine
- [ ] Industry-specific terminology and processes properly implemented
- [ ] Multi-business accounts can switch between adapters
- [ ] Custom fields and metadata support business-specific needs

### **🛑 APPROVAL GATE: Wait for positive confirmation before marking complete**

---

## **Reusable Template Architecture**

### **Configuration-Driven Business Setup**
```typescript
// Template system for rapid business deployment
interface BusinessTemplate {
  id: string;
  name: string;
  industry: 'outdoor-recreation' | 'construction' | 'professional-services';
  defaultServices: ServiceTemplate[];
  workingHoursTemplate: WorkingHours;
  cancellationPolicyTemplate: CancellationPolicy;
  emailTemplates: EmailTemplateSet;
  brandingDefaults: BrandingConfig;
}

// Rapid deployment system
class BusinessTemplateEngine {
  async deployNewBusiness(
    template: BusinessTemplate,
    customization: BusinessCustomization
  ): Promise<Business> {
    // Create business from template
    // Apply customizations
    // Set up payment processing
    // Configure domain and branding
    // Deploy booking interface
  }
}
```

### **Component Customization System**
```typescript
// Theme and styling customization
interface ComponentTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: string;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}
```

## **Success Metrics & KPIs**

### **Technical Performance**
- **Booking Completion Rate**: > 95% of started bookings completed
- **Page Load Speed**: < 3 seconds on mobile for booking flow
- **Payment Success Rate**: > 99% successful payment processing
- **Calendar Accuracy**: 100% accuracy in availability calculations
- **Mobile Usability**: > 90% of bookings completed on mobile devices

### **Business Impact**
- **Administrative Time Savings**: 75% reduction in manual booking management
- **Customer Satisfaction**: Streamlined booking process improving experience
- **Revenue Growth**: Enabled online booking increasing conversion rates
- **Multi-Business Scalability**: Template deployment in < 4 hours per business
- **Developer Adoption**: Template system usable by external developers

### **Platform Metrics**
- **Template Reusability**: Core components used across multiple business types
- **Customization Flexibility**: Business-specific needs met without core changes
- **Integration Success**: Seamless integration with existing websites
- **Maintenance Efficiency**: Centralized updates benefit all deployed businesses
- **Documentation Quality**: External developers can implement without support

---

## **Deployment & Maintenance Strategy**

### **Phased Rollout Plan**
1. **Alpha Testing**: Thorstenson Guide Service (Month 8)
2. **Beta Testing**: James's Contracting Business (Month 9)
3. **Production Launch**: Both businesses live (Month 10)
4. **Template Release**: Documentation and licensing (Month 12)

### **Ongoing Development**
- **Quarterly Feature Updates**: Based on business feedback and usage analytics
- **Security Updates**: Regular security patches and compliance updates
- **Performance Optimization**: Continuous improvement of speed and reliability
- **Integration Expansion**: New third-party services based on demand

### **Support & Documentation**
- **Business User Guides**: Comprehensive documentation for Brittney and business owners
- **Developer Documentation**: Complete API reference and integration guides
- **Video Tutorials**: Setup and usage tutorials for key features
- **Community Support**: Forums and resources for template users

---

**REMEMBER: 
- Ask for explicit approval at every approval gate! 🛑
- NEVER commit without user testing and verification! ⚠️
- NEVER push without explicit user request! 🚨**

---

**NEXT STEP: Begin Phase 1 - Core Database Schema & Models** 🚀

This architecture serves as the foundation for a truly reusable booking system that can power multiple service businesses while maintaining the quality and user experience standards established with the Thorstenson Guide Service website.