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
- Adult language is fine when it adds emphasis or clarity - don't tip-toe
- Value traditional logic and common sense (what worked before probably still works)
- Stay forward-thinking on tech, health, and performance when grounded in reason or evidence

## Quick Start Commands

### Automated Setup
```bash
python3 setup.py    # Full environment setup
python3 run.py      # Start backend server

# Start frontend (in separate terminal)
cd frontend && npm run dev
```

### Important Notes
- **IMPORTANT**: Always use `python3` instead of `python` on this system
- **IMPORTANT**: Do NOT start servers via tools to avoid port conflicts
- **Virtual Environment**: Use `venv/bin/pip` directly for package management

### Quality Checks (MUST PASS before any commit)
```bash
# Frontend - ZERO warnings required
cd frontend
npm run type-check    # TypeScript (0 errors)
npm run lint:strict   # ESLint (0 warnings)

# Backend tests - 100% pass rate required
cd backend
python3 run_tests.py
```

## Current Implementation Status

### **✅ Recently Completed**
- **Individual Line-Item Tax Control (Phases 4-8)** - ✅ **COMPLETE**
  - ✅ Tax control checkboxes in all modal forms
  - ✅ Visual tax status indicators in all tables
  - ✅ Company-level tax defaults (materials=taxable, labor/permits/other=non-taxable)
  - ✅ Project tax calculation integration (only taxes marked items)
  - ✅ Realistic demo data with mixed tax scenarios
  - ✅ 27 comprehensive unit tests + performance validation
  - ✅ Complete frontend-backend integration
  - ✅ Production-ready performance (133k+ items/sec)

### **📋 High Priority Roadmap**
1. **~~Individual Line-Item Tax Control (Phases 4-8)~~** - ✅ **COMPLETE** (Dec 2024)
3. **Estimate Generation** - PDF generation and client signatures
4. **Change Order System** - Estimate modifications and approvals

## Key Development Files

Understanding these files helps navigate the codebase more effectively:
- `TAXABLE_LINE_ITEMS_COMPLETION.md` - **Current work**: Detailed Phase 5-8 implementation plan
- `FEATURE_PLANNING.md` - Strategic roadmap for major features and business logic
- `TECHNICAL_DEBT.md` - Current architectural concerns and improvement priorities

## Reference Documentation

For detailed information, see these specialized guides:

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Stack overview, data hierarchy, database patterns, authentication flow
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Coding patterns, naming conventions, API development, testing requirements
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - BuildCraftPro colors, UI components, mobile-first patterns
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Known issues, database recovery, deployment problems
- **[DATABASE_RESET_GUIDE.md](DATABASE_RESET_GUIDE.md)** - Step-by-step database reset procedures
- **[RAILWAY_CLI_REFERENCE.md](RAILWAY_CLI_REFERENCE.md)** - Comprehensive Railway CLI commands

## Critical Development Guidelines

### 🚨 STRICT QUALITY STANDARDS - ZERO TOLERANCE POLICY

**Mandatory Requirements:**
- ✅ **ZERO TypeScript errors** 
- ✅ **ZERO ESLint warnings** 
- ✅ **100% type safety** - NO `any` types in new code
- ✅ **All tests passing**
- ✅ **Proper error handling** - no silent failures

### Following Conventions
- NEVER assume libraries are available - check existing codebase first
- Mimic existing code style and patterns
- Always follow security best practices
- **IMPORTANT: DO NOT ADD ANY COMMENTS unless asked**

### Task Management
Use TodoWrite and TodoRead tools VERY frequently to:
- Track progress and give user visibility
- Plan complex tasks with bite-sized phases
- Mark todos as completed ONLY after user verification
- Keep only ONE task in_progress at any time

### Git Workflow
**STRICT COMMIT & PUSH PROTOCOL:**
1. **Code & Request Testing**: Complete work and ask user to test
2. **User Testing**: User tests and reports results
3. **Commit After Verification**: Only commit once user confirms it works
4. **Push When Ordered**: Only push when explicitly requested

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

## Session Context

**Current Status**: 
- ✅ **Individual Line-Item Tax Control Feature is COMPLETE** (Phases 4-8)
- All 8 phases implemented and thoroughly tested
- Performance validated (handles 133k+ items/sec)
- End-to-end testing confirms production readiness
- Frontend-backend integration fully working

**Next Priority**: Move to next major feature from roadmap (Estimate Generation or Change Order System)