# BuildCraftPro

A production-ready SaaS web application for general contractors (carpentry, HVAC, plumbing, electrical) to manage their projects, clients, and invoices. Built with comprehensive testing and AI-driven development practices.

## 🎨 Brand Identity

BuildCraftPro features a professional construction industry aesthetic with a carefully crafted color palette:

### Color Palette
- **Navy Blueprint** (#15446C) - Primary brand color for headers, navigation, and key UI elements
- **Construction Amber** (#E58C30) - Accent color for call-to-action buttons and interactive highlights
- **Blueprint Off-White** (#F4F5F7) - Light background for optimal readability
- **Builder Green** (#2E7D32) - Success states and positive feedback
- **Jobsite Yellow** (#FFB100) - Warnings and caution indicators
- **Safety Red** (#D32F2F) - Error states and critical alerts

### Logo Implementation
- High-resolution logos optimized for web (90% size reduction via TinyPNG)
- Dual variants: standard logo for light backgrounds, dark-mode variant for navy sidebar
- Responsive sizing across all breakpoints
- Professional branding throughout the application

## ✨ Features

### Core Business Features

#### Client & Project Management
- **User Authentication**: Secure JWT-based authentication with session management
- **Client Management**: Store and manage client information with comprehensive contact details
- **Project Management**: Create and track projects with detailed cost breakdowns and real-time calculations
- **Subproject Organization**: Break projects into manageable sections (e.g., "Kitchen Remodel", "Deck Construction")
- **Task Management**: Assign and track tasks within projects with time logging capabilities

#### Financial Management
- **Sales Tax System**: Company defaults with project-level overrides and tax-exempt functionality
- **Markup & Discount System**: Per-category markup for Materials and Labor with company defaults, project overrides, and discount reason tracking
- **Estimate Generation**: Professional PDF estimates with client signature capture and approval workflow
- **Invoice Generation**: Create and manage invoices with automatic tax calculations and markup integration
- **Cost Breakdown Tracking**: Comprehensive cost estimation across Materials, Labor, Permits, and Other Costs
- **Real-time Financial Calculations**: Live cost rollups and summaries with precision handling

#### Business Operations
- **Company Settings**: Centralized configuration for tax rates, markup defaults, and business information
- **Dashboard Analytics**: Overview of projects, clients, invoices, and revenue metrics with key performance indicators
- **Material Library**: Autocomplete system with reusable material entries for efficiency across projects
- **Phone Number Formatting**: Professional phone number formatting on registration and client forms
- **Professional Data Display**: Consistent formatting for currency, dates, and contact information

### Advanced Cost Tracking
- **Subproject Cost Tracking**: Comprehensive cost estimation system with:
  - Materials tracking with autocomplete and real-time calculations
  - Labor cost management with worker roles and hourly rates
  - Permits tracking with dates and expiration management
  - Other costs categorization and tracking
  - Real-time cost summaries and rollups across all categories

### User Experience & Interface
- **Mobile-First Design**: Fully responsive interface optimized for job site use
- **Professional Branding**: Construction industry-focused UI with consistent BuildCraftPro color palette
- **Click-to-Edit Tables**: Streamlined mobile-friendly editing interface for cost tracking
- **Real-time Updates**: Live calculation updates across all cost categories and project totals
- **Form Validation**: Comprehensive input validation with helpful error messages and warnings

### Technical Excellence
- **Production Reliability**: Zero production bugs through comprehensive testing and validation
- **Database Precision**: NUMERIC precision handling for financial calculations ensuring accuracy to the penny
- **Audit Trail**: Complete change tracking for markup modifications and financial adjustments
- **Security**: JWT-based authentication with proper session management and input validation

### Sales & Demo Features
- **Demo Environment**: Complete demo data reset system for sales presentations
- **Realistic Sample Data**: Pre-populated construction projects with materials, labor, permits, and invoices
- **Hidden Admin Routes**: `/demo-reset` for sales team use (rate limited for security)
- **Instant Demo Setup**: 3-5 second complete environment reset with demo credentials

## Tech Stack

### Backend
- **FastAPI**: Modern, high-performance web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation and request/response schemas
- **PostgreSQL**: Production database (SQLite for local development)
- **JWT**: JSON Web Tokens for authentication

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **TanStack Table**: High-performance table component for complex data display
- **React Hook Form**: Form validation and state management
- **Tailwind CSS**: Utility-first CSS framework with custom BuildCraftPro color palette
- **Vite**: Next-generation frontend build tool
- **React Router**: Declarative routing for React
- **Axios**: HTTP client for API requests
- **Vitest**: Modern testing framework with React Testing Library

### Testing & Quality Assurance
- **Backend**: pytest + pytest-asyncio (40 comprehensive tests including 36 markup-specific)
- **Frontend**: Vitest + React Testing Library (43 comprehensive tests)
- **Total Coverage**: 83 tests ensuring production reliability and zero production bugs
- **Test-Driven Development**: All new features require comprehensive test coverage
- **Quality Gates**: Pre-commit hooks with automated testing and linting

### Design System
- **Custom Color Palette**: Professional construction industry colors
- **CSS Custom Properties**: Theme-ready with CSS variables for future dark mode
- **Component Library**: Consistent button variants and UI elements
- **Responsive Design**: Mobile-first approach with construction site usability

### Development Tools
- **Python Virtual Environment**: Isolated Python environment
- **ESLint & Prettier**: Code formatting and linting
- **Hot Reload**: Development servers with auto-refresh
- **Alembic**: Database migration management with version control
- **Pre-commit Hooks**: Automated testing and linting before commits

## Getting Started

### Prerequisites
- Python 3.8 or higher (Note: Use `python3` command, not `python`)
- Node.js 16 or higher
- Git (optional)

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/buildcraftpro.git
cd buildcraftpro
```

2. **Run the automated setup:**
```bash
python3 setup.py
```
*Note: The setup script will automatically create the virtual environment, install dependencies, and create the database. If you encounter any issues with pip not being found, see the Manual Setup section.*

3. **Start the backend server:**
```bash
python3 run.py
```
*Note: `run.py` starts the FastAPI backend server with hot reload on port 8000*

4. **In a new terminal, start the frontend:**
```bash
cd frontend
npm run dev
```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

For detailed instructions and troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

### Manual Setup

#### Backend

1. **Create and activate virtual environment:**
```bash
cd backend
python3 -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

2. **Install dependencies:**
```bash
# Note: On macOS, ensure pip is available in venv first
venv/bin/python -m ensurepip --upgrade
venv/bin/python -m pip install --upgrade pip
# Then install requirements
venv/bin/pip install -r requirements.txt
```

3. **Create environment file:**
Copy `env.example` to `backend/.env` and update the values (see Environment Variables section below)

4. **Run the development server:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

## Environment Variables

Copy the `env.example` file to `backend/.env` and update the values for your environment. The file contains the following variables:

```env
# Required: Change this secret key for production!
SECRET_KEY=your-secret-key-change-in-production

# Database URL (SQLite for development, PostgreSQL for production)
DATABASE_URL=sqlite:///./buildcraftpro.db

# Optional: API URL for frontend (defaults to localhost:8000)
# VITE_API_URL=http://localhost:8000/api
```

**Important**: Always change the `SECRET_KEY` before deploying to production!

## Project Structure

```
buildcraftpro/
├── backend/
│   ├── alembic/            # Database migration files and configuration
│   ├── app/
│   │   ├── api/            # API endpoints (auth, clients, projects, invoices, company)
│   │   ├── core/           # Security, dependencies, configuration
│   │   ├── db/             # Database setup and connection
│   │   ├── models/         # SQLAlchemy database models
│   │   ├── schemas/        # Pydantic request/response schemas
│   │   ├── utils/          # Utility functions (calculations, etc.)
│   │   └── main.py         # FastAPI application entry point
│   ├── tests/              # Backend test suite (pytest)
│   ├── requirements.txt    # Python dependencies
│   └── run_tests.py        # Test runner script
├── frontend/
│   ├── src/
│   │   ├── api/            # API client configuration and cost update queue
│   │   ├── components/     # Reusable React components and modals
│   │   ├── context/        # React context providers (Auth, CostCalculation)
│   │   ├── pages/          # Page components (Dashboard, Clients, Projects, etc.)
│   │   ├── test/           # Frontend test suite (Vitest + React Testing Library)
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   └── index.css       # BuildCraftPro color palette and CSS variables
│   ├── public/
│   │   └── images/
│   │       ├── icons/      # Favicon and app icons
│   │       └── logos/      # Optimized BuildCraftPro logos and branding guide
│   ├── package.json        # Node.js dependencies
│   ├── tailwind.config.js  # Custom BuildCraftPro color configuration
│   ├── vite.config.ts      # Vite configuration
│   └── vitest.config.ts    # Vitest testing configuration
├── scripts/               # Utility scripts (image conversion, etc.)
├── CLAUDE.md              # AI context file and development guidelines
├── FEATURE_PLANNING.md    # Strategic roadmap and feature specifications
├── TECHNICAL_DEBT.md      # Known issues and improvement opportunities
├── MARKUP_SYSTEM_IMPLEMENTATION.md  # Detailed implementation guide
├── SALES_TAX_IMPLEMENTATION.md      # Completed feature documentation
├── DATABASE_RESET_GUIDE.md          # Development database procedures
├── RAILWAY_CLI_REFERENCE.md         # Production deployment commands
├── env.example            # Environment variables template
├── railway.toml           # Railway deployment configuration
├── Procfile               # Production server startup command
├── vercel.json            # Frontend deployment configuration (in frontend/)
├── README.md              # This file
├── SETUP_GUIDE.md         # Detailed setup instructions
├── run.py                 # Backend server startup script
├── setup.py               # Automated setup script
└── requirements.txt       # Root-level dependencies for Railway deployment
```

## Database Schema

The application uses the following main entities:

- **Users**: Contractor authentication and profile
- **Clients**: Customer information and contact details
- **Projects**: Construction projects with comprehensive cost tracking, sales tax configuration, and markup settings
- **Company Settings**: Company-wide defaults for tax rates, markup percentages, and business information
- **Subprojects**: Project subdivisions (e.g., "Kitchen Remodel", "Deck Construction")
- **Material Items**: Detailed materials tracking with quantities, costs, and autocomplete
- **Labor Items**: Worker roles, rates, hours, and calculated costs
- **Permit Items**: Permit costs, dates, and expiration tracking
- **Other Cost Items**: Miscellaneous project expenses
- **Material Entries**: Global material database for autocomplete and reusability
- **Tasks**: Project tasks with time tracking
- **Invoices**: Billing with tax calculations and payment status
- **Markup Changes**: Audit trail for markup/discount modifications

## Development Guidelines

This project follows AI-driven development practices documented in `CLAUDE.md`:

### Core Development Principles
- **6-Phase Implementation Pattern**: Break complex features into manageable phases with approval gates
- **Documentation-Driven Development**: Strategic planning (FEATURE_PLANNING.md) and implementation guides
- **Testing-First Approach**: Comprehensive test coverage for all new features
- **Commit Discipline**: Only commit user-verified, working code
- **Technical Debt Tracking**: Proactive issue management in TECHNICAL_DEBT.md

### Two-Tier Work Tracking System
- **Tier 1: Strategic Documentation** (FEATURE_PLANNING.md) - Business requirements and major features
- **Tier 2: Active Sprint Work** (TodoWrite tool) - Current implementation tasks and progress tracking

### Quality Assurance Protocol
- **Testing Requirements**: All new code must include unit tests
- **Approval Gates**: Each development phase requires user verification before proceeding
- **Clean Commit History**: Only verified, working implementations are committed

### Code Standards
- **Architecture**: Clear separation between frontend/backend layers
- **Backend Style**: FastAPI with Pydantic validation and SQLAlchemy ORM
- **Frontend Style**: React with TypeScript, Tailwind CSS, and BuildCraftPro design system
- **Authentication**: JWT-based authentication flow
- **Data Modeling**: Consistent database patterns with proper relationships
- **Naming**: Consistent naming conventions across the stack
- **Branding**: Professional construction industry aesthetic with consistent color usage

### Design System Usage

The BuildCraftPro design system includes:

```css
/* Primary Actions */
.btn-primary      /* Navy Blueprint background */
.btn-accent       /* Construction Amber background */
.btn-secondary    /* Neutral gray background */

/* Outline Variants */
.btn-outline-primary  /* Navy Blueprint border */
.btn-outline-accent   /* Construction Amber border */

/* Color Utilities */
.text-primary     /* Navy Blueprint text */
.text-accent      /* Construction Amber text */
.text-success     /* Builder Green text */
.text-warning     /* Jobsite Yellow text */
.text-error       /* Safety Red text */
```

## API Documentation

When running the backend server, visit http://localhost:8000/docs for interactive API documentation powered by FastAPI's automatic OpenAPI generation.

### API Authentication

The API uses JWT Bearer token authentication. To authenticate:

1. **Register/Login**: Use `/api/auth/register` or `/api/auth/login` endpoints
2. **Get Token**: The login response includes an `access_token`
3. **Use Token**: Include in requests as `Authorization: Bearer <your-token>`

Example:
```bash
curl -H "Authorization: Bearer <your-token>" http://localhost:8000/api/clients
```

## Deployment

### Current Production Setup
- **Frontend**: Deployed on Vercel with automatic deployments from Git
- **Backend**: Deployed on Railway with managed PostgreSQL database
- **Database**: PostgreSQL with automatic backups and connection pooling
- **Environment**: Secrets managed via Railway dashboard, HTTPS enabled

### Local vs Production Architecture
- **Local Development**: SQLite database (automatic, no setup required)
- **Production**: PostgreSQL on Railway (managed hosting, backups, monitoring)
- **Database Switching**: Controlled via `DATABASE_URL` environment variable
- **Deployment**: Git-based with automatic builds and deployments

### Configuration Files
- `railway.toml`: Railway deployment configuration
- `Procfile`: Production server startup command
- `vercel.json`: Frontend deployment and routing configuration

## Project Status & Roadmap

### ✅ Recently Completed Features

#### Major Business Features
- **Sales Tax System**: Complete 6-phase implementation with company defaults, project-level overrides, and tax-exempt functionality
- **Markup System**: Per-category markup for Materials and Labor with company defaults and project overrides
- **Advanced Cost Tracking**: Comprehensive cost estimation system with Materials, Labor, Permits, and Other Costs tables

#### Technical Excellence
- **Comprehensive Testing**: 83 tests (40 backend including 36 markup-specific, 43 frontend) ensuring production reliability
- **Zero Production Bugs**: Achieved through rigorous testing and approval gate methodology
- **TanStack Table Integration**: High-performance editable tables with inline editing and real-time calculations
- **React Hook Form**: Advanced form validation and state management for complex data entry
- **Real-time Cost Calculations**: Live cost rollups and summaries across all cost categories
- **Material Autocomplete**: Debounced search with reusable material entries for efficiency

#### User Experience
- **Company Settings**: Centralized configuration for tax rates, markup defaults, and business information
- **Mobile-First UI**: Click-to-edit tables optimized for mobile devices and job site use
- **Professional Design System**: Consistent BuildCraftPro branding throughout application

### 🚀 Ready for Implementation (High Priority)
These features have completed strategic planning and are ready for development:

- **Estimate Generation Enhancement**: Currently basic PDF generation, expanding to include:
  - Professional PDF estimates with comprehensive cost breakdowns
  - Client signature capture (draw-to-sign canvas for MVP)
  - Estimate states: draft → sent → viewed → signed → locked
  - Anonymous client access via shareable links
  - Legal boilerplate templates with user-configurable binding status
- **Change Order System**: Track estimate modifications and approvals with audit trail
- **Mobile PWA**: Progressive Web App for enhanced mobile job site experience

### 🔧 Planned Features (Medium Priority)
Strategic roadmap items with defined requirements:

- **Standardized API Error Format**: Consistent error handling across all endpoints
- **Phone Number & Currency Formatting**: Professional data display using Intl.NumberFormat
- **Trip Charge Functionality**: Additional revenue line item with GPS integration
- **Legal Boilerplate Templates**: Estimate/invoice legal text with merge fields
- **AI Material Estimation**: GPT-assisted quantity prediction for cost estimation
- **Material Library Management**: User-maintained material entries with full CRUD capabilities
- **Navigation Enhancement**: Back-arrow/Dashboard links for easier navigation
- **Inline Client Creation**: Create clients within Project modal without navigation

### 📋 Future Enhancements
Long-term vision items for business growth:

#### Workflow & Collaboration
- **Task Management Kanban View**: Visual task board with drag-and-drop workflow
- **Scheduling & Calendar**: Project timeline management and milestone tracking
- **Subcontractor Management**: Manage subcontractor relationships and payments
- **Multi-user Teams**: Collaborate with team members and assign roles

#### Document & Communication
- **Document Storage**: File uploads and document management for projects
- **Email Integration**: Automated invoice delivery and project notifications
- **Customer Portal**: Client access to project updates and invoices

#### Analytics & Reporting
- **Advanced Reporting**: Profit/loss reports, project analytics, and business insights
- **Time Tracking**: Detailed time logging for labor cost accuracy

#### Enterprise Integration
- **Integration APIs**: Connect with accounting software (QuickBooks, Xero)
- **Payment Processing**: Online payment acceptance for invoices
- **Inventory Management**: Track materials and equipment
- **Mobile Apps**: Native iOS and Android applications

## AI-Driven Development Methodology

BuildCraftPro serves as a reference implementation for successful AI-driven software development practices:

### Key Success Factors
- **6-Phase Implementation Pattern**: Complex features broken into manageable phases with approval gates
- **Documentation-Driven Development**: Comprehensive planning prevents scope creep and ensures quality
- **Test-First Approach**: 83 comprehensive tests written alongside implementation
- **Zero Production Bugs**: Achieved through rigorous testing and user verification protocols

### Development Partnership Model
- **AI as Junior Developer**: Expert technical skills with human oversight and guidance
- **Process Over Prompts**: Traditional development disciplines applied to AI collaboration
- **Clean Commit History**: Only user-verified, working code is committed to maintain quality

### Documentation Architecture
Comprehensive documentation system supporting AI collaboration:
- **CLAUDE.md**: AI context file ensuring consistent behavior across sessions
- **FEATURE_PLANNING.md**: Strategic roadmap with prioritized features and specifications
- **TECHNICAL_DEBT.md**: Proactive issue tracking and refactoring triggers
- **Implementation Guides**: Phase-by-phase execution plans (e.g., MARKUP_SYSTEM_IMPLEMENTATION.md)

### Success Metrics
- **Development Velocity**: Significantly faster feature implementation with proper process
- **Code Quality**: Zero production bugs through comprehensive testing
- **Architecture Quality**: Caught critical design flaws before implementation
- **Knowledge Transfer**: Self-documenting codebase through AI-generated guides

## Contributing

### Development Requirements
1. Follow the AI-driven development practices documented in `CLAUDE.md`
2. All new features must include comprehensive unit tests
3. Use the 6-phase implementation pattern for complex features
4. Maintain documentation-driven development approach

### Setup & Standards
1. Follow the coding conventions in `.cursor/rules/`
2. Use the provided setup scripts for consistent development environment
3. Test both frontend and backend changes thoroughly
4. Update documentation when adding new features
5. Reference FEATURE_PLANNING.md before implementing major features

All Rights Reserved.

This software is the proprietary property of Tony Guinta.  
Unauthorized use, distribution, or modification is strictly prohibited.  
Contact [tonyguinta@gmail.com] for licensing inquiries.