# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fishing guide website for James ("Jamie") Thorstenson's business in Ely, MN. The project is currently in the planning/design phase with the following tech stack:

- **Frontend:** Next.js (React, TypeScript)
- **Styling:** TailwindCSS
- **Hosting:** Vercel
- **Backend (if needed):** FastAPI or serverless API routes
- **Database (if needed):** PostgreSQL on Railway
- **Payment Processing:** Stripe
- **Third-Party Services:** Elfsight (Instagram feed), Facebook Page Plugin

## Key Features to Implement

- Homepage with intro, CTA buttons, and social proof
- About page for James, Brittney, and team members
- Booking calendar with availability management and payments
- Trips & Services overview with pricing and policies
- Social media feed page (Adventure Log)
- Photo Gallery with optional client submissions
- FAQ and Contact pages

## Development Guidelines

- Use mobile-first responsive design
- Implement SEO optimization
- Use environment variables for API keys (Stripe, social media embeds)
- Deploy preview environments via Vercel for feedback
- Focus on performance and user experience

## Open Decisions

- Combined site (contracting + guiding) vs. two separate sites
- Custom booking scheduler vs. third-party solution (Calendly)
- Final branding name (current idea: Tiller Bros, but local advice suggests including "Ely" or something Ely is known for)

## Recommendations

- **Start with guide business first** - Focus on new business that needs marketing push, add contracting section later
- **Custom scheduler preferred** - More control, better integration, professional look for premium service
- **Single site approach** - Two audiences likely overlap in Ely area, easier to manage, better SEO
- **Ely/BWCA branding** - Consider "Boundary Waters" or "BWCA" related names based on local advice
- **Mobile-first critical** - Fishing clients will book on phones while planning trips
- **Focus on storytelling** - Jamie's authenticity/lifestyle is key differentiator in crowded guide market

## Business Model Considerations

- Pricing strategy (half-day/full-day/multi-day trips)
- Capacity planning (simultaneous client limits)
- Weather contingency policies
- Equipment provided vs. client responsibility
- Seasonal business content strategy
- Fishing guide insurance/liability requirements
- Competition differentiation strategy

## Photo Analysis & Placement Strategy

### Available Photos
- **Big Sis.png** - Family photo by the lake (Jamie, Brittney, Ella) → Hero section or About page
- **fish1.jpg** - Jamie with walleye on pristine lake → Hero section background or services page
- **fish2.jpg** - Huge northern pike in boat → Gallery/success stories section
- **fish3.jpg** - Happy client with rainbow trout → Testimonials or gallery
- **fish4.jpg** - Jamie kayak fishing → Services page (shows different fishing methods)
- **snow-walk-with-ella.jpg** - Jamie with baby in winter → About page (shows family/seasonal lifestyle)

### Color Scheme
Based on northern Minnesota wilderness and lake photos:
- **Deep lake blues**: #1E3A8A, #3B82F6
- **Forest greens**: #065F46, #10B981
- **Warm earth tones**: #92400E, #F59E0B
- **Clean whites/grays**: #F8FAFC, #64748B for contrast

### Mockup Goals
- Style-focused design to show "art of the possible"
- Placeholder bios for Jamie and Brittney
- Placeholder scheduling interface
- Mobile-first responsive design
- Emphasis on storytelling and authenticity

## Key Stakeholders

- **Tony Guinta** – Project lead, frontend developer (Tony's stepson)
- **James "Jamie" Thorstenson** – Business owner, 38, general contractor wanting to start fishing guide business in Ely, MN. Outdoorsy, independent, intelligent, charismatic. Avoids chemicals/additives, loves bow-hunting, fishing, nature
- **Brittney Thorstenson** – Jamie's wife, handles backoffice work, scheduling, and finances for both businesses. Adventure partner with Jamie. Mother to 22-month-old Ella, second baby due October

## Current Status

Project is in planning/design phase. Initial layout and feature list defined, awaiting final decisions on branding, site structure, and scheduler integration.

## Notes

- Brittney will manage bookings, payments, and social updates
- Social feeds will auto-update via widgets
- Admin dashboard may be built for managing availability/bookings if not using third-party tools