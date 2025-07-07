# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fishing guide website for James ("Jamie") Thorstenson's business in Ely, MN. Currently deployed and functional.

## Current Status - January 7, 2025

**✅ COMPLETED:**
- Next.js project setup with TypeScript and Tailwind CSS
- Responsive header navigation with mobile menu
- Hero section with Jamie's fishing photo and text overlay
- Features section highlighting guide expertise
- Photo gallery preview with all fishing photos
- Clean CTA section with consistent button styling
- Footer with dynamic copyright year
- Custom color scheme based on northern Minnesota wilderness
- Mobile-optimized layout with bottom text overlay
- Fixed all ESLint errors and configured linting
- Fixed spelling: "thorsenson" → "thorstenson" throughout codebase
- Successfully deployed to Vercel

**🏗️ RECENT SESSION WORK:**
- Homepage fully styled and responsive
- Hero image cropped (fish1.jpg) to focus on Jamie
- Text overlay positioned at bottom with dark gradient for readability
- All buttons styled consistently (white background style)
- Project renamed from thorsenson-guide to thorstenson-guide
- Vercel deployment working with correct root directory

**📋 NEXT PRIORITIES:**
1. **About Page**: Create bios for Jamie and Brittney
   - Jamie: 38, fishing since childhood, 5+ years in Ely, owns "James of All Trades" contracting
   - Brittney: Handles scheduling/finances, adventure partner, mother of Ella (22mo) + baby due October
   - Use photos: Big Sis.png, snow-walk-with-ella.jpg

2. **Services Page**: Trip options, pricing, equipment details

3. **Gallery Page**: Full photo collection

4. **Booking Page**: Calendar interface for Brittney to manage

5. **Contact/FAQ Pages**: Basic content

**🔧 EXTERNAL TASKS NEEDED:**
- Rename GitHub repository to "Thorstenson" 
- Update git remote URL after GitHub rename
- If root directory renamed, update Vercel settings

## Key Info

**Stakeholders:**
- Tony Guinta – Project lead, frontend developer (Jamie's stepson)
- James "Jamie" Thorstenson – 38, general contractor + fishing guide, Ely MN
- Brittney Thorstenson – Handles backoffice, scheduling, finances

**Tech Stack:**
- Next.js 15 with App Router, TypeScript, Tailwind CSS
- Deployed on Vercel, runs on port 3001 locally
- WSL file watching: `npm run dev` (uses WATCHPACK_POLLING=true)

**Photo Assets:**
- fish1.jpg (hero - Jamie with walleye, cropped)
- fish2.jpg (northern pike)
- fish3.jpg (client with rainbow trout) 
- fish4.jpg (kayak fishing)
- Big Sis.png (family photo)
- snow-walk-with-ella.jpg (winter family photo)

Ready to continue with About page development.