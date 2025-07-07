# Thorstenson Guide Service

A modern, production-ready website platform for Thorstenson Guide Service in Ely, Minnesota, designed as a foundation for reusable service business components. Built with comprehensive testing, mobile-first design, and AI-driven development practices.

## 🎣 Business Identity

Thorstenson Guide Service specializes in fishing guide services in the pristine waters of Ely, Minnesota and the Boundary Waters Canoe Area. The website features a carefully crafted northern Minnesota wilderness aesthetic:

### Brand Theme
- **Northern Minnesota Wilderness**: Professional outdoor business aesthetic
- **Lake Blues & Forest Greens**: Custom color palette reflecting the natural environment
- **Family-Focused**: Highlighting James and Brittney as your local guides
- **Authentic Experience**: Real fishing expertise with genuine hospitality

### Logo & Visual Identity
- High-resolution photos showcasing actual catches and family moments
- Mobile-optimized responsive design for job site and on-the-go access
- Professional branding throughout all customer touchpoints
- Instagram integration highlighting real client experiences

## ✨ Features

### Core Business Features

#### Website Pages & Content
- **Homepage**: Hero section with James fishing, service highlights, gallery preview, clear CTAs
- **About Page**: Complete bios for James and Brittney with authentic family photos
- **Services Page**: Three main packages (Half-Day $350, Full-Day $650, Multi-Day $1,200/day) plus additional services
- **Gallery Page**: Instagram-style layout ready for @thorstenson_guide integration
- **Booking Page**: Interactive 3-step process with calendar interface (planned integration)
- **Contact Page**: Multiple contact methods, location info, and guide profiles
- **FAQ Page**: 20+ comprehensive questions covering booking, expectations, logistics, and policies

#### Instagram Integration (Planned)
- **Automatic Feed Updates**: Behold.so Personal tier integration ($6/month)
- **Real-time Sync**: Updates within minutes of Instagram posts
- **Professional Display**: 50 recent posts with custom styling
- **Mobile Optimized**: Touch-friendly gallery interface

#### Booking System (Future Development)
- **Custom Booking Engine**: Reusable component for service businesses
- **Payment Processing**: Stripe integration for deposits and full payments
- **Calendar Sync**: Google Calendar integration for availability management
- **Client Management**: Contact information and booking history
- **Email Automation**: Confirmation and reminder systems

### Advanced Business Operations
- **Multi-Business Architecture**: Designed for expansion to James's contracting business
- **Reusable Components**: Template system for other service businesses
- **Mobile-First Design**: Optimized for on-the-go client interactions
- **SEO Optimization**: Built for local search visibility
- **Performance**: Fast loading times and optimized images

### Technical Excellence
- **Production Quality**: Zero TypeScript errors, zero ESLint warnings
- **Mobile Performance**: Touch-friendly interface optimized for outdoor conditions
- **Responsive Design**: Seamless experience across all device sizes
- **Security**: Next.js best practices with proper form validation
- **Accessibility**: WCAG compliant design patterns

## Tech Stack

### Frontend
- **Next.js 15**: App Router for modern React development
- **TypeScript**: Strict type safety for production reliability
- **Tailwind CSS**: Utility-first styling with custom wilderness color palette
- **React Hook Form**: Advanced form validation and state management
- **Next.js Image**: Optimized image loading and performance

### Planned Integrations
- **Behold.so**: Instagram feed integration with real-time updates
- **Stripe**: Payment processing for booking deposits and full payments
- **Google Calendar**: Availability management and booking synchronization
- **Next.js Analytics**: Built-in performance and usage tracking
- **Email Service**: Automated booking confirmations and reminders

### Development Tools
- **ESLint & Prettier**: Code quality and formatting
- **TypeScript Strict Mode**: Maximum type safety
- **Tailwind CSS**: Custom design system with wilderness theme
- **Git Workflow**: Staging branch development with production deployments
- **Vercel**: Automatic deployment and hosting

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git (for version control)

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/tonyguinta/Thorstenson.git
cd Thorstenson/thorstenson-guide
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Access the application:**
   - Development: http://localhost:3001
   - Production: https://thorstenson.guide

### Development Commands

```bash
npm run dev          # Start development server (port 3001)
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint (must pass with 0 warnings)
npm run type-check   # TypeScript validation
```

### Important Notes
- **Port 3001**: Development server runs on 3001 (not default 3000)
- **WSL Support**: Uses WATCHPACK_POLLING=true for Windows Subsystem for Linux
- **Staging First**: All development work happens on staging branch
- **Production Deployment**: Automatic via Vercel on main branch pushes

## Project Structure

```
thorstenson-guide/
├── src/
│   ├── app/
│   │   ├── about/           # About page - James & Brittney bios
│   │   ├── booking/         # Booking page - 3-step process
│   │   ├── contact/         # Contact page - multiple contact methods
│   │   ├── faq/            # FAQ page - comprehensive Q&A
│   │   ├── gallery/        # Gallery page - Instagram integration ready
│   │   ├── services/       # Services page - packages and pricing
│   │   ├── globals.css     # Global styles and custom properties
│   │   ├── layout.tsx      # Root layout with navigation
│   │   └── page.tsx        # Homepage with hero and features
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx  # Navigation with mobile menu
│   │   │   └── Footer.tsx  # Footer with contact info
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utility functions and configurations
│   └── types/             # TypeScript type definitions
├── public/
│   └── photos/            # Optimized fishing and family photos
├── CLAUDE.md              # AI development context and guidelines
├── FEATURE_PLANNING.md    # Strategic roadmap and priorities
├── INSTAGRAM_SETUP.md     # Instagram integration guide
├── README.md              # This file
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Custom color palette configuration
└── tsconfig.json          # TypeScript configuration
```

## Strategic Vision & Roadmap

### Current Status (January 2025)
- ✅ **Complete Website**: All pages functional and deployed
- ✅ **Production Quality**: Zero errors, mobile-optimized, fast loading
- ✅ **Instagram Strategy**: Behold.so integration planned ($6/month)
- ✅ **Booking Research**: Custom system architecture defined
- ✅ **Development Workflow**: Staging/production pipeline established

### Phase 1: Web Presence & Instagram (Next 2 Months)
- **Instagram Integration**: Behold.so Personal tier implementation
- **Content Strategy**: Support Brittney's Instagram content creation
- **SEO Optimization**: Local search visibility improvements
- **Performance Monitoring**: Analytics and user behavior tracking

### Phase 2: Custom Booking System (Months 3-8)
- **Reusable Architecture**: Component-based booking system
- **Payment Integration**: Stripe for deposits and full payments
- **Calendar Management**: Google Calendar synchronization
- **Email Automation**: Booking confirmations and reminders
- **Admin Dashboard**: Booking management for Brittney

### Phase 3: Launch Preparation (Months 9-10)
- **Content Refinement**: Final pricing, policies, and descriptions
- **Testing & QA**: Comprehensive booking workflow testing
- **Staff Training**: Brittney training on system management
- **Soft Launch**: Limited bookings for testing and refinement

### Phase 4: Multi-Business Expansion (Post-Launch)
- **Contracting Business**: Adapt system for James's construction services
- **Template Platform**: Create reusable template for other service businesses
- **Component Library**: Modular system for rapid deployment
- **Licensing Opportunities**: Potential revenue stream from template licensing

## Business Context

### Stakeholders
- **James Thorstenson**: 38, general contractor and fishing guide, Ely MN
- **Brittney Thorstenson**: Operations manager, scheduling, finances, Instagram expert
- **Tony Guinta**: Project lead and developer (James's stepson)

### Launch Timeline
- **Business Launch**: May 2026 (fishing season start)
- **Development Window**: 10+ months for proper system development
- **Content Building**: 2025 focus on Instagram presence and brand awareness

### Market Strategy
- **Local SEO**: Target "Ely MN fishing guide" and related terms
- **Social Proof**: Instagram integration for authentic client experiences
- **Referral System**: Built-in capabilities for repeat and referred customers
- **Seasonal Optimization**: Peak season (May-October) focus with off-season maintenance

## Development Methodology

### AI-Driven Development Practices
This project follows proven AI collaboration patterns for production-quality results:

#### Core Development Principles
- **6-Phase Implementation**: Complex features broken into manageable 45-120 minute phases
- **Documentation-Driven Development**: Strategic planning prevents scope creep
- **Quality-First Approach**: Zero tolerance for TypeScript errors or ESLint warnings
- **User Verification Gates**: All code tested and approved before commits
- **Staging-First Workflow**: All development on staging branch with production approval

#### Two-Tier Work Tracking
- **Tier 1: Strategic Planning** (FEATURE_PLANNING.md) - Business requirements and major features
- **Tier 2: Active Development** (TodoWrite tool) - Current implementation tasks and progress

#### Quality Assurance Protocol
- **Testing Requirements**: Comprehensive testing for all new features
- **Approval Gates**: User verification required before advancing to next phase
- **Clean Commit History**: Only verified, working code is committed
- **Performance Standards**: Mobile-first, fast loading, accessible design

## Deployment & Hosting

### Current Production Setup
- **Frontend**: Deployed on Vercel with automatic deployments from main branch
- **Domain**: thorstenson.guide with SSL certificate
- **CDN**: Global content delivery for fast loading worldwide
- **Analytics**: Next.js built-in analytics with performance monitoring

### Development vs Production
- **Development**: Local server on port 3001 with hot reload
- **Staging**: Vercel preview deployments for testing
- **Production**: Automatic deployment from main branch
- **Environment**: Staging-first development workflow

### Performance Optimization
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies for static and dynamic content
- **Mobile Performance**: Touch-friendly interface optimized for outdoor conditions

## Contributing & Development

### Development Requirements
1. Follow AI-driven development practices documented in `CLAUDE.md`
2. All new features must pass TypeScript and ESLint validation
3. Use 6-phase implementation pattern for complex features
4. Maintain documentation-driven development approach
5. Work on staging branch with main branch for production only

### Code Standards
- **TypeScript**: Strict mode with no `any` types allowed
- **ESLint**: Zero warnings policy for production quality
- **Tailwind CSS**: Use existing color palette and component patterns
- **Mobile-First**: All components must be responsive and touch-friendly
- **Security**: Follow Next.js security best practices

### Getting Help
- Review `CLAUDE.md` for development guidelines and AI collaboration patterns
- Check `FEATURE_PLANNING.md` for strategic context and priorities
- Use existing components as patterns for new development
- Follow established naming conventions and file organization

## Future Enhancements

### Short-Term (Next 6 Months)
- **Instagram Feed**: Real-time integration with @thorstenson_guide posts
- **Booking System**: Custom booking engine with payment processing
- **Email Automation**: Booking confirmations and reminder system
- **Analytics**: Comprehensive tracking of user behavior and conversions

### Medium-Term (6-12 Months)
- **Mobile App**: Native app for on-the-go booking and communication
- **Customer Portal**: Client login area for booking history and preferences
- **Advanced Analytics**: Business intelligence dashboard for Brittney
- **Multi-Business**: Expand to James's contracting services

### Long-Term (12+ Months)
- **Template Platform**: Reusable system for other service businesses
- **Component Marketplace**: Licensed components for developers
- **Advanced Features**: AI-powered recommendations, dynamic pricing
- **Enterprise**: Multi-location and franchise support

---

**Contact Information:**
- **Business**: Thorstenson Guide Service, Ely, Minnesota
- **Website**: https://thorstenson.guide
- **Development**: Tony Guinta - [tonyguinta@gmail.com]

All Rights Reserved.

This software is the proprietary property of Tony Guinta.  
Unauthorized use, distribution, or modification is strictly prohibited.  
Contact tonyguinta@gmail.com for licensing inquiries.