# Fishing Guide Website - Project README

## Overview
This project is a modern, responsive website to promote James ("Jamie") Thorstenson’s fishing guide business in Ely, MN. It may later also include his general contracting business, depending on whether the final structure is one combined site or two distinct ones.

The site will highlight guided fishing trips, showcase James’ personal story, allow clients to schedule outings, and feature Brittney’s social media content for marketing and storytelling.

---

## Stack
- **Frontend:** Next.js (React, TypeScript)
- **Hosting:** Vercel
- **Backend (if needed):** FastAPI (or serverless API routes)
- **Database (if needed):** PostgreSQL on Railway
- **Payment Processor:** Stripe (for deposits/prepayment)
- **Third-Party Services:**
  - Elfsight (Instagram feed widget)
  - Facebook Page Plugin (timeline embed)

---

## Key Features
- Homepage with intro, CTA buttons, and social proof
- About page for James, Brittney, and future team members
- Booking calendar with availability management and payments
- Trips & Services overview with pricing and policies
- Social media feed page (Adventure Log)
- Photo Gallery with optional client submissions
- FAQ and Contact pages

---

## Admin Notes
- Brittney will manage bookings, payments, and social updates
- Social feeds will auto-update via widgets (no manual input)
- Admin dashboard (optional) can be built for managing availability/bookings if not using a third-party tool

---

## Open Questions
- Will this be a combined site (contracting + guiding) or split into two?
- Will booking be handled via third-party (e.g., Calendly) or a custom scheduler?
- Final name and branding TBD (current idea: Tiller Bros; local advice suggests including "Ely")

---

## Dev Notes
- Use TailwindCSS for styling
- Use environment variables for API keys (Stripe, IG/FB embeds if dynamic)
- Deploy preview environments via Vercel for feedback
- Eventually support mobile-first and SEO optimization

---

## Contributors
- **Tony Guinta** – Project lead, frontend developer
- **James Thorstenson** – Business owner, subject matter expert
- **Brittney Thorstenson** – Admin, scheduler, social media manager

---

## Status
**In planning/design phase** – initial layout and feature list defined, awaiting final decisions on branding, site count (one or two), and scheduler integration.

