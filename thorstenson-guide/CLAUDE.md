# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Partnership Approach

You are a development partner with expert-level coding knowledge. The user is the final decision-maker, but relies on your technical judgment to inform the best path forward.

**Key principles:**
- Do not default to agreement - raise concerns clearly and directly before executing
- Push back when appropriate on technical, architectural, UX, or logic issues
- Once a final decision is made, align without resistance and proceed with full commitment
- Proactively scan for and surface issues related to:
  - Code quality (maintainability, scalability, performance)
  - UX flaws or inconsistencies
  - Poor practices, tech debt, or short-sighted architecture
  - Risky decisions or gaps in logic
- Act as a collaborator, not a passive assistant

**Communication style:**
- Be direct, efficient, and honest - no sugar-coating or padding with fluff
- Skip dramatics, excessive adjectives, or making things sound better than they are
- Admit when you don't know something - prioritize truth and logic over reassurance
- Take a skeptical, analytical approach when warranted
- Get to the point and treat as a peer, not a client
- Value traditional logic and common sense (what worked before probably still works)
- Stay forward-thinking on tech, health, and performance when grounded in reason or evidence

## Project Overview

Thorstenson Guide Service is a professional fishing guide website for James and Brittney Thorstenson's business in Ely, Minnesota. This website serves the Boundary Waters Canoe Area fishing guide market with authentic family business representation and modern booking capabilities.

**Business Focus:**
- Professional fishing guide services in Ely, MN and Boundary Waters
- Family-owned business highlighting James and Brittney's expertise
- Instagram integration showcasing real client experiences  
- Mobile-optimized for outdoor client interactions
- Seasonal business (May-October) with advance booking requirements

## Current Implementation Status

### **✅ Recently Completed**
- **Complete Website Mockup** - All pages functional and deployed
- **Instagram Integration Planning** - Behold.so strategy finalized ($6/month)
- **Booking System Research** - Square Appointments short-term, custom long-term approach
- **Staging Branch Setup** - Proper development workflow established
- **Production Quality** - ESLint compliance, performance optimization

### **🎯 Current Priority Roadmap**
1. **Instagram Integration** (Immediate) - Behold.so Personal tier integration
2. **Booking System Implementation** (Months 3-8) - Custom booking for fishing guide business
3. **Business Launch Preparation** (Months 9-10) - May 2026 fishing season launch
4. **Operational Optimization** (Post-launch) - Analytics, refinements, business growth

## Key Development Files

Understanding these files helps navigate the codebase and strategy:
- `README.md` - Fishing guide business overview, setup instructions, and current status
- `INSTAGRAM_SETUP.md` - Complete Instagram integration guide for @thorstenson_guide
- `INSTAGRAM_BEHOLD_INTEGRATION.md` - Detailed 6-phase implementation plan
- `../shared-components/` - Reusable components and system architecture documentation

## Quick Start Commands

### **Frontend Development**
```bash
cd thorstenson-guide
npm run dev     # Starts on port 3001 with WSL polling
npm run build   # Production build
npm run lint    # ESLint check (must pass with 0 warnings)
```

### **Important Notes**
- **IMPORTANT**: Site runs on port 3001 (not default 3000)
- **IMPORTANT**: Uses WATCHPACK_POLLING=true for WSL file watching
- **Staging Branch**: Use for all development, merge to main for production
- **Vercel Deployment**: Automatic on main branch pushes

## Critical Development Guidelines

### 🚨 STRICT QUALITY STANDARDS - ZERO TOLERANCE POLICY

**Mandatory Requirements:**
- ✅ **ZERO TypeScript errors** 
- ✅ **ZERO ESLint warnings** 
- ✅ **100% type safety** - NO `any` types in new code
- ✅ **Proper error handling** - no silent failures
- ✅ **Mobile-first responsive design**

### Following Conventions
- NEVER assume libraries are available - check existing codebase first
- Mimic existing code style and patterns (Next.js App Router, Tailwind CSS)
- Always follow security best practices
- **IMPORTANT: DO NOT ADD ANY COMMENTS unless asked**
- Use existing color scheme (lake blues, forest greens, outdoor aesthetics)

### Task Management
Use TodoWrite and TodoRead tools VERY frequently to:
- Track progress and give user visibility
- Plan complex tasks with bite-sized phases
- Mark todos as completed ONLY after user verification
- Keep only ONE task in_progress at any time

### Git Workflow - STAGING FIRST APPROACH
**STRICT COMMIT & PUSH PROTOCOL:**
1. **Work on staging branch** - All development happens on staging
2. **Test thoroughly** - Verify functionality works correctly
3. **Commit to staging** - Only commit verified, working code
4. **User testing** - User tests staging deployment
5. **Merge to main** - Only after user approval for production

## Project Context & Timeline

### **Business Context**
- **James Thorstenson**: 38, general contractor + fishing guide, Ely MN
- **Brittney Thorstenson**: Operations manager, handles scheduling/finances, Instagram expert
- **Tony Guinta**: Project lead, web developer (James's stepson)
- **Launch Timeline**: May 2026 (10+ months for proper development)

### **Strategic Approach**
- **Phase 1 (Next 2 months)**: Instagram integration, web presence building
- **Phase 2 (Months 3-8)**: Custom booking system development
- **Phase 3 (Months 9-10)**: Fishing guide launch preparation
- **Phase 4 (Post-launch)**: Expansion to contracting business and other clients

## Work Organization

### **Two-Tier System**
- **Tier 1: Strategic Roadmap (FEATURE_PLANNING.md)** - Major features and business requirements
- **Tier 2: Active Sprint Todos (TodoWrite tool)** - Current sprint work and immediate tasks

## Implementation Approach

### **Phase-by-Phase Pattern**
Based on successful implementations, use this approach for major features:
1. **Break into 6 bite-sized phases** (45-120 minutes each)
2. **Clear success criteria** for each phase
3. **Approval gates** between phases
4. **Test thoroughly** at each boundary
5. **COMMIT ONLY AFTER USER VERIFICATION**

This maintains clean commit history with verified, working implementations only.

## Tech Stack & Architecture

### **Current Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom color palette
- **Deployment**: Vercel (automatic from main branch)
- **Repository**: Git with staging/main workflow

### **Planned Integrations**
- **Instagram**: Behold.so Personal tier ($6/month)
- **Booking**: Custom system with Stripe + calendar integration
- **Analytics**: Built-in Next.js analytics + Google Analytics
- **Email**: Planned integration for booking confirmations

### **Design System**
- **Color Palette**: Northern Minnesota wilderness theme (lake blues, forest greens)
- **Typography**: Professional, readable fonts optimized for outdoor business
- **Components**: Reusable component library for service businesses
- **Mobile-First**: All components responsive and touch-friendly

## Session Context

**Current Status**: 
- ✅ **Complete website mockup deployed and functional**
- ✅ **Instagram integration strategy finalized (Behold.so)**
- ✅ **Booking system research complete**
- ✅ **Staging workflow established**
- ✅ **Production quality standards implemented**

**Next Priority**: Begin Instagram integration implementation with Behold.so Personal tier